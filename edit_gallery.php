 <style>
    div#gallery-row {
        width: 1240px;
    }

    div#gallery-row div.image-container {
        width: 300px;
        display: inline-block;
        margin-bottom: 40px;
        position: relative;
        margin-right: 10px;
    }

    div#gallery-row div.image-container:last-child {
        margin-right: 0px;
    }

    div#gallery-row div.image-container button.button-remove {
        width: 100%;
        position: absolute;
        background-color: red;
        bottom: -45px;
        left: 0;
    }
 </style>



 <!-- Primary Page Layout
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
  <div class="container">
    <div class="row">
      <div class="column" style="margin-top: 25%">
        <h1>Page d'édition de la gallerie.</h1>
        <a href='?page=home'><button>Retourner à l'accueil</button></a>
      </div>
    </div>
    <div id="gallery-row" class="row">

    </div>
  </div>
  </div>