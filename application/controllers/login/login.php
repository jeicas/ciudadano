<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller
{
  public function __construct(){
    parent::__construct();
    $this->load->helper('recaptchalib_helper');
    $this->load->helper(array('url', 'form'));
    $this->load->model("registrobasico/usuario/usuario_model");
    $this->load->model("login/login_model");
    $data = array('login_ok' => FALSE);
    $this->session->set_userdata('data',$data);        
  }
  public function index(){
    $this->load->view('login');
  }
  public function logout(){
    $this->session->sess_destroy();
    $this->index();
  }

  public function session(){
    $username = $this->session->userdata('data');
    $usu = $username['id'];
    if ($resulta=$this->usuario_model->verificasession($usu))  {  
      foreach ($resulta->result_array() as $row) {
        $data[] = array(
          'usuario'        => $row['usuario']
        );
      }
      $dato = array(
        'success' => true,
        'data' => $data,
      );
      echo json_encode($dato);
    }
  }

  public function traersession() {
    $username = $this->session->userdata('data');
    $cedula = $username['cedula'];
    $nacionalidad =$username['nacionalidad']; 
    $dato[] = array(
      'cedula'         => $cedula,
      'nacionalidad'   => $nacionalidad,
    );
    $this->output->set_output(json_encode(array(
      'data' => $dato
    ))); 
  }

  public function auth() {
    if ($this->input->post('user')){
      $usuario = $this->input->post('user');
      $contrasena = $this->input->post('pass');
      $resultado=array();
      $data = array();
      $resultado=$this->login_model->verificaUsuario($_POST['user'], $_POST['pass']);
      //echo json_encode($resultado->result_array());
      if ($resultado->num_rows() >0){
        foreach ($resultado->result_array() as $row){          
          $data = array(
            'id'          => $row['id'],
            'usuario'     => $row['usuario'],
            'tipousuario' => $row['tipousuario'],
            'ente'        => $row['ente'],
            'estatus'     => $row['estatus'],
            'login_ok'    => TRUE,
            'usuario_id'  => $_POST['user'],
            'password'    => $_POST['pass']
          );
          if ($data['estatus']==1){
            $this->session->set_userdata('data',$data);
            $post_array = $this->session->userdata('data');
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
              'success'=> true,
              'msg'    => 'usuario autentificado',
              'data'   => $data
            )));     
          }else{
            $this->output->set_output(json_encode(array(
            'success' => false,
            'msg' => 'Usuario esta inactivo,consulte al Administrador del Sistema'))); 
          }
        } 
      }else{
        $this->output->set_output(json_encode(array(
          'success' => false,
          'msg' => 'usuario o password incorrecto'
        ))); 
      }
    }else{
      $this->output->set_output(json_encode(array(
       'success' => false,
       'msg' => 'usuario o password incorrecto'))); 
    }
  }
  function verifica_captcha(){
    //aquí debemos la clave privada que recaptcha nos ha dado
    $privatekey = "6LcJAPUSAAAAABsytFmd3-n5h9oQ4NEoJY0Nbwmj";
    $resp = recaptcha_check_answer ($privatekey, $_SERVER["REMOTE_ADDR"], $this->input->post("recaptcha_challenge_field"), $this->input->post("recaptcha_response_field"));
    if (!$resp->is_valid){
      //si el captcha introducido es incorrecto se lo decimos
      echo json_encode(array("success" => false));
    }else{
      if($this->input->post("seleccion")==1){
        $usuario=$this->usuario_model->getUsuarioFuncionario($this->input->post("cedula"),$this->input->post("nacionalidad"),$this->input->post("correo"));
      }else if($this->input->post("seleccion")==2){
        $usuario=$this->usuario_model->getUsuarioPersona($this->input->post("cedula"),$this->input->post("nacionalidad"),$this->input->post("correo"));
      }else if($this->input->post("seleccion")==3){
        $usuario=$this->usuario_model->getUsuarioComunidad($this->input->post("cedula"),$this->input->post("nacionalidad"),$this->input->post("correo"));        
      }
      if($usuario!=false){
        foreach($usuario as $row){
          $id=$row->id;
        }
        $success= $this->usuario_model->updateContrasena($id,$this->input->post("contrasena"));
        $this->emailUsuario($id, $this->input->post("correo"));
        echo json_encode(array(
          "success" => true
        ));
      }else{
        echo json_encode(array("success" => false ));
      }
    }
  }
  public function emailUsuario($idUsuario, $correo){
    $config = Array(
      'protocol'  => 'smtp',
      'smtp_host' => 'ssl://smtp.googlemail.com',
      'smtp_port' => '465',
      'smtp_user' => 'pinedaisa@gmail.com',
      'smtp_pass' => 'jinisa2016',
      'mailtype'  => 'html',
      'starttls'  => true,
      'newline'   => "\r\n"
    );
    $usuario = $this->usuario_model->getUsuario($idUsuario);
    foreach ($usuario->result_array() as $row) {
      $usuario         = $row['usuario'];
    };     
    $this->load->library('email', $config);
    $this->email->from($correo, 'ESCUPOL');
    $this->email->to($correo);
    $this->email->subject('Datos del Usuario - ESCUPOL');
    $this->email->message('<h1>Atención:</h1>
      <p>La contraseña para el usuario: '.$usuario.' fue restablecida. </p>');
    $this->email->send();
  }
}