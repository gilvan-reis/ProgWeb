<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\BootstrapAsset;

$this->title = 'TetrisYII';
$this->params['breadcrumbs'][] = $this->title;
$this->registerCssFile('/css/estilosTetris.css',['depends' => BootstrapAsset::className()]);
$this->registerJsFile('/js/tetris.js');

?>
<div class="jogada-play">
    <h1><?= Html::encode($this->title) ?></h1>
    <div id="proximaPeca" class="divTetris"></div>
    <div id="tabuleiro" class="divTetris"></div>
    <div id="informacoes" class="divTetris"></div>

    <?php
        $this->registerJs("
                    document.addEventListener('GameOver',
                        function(e){
                            pontuacao1 = parseInt(e.detail);
                            console.log(pontuacao1);
                            $.ajax({
                                type: 'POST',
                                url: '". Url::to(['jogada/save']) ."',
                                data: {
                                    pontuacao: pontuacao1
                                },
                                success: function(data) {
                                    console.log(data);
                            }
                        });
                    });");
    ?>
</div>
