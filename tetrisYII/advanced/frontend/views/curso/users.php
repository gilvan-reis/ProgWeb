<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use app\models\User;
use yii\grid\GridView;

/* @var $model app\models\Curso */

$this->title = "Listar usuarios";
$this->params['breadcrumbs'][] = ['label' => 'Curso', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $curso->nome, 'url' => ['view', 'id' => $curso->id]];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-users">

    <h1><?= Html::encode($this->title); ?></h1>

    <?= GridView::widget([
    'dataProvider' => $dataProvider,
    'columns' => [
        'username',
        'email',
        'created_at'
        ],
    'emptyText' => 'Sem usuarios registrados no curso',
    ]); ?>

</div>
