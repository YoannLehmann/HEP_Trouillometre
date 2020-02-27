<?php
$filename = "../timer.json";
//$fs = fopen($filename, "rw") or die('can\'t open file');

$stringData = $_GET['json'];

var_dump($stringData);

file_put_contents($filename, $stringData);
//fwrite($fs, $stringData, strlen($stringData);


//fclose($fs);