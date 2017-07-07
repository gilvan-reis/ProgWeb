<?php
use yii\helpers\Html;

/* @var $this yii\web\View */

$this->title = 'TetrisYII';
?>

<div class="site-index">

    <div class="jumbotron">
        <?= Html::img('@web/img/tetris.jpg',['width'=>'400']) ?>

        <p class="lead">Este tetris foi criado pelo Gilvan Oliveira dos Reis</p>

        <p><a class="btn btn-lg btn-success" href="?r=jogada/play">Iniciar Jogo!</a></p>
    </div>

    <div class="body-content">

        <div class="row">
            <div class="col-lg-4">
                <h2>Ranking</h2>

                <p>ranking</p>
            </div>
        </div>

    </div>
</div>
