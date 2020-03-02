// Constants.
const WEBCAM_WIDTH = 1920;
const WEBCAM_HEIGHT = 1080;
const JPEG_QUALITY = 100;
const AFTER_SCREAMER_TIMER = 5000;

// Variables.
let videoName = "screamer1";
let screamerTimer = 10;
// DOM Elements.
let btnStart = document.getElementById("btn-start");
let video = document.getElementById("main-video");
let snapshotResult = document.getElementById("snapshot-result")
let gallery = document.getElementById("light-gallery");
let videoSource = document.getElementById("main-video-source");
let webcamResult = document.getElementById('webcam-result');
let filenameArray = [];

$(document).ready(function(e){
    // Initialisations.
    $.ajaxSetup({ cache:false });
    initWebcam();
    getInformationsFromJSON();
    // Events listener.
    btnStart.addEventListener("click", onBtnStartClickListener);
});

function onBtnStartClickListener(e)
{
    $('#home-first-row').hide();
    $('#video-container').show();
    videoSource.src = videoName;
    video.load();
    $("#main-video").fadeTo( "slow" , 1, function() {
        video.play();
    });
    console.log(screamerTimer);
    $("body").animate({
       backgroundColor: 'black'
    }, stringToMS(screamerTimer) / 8);
    $('#btn-start').hide();
    $('#subtitle').hide();
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

function startScreamerTimer()
{
    window.setTimeout(function(){
        takePicture();
    }, stringToMS(screamerTimer));
}

// Source : https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/
function takePicture()
{
    Webcam.snap( function(data_uri) {
        $('#snapshot-result').css('background-image', 'url(\'' + data_uri + '\')');
        //snapshotResult.src = data_uri;
        savePicture(data_uri);
    });

    window.setTimeout(function(){
        displaySnapshot();
    }, AFTER_SCREAMER_TIMER);
}

function displaySnapshot()
{
    $("#main-video").fadeTo( "slow" , 1, function() {
        $('body').css('background-color', 'white');
        $('#home-first-row').show();
        $('#main-title').hide();
        $('#mystery-box').hide();
        $('#subtitle').css('margin-bottom', '25px');
        $('#subtitle').css('margin-top', '100px');
        $('#subtitle').text("Wow vous avez vraiment eu la trouille ...");
        $('#subtitle').show();
        $('#btn-start').hide();
        $('#main-video').hide();
        $('#btn-home').show();
        $('#snapshot-result').show();
        $('#snapshot-result').css('display', 'block');
        $('#btn-home').css('display', 'block');
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