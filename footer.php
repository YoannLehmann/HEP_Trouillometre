<!-- jQuery -->
<script src="libraries/jquery-3.4.1.min.js"></script>
<script src="libraries/lightGallery/lib/jquery.mousewheel.min.js"></script>
  <!-- Lightgallery plugins -->
<script src="libraries/lightGallery/dist/js/lightgallery.js"></script>
<script src="libraries/lightGallery/modules/lg-thumbnail.min.js"></script>
<script src="libraries/lightGallery/modules//lg-fullscreen.min.js"></script>
<script type="text/javascript" src="libraries/webcam.min.js"></script>
<!-- Main script -->

<?php
    if($_GET['page'] == 'edit')
    {
?>
    <script type="text/javascript" src="js/edit-gallery.js"></script>
<?php
    }
    else
    {
?>
    <script type="text/javascript" src="js/script.js"></script>
<?php
    }
?>

<!-- End Document
  –––––––––––––––––––––––––––––––––––––––––––––––––– -->
</body>
</html>