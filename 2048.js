class Board
{
    
    constructor(col, row)
    /*  board: 棋盘
     *  N, M : 棋盘的行列数
     *  stage: 当前游戏的阶段，设定为最大数X的log2()
     *  score: 游戏当前分数
     *         计分方式：合并一次
     */
    {
        this.board = new Array(col);
        for (var i = 0; i < col; i++)
        {
            this.board[i] = new Array(row);
            for (var j = 0; j < row; j++)
                this.board[i][j] = 0;
        }
        this.N = col
        this.M = row
        this.stage = 1;
        this.score = 0;
    }
    moveHorizontal(step)    
    /*  水平移动
     *  step = 1 or -1
     *  1  = 向右移动 
     *  -1 = 向左移动
     */ 
    {
        const N = this.N, M = this.M;
        let movable = false;
        for (let j = step > 0 ? (M - 1) : 0; step > 0 ? j >= 0 :j < M; step > 0 ? j-- : j++)
        {
            for (let i = 0; i < N; i++)
            {
                if (this.board[i][j] == 0)
                    continue;
                let dest = j + step;
                while ((step > 0 ? dest < M - 1 : dest > 0) && this.board[i][dest] == 0)
                    dest += step;
                if (this.board[i][dest] == 0)
                {
                    this.board[i][dest] = this.board[i][j];
                    this.board[i][j] = 0;
                    movable = true;
                }
                else if (this.board[i][dest] == this.board[i][j])
                {
                    this.board[i][dest] *= 2;
                    this.score += this.board[i][dest];
                    this.stage = Math.max(this.stage, Math.round(Math.log2(this.board[i][dest])));
                    this.board[i][j] = 0;
                    movable = true;
                }
                else if (dest != j + step)
                {
                    dest -= step;
                    this.board[i][dest] = this.board[i][j];
                    this.board[i][j] = 0;
                    movable = true;
                }
            }
        }
        return movable;
    }
    moveVertical(step) 
    /*  竖直移动
     *  step = 1 or -1
     *  1  = 向下移动 
     *  -1 = 向上移动
     */ 
    {
        const N = this.N, M = this.M;
        let movable = false;
        for (let i = step > 0 ? N - 2 : 0; step > 0 ? i >= 0 : i < N; step > 0 ? i-- : i++)
        {
            for (let j = 0; j < M; j++)
            {
                if (this.board[i][j] == 0)
                    continue;
                let dest = i + step;
                while ((step > 0 ? dest < N - 1 : dest > 0) && this.board[dest][j] == 0)
                    dest += step;
                if (this.board[dest][j] == 0)
                {
                    this.board[dest][j] = this.board[i][j];
                    this.board[i][j] = 0;
                    movable = true;
                }
                else if (this.board[dest][j] == this.board[i][j])
                {
                    this.board[dest][j] *= 2;
                    this.score += this.board[dest][j];
                    this.stage = Math.max(this.stage, Math.round(Math.log2(this.board[dest][j])));
                    this.board[i][j] = 0;
                    movable = true;
                }
                else if (dest != i + step)
                {
                    dest -= step;
                    this.board[dest][j] = this.board[i][j];
                    this.board[i][j] = 0;
                    movable = true;
                }
            }
        }
    }
    randomSummon()
    /*  随机在空位生成一个数字 
     *  生成数的大小由stage控制
     */
    {
        // Math.round() 生成 2^minLim ~ 2^maxLim之间的二次幂数
        let minLim = 1, maxLim = 1;
        if (this.stage >= 8)
            maxLim += Math.ceil((this.stage - 6) / 2);
        else if (this.stage >= 4)
            maxLim += Math.ceil((this.stage - 2) / 2);
        let x = Math.pow(2, Math.round(minLim + Math.random() * (maxLim - minLim)));
        let vec = new Array();
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                if (this.board[i][j] == 0)
                    vec.push([i, j]);
        // 随机确定空位
        let id = Math.round(Math.random() * (vec.length - 1));
        this.board[vec[id][0]][vec[id][1]] = x;
        return false;
    }
    
    getStatus()
    /*  判断当前是否能够移动 
        不能返回true
        可以返回false
     */


    {
        let movable = false;
        for (let i = 0; i < this.N && !movable; i++)
            for (let j = 0; j < this.M && !movable; j++)
            {
                if (i > 0 && (this.board[i - 1][j] == this.board[i][j] || this.board[i - 1][j] == 0))
                    movable = true;
                if (j > 0 && (this.board[i][j - 1] == this.board[i][j] || this.board[i][j - 1] == 0))
                    movable = true;
                if (i < this.N - 1 && (this.board[i + 1][j] == this.board[i][j] || this.board[i + 1][j] == 0))
                    movable = true;
                if (j < this.M - 1 && (this.board[i][j + 1] == this.board[i][j] || this.board[i][j + 1] == 0))
                    movable = true;
            }
        return !movable;
    }
    getScore()
    /* 获取当前分数 */
    // Score = the sum of all number.
    {
        return this.score;
    }
    reset()
    /* 重置棋盘 */
    {
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                this.board[i][j] = 0;
        this.score = 0;
        this.stage = 1;
        return false;
    }
}


/* Test Code
var board = new Board(6, 6);

for (let i = 0; i < 6; i++) 
    for (let j = 0; j < 6; j++)
        board.board[i][j] = 2;
console.table(board.board);


board.moveHorizontal(1)
console.table(board.board);
console.log(board.getScore())
console.log(board.getStatus());

board.moveHorizontal(-1)
console.table(board.board);
console.log(board.getScore())
console.log(board.getStatus());

board.moveVertical(1);
console.table(board.board);
console.log(board.getScore())
console.log(board.getStatus());

board.moveVertical(-1);
console.table(board.board);
console.log(board.getScore())
console.log(board.getStatus());

board.randomSummon();
console.table(board.board);
board.randomSummon();
console.table(board.board);
board.randomSummon();
console.table(board.board);

board.reset();
console.table(board.board);
console.log(board.getScore())
console.log(board.getStatus());
*/