//通过动画显示数字
function showNumberWihthAnimation(i, j, randNumber) {
    //console.log(i,j,randNumber);
    let numberCell = $('#number-cell-' + i + '-' + j);
    numberCell.text(randNumber);
    numberCell.removeClass();
    numberCell.addClass("number-cell-" + randNumber);
    //console.log(numberCell.attr('class'));

    //console.log("Call Number Animation!\n");
    //console.log(numberCell.html());
    //console.log("(" + i + "," + j + "), value=" + randNumber);
    numberCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 200);
}

//通过动画显示移动的效果
function showMoveAnimation(fromx, fromy, tox, toy) {
    let numberCell = $('#number-cell-' + fromx + '-' + fromy);
    //console.log(numberCell.attr('class'));
    //console.log("Call Animation!\n");
    //console.log(numberCell.html());
    //console.log("from (" + fromx + ',' + fromy + "), to (" + tox + "," + toy + ").")
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
    
}