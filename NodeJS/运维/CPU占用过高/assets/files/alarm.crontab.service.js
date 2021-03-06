"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmCrontabService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const antenna_service_1 = require("../../antenna/services/antenna.service");
const antenna_util_1 = require("../../antenna/utils/antenna.util");
const apply_service_1 = require("../../apply/services/apply.service");
const redis_lant_service_1 = require("../../common/services/redis-lant.service");
const device_service_1 = require("../../device/services/device.service");
const device_util_1 = require("../../device/utils/device.util");
const employee_service_1 = require("../../employee/services/employee.service");
const location_constant_1 = require("../../location/constants/location.constant");
const location_service_1 = require("../../location/services/location.service");
const location_util_1 = require("../../location/utils/location.util");
const position_service_1 = require("../../position/services/position.service");
const position_util_1 = require("../../position/utils/position.util");
const work_time_service_1 = require("../../work-time/services/work-time.service");
const alarm_constant_1 = require("../constants/alarm.constant");
const alarm_config_service_1 = require("./alarm-config.service");
const alarm_record_service_1 = require("./alarm-record.service");
const dayjs = require("dayjs");
const andon_service_1 = require("../../andon/services/andon.service");
const common_constant_1 = require("../../common/constants/common.constant");
let AlarmCrontabService = class AlarmCrontabService {
    constructor(locationService, employeeService, positionService, alarmRecordService, applyService, antennaService, alarmConfigService, deviceService, redisLantService, workTimeService, andonService, deviceUtil, locationUtil, antennaUtil, positionUtil) {
        this.locationService = locationService;
        this.employeeService = employeeService;
        this.positionService = positionService;
        this.alarmRecordService = alarmRecordService;
        this.applyService = applyService;
        this.antennaService = antennaService;
        this.alarmConfigService = alarmConfigService;
        this.deviceService = deviceService;
        this.redisLantService = redisLantService;
        this.workTimeService = workTimeService;
        this.andonService = andonService;
        this.deviceUtil = deviceUtil;
        this.locationUtil = locationUtil;
        this.antennaUtil = antennaUtil;
        this.positionUtil = positionUtil;
        this.parallelCount = 8;
    }
    async deviceCron() {
        if (!(await this.redisLantService.getLock("deviceMonitor", 5000)))
            return;
        const alarmConfig = await this.alarmConfigService.getConfig();
        const deviceListStream = await this.deviceService.findAllStream();
        deviceListStream
            .on('data', async (raw) => {
            const device = await this.deviceUtil.decodeRawEntity(raw);
            if (!device || !device.card)
                return;
            const lastReportAt = device.card.lastReportAt || device.card.createdAt;
            if (lastReportAt.getTime() > Date.now() - alarmConfig.deviceOutThreshold)
                return;
            const lastRecord = await this.alarmRecordService.findLatestOneBySnAndType(device.card.sn, alarm_constant_1.AlarmRecordType.DeviceOutAlarm);
            if ((lastRecord && lastRecord.createdAt.getTime() > Date.now() - alarmConfig.deviceOutThreshold) || lastRecord?.status === alarm_constant_1.AlarmRecordStatus.Pending)
                return;
            const apply = await this.applyService.findOneBySnAndDate(device.card.sn, new Date());
            await this.alarmRecordService.create(device.card.sn, device.name, alarm_constant_1.AlarmRecordType.DeviceOutAlarm, apply?.id);
        })
            .on('close', () => this.redisLantService.releaseLock("deviceMonitor"));
    }
    async antennaCron() {
        if (!(await this.redisLantService.getLock("antennaOffMonitor", 5000)))
            return;
        const alarmConfig = await this.alarmConfigService.getConfig();
        const antennaStream = await this.antennaService.findAllStream();
        antennaStream
            .on('data', async (raw) => {
            const antenna = this.antennaUtil.decodeRawEntity(raw);
            if (!antenna)
                return;
            const lastReportAt = antenna.lastReportAt || antenna.createdAt;
            if (lastReportAt.getTime() > Date.now() - 12 * 60 * 60 * 1000)
                return;
            const lastRecord = await this.alarmRecordService.findLatestOneBySnAndType(antenna.sn, alarm_constant_1.AlarmRecordType.AntennaOffAlarm);
            if ((lastRecord && lastRecord.createdAt.getTime() > Date.now() - alarmConfig.antennaOfflineThreshold) || lastRecord?.status === alarm_constant_1.AlarmRecordStatus.Pending)
                return;
            await this.alarmRecordService.create(antenna.sn, antenna.name, alarm_constant_1.AlarmRecordType.AntennaOffAlarm);
        })
            .on('close', () => {
            this.redisLantService.releaseLock("antennaOffMonitor");
        });
    }
    async positionCron() {
        if (!(await this.redisLantService.getLock("positionUnbindMonitor", 5 * 60 * 1000)))
            return;
        const alarmConfig = await this.alarmConfigService.getConfig();
        const positionList = await this.positionService.findWithEmployee();
        while (positionList.length) {
            await Promise.allSettled(positionList.splice(0, this.parallelCount).map(async (position) => {
                const location = await this.locationService.findLatestOneBySnAndPositionUuid(position.employee.card.sn, position.uuid);
                if (location.createdAt.getTime() > Date.now() - alarmConfig.employeeOfflineThreshold)
                    return;
                const ts = new Date().setSeconds(0, 0) - 60 * 1000;
                const payloadList = (await Promise.all([...new Array(Math.floor(alarmConfig.employeeOfflineThreshold / (60 * 1000))).keys()].map(index => this.redisLantService.getList("locate", `Card_${position.employee.card.sn}_${ts - index * 60 * 1000}`)))).flat();
                const unbind = await this.locationUtil.checkOutPost(position, payloadList);
                if (!unbind)
                    return;
                await this.positionService.unbindEmployee(position.uuid);
                const latestLocation = await this.locationService.findLastOne(position.employee.card.sn);
                const { id: recordId } = await this.locationService.create(position.employee.card.sn, latestLocation.antennaSn, latestLocation.status, latestLocation.positionUuid, location_constant_1.LocationChangeFlag.OutPost);
                this.workTimeService.onlineOrOfflineWorkStationPublish([
                    {
                        recordId: recordId + '',
                        lineName: position.pipeline.name,
                        workStation: position.name,
                        empNo: position.employee.jobNumber,
                        recordType: "1",
                        actualTime: dayjs(Date.now() - alarmConfig.employeeOfflineThreshold).format('YYYY/MM/DD HH:mm:ss')
                    }
                ]);
                this.andonService.onPublish(position.pipeline.name, position.name);
            }));
        }
        this.redisLantService.releaseLock("positionUnbindMonitor");
    }
    async outRegionCron() {
        if (!(await this.redisLantService.getLock("outRegionMonitor", 5000)))
            return;
        const alarmConfig = await this.alarmConfigService.getConfig();
        const locationList = await this.locationService.getSnList(alarmConfig);
        while (locationList.length) {
            await Promise.allSettled(locationList.splice(0, this.parallelCount).map(async (raw) => {
                const location = this.locationUtil.decodeRawEntity(raw);
                const lastOne = await this.locationService.findLastOne(location.sn);
                const lastOneWithCenterSn = await this.locationService.findLastOneWithCenterSn(location.sn);
                if (lastOne.status === location_constant_1.LocationStatus.OutRegion || !common_constant_1.EdgeCenterSnList.includes(lastOneWithCenterSn.centerSn))
                    return;
                const { id: recordId } = await this.locationService.create(location.sn, location_constant_1.AntennaNotExist, location_constant_1.LocationStatus.OutRegion, null, location_constant_1.LocationChangeFlag.Exit);
                const device = await this.deviceService.findOneByCardSn(location.sn);
                if (device) {
                    await this.deviceService.updateActive(device.cardUuid, false);
                }
                const employee = await this.employeeService.findOneByCardSn(location.sn);
                if (employee)
                    this.workTimeService.inOrOutFactoryPublish([
                        {
                            recordId: recordId + '',
                            empNo: employee.jobNumber,
                            recordType: "1",
                            actualTime: dayjs().format('YYYY/MM/DD HH:mm:ss')
                        }
                    ]);
            }));
        }
        this.redisLantService.releaseLock("outRegionMonitor");
    }
    async restTimeOutPostCron() {
        if (!(await this.redisLantService.getLock("outPostMonitor", 5 * 60 * 1000)))
            return;
        const alarmConfig = await this.alarmConfigService.getConfig();
        for (const workTime of alarmConfig.workTimeList) {
            const end = new Date();
            end.setHours(workTime.end.hour, workTime.end.minute, workTime.end.second);
            if ((end.getTime() - Date.now() > 0 && end.getTime() - Date.now() < alarm_constant_1.TenSeconds) || (end.getTime() - Date.now() < 0 && Date.now() - end.getTime() < alarm_constant_1.TenSeconds)) {
                const positionList = await this.positionService.findWithEmployee();
                const taskList = await Promise.all(positionList.map(async ({ name, employee, pipeline }) => {
                    const lastRecord = await this.locationService.findLastOne(employee.card.sn);
                    if (lastRecord.status !== location_constant_1.LocationStatus.InRegionOnline)
                        return;
                    const { id: recordId } = await this.locationService.create(employee.card.sn, null, location_constant_1.LocationStatus.InRegionOnline, null, location_constant_1.LocationChangeFlag.OutPost);
                    this.andonService.onPublish(pipeline.name, name);
                    return {
                        recordId: recordId + '',
                        lineName: pipeline.name,
                        workStation: name,
                        empNo: employee.jobNumber,
                        recordType: "1",
                        actualTime: dayjs(Date.now() - alarmConfig.employeeOfflineThreshold).format('YYYY/MM/DD HH:mm:ss')
                    };
                }));
                await this.positionService.unbindAllEmployee();
                this.workTimeService.onlineOrOfflineWorkStationPublish(taskList.filter(task => task));
            }
        }
        this.redisLantService.releaseLock("outPostMonitor");
    }
};
__decorate([
    schedule_1.Cron('*/10 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlarmCrontabService.prototype, "deviceCron", null);
__decorate([
    schedule_1.Cron('0 0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlarmCrontabService.prototype, "antennaCron", null);
__decorate([
    schedule_1.Cron('15 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlarmCrontabService.prototype, "positionCron", null);
__decorate([
    schedule_1.Cron('0 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlarmCrontabService.prototype, "outRegionCron", null);
__decorate([
    schedule_1.Cron('20 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlarmCrontabService.prototype, "restTimeOutPostCron", null);
AlarmCrontabService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [location_service_1.LocationService,
        employee_service_1.EmployeeService,
        position_service_1.PositionService,
        alarm_record_service_1.AlarmRecordService,
        apply_service_1.ApplyService,
        antenna_service_1.AntennaService,
        alarm_config_service_1.AlarmConfigService,
        device_service_1.DeviceService,
        redis_lant_service_1.RedisLantService,
        work_time_service_1.WorkTimeService,
        andon_service_1.AndonService,
        device_util_1.DeviceUtil,
        location_util_1.LocationUtil,
        antenna_util_1.AntennaUtil,
        position_util_1.PositionUtil])
], AlarmCrontabService);
exports.AlarmCrontabService = AlarmCrontabService;
