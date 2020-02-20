<?php
    require_once('header.php');

    if($_GET['page'] == 'edit')
        require_once('edit_gallery.php');
    else
        require_once('home.php');
    require_once('footer.php');
?>




