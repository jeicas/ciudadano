<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Funcionario extends CI_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("registrobasico/funcionario/funcionario_model");
        $this->load->model("registrobasico/persona/persona_model");
        $this->load->model("registrobasico/usuario/usuario_model");
    }
    public function obtenerFuncionario(){
        $username = $this->session->userdata('data');        
        if($this->input->get("cedula")==''){
            if($username['tipousuario']==1){
                $funcionario = $this->funcionario_model->catalogoFuncionario();
            }else{
                $funcionario = $this->funcionario_model->catalogoFuncionarioOficina($username['id']);
            }
        }else{
            $funcionario = $this->funcionario_model->obtenerFuncionario($this->input->get("nacionalidad"),$this->input->get("cedula"));
        }
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success'   => true,
            'total'     => count($funcionario),
            'data'      => $funcionario
        )));
    }    
    public function eliminarFuncionario(){            
        $this->funcionario_model->eliminarFuncionario($this->input->post("idF"));            
        $this->usuario_model->eliminarUsuario($this->input->post("idU"));
        $this->persona_model->eliminarPersona($this->input->post("idF"));
        if(mysql_affected_rows()>0){
            echo json_encode(array(
                "success"   => true,
                "actualizo" => true,
                "guardo"    => false,
                "msg"       => 'Funcionario eliminado con éxito.'
            ));
        }else{
            echo json_encode(array(
                "success"   => false,
                "actualizo" => false,
                "guardo"    => false,
                "msg"       => 'No se pudo eliminar.'
            ));
        }
    }
    public function activarFuncionario(){
        $this->funcionario_model->activarFuncionario($this->input->post("idF"));
        $this->usuario_model->activarUsuario($this->input->post("idU"));
        $this->persona_model->activarPersona($this->input->post("idF"));        
        if(mysql_affected_rows()>0){
            echo json_encode(array(
                "success"   => true,
                "actualizo" => true,
                "guardo"    => false,
                "msg"       => 'Funcionario activado con éxito.'
            ));
        }else{
            echo json_encode(array(
                "success"   => false,
                "actualizo" => false,
                "guardo"    => false,
                "msg"       => 'No se pudo activar.'
            ));
        }
    }
    public function actualizarFuncionario(){
       $arregloPersona = array(
            "nombre"           => strtoupper($this->input->post("nombre")),
            "apellido"         => strtoupper($this->input->post("apellido")),
            "sexo"             => $this->input->post("sexo"),
            "correo"           => strtoupper($this->input->post("correo")),
            'fechanacimiento'  => $this->input->post("fechanacimiento"),//formato fecha
            "parroquia"        => $this->input->post("parroquia"),
            "direccion"        => strtoupper($this->input->post("direccion")),
            "tlf1"             => $this->input->post('codTlf1').$this->input->post('movil'),
            "tlf2"             => $this->input->post('codTlf2').$this->input->post('local'),
            "estatus"          => 1            
        );
        $this->persona_model->updatePersona($arregloPersona,$this->input->post("nacionalidad"),$this->input->post("cedula"));        
        $arregloFuncionario = array(
            "ente"             => $this->input->post("ente")
        );
        $this->funcionario_model->updateFuncionario($this->input->post("idF"),$arregloFuncionario);
        $arregloUsuario = array(
            "clave"             => $this->input->post("pass"),
            "tipousuario"       => $this->input->post("tipousuario"),
        );
        $this->usuario_model->updateUsuario($this->input->post("idU"),$arregloUsuario);
        return true;        
    }
    public function guardarFuncionario(){        
        if($this->input->post("idF")!=''){
            $actualizar=$this->actualizarFuncionario();
            if($actualizar){
                echo json_encode(array(
                    "success"   => true,
                    "actualizo" => true,
                    "guardo"    => false,
                    "msg"       => 'Funcionario actualizado con éxito.'
                ));
            }else{
                echo json_encode(array(
                    "success"   => true,
                    "actualizo" => false,
                    "guardo"    => false,
                    "msg"       => 'No se pudo actualizar, verifique los datos.'
                ));
            }
        }else{
            $arregloPersona = array(
                'nacionalidad'     => $this->input->post("nacionalidad"),
                "cedula"           => $this->input->post("cedula"),
                "nombre"           => strtoupper($this->input->post("nombre")),
                "apellido"         => strtoupper($this->input->post("apellido")),
                "sexo"             => $this->input->post("sexo"),
                "correo"           => strtoupper($this->input->post("correo")),
                'fechanacimiento'  => $this->input->post("fechanacimiento"),//formato fecha
                "parroquia"        => $this->input->post("parroquia"),
                "direccion"        => strtoupper($this->input->post("direccion")),
                "tlf1"             => $this->input->post('codTlf1').$this->input->post('movil'),
                "tlf2"             => $this->input->post('codTlf2').$this->input->post('local'),
                "estatus"          => 1
            );
            $insertPersona=$this->persona_model->insertPersona($arregloPersona);
            $arregloUsuario = array(                
                "usuario"      => $this->input->post("usuario"),
                "clave"        => $this->input->post("pass"),
                "tipousuario"  => $this->input->post("tipousuario"),
                "ente"             => $this->input->post("ente"),
                "estatus"      => '1'
            );
            $insertUsuario=$this->usuario_model->insertUsuario($arregloUsuario);
            $arregloFuncionario = array(
                "persona"          => $insertPersona,
                "ente"             => $this->input->post("ente"),
                "usuario"          => $insertUsuario,                
                "estatus"          => '1'
            );
            $insertFuncionario=$this->funcionario_model->insertFuncionario($arregloFuncionario);
            if(mysql_affected_rows()>0){
                echo json_encode(array(
                    "success"   => true,
                    "actualizo" => false,
                    "guardo"    => true,
                    "msg"       => 'Funcionario registrado con éxito.'
                ));
            }else{
                echo json_encode(array(
                    "success"   => false,
                    "actualizo" => false,
                    "guardo"    => false,
                    "msg"       => 'No se pudo registrar, verifique los datos.'
                ));
            }            
        }
    }
}