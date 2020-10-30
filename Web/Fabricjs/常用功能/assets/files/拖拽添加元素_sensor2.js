import { ColorType } from '../constants/common';
import { Rect, Line, Text, Group } from 'fabric';

/**
 * 采集模块——类型2
 * @param {number} sensorId 采集模块ID
 * @param {number} left 局左像素
 * @param {number} top 居上像素
 */
export function sensor2(sensorId, left, top) {
    /** 温度1背景 */
    const t1bg = new Rect({
        id: sensorId + '#t1#bg',
        left: 0,
        top: 0,
        width: 36,
        height: 19,
        rx: 5,
        fill: ColorType.Success
    })

    /** 温度1连接线 */
    const connectLine1 = new Line([36, 9, 41, 9], {
        id: sensorId + '#t1#connect',
        strokeWidth: 2, //线宽
        stroke: ColorType.Success, //线的颜色
    })

    /** 温度1模块 */
    const t1 = new Text("000.0", {
        id: sensorId + '#t1',
        top: 3,
        left: 18,
        fontSize: 13,
        fontFamily: 'SourceHanSansSC-Regular',
        originX: "center",
        originY: "top",
        fill: "white"
    });

    /** 温度2背景 */
    const t2bg = new Rect({
        id: sensorId + '#t2#bg',
        left: 46,
        top: 0,
        width: 36,
        height: 19,
        rx: 5,
        fill: ColorType.Success
    })

    /** 温度2模块 */
    const t2 = new Text("000.0", {
        id: sensorId + '#t2',
        top: 3,
        left: 65,
        fontSize: 13,
        fontFamily: 'SourceHanSansSC-Regular',
        originX: "center",
        originY: "top",
        fill: "white"
    });

    /** 温度2连接线 */
    const connectLine2 = new Line([41, 9, 46, 9], {
        id: sensorId + '#t2#connect',
        strokeWidth: 2, //线宽
        stroke: ColorType.Success, //线的颜色
    })

    return new Group([t1bg, t1, connectLine1, t2bg, t2, connectLine2], {
        id: sensorId,
        sensorType: 'sensor2',
        left,
        top
    });
}