<link type="text/css" rel="stylesheet" href="css/admin.css" />
<div id="main-container">
    <div id="gallery-first-row">
        <h1>Administration du trouillometre</h1>
        <a href='?page=displayGallery'><button style="margin-bottom: 15px;">Revenir à la gallerie d&apos;images</button></a>
        <div id="video-edit-container">
            <h2>Configuration de la video</h2>
            <select id="select-video-title">

            </select>
            <br/>
            <label>Timer du screamer : </label>
            <br/>
            <label>Minute </label>
            <input id="ipt-minutes" type="number" max="59" min="0" value="0"/>
            <label >Seconde </label>
            <input id="ipt-seconds" type="number" max="59" min="0" value="0"/>
            <br/>
            <button id="btn-save">Sauvegarder les changements</button>
        </div>
        <div hidden id="information-area">
            <p id="information-text"></p>
        </div>
    </div>

    <div id="video-container" class="row">
        <p>Aperçu de la vidéo : </p>
        <video id="video-preview" controls>
            <source id="video-source" src="" />
            Your browser does not support the video tag.
        </video>
    </div>
</div>