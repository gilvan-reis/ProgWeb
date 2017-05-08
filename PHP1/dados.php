<?php
  $nome = $_GET['nome'];
  $email = $_GET['email'];
  $site = $_GET['site'];
  $mensagem = $_GET['mensagem'];

  echo "<h1>Dados retornados pelo formulario</h1>";
  echo "Nome: " . $nome . "<br>";
  echo "Email: " . $email . "<br>";
  echo "Site: " . $site . "<br><br>";
  echo "Mensagem: " . $mensagem . "<br>";
 ?>
