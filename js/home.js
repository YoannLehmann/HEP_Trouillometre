// Constants.
const WEBCAM_WIDTH = 1920; // in px.
const WEBCAM_HEIGHT = 1080; // in px.
const JPEG_QUALITY = 100; // in %.
const AFTER_SCREAMER_TIMER = 11000; // in ms.
const TIME_AFTER_SCREAMER = 0;
const TIME_AFTER_FIRST_SNAPSHOT = TIME_AFTER_SCREAMER + 1000; // in ms.
const TIME_AFTER_SECOND_SNAPSHOT = TIME_AFTER_FIRST_SNAPSHOT + 1000; // in ms.
const TIME_AFTER_THIRD_SNAPSHOT = TIME_AFTER_SECOND_SNAPSHOT + 1000; // in ms.

// Variables.
let videoName = "screamer1";
let screamerTimer = 10
let videoFileArray = [];
// DOM Elements.
let btnStart = document.getElementById("btn-start");
let video = document.getElementById("main-video");
let snapshotResult = document.getElementById("snapshot-result")
let gallery = document.getElementById("light-gallery");
let videoSource = document.getElementById("main-video-source");
let webcamResult = document.getElementById('webcam-result');
let filenameArray = [];

$(document).ready(function(e){
	$('button').hover(function(){
		$(this).addClass('hover');
	}, function(){
		$(this).removeClass('hover');
	});
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
        video.stop();
    }, stringToMS(screamerTimer));
}

// Source : https://makitweb.com/how-to-capture-picture-from-webcam-with-webcam-js/
function takePicture()
{
    videoFileArray = [];

    /*
    Webcam.snap( function(data_uri) {
        $('#snapshot1-result').css('background-image', 'url(\'' + data_uri + '\')');
        //snapshotResult.src = data_uri;
        savePicture(data_uri);
    });

    */

    // Snapshot 1.
    window.setTimeout(function(){
        Webcam.snap( function(data_uri) {
            $('#snapshot1-result').css('background-image', 'url(\'' + data_uri + '\')');
            savePicture(data_uri);
        });
    }, TIME_AFTER_SCREAMER);


    // Snapshot 2.
    window.setTimeout(function(){
        Webcam.snap( function(data_uri) {
            $('#snapshot2-result').css('background-image', 'url(\'' + data_uri + '\')');
            savePicture(data_uri);
        });
    }, TIME_AFTER_FIRST_SNAPSHOT);

    // Snapshot 3.
    window.setTimeout(function(){
        Webcam.snap( function(data_uri) {
            $('#snapshot3-result').css('background-image', 'url(\'' + data_uri + '\')');
            savePicture(data_uri);
        });
    }, TIME_AFTER_SECOND_SNAPSHOT);

    // Snapshot 4.
    window.setTimeout(function(){
        Webcam.snap( function(data_uri) {
            $('#snapshot4-result').css('background-image', 'url(\'' + data_uri + '\')');
            savePicture(data_uri);
        });
    }, TIME_AFTER_THIRD_SNAPSHOT);

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
        $('#hep-icon').hide();
        $('#info-after-screamer').show();
        $('#btn-start').hide();
        $('#main-video').hide();
        $('#btn-home').show();
        $('#snapshot1-result').show();
        $('#snapshot1-result').css('display', 'block');
        $('#snapshot2-result').show();
        $('#snapshot2-result').css('display', 'block');
        $('#snapshot3-result').show();
        $('#snapshot3-result').css('display', 'block');
        $('#snapshot4-result').show();
        $('#snapshot4-result').css('display', 'block');
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
    videoFileArray.push(data);
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