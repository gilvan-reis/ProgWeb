<?php
namespace frontend\models;

use yii\base\Model;
use app\models\User;
use app\models\Curso;

/**
 * Signup form
 */
class SignupForm extends Model
{
    public $username;
    public $email;
    public $password;
    public $id_curso;


    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['username','email'], 'trim'],
            [['username', 'email', 'password'], 'required', 'message' => 'Este campo é obrigatorio.'],
            ['username', 'unique', 'targetClass' => '\app\models\User', 'message' => 'Este nome de usuario já está em uso.'],
            ['username', 'string', 'max' => 255],

            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\app\models\User', 'message' => 'Este email já esta em uso.'],

            ['password', 'string', 'max' => 255],

            [['id_curso'], 'exist', 'skipOnError' => true, 'targetClass' => Curso::className(), 'targetAttribute' => ['id_curso' => 'id']],
        ];
    }

    public function attributeLabels()
    {
        return [
            'username' => 'Nome de Usuário',
            'email' => 'Email',
            'password' => 'Senha',
            'id_curso' => 'Curso',
        ];
    }

    /**
     * Signs user up.
     *
     * @return User|null the saved model or null if saving fails
     */
    public function signup()
    {
        if (!$this->validate()) {
            return null;
        }

        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->setPassword($this->password);
        $user->generateAuthKey();
        $user->id_curso = $this->id_curso;

        return $user->save() ? $user : null;
    }
}
