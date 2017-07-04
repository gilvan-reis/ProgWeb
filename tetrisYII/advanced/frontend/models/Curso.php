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
            [['id'], 'required','message'=>'Este campo é obrigatorio'],
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
            'descricao' => 'Descricao',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUsers()
    {
        return $this->hasMany(User::className(), ['id_curso' => 'id']);
    }
}
