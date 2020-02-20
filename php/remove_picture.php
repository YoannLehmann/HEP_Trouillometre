<?php
$imageSrc = $_SERVER['DOCUMENT_ROOT'] . "/HEP_Trouillometre/" . $_POST['imageSrc'];

//echo (file_exists($imageSrc) ? "ok" : "notok");

if(file_exists($imageSrc))
{
    echo "file exists !";
    if(unlink($imageSrc))
    {
        echo "file deleted.";
    }
    else
    {
        echo "error while deleting your file.";
    }

}
else
{
    echo "file does not exists !";
}