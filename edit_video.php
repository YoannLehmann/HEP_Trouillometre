<link type="text/css" rel="stylesheet" href="css/admin.css" />
<div id="main-container">
    <div id="gallery-first-row">
        <h1>Administration du trouillomètre</h1>
        <select id="select-video-title">
            <option value="0">Sélectionnez une vidéo</option>
        </select>
        <label>Min : </label>
        <input id="ipt-minutes" type="number" max="59" min="0" value="0"/>

        <label >Sec : </label>
        <input id="ipt-seconds" type="number" max="59" min="0" value="0"/>
        <button id="btn-save">Sauvegarder les changements</button>
    </div>
    <div id="video-container" class="row">
        <video id="video-preview" controls>
            <source id="video-source" src="video/screamer1.mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
</div>