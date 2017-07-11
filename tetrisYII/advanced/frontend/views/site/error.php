<?php

/* @var $this yii\web\View */
/* @var $name string */
/* @var $message string */
/* @var $exception Exception */

use yii\helpers\Html;

$this->title = $name;
?>
<div class="site-error">

    <h1><?= Html::encode($this->title) ?></h1>

    <div class="alert alert-danger">
        <?= nl2br(Html::encode($message)) ?>
    </div>

    <p>
        O erro acima ocorreu quando a sua requisicao estava sendo processada.
    </p>
    <p>
        Por favor entre em contato caso você ache que é um erro do servidor. Obrigado.
    </p>

</div>
