<?php
$imageSrc = $_SERVER['DOCUMENT_ROOT'] . "/HEP_Trouillometre/" . $_POST['imageSrc'];

//echo (file_exists($imageSrc) ? "ok" : "notok");

if(file_exists($imageSrc))
{
    echo "file exists !";
    unlink($imageSrc);
}
else
{
    echo "file does not exists !";
}

/*if(file_exists($imageSrc)
{
    echo "ok"
    /*if(unlink($imageSrc)){

    };
}*/