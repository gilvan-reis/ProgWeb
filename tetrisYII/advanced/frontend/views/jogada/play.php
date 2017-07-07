<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\bootstrap\BootstrapAsset;

$this->title = 'TetrisYII';
$this->params['breadcrumbs'][] = $this->title;
$this->registerCssFile('/css/estilosTetris.css',['depends' => BootstrapAsset::className()]);
$this->registerJsFile('/assets/tetris/tetris.js',['position' => $this::POS_END]);

?>
<div class="jogada-play">
    <h1><?= Html::encode($this->title) ?></h1>
    <div id="proximaPeca" class="divTetris"></div>
    <div id="tabuleiro" class="divTetris"></div>
    <div id="informacoes" class="divTetris"></div>
</div>
