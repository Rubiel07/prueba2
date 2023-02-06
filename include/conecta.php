<?php
$servidor = "localhost:3308";
$usuario = "root";
$contraseña = "";
$Bd = "users";

$conecta = mysqli_connect($servidor, $usuario, $contraseña, $Bd);

if($conecta -> connect_error){
    die("Error al conectar a la base de datos".$conecta->connect_error);
}else {
    echo ("conexion exitosa");
}

?>