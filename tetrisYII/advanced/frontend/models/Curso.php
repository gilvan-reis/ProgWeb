<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "curso".
 *
 * @property integer $id
 * @property string $nome
 * @property string $sigla
 * @property string $descricao
 *
 * @property User[] $users
 */
class Curso extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'curso';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['nome','sigla'], 'required','message'=>'Este campo é obrigatorio'],
            [['id'], 'integer'],
            [['descricao'], 'string'],
            [['nome'], 'string', 'max' => 45],
            [['sigla'], 'string', 'max' => 4],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome do curso',
            'sigla' => 'Sigla',
            'descricao' => 'Descrição',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::className(), ['id_curso' => 'id']);
    }

    public function getLoggedUserCurso(){
      $user = Yii::$app->user->identity;
      if(!isset($user)){
        return 0;
      }else{
        return $user->id_curso;
      }
    }
}
