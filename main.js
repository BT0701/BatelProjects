'use strict'

const MINE = '💣'
const SMILEY = '🙂'
const LOSE = '🤯'
const WIN = '😎'
const FLAG = '📌'

var gBoard;
var gBoardSize;
var gSelectedElCell = null;
var gMinePos;
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
    MINES: 2,
}
console.log(gLevel.SIZE);

function initGame() {
    gGame.isOn = false
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
            if (i === 1 && j === 2) {
                board[i][j].isMine = true
                board[i][j].isShown = false
            }
            if (i === 3 && j === 0) {
                board[i][j].isMine = true
                board[i][j].isShown = false
            }
        }
    }
    console.log(board);
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
              onclick="cellClicked(this, ${i}, ${j})" >\n`;
            strHTML += '\t</td>\n';

        }
        strHTML += '</tr>\n';
    }
    elBoard.innerHTML = strHTML;
}

function cellClicked(gSelectedElCell, i, j) {

    if (!gGame.isOn) {
        gGame.isOn = true

        //gMinePos after first click
        // drawMine()

        gStartTime = new Date().getTime()
        gGameInterval = setInterval(timer, 31)
    }

    const cell = gBoard[i][j]

    if (!cell.isShown) {
        cell.isShown = true
        gSelectedElCell.classList.add('selected')

        var mineNeighborCount = countNeighbors(i, j, gBoard)
        gSelectedElCell.innerText = mineNeighborCount
        cell.minesAroundCount = mineNeighborCount
    }

    if (cell.isMine) {
        gSelectedElCell.innerText = MINE

        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerText = LOSE

        clearInterval(gGameInterval)
        gGame.isOn = false
    }

    // if (cell.minesAroundCount === 0) {
    //     var res = expandshown(i, j, gBoard)
    // }
}

//not working yet

// function expandshown(cellI, cellJ, board) {

//     for (var i = cellI - 1; i <= cellI + 1; i++) {
//         if (i < 0 || i >= board.length) continue;

//         for (var j = cellJ - 1; j <= cellJ + 1; j++) {

//             if (i === cellI && j === cellJ) continue;
//             if (j < 0 || j >= board[i].length) continue;

//             board[i][j].isShown = true
//             gSelectedElCell.classList.add('selected')
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

function checkVictory(gBoard) {

}

