'use strict'

function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function createCell() {
    var cell = {
        minesAroundCount: 0,
        isShown: true,
        isMine: false,
        isMarked: false,
    }
    return cell
}

function timer() {
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