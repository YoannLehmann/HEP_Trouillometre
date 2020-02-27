<link type="text/css" rel="stylesheet" href="css/home.css" />
<div id="main-container">
    <div id="home-first-row">
        <h1>Trouillometre de la HEP-BEJUNE</h1>
        <h2 id="subtitle">Oserez-vous presser sur le bouton ?</h2>
        <button class="button-primary" id="btn-start">Demarrer l experience</button>
    </div>
    <div id="home-second-row">
        <div hidden id="webcam-result"></div>
        <div hidden id="video-container" class="row">
            <video id="main-video" >
                <source id="main-video-source" />
                Your browser does not support the video tag.
            </video>
        </div>
        <div hidden id="snapshot-result" />
    </div>
    <a href='?page=home'><button hidden id='btn-home'>Retourner a l accueil</button></a>
</div>