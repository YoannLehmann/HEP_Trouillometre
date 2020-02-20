let gallery = document.getElementById('gallery-row');
let filenameArray = null;

$(document).ready(function()
{
    getImagesFilenames();


})

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
        refreshGallery();
    }).fail(function(error){
        console.log("ERROR get_image_filenames.php : " + error);
    });
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
        let imageDOM = document.createElement("img");
        let buttonRemoveDOM = document.createElement('button');
        buttonRemoveDOM.className += 'button-remove';
        buttonRemoveDOM.imageSrc = imageSrc
        buttonRemoveDOM.addEventListener("click", removePicturePopUp);
        buttonRemoveDOM.textContent = "Supprimer";

        imageDOM.height = 200;
        imageDOM.width= 300;
        imageDOM.src = imageSrc;
        buttonRemoveDOM.src = imageSrc;
        imageContainerDOM.setAttribute("data-src", imageSrc);
        imageContainerDOM.append(imageDOM);
        imageContainerDOM.append(buttonRemoveDOM);

        gallery.append(imageContainerDOM);

    }
}

function removePicturePopUp()
{
    if (confirm("Voulez-vous vraiment supprimer cette image ?", 'oui', 'annuler')) {
        console.log(this.imageSrc);
        removePicture(this.imageSrc);
    }
}

function removePicture(imageSrc)
{
    $.ajax({
        type: "POST",
        url: 'php/remove_picture.php',
        data: {
            'imageSrc': imageSrc
        },
        success: function (data) {
            console.log("Picture successfuly deleted!" + data);
            getImagesFilenames();
        },
        error: function(error){
            console.log("Error while deleting your image.");
            console.log(error);
        }
    });
}