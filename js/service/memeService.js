'use strict'

var gMeme
const gTextLines = []


function setTopLineTxt(textInput) {
    const topText = getTextLines()[0]
    topText.strokeText = textInput.value
    topText.fillText = textInput.valuer
    renderText()
    renderMeme()
}

function setBottomLineTxt(textInput) {
    const bottomText = getTextLines()[1]
    bottomText.strokeText = textInput.value
    bottomText.fillText = textInput.valuer
    renderText()
    renderMeme()
}



function getMeme() {
    return gMeme
}

function getElCanvas() {
    return gElCanvas
}

function getTextLines() {
    return gTextLines
}

function getSelectedImg() {
    return gMeme.img
}