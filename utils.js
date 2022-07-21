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

//not working yet
// function drawMine() {
//     var randIdx = getRandomInt(0, gBoard.length - 1)
//     var res = gMinePos[randIdx]
//     gMinePos.splice(randIdx, 1)
//     return res
// }