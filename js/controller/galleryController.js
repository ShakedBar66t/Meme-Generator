'use strict'

function onInitGallery() {
    pushImages()
    // createKeyWordsBank()
    renderGallery(getGImages())
}

function renderGallery() {
    const elImgContainer = document.querySelector('.gallery')
    const images = getGImages()
    var strHTMLs = images.map(image => {
        return `<img class="img-gallery img-${makeId(3)}" id="${image.id}" src="${image.url}" onclick="onSetImage('${image.id}')">`
    });
    elImgContainer.innerHTML = strHTMLs.join('')
}

function onSetImage(imgId) {
    console.log(imgId, 'From controller');
    setImage(imgId)
    createGMeme()
    renderCanvas()
    showEditor()
}
