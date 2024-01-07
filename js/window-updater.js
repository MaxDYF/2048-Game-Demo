//移动端尺寸
var documentWidth=document.documentElement.clientWidth;//页面DOM的宽度
var containerWidth=documentWidth*0.92;//容器的宽度
var cellWidth=documentWidth*0.18;
var cellSpace=documentWidth*0.04;

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
    updateView(board, []);

	//在随机的两个单元格生成数字
    setTimeout(function(){
        let vec1 = board.randomSummon();
        let vec2 = board.randomSummon();
        updateView(board, [vec1, vec2]);
    }, 200);

}

function updateView(board, new_summon)
{
    let vec = board.moveTrack;
    for (let i = 0; i < board.moveTrack.length; i++)
        showMoveAnimation(vec[i][0], vec[i][1], vec[i][2], vec[i][3]);
    setTimeout(function()
    {
        for (let i = 0; i < new_summon.length; i++)
            showNumberWihthAnimation(new_summon[i][0], new_summon[i][1], new_summon[i][2]);
    }, 60);
    setTimeout(function(){
        for (let i = 0; i < N; i++)
        {
            for (let j = 0; j < M; j++)
            {
                $("#number-cell-" + i + '-' + j).remove();
                $("#number-cell-" + i + '-' + j + '-1').remove();
                let cmd = '<div class="number-cell-' + board.board[i][j] + '" id="number-cell-' + i + '-' + j + '"></div>';
                //console.log(cmd);
                $("#grid-container").append(cmd);
                let numberCell = $("#number-cell-" + i + '-' + j);
                
                let x = board.board[i][j];
                if (x > 0)
                {
                    numberCell.css('top', getPosTop(i, j));
                    numberCell.css('left', getPosLeft(i, j));
                    numberCell.css('width', cellWidth);
                    numberCell.css('height', cellWidth);
                    numberCell.text(board.board[i][j]);
                }
                else
                {
                    numberCell.css('top', getPosTop(i, j) + cellWidth / 2);
                    numberCell.css('left', getPosLeft(i, j) + cellWidth / 2);
                    numberCell.css('width', 0);
                    numberCell.css('height', 0);  
                }
            }
        }
        $("#score").text(board.score);
    }, 160);
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




// 引入节流函数，限制键盘输入频率，以达到控制动画不出错的效果。
const handleKeyboardEventThrottled = $.throttle(200, function(event)
{
    event.preventDefault();
    if (board.getStatus())
        return;
    //console.table(board.board);
    switch(event.key)
    {
        case 'ArrowUp':
            console.log("ArrowUp!\n");
            if (board.moveVertical(-1) == true)
            {
                console.log("Can't Move Up!\n");
                console.table(board.board);
                return;
            }
            break;

        case 'ArrowDown':
            console.log("ArrowDown!\n");
            if (board.moveVertical(1) == true)
            {
                console.log("Can't Move Down!\n");
                console.table(board.board);
                return;
            }
            break;

        case 'ArrowLeft':
            console.log("ArrowLeft!\n");
            if (board.moveHorizontal(-1) == true)
            {
                console.log("Can't Move Left!\n");
                console.table(board.board);
                return;
            }
            break;

        case 'ArrowRight':
            console.log("ArrowRight!\n");
            if (board.moveHorizontal(1) == true)
            {
                console.log("Can't Move Right!\n");
                console.table(board.board);
                return;
            }
            break;
        default:
            return;
    }
    let vec = board.randomSummon();
    updateView(board, [vec]);
    isGameOver();
});
document.addEventListener('keydown', handleKeyboardEventThrottled);
document.addEventListener('DOMContentLoaded',function()
{
    newgame();
});