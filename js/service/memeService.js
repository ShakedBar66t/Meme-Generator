'use strict'
var gMeme
var gSizeFont = setSizeOfFont()
var gCurrLineIdx = 0
var gCircle
var gIsCircleDrag

function createGMeme() {
    const elImg = getCurrentImage()
    setSizeOfFont(450)
    // const currImage = getIma
    gMeme = {
        selectedImgId: gCurrImageId ,
        selectedLineIdx: 0,
        lines: [{
            id: makeId(3),
            text: 'TOP TEXT',
            size: gSizeFont,
            fontFamily: 'impact',
            align: 'center',
            color: 'white',
            colorStroke: 'black',
            isSticker: false,
            x: 225,
            y: 50,
            rectSize: {
                pos: { x: 0, y: 50 - gSizeFont },
                height: 65,
                width: 410
            },
            isDrag: false
        },{
            id: makeId(3),
            text: 'BOTTOM TEXT',
            size: gSizeFont,
            fontFamily: 'impact',
            align: 'center',
            color: 'white',
            colorStroke: 'black',
            isSticker: false,
            x: 225,
            y: 400,
            rectSize: {
                pos: { x: 0, y: 50 - gSizeFont },
                height: 65,
                width: 410
            },
            isDrag: false
        }],
    }
}


function setSizeOfFont(canvasWidth) {
    if (canvasWidth > 400) gSizeFont = 50;
    if (canvasWidth > 350) gSizeFont = 45;
    else if (canvasWidth > 300) gSizeFont = 40;
    else gSizeFont = 35;
}

function setColor(colorInput){
    gMeme.lines[gCurrLineIdx].color = colorInput
}

function setStrokeColor(colorInput){
    gMeme.lines[gCurrLineIdx].colorStroke = colorInput
}

function switchLine(){
    gCurrLineIdx++
    if (gCurrLineIdx >= gMeme.lines.length) gCurrLineIdx = 0
    renderCanvas()
    drawRect(gMeme.lines[gCurrLineIdx])
    document.querySelector('.text-line').value = gMeme.lines[gCurrLineIdx].text;

}

function setFont(font){
    gMeme.lines[gCurrLineIdx].fontFamily = font
}

function changeSize(size){
    gMeme.lines[gCurrLineIdx].size += size
}

function addLine(){
    gMeme.lines.push(createLine())
}

// function saveMeme(){
//     gSavedMemes.push(gElCanvas.toDataURL())
//     saveToStorage(gSavedMemes, )
//     var shkong = document.querySelector('#shkood')
//     shkong.src = gSavedMemes[0]
// }

function downloadMeme(elLink){
    const data = gElCanvas.toDataURL()
    elLink.href = data
}

function uploadMeme(){
    const memeDataUrl = gElCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedMemeUrl) {
        const encodedUploadedMemeUrl = encodeURIComponent(uploadedMemeUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedMemeUrl}&t=${encodedUploadedMemeUrl}`)
    }
    doUploadImg(memeDataUrl, onSuccess)
}

function createLine(){
    return {
        id: makeId(3),
        text: 'NEW TEXT',
        size: gSizeFont,
        fontFamily: 'impact',
        align: 'center',
        color: 'white',
        colorStroke: 'black',
        isSticker: false,
        x: 225,
        y: 200,
        rectSize: {
            pos: { x: 0, y: 50 - gSizeFont },
            height: 65,
            width: 410
        },
        isDrag: false
    }
}

function addLineTogMeme(isEmptyLines) {
    if(isEmptyLines) gIdLine = 0;
    if (gMeme.lines.length === 1 && gMeme.lines[0].text === '') return;
    var elCanvas = getElCanvas();
    var yPos = (gMeme.lines.length === 1) ? elCanvas.height - 20 : elCanvas.height / 2;
    if (gMeme.lines.length === 0) yPos = 50;
    gMeme.lines.push({
        id: gCurrLineIdx++,
        text: '',
        size: gSizeFont,
        align: 'center',
        color: 'white',
        colorStroke: 'black',
        x: elCanvas.width / 2,
        y: yPos,
        rectSize: {
            pos: { x: 0, y: yPos - gSizeFont },
            height: 65,
            width: elCanvas.width - 40
        },
        isDrag: false,
        isSticker: false
    })
    if (!isEmptyLines) gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function setCurrTextLine(textInput){
    gMeme.lines[gCurrLineIdx].text = textInput
}



function getMeme() {
    return gMeme
}



function getTextLines() {
    return gMeme.lines
}

function getCircle(){
    return gCircle
}

function getGIsCircleDrag(){
    return gIsCircleDrag
}