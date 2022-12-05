<?php
header('Access-Control-Allow-Origin: *');
$servername = "db4free.net"; // Nombre/IP del servidor
$database = "dbunity"; // Nombre de la BBDD
$username = "flaviourdiales"; // Nombre del usuario
$password = "flaviolp12"; // Contraseña del usuario
// Creamos la conexión
$con = mysqli_connect($servername, $username, $password, $database);

    $query = "SELECT * FROM haorcado ORDER BY cast(score as double) DESC limit 10";
    $result = mysqli_query($con, $query);
    $scores = array();
    while($row = mysqli_fetch_assoc($result)){
        $scores[] = $row;
    }
    echo json_encode($scores);
    mysqli_close($con);



?>