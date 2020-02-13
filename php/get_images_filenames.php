<?php

    $arr = scandir("../images/webcam", 1);

    // Suppression des deux dernier noms de fichiers ('.' et '..')
    unset($arr[count($arr)-1]);
    unset($arr[count($arr)-1]);

    echo json_encode($arr);