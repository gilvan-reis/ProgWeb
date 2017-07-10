<?php

namespace app\models;

use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use \Datetime;

/**
 * This is the model class for table "user".
 *
 * @property integer $id
 * @property string $username
 * @property string $auth_key
 * @property string $password_hash
 * @property string $password_reset_token
 * @property string $email
 * @property integer $status
 * @property integer $created_at
 * @property integer $updated_at
 * @property integer $id_curso
 *
 * @property Jogada[] $jogadas
 * @property Curso $idCurso
 */
class User extends \yii\db\ActiveRecord implements IdentityInterface
{
    const STATUS_DELETED = 0;
    const STATUS_ACTIVE = 10;

    public $nome_pre_formatado = "";
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['username', 'password_hash', 'email'], 'required', 'message'=>'Este campo é obrigatorio'],
            [['status', 'created_at', 'updated_at', 'id_curso'], 'integer'],
            [['username', 'password_hash', 'password_reset_token', 'email'], 'string', 'max' => 255],
            [['auth_key'], 'string', 'max' => 32],
            ['username', 'unique', 'message' => 'Este nome de usuario já está em uso.'],
            ['email', 'unique', 'message' => 'Este email já esta em uso.'],
            [['username','email'], 'trim'],
            ['email', 'email'],
            [['id_curso'], 'exist', 'skipOnError' => true, 'targetClass' => Curso::className(), 'targetAttribute' => ['id_curso' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'username' => 'Nome de Usuário',
            'auth_key' => 'Auth Key',
            'password_hash' => 'Senha',
            'password_reset_token' => 'Password Reset Token',
            'email' => 'Email',
            'status' => 'Status',
            'created_at' => 'Adicionado em',
            'updated_at' => 'Updated At',
            'id_curso' => 'Curso',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getJogadas()
    {
        return $this->hasMany(Jogada::className(), ['id_user' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCurso()
    {
        return $this->hasOne(Curso::className(), ['id' => 'id_curso']);
    }

    public function afterFind(){
      parent::afterFind();

      $this->nome_pre_formatado = $this->username;
      $this->username = ucwords($this->username);
      $this->created_at = date("d/m/Y H:i:s", $this->created_at);
      $this->id_curso = Curso::findOne($this->id_curso)->nome;
    }

    public function beforeValidate(){
      if(!$this->isNewRecord){
        $dtime = DateTime::createFromFormat("d/m/Y H:i:s", $this->created_at);
        if ($dtime instanceof DateTime){
            $this->created_at = $dtime->getTimestamp();
            return true;
        }

        return false;
      }
      return true;
    }

    public function beforeSave($insert){
        if(parent::beforeSave($insert)){
            $time = time();
            $this->updated_at = $time;
            if($this->isNewRecord){
                $this->created_at = $time;
                $this->status = User::STATUS_ACTIVE;
                User::generateAuthKey();
            }
            return true;
        }
        return false;
    }

    public function afterSave($insert, $changedAttributes){
        $this->nome_pre_formatado = $this->username;
        $this->username = ucwords($this->username);
        //$this->created_at = date("d/m/Y H:i:s", $this->created_at);
        //$this->id_curso = Curso::findOne($this->id_curso)->nome;
    }

    /**
     * ----
     */
    public static function isPasswordResetTokenValid($token)
    {
        if (empty($token)) {
            return false;
        }

        $timestamp = (int) substr($token, strrpos($token, '_') + 1);
        $expire = Yii::$app->params['user.passwordResetTokenExpire'];
        return $timestamp + $expire >= time();
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function validatePassword($password)
    {
        //return Yii::$app->security->validatePassword($password, $this->password_hash);
        return $password === $this->password_hash;
    }

    public function setPassword($password)
    {
        //$this->password_hash = Yii::$app->security->generatePasswordHash($password);
        $this->password_hash = $password;
    }

    public function generateAuthKey()
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    public function generatePasswordResetToken()
    {
        $this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
    }

    public function removePasswordResetToken()
    {
        $this->password_reset_token = null;
    }

   public static function findIdentity($id)
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        throw new NotSupportedException('"findIdentityByAccessToken" is not implemented.');
    }

    public static function findByUsername($username)
    {
        return static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
    }

    public static function findByPasswordResetToken($token)
    {
        if (!static::isPasswordResetTokenValid($token)) {
            return null;
        }

        return static::findOne([
            'password_reset_token' => $token,
            'status' => self::STATUS_ACTIVE,
        ]);
    }

    public function getId()
    {
        return $this->getPrimaryKey();
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }
}
