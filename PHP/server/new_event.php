<?php

  include 'conexionBD.php';
  $Titulo=$_POST['titulo'];
  $FechaInicio=$_POST['start_date'];
  $TodoDia=$_POST['allDay'];
  $FechaFinal=$_POST['end_date'];
  $HoraFinal=$_POST['end_hour'];
  $HoraInicial=$_POST['start_hour'];

  CrearEvento();

  function CrearEvento(){
    IniciarConexion();
    $Consulta = "INSERT INTO evento (IdUsuario, Titulo, FechaInicio, HoraInicio, FechaFinalizacion, HoraFinalizacion, DiaCompleto)
    VALUES (".$_COOKIE['IdUser'].", '".$GLOBALS['Titulo']."', '".$GLOBALS['FechaInicio']."', '".$GLOBALS['HoraInicial']."', '".$GLOBALS['FechaFinal']."', '".$GLOBALS['HoraFinal']."', '".$GLOBALS['TodoDia']."')";

    if ($GLOBALS['Conexion']->query($Consulta) === TRUE) {
        echo json_encode(array("msg"=>"OK","Id"=>$GLOBALS['Conexion']->insert_id));
    } else {
        echo json_encode(array("msg"=>"Error Al registrar el evento"));
    }
    DesactivarConexion();
  }

 ?>
