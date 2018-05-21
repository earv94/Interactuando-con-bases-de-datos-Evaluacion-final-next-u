<?php

    include 'conexionBD.php';
    ObtenerEventos();
    function ObtenerEventos(){
       $Eventos="";
       IniciarConexion();
       $Consulta="select * from evento where IdUsuario=3";
       $Resultado= $GLOBALS['Conexion']->query($Consulta);
       while ($fila = mysqli_fetch_array($Resultado)){
         if(empty($Eventos)){
            $Eventos="[".json_encode(array("id"=> $fila['Id'], "title"=> $fila['Titulo'], "start"=> $fila['FechaInicio']." ". $fila['HoraInicio'], "allDay"=> $fila['DiaCompleto'], "end"=> $fila['FechaFinalizacion']." ".$fila['HoraFinalizacion']));
          }else{
            $Eventos=$Eventos.",".json_encode(array("id"=> $fila['Id'], "title"=> $fila['Titulo'], "start"=> $fila['FechaInicio']." ". $fila['HoraInicio'], "allDay"=> $fila['DiaCompleto'], "end"=> $fila['FechaFinalizacion']." ".$fila['HoraFinalizacion']));
          }
        }
        if(!empty($Eventos)){
          $Eventos=$Eventos."]";
        }
       DesactivarConexion();
       echo $Eventos;

    }
 ?>
