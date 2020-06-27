<?php

require_once dirname(__FILE__) . "/../mailer.php";

$customerInfo = $_POST["customerInfo"];

$body = "";
foreach($_POST as $k => $v) {
    $body .= "<div><b>$k - </b>$v</div>";
}

var_dump($body);

SendMail("alexander.stolba23@gmail.com", "Информация", $body);