<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use yii\bootstrap\BootstrapAsset;
use app\models\User;

/* @var $this yii\web\View */
/* @var $model app\models\Curso */

$this->title = $model->nome;
$this->params['breadcrumbs'][] = ['label' => 'Cursos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
$this->registerCssFile('/css/view.css',['depends' => BootstrapAsset::className()]);
?>
<div class="curso-view">

    <h1><?= Html::encode($this->title); ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Você deseja deletar este curso?',
                'method' => 'post',
            ],
        ]) ?>
        <?= Html::a('Listar usuarios', ['users', 'id' => $model->id], ['class' => 'btn btn-success']) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'nome',
            'sigla',
            'descricao:ntext',
	    [
		'attribute' => 'Quantidade de alunos',
		'format' => 'raw',
		'value' => function($model){
				return User::find()->where('id_curso='.$model->id)->count();
			},
		]
        ],
    ]);
?>

</div>
