'use strict'

let gElCanvas = document.getElementById('canvas')
let gCtx
let gTopText
let gBottomText

function createMeme() {
    return gMeme = {
        img: '',
        topText: createGTopText(),
        bottomText: createGBottomText()
    }
}

function createGTopText(){
    gTextLines.push(gTopText = {
        textBaserLine: 'middle',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'impact',
        strokeStyle: 'black',
        fillStyle: 'white',
        strokeText: 'TOP TEXT',
        x: 220,
        y: 30,
        fillText: 'TOP TEXT'
    })
}

function createGBottomText(){
    gTextLines.push(gBottomText = {
        textBaserLine: 'middle',
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'impact',
        strokeStyle: 'black',
        fillStyle: 'white',
        strokeText: 'BOTTOM TEXT',
        x: 220,
        y: 440,
        fillText: 'BOTTOM TEXT'
    })
}


function init() {
    gElCanvas = document.getElementById('canvas')
    // console.log(gElCanvas);
    gCtx = gElCanvas.getContext('2d')
    // console.log(gCtx);
    renderImg()

}
function drawImg(selectedImg) {
    console.log(selectedImg);
    createMeme()
    getMeme().img = selectedImg
    // console.log(selectedImg);
    renderMeme()
    showEditor()
}

function renderMeme() {
    renderImg()
    renderText()
    // console.log(gMeme);
}

function renderImg() {
    let img = getSelectedImg()
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}



function renderText() {
    let lineArray = getTextLines()
    for (let i = 0; i < lineArray.length; i++) {
        let text = lineArray[i]
        gCtx.textBaseline = text.textBaseline
        gCtx.textAlign = text.textAlign
        gCtx.font = `${text.fontSize}px ${text.fontFamily}`
        gCtx.strokeStyle = text.strokeStyle
        gCtx.fillStyle = text.fillStyle
        gCtx.strokeText(text.strokeText, text.x, text.y)
        gCtx.fillText(text.strokeText, text.x, text.y)
    }
    return gCtx
}

function createTopText() {

}

function createBottomText() {

}



function showEditor() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor-container')
    // console.log(elEditor);
    elEditor.classList.remove('hidden')
}

