 <!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <div class="container">
    <div class="row">
      <div class="column" style="margin-top: 25%">
        <h1>Page de test du trouillomètre</h1>
        <button class="button-primary" id="btn-start">Démarrer l'expérience</button>
        <button hidden class="button-primary" id="btn-display-gallery">Afficher toutes les photos</button>
        <a href='?page=edit'><button>Modifier les photos</button></a>
      </div>
    </div>
    <div id="video-container" class="row">
      <video id="main-video" width="1024" height="768" style="opacity: 0%;">
        <source id="main-video-source" src="video/screamer1.mp4" />
        Your browser does not support the video tag.
      </video>
      <div hidden id="webcam-result"></div>
      <button hidden class="button-primary" id="btn-freeze">Freeze</button>
      <img  hidden id="snapshot-result" src="images/webcam/pigeon.jpg"/>
    </div>
    <div id="gallery-row" class="row">
      <div id="light-gallery" style="border: 5px solid black;">
      </div>
    </div>
  </div>
  <script></script>