'use strict'

const MINE = '💣'
const SMILEY = '🙂'
const LOSE = '🤯'
const WIN = '😎'
const FLAG = '📌'

var gBoard;
var gBoardSize = 0;
var gSelectedElCell = null;
var gMinePos;
var gNumOfMines = 0;
var gStartTime;
var gScore;
var gNumOfNeighbors;
var gGameInterval;

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    timer: 0,
}

const gLevel = {
    SIZE: gBoardSize,
    MINES: gNumOfMines,
}

function initGame() {
    gGame.isOn = false

    var board = document.querySelector('.board')
    board.classList.remove('game-over')

    gBoardSize = +document.querySelector('input:checked').value

    gBoard = buildBoard()

    renderBoard(gBoard)
    gGame.timer = 0

    if (gGameInterval) clearInterval(gGameInterval)

    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerText = SMILEY

    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time'
}

function buildBoard() {
    var board = []

    board = createMat(gBoardSize)

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {

            board[i][j] = createCell()
        }
    }
    return board
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]

            var cellClass = getClassName({ i, j })

            strHTML += `\t<td data-i="${i}" data-j="${j}" class="cell ${cellClass}"
              onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="return handleFlags(this, ${i}, ${j})" >\n`;
            strHTML += '\t</td>\n';

        }
        strHTML += '</tr>\n';
    }
    elBoard.innerHTML = strHTML;
    console.log(board);
}

function cellClicked(gSelectedElCell, i, j) {

    if (!gGame.isOn) {

        // gBoardSize = +document.querySelector('input:checked').mine

        switch (gBoardSize) {
            case 4:
                gNumOfMines = 2
                break;
            case 8:
                gNumOfMines = 12
                break;
            case 12:
                gNumOfMines = 30
                break;
            default:
                console.log("issue");
                break;
        }

        var k = 0
        while (k < gNumOfMines) {
            gMinePos = addMinePos()
            gBoard[gMinePos.i][gMinePos.j].isMine = true;
            k++;
        }
        console.log(gBoard);

        gGame.isOn = true

        gStartTime = new Date().getTime()
        gGameInterval = setInterval(timer, 31)
    }

    const cell = gBoard[i][j]

    if (!cell.isShown) {
        cell.isShown === true
        gSelectedElCell.classList.add('selected')

        var mineNeighborCount = countNeighbors(i, j, gBoard)
        gSelectedElCell.innerText = mineNeighborCount
        cell.minesAroundCount = mineNeighborCount
    }

    if (cell.isMine) {
        debugger
        gSelectedElCell.innerText = MINE
        var board = document.querySelector('.board')
        board.classList.add('game-over')

        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerText = LOSE

        clearInterval(gGameInterval)
        gGame.isOn = false

    }

    // if (cell.minesAroundCount === 0) {
    //     var res = expandshown(i, j, gBoard)
    // }
}

// function expandshown(cellI, cellJ, board) {

//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;

//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {

//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= board[i].length) continue;

//             board[i][j].isShown = true
//             if (!board[i][j].isMine) board[i][j].classList.add('selected')
//         }
//     } 
// }

function countNeighbors(cellI, cellJ, board) {
    var mineNeighborCount = 0;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;

            if (board[i][j].isMine) mineNeighborCount++;
        }
    }
    return mineNeighborCount;
}

// function checkVictory(gBoard) {

// }




