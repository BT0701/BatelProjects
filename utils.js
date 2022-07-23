'use strict'

function createMat(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        var row = []
        for (var j = 0; j < size; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
    }
    return cell
}

function timer() {
    console.log(gStartTime);
    var currTime = new Date().getTime()
    var timePassed = new Date(currTime - gStartTime)
    var elTimer = document.querySelector('.timer')
    var mins = timePassed.getMinutes() < 10 ? '0' : ''
    var secs = timePassed.getSeconds() < 10 ? '0' : ''

    elTimer.innerText = `${mins + timePassed.getMinutes()}:${secs + timePassed.getSeconds()}`
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function addMinePos() {
    var emptyCells = getEmptyCells()
    return emptyCells
}

function getEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) emptyCells.push({ i, j })
        }
    }

    const idx = getRandomInt(0, emptyCells.length)
    return emptyCells[idx]
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


