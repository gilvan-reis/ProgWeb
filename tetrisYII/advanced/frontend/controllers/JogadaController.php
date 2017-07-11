<?php

namespace frontend\controllers;

use Yii;
use app\models\Jogada;
use yii\web\Controller;
use frontend\controllers\SiteController;
use yii\data\ActiveDataProvider;
use yii\data\ArrayDataProvider;

class JogadaController extends Controller{
	public function actionPlay(){
		if (Yii::$app->user->isGuest) {
			$this->redirect(['site/login']);
		}else{
			return $this->render('play', []);
		}
	}

	public function actionRanking(){
		$array = Jogada::find()
				->with('user')
				->orderBy(['pontuacao'=>SORT_DESC])
				->limit(3)
				->offset(0)->all();
        $dataProvider = new ArrayDataProvider([
            'allModels' => $array,
        ]);
        return $this->render('ranking', [
            'dataProvider' => $dataProvider,
        ]);
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
