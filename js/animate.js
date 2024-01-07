//通过动画显示数字
function showNumberWihthAnimation(i, j, randNumber) {
    //console.log(i,j,randNumber);
    let id = 'number-cell-' + i + '-' + j + '-1';
    let cmd = '<div class="number-cell-' + randNumber + '" id="' + id + '" style="width:0px; height:0px; top:' + (getPosTop(i, j) + cellWidth / 2) + 'px; left:' + (getPosLeft(i, j) + cellWidth / 2) + 'px;"></div>';
    console.log(cmd);
    //console.log(cmd);
    $("#grid-container").append(cmd);
    let numberCell = $('#' + id);
    numberCell.text(randNumber);
    console.log(numberCell.css('top'));
    console.log(numberCell.css('left'));

    //console.log("Call Number Animation!\n");
    //console.log(numberCell.html());
    //console.log("(" + i + "," + j + "), value=" + randNumber);
    numberCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 80);
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
    }, 80);
}