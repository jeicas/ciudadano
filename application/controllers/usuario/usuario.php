<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario extends CI_Controller
{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/usuario/usuario_model");
    $this->load->model("registrobasico/usuario/tipousuario_model");
  }
  public function obtenerUsuario(){
    $usuario = $this->usuario_model->obtenerUsuario();
    if($usuario->num_rows()>0){
      foreach ($usuario->result_array() as $row){
        $data[] = array(
          'idU'               => $row['idU'],
          'cedula'            => $row['cedula'],
          'nacionalidad'      => $row['nacionalidad'],
          'nombre'            => $row['nombre'],
          'nombrecompleto'    => $row['nombre'].' '.$row['apellido'],
          'apellido'          => $row['apellido'],
          'usuario'           => $row['usuario'],
          'correo'            => $row['correo'],
          'tipousuario'       => $row['tipousuario'],
          'tipo_usuario'      => $row['tipo_usuario'],
          'funcionario'       => $row['funcionario'],
          'uestatus'          => $row['uestatus']
        );
      }
    }
    $output = array(
      'success'   => true,
      'total'     => count($data),
      'data'      => array_splice($data,$this->input->get("start"),$this->input->get("limit"))
    );
    echo json_encode($output);
  }
  public function guardarUsuario(){
    if($this->input->post("idU")==''){
      $existeUsuario=$this->usuario_model->existeUsuario($this->input->post("usuario"));
      if($existeUsuario==false){
        $arregloUsuario = array(
          'usuario'       => strtoupper($this->input->post("usuario")),
          "clave"         => $this->input->post("clave"),
          'tipousuario'   => $this->input->post("tipousuario"),
          'funcionario'   => $this->input->post("funcionario"),
          'estatus'       => $this->input->post("uestatus")
        );
        $this->usuario_model->insertUsuario($arregloUsuario);
        if(mysql_affected_rows()>0){
          echo json_encode(array(
            "success"   => true,
            "msg"       => "Usuario registrado con exito."
          ));
        }else{
          echo json_encode(array(
            "success"   => false,
            "msg"       => "No se puedo registrar el usuario."
          ));
        }
      }else{
        echo json_encode(array(
          "success"   => false,
          "msg"       => "Nombre de usuario ya registrado, verifique."
        ));
      }
    }else{
      $actualizar = $this->actualizarUsuario($this->input->post("idU"));
      if($actualizar){
        echo json_encode(array(
          "success"   => true,
          "actualizo" => true,
          "guardo"    => false,
          "msg"       => "Usuario actualizado con exito."
        ));
      }else{
        echo json_encode(array(
          "success"   => true,
          "actualizo" => false,
          "guardo"    => false,
          "msg"       => "No se pudo actualizar el usuario."
        ));
      }
    }
  }
  public function actualizarUsuario($id){
    $arregloUsuario = array(
      //'usuario'       => strtoupper($this->input->post("usuario")),
      "clave"         => $this->input->post("clave"),
      'tipousuario'   => $this->input->post("tipousuario"),
      'funcionario'   => $this->input->post("funcionario"),
      'estatus'       => $this->input->post("uestatus")
    );
    $this->usuario_model->updateUsuario($id,$arregloUsuario);
    if(mysql_affected_rows()>0){
      return true;
    }else{
      return false;
    }
  }
  public function obtenerTipoUsuario(){
    $tipoUsuario = $this->tipousuario_model->obtenerTipoUsuario();
    foreach ($tipoUsuario->result_array() as $row){
      $data[] = array(
      'id'      => $row['id'],
      'nombre'  => $row['nombre']);
    }
    $output = array(
      'success' => true,
      'data'    => $data,
      'total'   => count($data));
    echo json_encode($output);
  }
  public function updateContrasena(){
    $clave=$this->input->post('contrasena');        
    $claveNueva=$this->input->post('clave');        
    $username = $this->session->userdata('data');
    $id=$username['id'];
    $claveActual=$this->usuario_model->claveActual($id,$clave);
    if($claveActual->num_rows()>0){         
      $resultado=$this->usuario_model->updateContrasena($id,$claveNueva);
      if(mysql_affected_rows()>0){
        echo json_encode(array(
          "success"   => true,
          "msg"       => " Actualizado con Exito."
        ));
      }else{
        echo json_encode(array(
          "success"   => false,
          "msg"       => "No se puedo Actualizar."
        ));
      }
    }else{
      echo json_encode(array(
        "success"   => false,
        "msg"       => "No se puedo Actualizar. Campo clave actual invalido"
      ));
    }
  }
}