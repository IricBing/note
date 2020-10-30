import { sensor1 } from './modules/sensor1';
import { sensor2 } from './modules/sensor2';

/**
 * 素材拖放处理
 * @param {object} that vm实例
 * @param {string} type 拖放类型
 * @param {number} left 局左像素
 * @param {number} top 居上像素
 */
export function dragHandler(that, type, left, top) {
    const timeStamp = Date.now();
    switch (type) {
        case 'sensor1':
            that.canvas.add(new sensor1(timeStamp, left, top));
            break;
        case 'sensor2':
            that.canvas.add(new sensor2(timeStamp, left, top));
            break;
        default:
            console.log('持续支持中，请稍后')
    }
}