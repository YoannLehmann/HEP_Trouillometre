// Constants.
const WEBCAM_WIDTH = 1920;
const WEBCAM_HEIGHT = 1080;
const JPEG_QUALITY = 100;
const AFTER_SCREAMER_TIMER = 1000;

// Variables.
let videoName = "";
let screamerTimer = 0;
let videoSource = document.getElementById("video-source");
let videoPreview = document.getElementById("video-preview")
let inputMinutes = document.getElementById("ipt-minutes");
let inputSeconds = document.getElementById("ipt-seconds");
let selectVideoTitle = document.getElementById("select-video-title");
let btnSave = document.getElementById("btn-save");

$(document).ready(function(e){
    // Initialisations.
    $.ajaxSetup({ cache:false });
    getInformationsFromJSON();
    $('#select-video-title').change(onVideoNameSelectChangeListener);
    btnSave.addEventListener("click", saveChanges);
});

function onVideoNameSelectChangeListener()
{
    if(this.value.length != 0)
    {
        videoSource.setAttribute("src", selectVideoTitle.options[selectVideoTitle.selectedIndex].text);
        let timeInMS = stringToMS(this.value);
        inputSeconds.value = (timeInMS / 1000) % 60;
        inputMinutes.value = Math.floor(timeInMS / (1000 * 60));
        videoPreview.load();
    }
}

function saveChanges()
{
    let newSource = videoSource.getAttribute("src");
    let newTimer = inputMinutes.value + ":" + inputSeconds.value;


    jQuery.getJSON("timer.json", function(data) {
        data['selected'] = newSource;
        jQuery.each(data["videos"], function(key, value){

            console.log(key + ", " + newSource);
            if(key == newSource)
            {
                data["videos"][key] = newTimer;
            }
        });

        jQuery.ajax({
            type: "GET",
            data: {
              'json' : JSON.stringify(data)
            },
            url: 'php/save_timer.php'
        }).done(function(data){
            selectVideoTitle.options[selectVideoTitle.selectedIndex].value = newTimer;
            console.log(data);
        }).fail(function(error){
            console.log(error);
        });
    });
}

// Get the screamer timer from the current video. Looking into the timer.json file.
function getInformationsFromJSON()
{
    jQuery.getJSON("timer.json", function(data){



        videoName = data["selected"];
        jQuery.each(data["videos"], function(key, value){

            // Add videoname to select field.
            let videoOptionDOM = document.createElement("option");
            videoOptionDOM.text = key;
            videoOptionDOM.value = value;
            selectVideoTitle.append(videoOptionDOM);


            if(key === videoName)
            {
                screamerTimer = value;
            }

            if(videoName.length > 0 || screamerTimer > 0)
            {
                videoSource.setAttribute("src", videoName);
                videoPreview.load();
                let timeInMS = stringToMS(screamerTimer);

                inputSeconds.setAttribute("value",((timeInMS / 1000) % 60).toString());
                inputMinutes.setAttribute("value",((timeInMS / 1000 * 60) % 60).toString());
            }
        });
    });


}

// Format : m:s
function stringToMS(timer)
{
    let res = timer.toString().split(":");
    let total = 0;
    total += parseInt(res[0]) * 60;
    total += parseInt(res[1]);

    return total * 1000;
}