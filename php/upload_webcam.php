<?php

    $folderPath = "../images/webcam/";

    $image_parts = explode(";base64,", $_POST['image']);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
    $image_base64 = base64_decode($image_parts[1]);
    $filename = uniqid() . "." . $image_type;
    $file = $folderPath . $filename;
    file_put_contents($file, $image_base64);
    chmod($file, 0777);
    echo $filename;
