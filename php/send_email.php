<?php
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require '../vendor/autoload.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

// Get parameters from ajax.
$email = $_POST['email'];
$image_path = $_POST['image'];

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'yoann.lehmann1995@gmail.com';                     // SMTP username
    $mail->Password   = 'Thedanceofeternity1012';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 14; // ou 465                                   // TCP port to connect to

    //Recipients
    $mail->setFrom('info@hep-bejune.ch', 'HEP-Bejune');
    $mail->addAddress($email);               // Name is optional

    // Attachments
    $mail->addAttachment($image_path, 'Photo_de_votre_trouille');         // Add attachments

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Votre photo du trouillomètre de la HEP.';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}