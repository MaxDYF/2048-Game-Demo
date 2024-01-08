var documentWidth=document.documentElement.clientWidth;//页面DOM的宽度
var containerWidth=documentWidth*0.92;//容器的宽度
var cellWidth=documentWidth*0.18;
var cellSpace=documentWidth*0.04;
var animateCounter = 0; // 定义动画计数器，用于统计正在进行的动画
const N = 4, M = 4;
var board = new Board(N, M);
console.log(documentWidth,containerWidth,cellWidth,cellSpace);
//获取上边的位置
function getPosTop(i,j){
	return cellSpace+(cellWidth+cellSpace)*i;
}
//获取左边的位置
function getPosLeft(i,j){
	return cellSpace+(cellWidth+cellSpace)*j;
}
function newgame(){
    containerWidth=500;
    cellWidth=100;
    cellSpace=20;    
    for (let i = 0; i < N; i++)
        for (let j = 0; j < M; j++)
        {
            let gridCell = "#grid-cell-" + i + '-' + j;
            $(gridCell).css('top', getPosTop(i, j));
            $(gridCell).css('left', getPosLeft(i, j));
        }
    board.reset();
    updateView(board, [])
    .then(() => {
        //在随机的两个单元格生成数字
        let vec1 = board.randomSummon();
        let vec2 = board.randomSummon();
        updateView(board, [vec1, vec2]);
    });
}
function updateView(board, new_summon = [], merged = []) {
    return new Promise((resolve) => {
        let promiseMoveAnimation = [];
        // 开始更新有位移的动画
        for (let i = 0; i < board.moveTrack.length; i++) {
            promiseMoveAnimation.push(showMoveAnimation(board.moveTrack[i][0], board.moveTrack[i][1], board.moveTrack[i][2], board.moveTrack[i][3]));
        }

        Promise.all(promiseMoveAnimation)
            .then(() => {
                // 开始更新合并后数字的动画
                for (let i = 0; i < merged.length; i++)
                {
                    let x = merged[i][0], y = merged[i][1], val = merged[i][2];
                    $("#number-cell-" + x + '-' + y).remove();
                    let cmd = '<div class="number-cell-' + val + '" id="number-cell-' + x + '-' + y + '"></div>';
                    console.log(cmd);
                    $("#grid-container").append(cmd);
                    let numberCell = $("#number-cell-" + x + '-' + y);
                    numberCell.css('top', getPosTop(x, y));
                    numberCell.css('left', getPosLeft(x, y));
                    numberCell.css('width', 0);
                    numberCell.css('height', 0);
                    numberCell.text(val);
                }
                // 开始更新新出现的数字动画
                let promiseNumAnimation = [];

                for (let i = 0; i < new_summon.length; i++) {
                    promiseNumAnimation.push(showNumberWithAnimation(new_summon[i][0], new_summon[i][1], new_summon[i][2]));
                }

                return Promise.all(promiseNumAnimation);
            })
            .then(() => {
                for (let i = 0; i < N; i++) {
                    for (let j = 0; j < M; j++) {
                        $("#number-cell-" + i + '-' + j).remove();
                        $("#number-cell-" + i + '-' + j + '-1').remove();
                        let cmd = '<div class="number-cell-' + board.board[i][j] + '" id="number-cell-' + i + '-' + j + '"></div>';
                        $("#grid-container").append(cmd);
                        let numberCell = $("#number-cell-" + i + '-' + j);

                        let x = board.board[i][j];

                        if (x > 0) {
                            numberCell.css('top', getPosTop(i, j));
                            numberCell.css('left', getPosLeft(i, j));
                            numberCell.css('width', cellWidth);
                            numberCell.css('height', cellWidth);
                            numberCell.text(board.board[i][j]);
                        } else {
                            numberCell.css('top', getPosTop(i, j) + cellWidth / 2);
                            numberCell.css('left', getPosLeft(i, j) + cellWidth / 2);
                            numberCell.css('width', 0);
                            numberCell.css('height', 0);
                        }
                    }
                }
                $("#score").text(board.score);
                resolve();
            })
            .catch((error) => {
                console.error('Error:', error);
                resolve(); // Ensure the Promise is resolved even in case of an error
            });
    });
}

function isGameOver()
{
    if (board.getStatus())
    {
        alert("Game Over！");
        return true;
    }
    return false;
}




const startKeyboardExecution = (function(event)
{
    //console.log(animateCounter);
    if (animateCounter > 0)
        return;
    if (board.getStatus())
        return;
    //console.table(board.board);
    let inputSpeed = $("#speed");
    if (inputSpeed.val() == '')
        return;
    let val = parseFloat(inputSpeed.val());
    if($.isNumeric(val) == false)
    {
        alert("Speed must be an NUMBER!");
        animationTime = defaultAnimationTime;
        inputSpeed.val(defaultAnimationTime);
        return;
    }
    else if (val > 1000 || val < 0)
    {
        alert("Too Big or too small!");
        animateTime = defaultAnimationTime;
        inputSpeed.val(defaultAnimationTime);
        return;
    }
    else
        animationTime = val;
    let result = [], merged = [];
    switch(event.key)
    {
        case 'ArrowUp':
            event.preventDefault();
            console.log("ArrowUp!\n");
            result = board.moveVertical(-1);
            if (result[0] == true)
            {
                console.log("Can't Move Up!\n");
                console.table(board.board);
                return;
            }
            break;

        case 'ArrowDown':
            event.preventDefault();
            console.log("ArrowDown!\n");
            result = board.moveVertical(1);
            if (result[0] == true)
            {
                console.log("Can't Move Down!\n");
                console.table(board.board);
                return;
            }
            break;

        case 'ArrowLeft':
            event.preventDefault();
            console.log("ArrowLeft!\n");
            result = board.moveHorizontal(-1);
            if (result[0] == true)
            {
                console.log("Can't Move Left!\n");
                console.table(board.board);
                return;
            }
            break;

        case 'ArrowRight':
            event.preventDefault();
            console.log("ArrowRight!\n");
            result = board.moveHorizontal(1);
            if (result[0] == true)
            {
                console.log("Can't Move Right!\n");
                console.table(board.board);
                return;
            }
            break;
        default:
            return;
    }
    merged = result[1];
    let vec = board.randomSummon();
    updateView(board, [vec], merged)
    .then(isGameOver)
});
document.addEventListener('keydown', startKeyboardExecution);
document.addEventListener('DOMContentLoaded',function()
{
    let inputSpeed = $("#speed");
    inputSpeed.val(defaultAnimationTime);
    newgame();
});