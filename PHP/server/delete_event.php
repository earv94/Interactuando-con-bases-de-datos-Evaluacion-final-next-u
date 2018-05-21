<?php

  include 'conexionBD.php';
  $ID=$_POST['id'];

  EliminarEvento();

  function EliminarEvento(){
    IniciarConexion();
    $Consulta = "delete from evento where Id=".$GLOBALS['ID'];

    if ($GLOBALS['Conexion']->query($Consulta) === TRUE) {
        echo json_encode(array("msg"=>"OK"));
    } else {
        echo json_encode(array("msg"=>"Error al eliminar el evento"));
    }
    DesactivarConexion();
  }

 ?>
