'use strict'

const elGallery = document.querySelector('.gallery')
let gImages = []
let gKeyWords = []
let gCurrImageId

function getElGallery() {
    return elGallery
}

function getGImages() {
    return gImages
}

function getKeyWords() {
    return gKeyWords
}


function createImages(url, keywords) {
    return {
        url: url,
        id: makeId(4),
        tags: keywords,
    }
}

function pushImages() {
    gImages.push(createImages("img/meme-imgs (square)/1.jpg", ['trump', 'celeb', 'politics', 'angry', 'טראמפ', 'כועס', 'פוליטיקה']));
    gImages.push(createImages("img/meme-imgs (square)/2.jpg", ['dog', 'cute', 'animal', 'כלב', 'חמוד', 'חיות']));
    gImages.push(createImages("img/meme-imgs (square)/3.jpg", ['cute', 'tierd', , 'animal', 'baby', 'dog', 'חמוד', 'עייף', 'חיות', 'תינוק', 'כלב']));
    gImages.push(createImages("img/meme-imgs (square)/4.jpg", ['cat', 'tierd', 'animal', 'cute', 'חתול', 'עייף', 'חיות', 'חמוד']));
    gImages.push(createImages("img/meme-imgs (square)/5.jpg", ['sucsses', 'baby', 'cute', 'הצלחה', 'תינוק', 'חמוד']));
    gImages.push(createImages("img/meme-imgs (square)/6.jpg", ['aliens', 'history', 'chanel', 'guy', 'חייזרים', 'היסטוריה', 'ערוץ', 'בחור']));
    gImages.push(createImages("img/meme-imgs (square)/7.jpg", ['baby', 'supriesed', 'funny', 'cute', 'תינוק', 'מופתע', 'מצחיק', 'חמוד']));
    gImages.push(createImages("img/meme-imgs (square)/8.jpg", ['tell', 'about', 'willi', 'wonka', 'ספר', 'על  זה', 'וילי', 'וונקה']));
    gImages.push(createImages("img/meme-imgs (square)/9.jpg", ['evil', 'laugh', 'baby', 'cute', 'רשע', 'צחוק', 'תינוק', 'חמוד']));
    gImages.push(createImages("img/meme-imgs (square)/10.jpg", ['presidant', 'Obama', 'laugh', 'smile', 'נשיא', 'אובמה', 'צחוק', 'חיוך']));
    gImages.push(createImages("img/meme-imgs (square)/11.jpg", ['kiss', 'men', 'basketball', 'נשיקה', 'גברים', 'כדורסל']));
    gImages.push(createImages("img/meme-imgs (square)/12.jpg", ['Haim', 'Hacht', 'finger', 'point', 'חיים', 'הכט', 'אצבע', 'מצביע']));
    gImages.push(createImages("img/meme-imgs (square)/13.jpg", ['Leo', 'Decaprio', 'cheers', 'smile', 'לאונרדו', 'דיקאפריו', 'לחיים', 'חיוך']));
    gImages.push(createImages("img/meme-imgs (square)/14.jpg", ['Murphius', 'Matrix', 'sunglasses', 'מורפיוס', 'מטריקס', 'משקפי שמש']));
    gImages.push(createImages("img/meme-imgs (square)/15.jpg", ['LOTR', 'Mordor', 'man', 'שר הטבעות', 'מורדור', 'גבר']));
    gImages.push(createImages("img/meme-imgs (square)/16.jpg", ['StarTrack', 'man', 'smile', 'מסע בכוכבים', 'איש', 'חיוך']));
    gImages.push(createImages("img/meme-imgs (square)/17.jpg", ['Putin', 'Suit', 'Two', 'פוטין', 'שתי', 'חליפה']));
    gImages.push(createImages("img/meme-imgs (square)/18.jpg", ['Toystory', 'Buzz', 'Woddy', 'Everywhere', 'צעצוע של סיפור', 'באז', 'וודי', 'כל מקום']));
}

function createKeyWordsBank() {
    let arr = []
    for (let i = 0; i < gImages.length; i++) {
        arr.push([gImages[i]["tags"]])
    }
    Array.prototype.push.apply(gKeyWords, arr.flat(2))
}

function setImage(imgId){
    gCurrImageId = imgId
}

function getCurrentImage(){
    return gImages.find(image => image.id === gCurrImageId)
}

function getCurrImageId(){
    return gCurrImageId
}
