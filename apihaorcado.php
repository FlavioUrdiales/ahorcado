
  
<?php
header('Access-Control-Allow-Origin: *');
$servername = "db4free.net"; // Nombre/IP del servidor
$database = "dbunity"; // Nombre de la BBDD
$username = "flaviourdiales"; // Nombre del usuario
$password = "flaviolp12"; // Contraseña del usuario
// Creamos la conexión
$con = mysqli_connect($servername, $username, $password, $database);


//Actualizamos el score
if (isset($_GET['score']) && isset($_GET['name'])) {
 


//insertar el nuevo score
$query = "INSERT INTO haorcado (name, score) VALUES ('".$_GET['name']."', '".$_GET['score']."')";
$result = mysqli_query($con, $query);

// chechar si inserto el nuevo score
if ($result) {
    echo "New record created successfully";
} else {
    echo "Error: " . $query . "<br>" . mysqli_error($con);
   
   
} 
}else {
    echo "Error saving score";
}



?>



