<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Comunidad extends CI_Controller{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/persona/persona_model");
    $this->load->model("registrobasico/comunidad/comunidad_model");
    $this->load->model("registrobasico/usuario/usuario_model");
  }
  public function obtenerComunidad(){
    $username = $this->session->userdata('data');
    $variable=false;
    if($this->input->get("nacionalidad")!="" && $this->input->get("cedula")!=""){
      if($username['login_ok']==false){
        $variable=true;
      }else if($username['tipousuario']==4){
        if(substr($username['usuario'],0,1)==$this->input->get("nacionalidad") && substr($username['usuario'],1)==$this->input->get("cedula")){
          $variable=true;
        }else{
          $variable=false;
        }
      }else{
        //}else if($username['tipousuario']==3){
        $variable=true;
      }      
    }
    if($variable){
      $solicitante = $this->comunidad_model->obtenerComunidad($this->input->get("nacionalidad"),$this->input->get("cedula"));
      $this->output->set_content_type('application/json');
      $this->output->set_output(json_encode(array(
        'success'   => true,
        'total'     => count($solicitante),
        'data'      => $solicitante
      )));
    }
  }
  public function guardarComunidad(){
    $username = $this->session->userdata('data');
    $variable=false;
    if($this->input->post("nacionalidad")!="" && $this->input->post("cedula")!=""){
      if($username['tipousuario']==4){
        if(substr($username['usuario'],0,1)==$this->input->post("nacionalidad") && substr($username['usuario'],1)==$this->input->post("cedula")){
          $variable=true;
        }else{
          $variable=false;
        }
      }else{
      //}else if($username['tipousuario']==3){
        $variable=true;
      }      
    }
    if($variable){
      if($this->input->post("estatusContacto")==null || $this->input->post("estatusContacto")==""){
        $arregloContacto = array(
          'nacionalidad'     => $this->input->post("nacionalidadC"),
          "cedula"           => $this->input->post("cedulaC"),
          "nombre"           => strtoupper($this->input->post("nombreContacto")),
          "apellido"         => strtoupper($this->input->post("apellidoContacto")),
          "correo"           => strtoupper($this->input->post("correoC")),
          'fechanacimiento'  => $this->input->post("fechanacimientoC"),
          "tlf1"             => $this->input->post('ccodTlf1').$this->input->post('movilC'),
          "tlf2"             => $this->input->post('ccodTlf2').$this->input->post('localC'),
          "parroquia"        => $this->input->post("parroquiaC"),
          "direccion"        => $this->input->post("direccionC"),
          "estatus"          => 1
        );
        $insertPersona=$this->persona_model->insertPersona($arregloContacto);
      }else{
        $arregloContacto = array(        
          "nombre"           => strtoupper($this->input->post("nombreContacto")),
          "apellido"         => strtoupper($this->input->post("apellidoContacto")),
          "correo"           => strtoupper($this->input->post("correoC")),
          'fechanacimiento'  => $this->input->post("fechanacimientoC"),
          "tlf1"             => $this->input->post('ccodTlf1').$this->input->post('movilC'),
          "tlf2"             => $this->input->post('ccodTlf2').$this->input->post('localC'),
          "parroquia"        => $this->input->post("parroquiaC"),
          "direccion"        => $this->input->post("direccionC"),
          "estatus"          => 1
        );
        $updatePersona=$this->persona_model->updatePersona($arregloContacto,$this->input->post("nacionalidadC"),$this->input->post("cedulaC"));
      }
      if($this->input->post("estatusComunidad")==null || $this->input->post("estatusComunidad")==""){
        $arregloComunidad = array(
          'rifletra'         => $this->input->post("nacionalidad"),
          "rifnumero"        => $this->input->post("cedula"),
          "razonsocial"      => strtoupper($this->input->post("razonSolicitante")),
          "correo"           => strtoupper($this->input->post("correo")),
          "parroquia"        => $this->input->post("parroquia"),
          "direccion"        => strtoupper($this->input->post("direccion")),
          "tlf1"             => $this->input->post('codTlf1').$this->input->post('movil'),
          "tlf2"             => $this->input->post('codTlf2').$this->input->post('local'),
          "persona"          => $insertPersona,          
          "estatus"          => 1
        );
        $insertComunidad=$this->comunidad_model->insertComunidad($arregloComunidad);
        if($username['tipousuario']!=4){
            $arregloUsuario = array(
              'clave'        => $this->input->post("password"),
              "usuario"      => strtoupper($this->input->post("nacionalidad")).$this->input->post("cedula"),
              "tipousuario"  => 4,
              "estatus"      => 1
            );
          $insertUsuario=$this->usuario_model->insertUsuario($arregloUsuario);
          $arregloSolicitante = array(
            "comunidad"    => $insertComunidad,
            "usuario"      => $insertUsuario,
            "estatus"      => 1
          );
          $solicitante=$this->persona_model->insertSolicitante($arregloSolicitante);
          $nombre=strtoupper($this->input->post("razonSolicitante"));
          $this->emailUsuario($this->input->post("correo"),$nombre,$this->input->post("cedula"),$this->input->post("nacionalidad"),$this->input->post("clave"));
        }
      }else{
        $arregloComunidad = array(        
          "razonsocial"      => strtoupper($this->input->post("razonSolicitante")),
          "correo"           => strtoupper($this->input->post("correo")),
          "parroquia"        => $this->input->post("parroquia"),
          "direccion"        => strtoupper($this->input->post("direccion")),
          "tlf1"             => $this->input->post('codTlf1').$this->input->post('movil'),
          "tlf2"             => $this->input->post('codTlf2').$this->input->post('local'),
          "persona"          => $updatePersona,  
          "estatus"          => 1
        );
        $this->comunidad_model->updateComunidad($arregloComunidad,$this->input->post("nacionalidad"),$this->input->post("cedula"));
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
      'smtp_user' => '´pinedaisa@gmail.com',
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