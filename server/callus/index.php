<?php

require_once dirname(__FILE__) . "/../mailer.php";

$phone = $_POST["phone"];

SendMail("alexander.stolba23@gmail.com", "Запрос звонка", "Phone - " . $phone);