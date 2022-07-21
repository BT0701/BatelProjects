'use strict'

const MINE = '💣'
const SMILEY = '🙂'
const LOSE = '🤯'
const WIN = '😎'

var gBoard;
var gSelectedElCell = null;
var gMinePos;
var gStartTime;
var gScore;
var gNumOfNeighbors;

const gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    timer: 0,
}
console.log(gGame);

function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
    gGame.timer = 0

    var elSmiley = document.querySelector('.smiley')
    elSmiley.innerText = SMILEY

    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time'
}

function buildBoard() {
    var board = []

    board = createMat(4, 4)
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
    gGame.isOn = true
    var elBoard = document.querySelector('.board');
    var strHTML = ''

    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'

        for (var j = 0; j < board[i].length; j++) {
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
    gGame.isOn = true

    if (gGame.timer === 0) {
        gStartTime = new Date().getTime()
        gGame.timer = setInterval(timer, 31)
    }

    const cell = gBoard[i][j]

    if (cell.isShown) {
        gSelectedElCell.classList.add('selected')

        var mineNeighborCount = countNeighbors(i, j, gBoard)
        gSelectedElCell.innerText = mineNeighborCount
        cell.minesAroundCount = mineNeighborCount
    }

    if (cell.isMine) {
        gSelectedElCell.innerText = MINE

        var elSmiley = document.querySelector('.smiley')
        elSmiley.innerText = LOSE

        clearInterval(gGame.timer)
    }

    // if (cell.minesAroundCount === 0) {
    //     expandshown(gNumOfNeighbors, i, j)
    // }
}

// function expandshown(gNumOfNeighbors, i, j) {
//     var cell = gNumOfNeighbors.dataset.i
//     console.log(cell);
// }

function countNeighbors(cellI, cellJ, board) {
    var mineNeighborCount = 0;
    gNumOfNeighbors = [];

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= board.length) continue;

        for (var j = cellJ - 1; j <= cellJ + 1; j++) {

            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= board[i].length) continue;
            gNumOfNeighbors.push({ i, j })

            if (board[i][j].isMine) mineNeighborCount++;
        }
    }
    console.log(gNumOfNeighbors);
    console.log(mineNeighborCount);
    return mineNeighborCount;
}

function checkVictory(gBoard) {

}