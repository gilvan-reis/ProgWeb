<?php
  $nome = $_GET['nome'];
  $email = $_GET['email'];
  $site = $_GET['site'];
  $mensagem = $_GET['mensagem'];
  $usuarioDB = "root";
  $senhaDB = "icomp123";

  echo "<h1>Dados retornados pelo formulario</h1>";
  try{
      $conn = new PDO("mysql:host=localhost;dbname=progweb",$usuarioDB,$senhaDB);
      //$conn->exec("set names utf8");
      $stmt = $conn->prepare('insert into php2 values null,"'.$nome.'","'.$email.'","'.$site.'","'.$mensagem.'"');
      $stmt->execute();


      echo "Nome: " . $nome . "<br>";
      echo "Email: " . $email . "<br>";
      echo "Site: " . $site . "<br><br>";
      echo "Mensagem: " . $mensagem . "<br>";
  }catch (PDOException $e){
      echo $e->getMessage();
  }


 ?>
