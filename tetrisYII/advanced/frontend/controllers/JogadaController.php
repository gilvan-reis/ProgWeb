<?php

namespace frontend\controllers;

use Yii;
use app\models\Jogada;
use yii\web\Controller;

class JogadaController extends Controller{
	public function actionPlay(){
		if (Yii::$app->user->isGuest) {
			//return $this->render('login', []);
		}else{
			//return $this->render('play', []);
		}
		return $this->render('play', []);
	}

	public function actionRanking(){
	}

	public function actionSave(){
		if (!Yii::$app->user->isGuest) {
			$pontuacao = Yii::$app->request->post('pontuacao');
			$id_user = Yii::$app->user->identity->id;
			$jogada = new Jogada();
			$jogada->id_user = $id_user;
			$jogada->pontuacao = $pontuacao;
		}
		if ($jogada->save()) {
			return 1;
		} else {
			return 0;
		}
	}
}
