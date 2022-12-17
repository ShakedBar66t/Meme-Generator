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

function changeStrokeColor(el) {
    let color = el.value
    let lineArray = getTextLines()
    lineArray.forEach(element => element.strokeStyle = color)
    renderMeme()
}

function increaseSize() {
    let lineArray = getTextLines()
    lineArray.forEach(element => element.size = element.size + 5)
    // renderMeme()
}

function decreaseSize() {
    let lineArray = getTextLines()
    lineArray.forEach(element => element.fontSize = element.fontSize - 5)
    renderMeme()
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

function onClickCanvas(ev) {
    const pos = getEvPos(ev)
    var meme = getMeme()
    if (meme.lines.length === 1 && meme.lines[0].text === '') return
    var lineClick = isLineClick(ev)
    if (lineClick) {
        const idxLine = meme.lines.findIndex(line =>
            line === lineClick
        )
        if (lineClick.text === 'TOP TEXT' && lineClick.id === 0) {
            document.querySelector('.text-line').value = ''
        } else document.querySelector('.text-line').value = lineClick.text
        renderCanvas()
        drawRect(lineClick)
        meme.selectedLineIdx = idxLine
    } else {
        if (isCircleClicked(pos)) renderCanvas
    }
}

function addMouseListeners() {
    gElCanvas.addEventListener('click', onClickCanvas);
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(pos) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function onDown(ev) {
    var meme = getMeme()
    const pos = getEvPos(ev)
    var lineClick = isLineClick(ev)
    if (isCircleClicked(pos)) {
        setCircleDrag(true)
        gStartPos = pos
        document.body.style.cursor = 'nw-resize'
    } else {
        if (!lineClick || meme.selectedLineIdx !== lineClick.id) return
        setLineDrag(true)
        document.body.style.cursor = 'grabbing'
        gStartPos = pos
    }
}

function onMove(ev) {
    const memeLine = getMeme().lines[getMeme().selectedLineIdx]
    const pos = getEvPos(ev)
    if (isCircleClicked(pos)) {
        const circle = getGCircle()
        var isCircleDrag = getGIsCircleDrag()
        if (isCircleDrag) {
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            gStartPos = pos
            renderCanvas()
            drawRect(memeLine)
        } else {
            document.body.style.cursor = 'nw-resize'
        }
    } else if (memeLine.isDrag) {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(memeLine, dx, dy)
        gStartPos = pos
        renderCanvas()
        drawRect(memeLine)
    } else if (isLineClick(ev)) {
        document.body.style.cursor = 'grab'
    }
}

function moveLine(memeLine, dx, dy) {
    memeLine.x += dx
    memeLine.y += dy
    memeLine.rectSize.pos.x += dx
    memeLine.rectSize.pos.y += dy
}

function onUp(ev) {
    onClickCanvas(ev)
    setLineDrag(false)
    const pos = getEvPos(ev)
    document.body.style.cursor = 'unset'
}

function isLineClick(ev) {
    var meme = getMeme()
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offSetTop - ev.target.clientTop
        }
    }
    return meme.lines.find(line =>
        pos.x > line.rectSize.pos.x &&
        pos.x < (line.rectSize.pos.x + line.rectSize.width) &&
        pos.y > line.rectSize.pos.y &&
        pos.y < (line.rectSize.pos.y + line.rectSize.height)
    )
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
