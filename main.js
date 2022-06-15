var gCanvas;
var gCtx;
var gCurrShape = 'shape1';
var color;
var gStartPosx
var gStartPosy
var gShapeSize = 30;


color = document.querySelector(".shapeColor").value


gCanvas = document.getElementById('my-canvas');
gCtx = gCanvas.getContext('2d');




function init() {

    rendImg()
    setTimeout(render, 5)

}


function moveDown() {
    var lastIdx = gEditedMem.line.length - 1
    gEditedMem.line[lastIdx].locationY += 50
    clearCanvas()
    rendImg()
    setTimeout(render, 5)
}

function moveUp() {
    var lastIdx = gEditedMem.line.length - 1
    gEditedMem.line[lastIdx].locationY -= 50
    clearCanvas()
    rendImg()
    setTimeout(render, 5)
}

function fontIncarseSize() {
    var lastIdx = gEditedMem.line.length - 1
    gEditedMem.line[lastIdx].size += 5
    clearCanvas()
    rendImg()
    setTimeout(render, 5)

}

function fontDecraseSize() {
    var lastIdx = gEditedMem.line.length - 1
    gEditedMem.line[lastIdx].size -= 5
    clearCanvas()
    rendImg()
    setTimeout(render, 5)

}

function changeColor(value) {
    var lastIdx = gEditedMem.line.length - 1
    gEditedMem.line[lastIdx].color = value
    clearCanvas()
    rendImg()
    setTimeout(render, 5)
}


function remove() {
    var lastIdx = gEditedMem.line.length - 1
    gEditedMem.line.splice(lastIdx, 1);

    clearCanvas()
    rendImg()
    setTimeout(render, 500)

}

function onSetSettings(ev) {
    ev.preventDefault()

    text = document.querySelector('[name=text]').value

    var obj = {
        txt: text,
        size: 20,
        align: 'left',
        color: 'red',
        locationY: 60
    }

    // save lines to obj


    gEditedMem.line.push(obj)
    // console.log(gEditedMem)

    //render
    clearCanvas()
    rendImg()
    setTimeout(render, 500)
}


function rendImg() {
    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize;
    image.src = 'img/1.jpg';

}

function render() {

    for (i = 0; i < gEditedMem.line.length; i++) {
        var txt = gEditedMem.line[i].txt
        var locationY = gEditedMem.line[i].locationY
        var fontSize = gEditedMem.line[i].size
        var memColor = gEditedMem.line[i].color

        // if (i === 0) 
        addLine(locationY, txt, fontSize, memColor)
        // else if (i === 1) addLine(gCanvas.height, txt)
        // else if (i === 2) addLine(gCanvas.height / 2, txt)
        // else addLine(60, txt)

    }

}


function addLine(y, txt, fontSize, memColor) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = "black";
    gCtx.fillStyle = memColor;

    gCtx.font = `${fontSize}px Impact`

    var pos = gCanvas.width - (txt.length * 20)
    var posy = y - 15

    gCtx.fillText(txt, pos, posy);
    gCtx.strokeText(txt, pos, posy);
    // drawRect(y, color)
}

function drawRect(y, color) {
    gCtx.beginPath();
    gCtx.rect(0, y, gCanvas.width, -60);
    gCtx.strokeStyle = color;
    gCtx.stroke();
    gCtx.save()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gShapeSize = 30;

}

function draw(ev) {

    var x = ev.offsetX
    var y = ev.offsetY


    drawRec(150, 50)
}



function renderImg(img) {
    //Draw the img on the canvas

    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}


function drawImageActualSize() {
    gCanvas.width = this.naturalWidth;
    gCanvas.height = this.naturalHeight;
    gCtx.drawImage(this, 0, 0);
    gCtx.drawImage(this, 0, 0, this.width, this.height);
}


// function onMove(ev) {
//     var gEndPosx = ev.offsetX
//     var gEndPosy = ev.offsetY
//     drawRect(gEndPosx, gEndPosy, color)
// }






































function uploadImg() {
    const imgDataUrl = gCanvas.toDataURL("image/jpeg");// Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        //Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl);
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`
        //Create a link that on click will make a post in facebook with the image we uploaded
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    //Send the image to the server
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
    //Pack the image for delivery
    const formData = new FormData();
    formData.append('img', imgDataUrl)
    //Send a post req with the image to the server
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })   //Gets the result and extract the text/ url from it
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            //Pass the url we got to the callBack func onSuccess, that will create the link to facebook
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}