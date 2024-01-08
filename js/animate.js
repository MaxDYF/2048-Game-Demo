var defaultAnimationTime = 100;
var animationTime = defaultAnimationTime // 控制动画的时间



//通过动画显示数字
function showNumberWithAnimation(i, j, randNumber) {
    return new Promise((resolve) => {
        let id = 'number-cell-' + i + '-' + j + '-1';
        let cmd = `<div class="number-cell-${randNumber}" id="${id}" style="width: 0px; height: 0px; top: ${getPosTop(i, j) + cellWidth / 2}px; left: ${getPosLeft(i, j) + cellWidth / 2}px;"></div>`;
        
        //console.log(cmd);

        $("#grid-container").append(cmd);
        let numberCell = $('#' + id);
        numberCell.text(randNumber);

        //console.log(numberCell.css('top'));
        //console.log(numberCell.css('left'));

        animateCounter++;
        $(numberCell).animate({
            width: cellWidth,
            height: cellWidth,
            top: getPosTop(i, j),
            left: getPosLeft(i, j)
        }, {
            duration: animationTime,
            complete: () => {
                animateCounter--;
                console.log(animationTime);
                resolve();
            } // 当动画完成时解决 Promise
        });
    });
}



//通过动画显示移动的效果
function showMoveAnimation(fromx, fromy, tox, toy) {
    return new Promise((resolve) => {
        
        let numberCell = $('#number-cell-' + fromx + '-' + fromy);
        animateCounter++;
        $(numberCell).animate({
            top: getPosTop(tox, toy),
            left: getPosLeft(tox, toy)
        }, {
            duration: animationTime,
            complete: () => {
                console.log(animationTime);
                animateCounter--;
                resolve();
            } // 当动画完成时解决 Promise
        });
    });
}
