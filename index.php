<?php
    require_once('header.php');

    if(!empty($_GET))
    {
        if($_GET['page'] == 'edit')
        {
            require_once('edit_gallery.php');
        }
        else if($_GET['page'] == 'displayGallery')
        {
            require_once('display_gallery.php');
        }
        else if($_GET['page'] == 'edit-video')
        {
            require_once('edit_video.php');
        }
        else
        {
            require_once('home.php');
        }
    }
    else
    {
        require_once('home.php');
    }

    require_once('footer.php');
?>




