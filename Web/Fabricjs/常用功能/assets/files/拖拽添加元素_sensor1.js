import { ColorType } from '../constants/common';
import { Path, Text, Group } from 'fabric';

/**
 * 采集模块——类型1
 * @param {number} sensorId 采集模块ID
 * @param {number} left 局左像素
 * @param {number} top 居上像素
 */
export function sensor1(sensorId, left, top) {
    /** 温度1背景 */
    const t1bg = new Path('M5,0 L31,0 C33.7614237,-5.07265313e-16 36,2.23857625 36,5 L36,19 L36,19 L0,19 L0,5 C-3.38176876e-16,2.23857625 2.23857625,-3.80913106e-16 5,0 Z', {
        id: sensorId + '#t1#bg',
        left: 0,
        top: 0,
        width: 36,
        height: 19,
        fill: ColorType.Success
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
    const t2bg = new Path('M0,0 L36,0 L36,14 C36,16.7614237 33.7614237,19 31,19 L5,19 C2.23857625,19 3.38176876e-16,16.7614237 0,14 L0,0 L0,0 Z', {
        id: sensorId + '#t2#bg',
        left: 0,
        top: 18,
        width: 36,
        height: 18,
        fill: ColorType.Success
    })

    /** 温度2模块 */
    const t2 = new Text("000.0", {
        id: sensorId + '#t2',
        top: 21,
        left: 18,
        fontSize: 13,
        fontFamily: 'SourceHanSansSC-Regular',
        originX: "center",
        originY: "top",
        fill: "white"
    });

    return new Group([t1bg, t1, t2bg, t2], {
        id: sensorId,
        sensorType: 'sensor1',
        left,
        top
    });
}