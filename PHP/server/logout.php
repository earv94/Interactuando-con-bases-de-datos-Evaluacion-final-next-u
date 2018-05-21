<?php
    include 'check_login.php';
    $IdUser=0;
    $NombreUsuario='';
    setcookie('IdUser',$IdUser);
    setcookie('Nombre',$Nombre);
    header('Location: '.'../client/index.html');
 ?>
