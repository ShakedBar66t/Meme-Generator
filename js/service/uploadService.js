'use strict'

function doUploadImg(memeDataUrl, onSuccess){
    const formData = new FormData()
    formData.append('img', memeDataUrl)
    fetch('//ca-upload.com/here/upload.php', {method: 'POST', body: formData})
    .then(res => res.text())
    .then(url => {
        onSuccess(url)
    })
}
