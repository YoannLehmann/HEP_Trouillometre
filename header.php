<!DOCTYPE html>
<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
?>
<html lang="en">
<head>

  <!-- Basic Page Needs
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta charset="utf-8" />
  <title>HEP-Bejune - Trouillomètre</title>
  <meta name="description" content="" />
  <meta name="author" content="Yoann Lehmann" />

  <!-- Mobile Specific Metas
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- FONT
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link href="//fonts.googleapis.com/css?family=Raleway:400,300,600" rel="stylesheet" type="text/css" />

  <!-- CSS
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="stylesheet" href="css/normalize.css" />
  <link rel="stylesheet" href="css/skeleton.css" />
  <link type="text/css" rel="stylesheet" href="libraries/lightGallery/src/css/lightgallery.css" />

  <!-- Favicon
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <link rel="icon" type="image/png" href="images/favicon.png">


  <style>

    img#snapshot-result {
        width: 1024px;
        height: 728px;
    }

    div#light-gallery {
        width: 1230px;
    }

    div#light-gallery div.image-container:nth-child(4n) {
        margin-right: 0px;
    }

    div#light-gallery div.image-container {
      width: 300px; /* Taille à changer dynamiquement en javascript. */
      height: 200px;
      position: relative;
      display: inline-block;
      margin-bottom: 50px;
      margin-right: 10px;
    }

    div#light-gallery button {
      position: absolute;
    }

    div#light-gallery div.image-container a {
      display: block;
    }
  </style>

</head>
<body>