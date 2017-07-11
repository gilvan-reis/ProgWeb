<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Este tetris foi criado por <strong>Gilvan Oliveira dos Reis</strong></p>

    <p><?= $descricao ?></p>
    <p>Data e hora atual: <?= $dataAtual ?></p>
</div>
