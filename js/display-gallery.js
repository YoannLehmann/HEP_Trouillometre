let gallery = document.getElementById('light-gallery');
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
        let imageLinkDOM = document.createElement("a");
        let imageDOM = document.createElement("img");


        imageLinkDOM.href = imageSrc;
        imageDOM.src = imageSrc;
        imageDOM.height = 200;
        imageDOM.width= 300;

        imageContainerDOM.setAttribute("data-src", imageSrc);


        imageLinkDOM.append(imageDOM);
        imageContainerDOM.append(imageLinkDOM);

        gallery.append(imageContainerDOM);
    }

    $('#light-gallery').lightGallery();
}