/**
 * @说明 给fabirc中的元素加入辅助线（网上资料，修改使用）
 * @param {canvas} 参数说明：需要传入 new fabric.Canvas() 的那个对象
 * @host https://juejin.im/post/5d037024e51d45109725fe6c
 * @time 2020.2.3 
*/
export const initAligningGuidelines = canvas => {
    const ctx = canvas.getSelectionContext() // getSelectionContext 获取选择上下文
    const aligningLineOffset = 5 // 对齐线条偏移
    const aligningLineMargin = 4 // 对齐线边距
    const aligningLineWidth = 1 // 对齐线条宽度
    const aligningLineColor = '#666666' // 颜色
    let viewportTransform = [] // 视图端口转换
    let zoom = 1;

    const verticalLines = [];
    const horizontalLines = [];

    // 画垂直线
    function drawVerticalLine(coords) {
        drawLine(
            coords.x + 0.5,
            coords.y1 > coords.y2 ? coords.y2 : coords.y1,
            coords.x + 0.5,
            coords.y2 > coords.y1 ? coords.y2 : coords.y1);
    }

    // 画水平线
    function drawHorizontalLine(coords) {
        drawLine(
            coords.x1 > coords.x2 ? coords.x2 : coords.x1,
            coords.y + 0.5,
            coords.x2 > coords.x1 ? coords.x2 : coords.x1,
            coords.y + 0.5);
    }

    // 画线
    function drawLine(x1, y1, x2, y2) {
        ctx.save();
        ctx.lineWidth = aligningLineWidth;
        ctx.strokeStyle = aligningLineColor;
        ctx.beginPath();
        ctx.moveTo(((x1 + viewportTransform[4]) * zoom), ((y1 + viewportTransform[5]) * zoom));
        ctx.lineTo(((x2 + viewportTransform[4]) * zoom), ((y2 + viewportTransform[5]) * zoom));
        ctx.stroke();
        ctx.restore();
    }

    // 范围
    function isInRange(value1, value2) {
        return value2 >= (value1 - aligningLineMargin) && value2 <= (value1 + aligningLineMargin) ? true : false
    }

    // 移动
    canvas.on('mouse:down', function () {
        viewportTransform = canvas.viewportTransform;
        zoom = canvas.getZoom();
    });

    // 对象移动事件（移动到某个点才具有辅助线的功能）
    canvas.on('object:moving', function (e) {

        var activeObject = e.target,
            canvasObjects = canvas.getObjects(),
            activeObjectCenter = activeObject.getCenterPoint(),
            activeObjectLeft = activeObjectCenter.x,
            activeObjectTop = activeObjectCenter.y,
            activeObjectBoundingRect = activeObject.getBoundingRect(),
            activeObjectHeight = activeObjectBoundingRect.height / viewportTransform[3],
            activeObjectWidth = activeObjectBoundingRect.width / viewportTransform[0],
            horizontalInTheRange = false,
            verticalInTheRange = false,
            transform = canvas._currentTransform;

        if (!transform) return;

        // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
        // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

        for (const canvasObject of canvasObjects.filter(i => i !== activeObject)) {

            var objectCenter = canvasObject.getCenterPoint(),
                objectLeft = objectCenter.x,
                objectTop = objectCenter.y,
                objectBoundingRect = canvasObject.getBoundingRect(),
                objectHeight = objectBoundingRect.height / viewportTransform[3],
                objectWidth = objectBoundingRect.width / viewportTransform[0];

            // snap by the horizontal center line
            if (isInRange(objectLeft, activeObjectLeft)) {
                verticalInTheRange = true;
                verticalLines.push({
                    x: objectLeft,
                    y1: (objectTop < activeObjectTop)
                        ? (objectTop - objectHeight / 2 - aligningLineOffset)
                        : (objectTop + objectHeight / 2 + aligningLineOffset),
                    y2: (activeObjectTop > objectTop)
                        ? (activeObjectTop + activeObjectHeight / 2 + aligningLineOffset)
                        : (activeObjectTop - activeObjectHeight / 2 - aligningLineOffset)
                });
                activeObject.setPositionByOrigin(new fabric.Point(objectLeft, activeObjectTop), 'center', 'center');
            }

            // snap by the left edge
            if (isInRange(objectLeft - objectWidth / 2, activeObjectLeft - activeObjectWidth / 2)) {
                verticalInTheRange = true;
                verticalLines.push({
                    x: objectLeft - objectWidth / 2,
                    y1: (objectTop < activeObjectTop)
                        ? (objectTop - objectHeight / 2 - aligningLineOffset)
                        : (objectTop + objectHeight / 2 + aligningLineOffset),
                    y2: (activeObjectTop > objectTop)
                        ? (activeObjectTop + activeObjectHeight / 2 + aligningLineOffset)
                        : (activeObjectTop - activeObjectHeight / 2 - aligningLineOffset)
                });
                activeObject.setPositionByOrigin(new fabric.Point(objectLeft - objectWidth / 2 + activeObjectWidth / 2, activeObjectTop), 'center', 'center');
            }

            // snap by the right edge
            if (isInRange(objectLeft + objectWidth / 2, activeObjectLeft + activeObjectWidth / 2)) {
                verticalInTheRange = true;
                verticalLines.push({
                    x: objectLeft + objectWidth / 2,
                    y1: (objectTop < activeObjectTop)
                        ? (objectTop - objectHeight / 2 - aligningLineOffset)
                        : (objectTop + objectHeight / 2 + aligningLineOffset),
                    y2: (activeObjectTop > objectTop)
                        ? (activeObjectTop + activeObjectHeight / 2 + aligningLineOffset)
                        : (activeObjectTop - activeObjectHeight / 2 - aligningLineOffset)
                });
                activeObject.setPositionByOrigin(new fabric.Point(objectLeft + objectWidth / 2 - activeObjectWidth / 2, activeObjectTop), 'center', 'center');
            }

            // snap by the vertical center line
            if (isInRange(objectTop, activeObjectTop)) {
                horizontalInTheRange = true;
                horizontalLines.push({
                    y: objectTop,
                    x1: (objectLeft < activeObjectLeft)
                        ? (objectLeft - objectWidth / 2 - aligningLineOffset)
                        : (objectLeft + objectWidth / 2 + aligningLineOffset),
                    x2: (activeObjectLeft > objectLeft)
                        ? (activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset)
                        : (activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset)
                });
                activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop), 'center', 'center');
            }

            // snap by the top edge
            if (isInRange(objectTop - objectHeight / 2, activeObjectTop - activeObjectHeight / 2)) {
                horizontalInTheRange = true;
                horizontalLines.push({
                    y: objectTop - objectHeight / 2,
                    x1: (objectLeft < activeObjectLeft)
                        ? (objectLeft - objectWidth / 2 - aligningLineOffset)
                        : (objectLeft + objectWidth / 2 + aligningLineOffset),
                    x2: (activeObjectLeft > objectLeft)
                        ? (activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset)
                        : (activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset)
                });
                activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop - objectHeight / 2 + activeObjectHeight / 2), 'center', 'center');
            }

            // snap by the bottom edge
            if (isInRange(objectTop + objectHeight / 2, activeObjectTop + activeObjectHeight / 2)) {
                horizontalInTheRange = true;
                horizontalLines.push({
                    y: objectTop + objectHeight / 2,
                    x1: (objectLeft < activeObjectLeft)
                        ? (objectLeft - objectWidth / 2 - aligningLineOffset)
                        : (objectLeft + objectWidth / 2 + aligningLineOffset),
                    x2: (activeObjectLeft > objectLeft)
                        ? (activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset)
                        : (activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset)
                });
                activeObject.setPositionByOrigin(new fabric.Point(activeObjectLeft, objectTop + objectHeight / 2 - activeObjectHeight / 2), 'center', 'center');
            }
        }

        if (!horizontalInTheRange) horizontalLines.length = 0;
        if (!verticalInTheRange) verticalLines.length = 0;
    });

    // 结束绘画事件
    canvas.on('before:render', function () {
        canvas.clearContext(canvas.contextTop);
    });

    // 开始绘画事件（也就是图形开始变化）
    canvas.on('after:render', function () {
        for (const verticalLine of verticalLines) drawVerticalLine(verticalLine);
        for (const horizontalLine of horizontalLines) drawHorizontalLine(horizontalLine);
        verticalLines.length = horizontalLines.length = 0;
    });

    canvas.on('mouse:up', function () {
        verticalLines.length = horizontalLines.length = 0;
        canvas.renderAll();
    });
}