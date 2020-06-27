<?php

require_once dirname(__FILE__) . "/../mailer.php";

$address = $_POST["address"];

SendMail("alexander.stolba23@gmail.com", "Адрес юзера", "Адрес - " . $address);