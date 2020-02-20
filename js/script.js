// Constants.
const WEBCAM_WIDTH = 1920;
const WEBCAM_HEIGHT = 1080;
const JPEG_QUALITY = 100;
const GALLERY_MINIATURE_HEIGHT = 180;
const GALLERY_MINIATURE_WIDTH = 180;
const VIDEO_HEIGHT = 768;
const AFTER_SCREAMER_TIMER = 2000;

// Variables.
let videoName = "";
let screamerTimer = 0;
// DOM Elements.
let btnStart = document.getElementById("btn-start");
let btnDisplayGallery = document.getElementById("btn-display-gallery");
let btnEdit = document.getElementById('btn-edit');
let video = document.getElementById("main-video");
let snapshotResult = document.getElementById("snapshot-result")
let webcamResult = document.getElementById("webcam-result");
let gallery = document.getElementById("light-gallery");
let videoSource = document.getElementById("main-video-source");
let videoContainer = document.getElementById('video-container');
let filenameArray = [];

$(document).ready(function(e){
    // Initialisations.
    initWebcam();
    getImagesFilenames();
    getInformationsFromJSON();
    // Events listener.
    btnStart.addEventListener("click", onBtnStartClickListener);
});

function onBtnStartClickListener(e)
{
    $('#video-container').show();
    videoSource.src = "video/" + videoName + ".mp4";
    video.load();
    $("#main-video").fadeTo( "slow" , 1, function() {
        video.play();
    });
    this.hidden = true;
    startScreamerTimer();
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
function getInformationsFromJSON()
{
    jQuery.getJSON("timer.json", function(data){
        videoName = data["selected"];
        jQuery.each(data["videos"], function(key, value){
            if(key === videoName)
            {
                screamerTimer = value;
            }
        });
    });
}

// Explore the folder with the webcam images.
function getImagesFilenames()
{
    filenameArray = null;
    jQuery.ajax({
        type: "POST",
        contentType: "JSON",
        url: "php/get_images_filenames.php"
    }).done(function(jsonData){
        filenameArray = JSON.parse(jsonData);
        console.log("FilenameArray ; ");
        console.log(filenameArray);
        refreshGallery();
    }).fail(function(error){
        console.log("ERROR get_image_filenames.php : " + error);
    });
}

function startScreamerTimer()
{
    window.setTimeout(function(){
        takePicture();
    }, stringToMS(screamerTimer));
}

function refreshGallery()
{
    // Delete all the nodes of the gallery.
    while(gallery.childNodes.length > 0)
    {
        gallery.childNodes[gallery.childNodes.length - 1].remove();
    }

    for(let i = 0; i < filenameArray.length; i++)
    {
        let imageSrc = "images/webcam/" + filenameArray[i];
        let imageContainerDOM = document.createElement("div");
        imageContainerDOM.className += "image-container";
        let imageLinkDOM = document.createElement("a");
        let imageDOM = document.createElement("img");


        imageLinkDOM.href = imageSrc;
        imageDOM.src = imageSrc;
        imageDOM.height = GALLERY_MINIATURE_HEIGHT;
        imageDOM.width=GALLERY_MINIATURE_WIDTH;

        imageContainerDOM.setAttribute("data-src", imageSrc);


        imageLinkDOM.append(imageDOM);
        imageContainerDOM.append(imageLinkDOM);

        gallery.append(imageContainerDOM);

    }

    $('#light-gallery').lightGallery();
}

// Source : https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/
function takePicture()
{
    Webcam.snap( function(data_uri) {
        console.log(data_uri);
        snapshotResult.src = data_uri;
        savePicture(data_uri);
    });

    window.setTimeout(function(){
        displaySnapshot();
    }, AFTER_SCREAMER_TIMER);
}

function displaySnapshot()
{
    // @TODO Display the real snapshot.
    $("#main-video").fadeTo( "slow" , 0, function() {
        $('#btn-start').hide();
        $('#main-video').hide();
        $('#btn-display-gallery').show();
        $('#btn-home').show();
        $('#snapshot-result').show();
    });
}

// Format : m:s
function stringToMS(timer)
{
    let res = timer.split(":");
    let total = 0;
    total += parseInt(res[0]) * 60;
    total += parseInt(res[1]);

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
            filenameArray.push(data);
        },
        error: function(error){
            console.log("error while uploading your image." + error);
        }
    });
}