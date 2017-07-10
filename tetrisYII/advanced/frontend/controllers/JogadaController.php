<?php

namespace frontend\controllers;

use Yii;
use app\models\Jogada;
use yii\web\Controller;
use frontend\controllers\SiteController;

class JogadaController extends Controller{
	public function actionPlay(){
		if (Yii::$app->user->isGuest) {
			$this->redirect(['site/login']);
		}else{
			return $this->render('play', []);
		}
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

			if ($jogada->save()) {
				return "Jogada do usuario \"".$id_user."\" com pontuacao de ".$jogada->pontuacao." salva com sucesso!";
				//return 1;
			} else {
				return var_dump($jogada->getErrors());
				//return var_dump($jogada);
			}
		}


	}
}
