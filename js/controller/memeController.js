'use strict'

let gElCanvas = document.getElementById('canvas')
let gCtx = gElCanvas.getContext('2d')
let gTopText
var gSavedMemes = []


const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];




function init() {
    gElCanvas = document.getElementById('canvas')
    // console.log(gElCanvas);
    // console.log(gCtx);
    renderCanvas()
    renderGallery(getGImages())
    saveToStorage(gSavedMemes, [])

}

function renderCanvas() {
    renderImgOnCanvas()
    renderTextOnCanvas()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetWidth;
    renderCanvas();
}

function renderImgOnCanvas() {
    const imgId = getCurrImageId()
    const elImg = document.getElementById(imgId)
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function renderTextOnCanvas() {
    const texts = getMeme().lines
    console.log(texts);
    texts.forEach(textLine => {
        gCtx.font = `${textLine.size}px ${textLine.fontFamily}`
        gCtx.strokeStyle = textLine.colorStroke
        gCtx.textAlign = textLine.align
        gCtx.fillStyle = textLine.color
        gCtx.fillText(textLine.text, textLine.x, textLine.y)
        gCtx.strokeText(textLine.text, textLine.x, textLine.y)
        if (textLine.isDrag) drawRect(textLine)
    })
}

function onSetCurrTextLine(textInput) {
    setCurrTextLine(textInput)
    renderCanvas()
}

function onSetFont(font) {
    setFont(font)
    renderCanvas()
}

function onSetColor(colorInput) {
    setColor(colorInput)
    renderCanvas()
}

function onSetStrokeColor(colorInput) {
    setStrokeColor(colorInput)
    renderCanvas()
}

function onChangeSize(size) {
    changeSize(size)
    renderCanvas()
}

function onMoveLine(amount){
    console.log(amount);
    moveLine(amount)
    renderCanvas()
}

function onSetTextAlign(align){
    setTextAlign(align)
    renderCanvas()    
}

function onDeleteLine(){
    deleteLine()
    renderCanvas()
}

function onSetLanguage(lang) {
    setLang(lang)
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else document.body.classList.remove('rtl')
    doTrans()

    const queryStringParams = `?lang=${gCurrLang}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onUploadMeme() {
    uploadMeme()
}

function onSaveMeme() {
    saveMeme()
}

function onDownloadMeme(elLink) {
    downloadMeme(elLink)
}



function openGallery() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.remove('hidden')
    const elEditor = document.querySelector('.editor-container')
    elEditor.classList.add('hidden')
}


function showEditor() {
    const elGallery = document.querySelector('.gallery')
    elGallery.classList.add('hidden')
    const elEditor = document.querySelector('.editor-container')
    // console.log(elEditor);
    elEditor.classList.remove('hidden')
}

function drawRect(textLine) {
    const { x, y, rectSize } = textLine
    const { width, height } = rectSize
    gCtx.beginPath()
    gCtx.rect(x - 200, y - 45, width, height)
    gCtx.fillStyle = '#aab5b83d'
    gCtx.fillRect(x - 200, y - 45, width, height)
    gCtx.strokeStyle = 'black';
    gCtx.stroke()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}
function onAddLine() {
    addLine()
    renderCanvas()
}

function getElCanvas() {
    return gElCanvas
}

function onSwitchLine() {
    switchLine()
}
