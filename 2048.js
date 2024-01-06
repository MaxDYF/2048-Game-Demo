class Board
{
    
    constructor(col, row)
    /*  board: 棋盘
     *  N, M : 棋盘的行列数
     *  stage: 当前游戏的阶段，设定为最大数X的log2()
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
        this.stage = 0;
    }    
    getStatus()
    /*  判断当前是否能够移动 */
    {
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                if (this.board[i][j] == 0)
                    return false;
        return true;
    }
    moveHorizontal(step)    
    /*  水平移动
     *  step = 1 or -1
     *  1  = 向右移动 
     *  -1 = 向左移动
     */ 
    {

        // 当无法生成时返回true
        if (this.getStatus())
            return true;
        const N = this.N, M = this.M;
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
                }
                else if (this.board[i][dest] == this.board[i][j])
                {
                    this.board[i][dest] *= 2;
                    this.board[i][j] = 0;
                }
                else if (dest != j + step)
                {
                    dest -= step;
                    this.board[i][dest] = this.board[i][j];
                    this.board[i][j] = 0;
                }
            }
        }
    }
    moveVertical(step) 
    /*  竖直移动
     *  step = 1 or -1
     *  1  = 向下移动 
     *  -1 = 向上移动
     */ 
    {
        // 当无法生成时返回true
        if (this.getStatus())
        return true;
        const N = this.N, M = this.M;
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
                }
                else if (this.board[dest][j] == this.board[i][j])
                {
                    this.board[dest][j] *= 2;
                    this.board[i][j] = 0;
                }
                else if (dest != i + step)
                {
                    dest -= step;
                    this.board[dest][j] = this.board[i][j];
                    this.board[i][j] = 0;
                }
            }
        }
    }
    updateStage()
    /* 根据当前最大值更新stage的值 */
    {
        let maxNum = 0;
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                maxNum = Math.max(maxNum, a[i][j]);
        this.stage = Math.round(Math.log2(maxNum));
    }
    randomSummon()
    /*  随机在空位生成一个数字 
     *  生成数的大小由stage控制
     */
    {
        // 当无法生成时返回true
        if (this.getStatus())
            return true;
        // Math.round() 生成 2^minLim ~ 2^maxLim之间的二次幂数
        let minLim = 1, maxLim = 2;
        if (stage >= 10)
            maxLim += Math.ceil((stage - 2) / 2);
        let x = Math.pow(2, Math.round(minLim + Math.random() * (maxLim - minLim)));
        let vec = new Array();
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                if (this.board[i][j] == 0)
                    vec.push([i, j]);
        // 随机确定空位
        let id = Math.round(Math.random() * (vec.length() - 1));
        this.board[vec[id][0]][vec[id][1]] = x;
        return false;
    }

    getScore()
    /* 获取当前分数 */
    // Score = the sum of all number.
    {
        let sum = 0;
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                sum += this.board[i][j];
        return sum;
    }
    reset()
    /* 重置棋盘 */
    {
        for (let i = 0; i < this.N; i++)
            for (let j = 0; j < this.M; j++)
                board.board[i][j] = 0;
        return false;
    }
}



var board = new Board(6, 6);

for (let i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++)
        board.board[i][j] = 2;
console.table(board.board);
board.moveHorizontal(1)
console.table(board.board);
board.moveHorizontal(-1)
console.table(board.board);
board.moveVertical(1);
console.table(board.board);
board.moveVertical(-1);
console.table(board.board);
