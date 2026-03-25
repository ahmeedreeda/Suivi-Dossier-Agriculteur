<?php
        try {
            $conn = new PDO('mysql:host=localhost;dbname=suivi-dossier','root','');
        } catch (PDOException $ex) {
            echo $ex->getMessage();
        }
?>