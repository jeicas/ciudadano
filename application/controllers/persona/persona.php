<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Persona extends CI_Controller{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/persona/persona_model");
    $this->load->model("registrobasico/usuario/usuario_model");
  }
  public function obtenerPersona(){
    $username = $this->session->userdata('data');
    $variable=false;    
    if($this->input->get("nacionalidad")!="" && $this->input->get("cedula")!=""){
      if($username['login_ok']==false){
        $variable=true;
      }else if($username['tipousuario']==4){//TIPO USUARIO SOLICITANTE
        if(substr($username['usuario'],0,1)==$this->input->get("nacionalidad") && substr($username['usuario'],1)==$this->input->get("cedula")){
          $variable=true;
        }else{
          $variable=false;
        }
      }else{
        $variable=true;
      }
    }
    if($variable){
      $solicitante = $this->persona_model->obtenerPersona($this->input->get("nacionalidad"),$this->input->get("cedula"));
      $this->output->set_content_type('application/json');
      $this->output->set_output(json_encode(array(
        'success'   => true,
        'total'     => count($solicitante),
        'data'      => $solicitante
      )));
    }
  }
  public function obtenerContacto(){
    if($this->input->get("nacionalidad")!="" && $this->input->get("cedula")!=""){
      $contacto = $this->persona_model->obtenerContacto($this->input->get("nacionalidad"),$this->input->get("cedula"));
      $this->output->set_content_type('application/json');
      $this->output->set_output(json_encode(array(
        'success'   => true,
        'total'     => count($contacto),
        'data'      => $contacto
      )));
    }
  }
  public function guardarPersona(){
    $username = $this->session->userdata('data');
    $variable=false;
    if($this->input->post("nacionalidad")!="" && $this->input->post("cedula")!=""){
      if($username['tipousuario']==4){// TIPO USUARIO SOLICITANTE
        if(substr($username['usuario'],0,1)==$this->input->post("nacionalidad") && substr($username['usuario'],1)==$this->input->post("cedula")){
          $variable=true;
        }else{
          $variable=false;
        }
      }else{
        $variable=true;
      }      
    }
    if($variable){
      if($this->input->post("estatusPersona")==null || $this->input->post("estatusPersona")==""){
        $arregloPersona = array(
          'nacionalidad'     => $this->input->post("nacionalidad"),
          "cedula"           => $this->input->post("cedula"),
          "nombre"           => strtoupper($this->input->post("nombreSolicitante")),
          "apellido"         => strtoupper($this->input->post("apellidoSolicitante")),
          "correo"           => strtoupper($this->input->post("correo")),
          'fechanacimiento'  => $this->input->post("fechanacimiento"),
          "tlf1"             => $this->input->post('codTlf1').$this->input->post('movil'),
          "tlf2"             => $this->input->post('codTlf2').$this->input->post('local'),
          "parroquia"        => $this->input->post("parroquia"),
          "direccion"        => $this->input->post("direccion"),
          "estatus"          => 1
        );
        $insertPersona=$this->persona_model->insertPersona($arregloPersona);
        if($username['tipousuario']!=4){
            $arregloUsuario = array(
              'clave'        => $this->input->post("password"),
              "usuario"      => strtoupper($this->input->post("nacionalidad")).$this->input->post("cedula"),
              "tipousuario"  => 4,//operador solicitante
              "estatus"      => 1
            );
          $insertUsuario=$this->usuario_model->insertUsuario($arregloUsuario);
          $arregloSolicitante = array(            
            "persona"      => $insertPersona,
            "usuario"      => $insertUsuario,
            "estatus"      => 1
          );
          $solicitante=$this->persona_model->insertSolicitante($arregloSolicitante);
          $nombre=strtoupper($this->input->post("nombreSolicitante")).' '.strtoupper($this->input->post("apellidoSolicitante"));
          $this->emailUsuario($this->input->post("correo"),$nombre,$this->input->post("cedula"),$this->input->post("nacionalidad"),$this->input->post("clave"));
        }
      }else{
        $arregloPersona = array(        
          "nombre"           => strtoupper($this->input->post("nombreSolicitante")),
          "apellido"         => strtoupper($this->input->post("apellidoSolicitante")),
          "correo"           => strtoupper($this->input->post("correo")),
          'fechanacimiento'  => $this->input->post("fechanacimiento"),
          "tlf1"             => $this->input->post('codTlf1').$this->input->post('movil'),
          "tlf2"             => $this->input->post('codTlf2').$this->input->post('local'),
          "parroquia"        => $this->input->post("parroquia"),
          "direccion"        => $this->input->post("direccion"),
          "estatus"          => 1
        );
        $this->persona_model->updatePersona($arregloPersona,$this->input->post("nacionalidad"),$this->input->post("cedula"));
      }
      echo json_encode(array(
        "success"   => true,
        "guardo"    => true,
        "msg"       => 'Registrado con éxito.'
      )); 
    }else{
      echo json_encode(array(
        "success"   => true,
        "guardo"    => true,
        "msg"       => 'No se pudo registrar.'
      ));
    }       
  }
//**************************************************************
  public function emailUsuario($correo, $nombre,$cedula,$nacionalidad,$clave){    
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
    $this->load->library('email', $config);
    $this->email->from($correo, 'Atención al Ciudadano');
    $this->email->to($correo);
    $this->email->subject('Registro - Atención al Ciudadano');
    $this->email->message('<h1>Registro</h1>
      <p>Estimado(a): <b>'.$nombre.'</b></p>      
      <p>Puede acceder al sistema mediante las siguiente coordenadas:</p>
      <p>USUARIO: <b>'.strtoupper($nacionalidad).$cedula.'</b></p>
      <p>CLAVE POR DEFECTO: <b>'.$clave.'</b></p>
      <p></p>
      <p><b>Sístema de registro Atención al Ciudadano</b></p>
      <p><b>Lara... Tierra Progresista</b></p>');
    $this->email->send();
  }
}