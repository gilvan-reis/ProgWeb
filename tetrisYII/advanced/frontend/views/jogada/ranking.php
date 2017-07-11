<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\grid\GridView;
use app\models\User;

/* @var $model app\models\Jogada */

$this->title = "Ranking";
$this->params['breadcrumbs'][] = ['label' => 'Jogada', 'url' => ['play']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="curso-users">

    <h1><?= Html::encode($this->title); ?></h1>

    <?= GridView::widget([
    'dataProvider' => $dataProvider,
    'columns' => [
        [
		'attribute' => 'Nome do usuario',
		'format' => 'raw',
		'value' => function($dataProvider){
				return User::findOne($dataProvider->id_user)->username;
			},
		],
        'pontuacao',
        ],
    'emptyText' => 'Sem jogadas registradas',
    ]); ?>

</div>
