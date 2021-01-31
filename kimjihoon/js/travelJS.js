function chgUrl(imgNum) {
    var urlChg = document.getElementById("light");
    switch(imgNum){
        case 1 : urlChg.style.backgroundImage = "url('../image/2.jpg')"; break;
        case 2 : urlChg.style.backgroundImage = "url('../image/1.jpg')"; break;
        case 3 : urlChg.style.backgroundImage = "url('../image/3.jpg')"; break;
        case 4 : urlChg.style.backgroundImage = "url('../image/4.jpg')"; break;
        case 5 : urlChg.style.backgroundImage = "url('../image/5.jpg')";
    }
}

function layerOpen() {
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
}

function layerClose() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none'
}