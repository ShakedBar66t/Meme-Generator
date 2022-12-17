'use strict'

var gCurrLang = 'en'

var gTrans = {
    'gallery': {
        en: 'Gallery',
        he: 'גלריה'
    },
    'memes': {
        en: 'Memes',
        he: 'מימים'
    },
    'about':{
        en: 'About',
        he: 'אודות'
    },
    'font-input':{
        en: 'font',
        he: 'פונט'
    },
    'lineText':{
        en: 'Enter Text Here',
        he: 'הכנס טקסט'
    },
    'save': {
        en: 'Save',
        he: 'שמור'
    },
    'download':{
        en: 'Download',
        he: 'הורדה'
    },
    'share': {
        en: 'Share',
        he: 'שיתוף'
    }

}

function setLang(lang) {
    gCurrLang = lang
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        el.innerText = translation
    })
}

function getTrans(transKey) {
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'
    var translation = key[gCurrLang]
    if (!translation) translation = key.en
    return translation
}