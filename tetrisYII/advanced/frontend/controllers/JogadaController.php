<?php

namespace frontend\controllers;

use Yii;
use app\models\Jogada;
use yii\web\Controller;

class JogadaController extends Controller{
	public function actionPlay(){
		return $this->render('play', []);
	}

	public function actionRanking(){
	}

	public function actionSave(){
		if (!Yii::$app->user->isGuest) {
			$pontuacao = Yii::$app->request->post('pontuacao');
			$user = Yii::$app->user->identity->id;
			$jogada = new Jogada;
			$jogada->id_user = $user;
			$jogada->pontuacao = $pontuacao;
		}
		if ($jogada->save()) {
			return 1;
		} else {
			return 0;
		}
	}
}
