// Constants.
const WEBCAM_WIDTH = 1920;
const WEBCAM_HEIGHT = 1080;
const JPEG_QUALITY = 100;
const videoName = "video1";
const GALERY_MINIATURE_HEIGHT = 180;
const GALERY_MINIATURE_WIDTH = 180;
// Variables.
let isFrozen = false;
// DOM Elements.
let btnStart = document.getElementById("btn-start");
let btnPause = document.getElementById("btn-pause");
let btnFreeze = document.getElementById("btn-freeze");
let video = document.getElementById("main-video");
let webcamResult = document.getElementById("webcam-result");
let snapshotResult = document.getElementById("snapshot-result");
let gallery = document.getElementById("lightgallery");
let filename_array = [];

$(document).ready(function(e){
    // Initialisations.
    getImagesFilenames();
    getVideoTimerFromJSON();
    // Events listener.
    btnStart.addEventListener("click", onBtnStartClickListener);
    btnPause.addEventListener("click", onBtnPauseClickListener);
    btnFreeze.addEventListener("click", onBtnFreezeClickListener);
});

function onBtnStartClickListener(e)
{
    video.play();
    this.hidden = true;
    btnPause.hidden = false;
    startScreamerTimer();
}

function onBtnPauseClickListener(e)
{
    video.pause();
    this.hidden = true;
    btnStart.innerHTML = "Reprendre la vidéo";
    btnStart.hidden = false;
}

function onBtnFreezeClickListener(e)
{
    (isFrozen) ? Webcam.unfreeze() : Webcam.freeze();
    (isFrozen) ? btnFreeze.innerText = "Freeze" : btnFreeze.innerText = "Unfreeze";
    isFrozen = !isFrozen;
}

// Webcam configuration.
// Doc : https://github.com/jhuckaby/webcamjs/blob/master/DOCS.md
function initWebcam()
{
    Webcam.set({
        width: WEBCAM_WIDTH,
        height: WEBCAM_HEIGHT,
        image_format: 'jpeg',
        jpeg_quality: JPEG_QUALITY
    });
    Webcam.attach(webcamResult);

    Webcam.on('error', function(e){
        console.log("Error with the webcam : " + e);
    });
}

// Get the screamer timer from the current video. Looking into the timer.json file.
function getVideoTimerFromJSON()
{
    $.getJSON("timer.json", function(data){
        $.each(data, function(key, value){
            if(key === videoName)
            {
                return value;
            }
        });
    });
    return 0;
}

// Explore the folder with the webcam's images.
function getImagesFilenames()
{
    $.ajax({
        type: "POST",
        contentType: "json",
        url: 'php/get_images_filenames.php',
        success: function (json_data) {
            filename_array = JSON.parse(json_data);
            refreshGallery();
        },
        error: function(error) {
            console.log("ERROR get_image_filenames.php : " + error);
        }
    });
}

function startScreamerTimer()
{
    window.setTimeout(function(){
        takePicture();
    }, stringToMS(getVideoTimerFromJSON()));
}

function refreshGallery()
{
    // Delete all the nodes of the gallery.
    gallery.childNodes = new Array();

    for(let i = 0; i < filename_array.length; i++)
    {
        let imageSrc = "images/webcam/" + filename_array[i];
        let imageLinkDOM = document.createElement("a");
        let imageDOM = document.createElement("img");

        imageLinkDOM.href = imageSrc;
        imageDOM.src = imageSrc;
        imageDOM.height = 250;
        imageDOM.width=250;

        imageLinkDOM.append(imageDOM);
        gallery.append(imageLinkDOM);
    }

    $('#lightgallery').lightGallery();
}

// Source : https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/
function takePicture()
{
    console.log("Picture taken !");
    Webcam.snap( function(data_uri) {
        console.log(data_uri);
        snapshotResult.src = data_uri;
        savePicture(data_uri);
    });
}

function stringToMS(timer)
{
    let res = timer.split(":");
    let total = 0;
    total += parseInt(res[0]) * 60;
    total += parseInt(res[1]);


    console.log("TOTAL : " + total);
    return total * 1000;
}

function savePicture(data)
{
    $.ajax({
        type: "POST",
        url: 'php/upload_webcam.php',
        data: {
            'image': data.toString()
        },
        success: function (data) {
            console.log("upload terminé!" + data);
        }
    });
}