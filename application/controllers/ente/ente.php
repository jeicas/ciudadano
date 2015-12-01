<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ente extends CI_Controller
{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/ente/ente_model");
  }
  public function obtenerEnteGrid(){    
    $ente = $this->ente_model->obtenerEnte();      
    foreach ($ente->result_array() as $row){
      $data[] = array(
        'id'        => $row['id'],
        'nombre'    => $row['nombre'],
        'tipo'      => $row['tipo'],
        'direccion' => $row['direccion'],
        'parroquia' => $row['parroquia']        
      );
    }
    $output = array(
     'success'   => true,
     'total'     => count($data),
     'data'      => array_splice($data,$this->input->get("start"),$this->input->get("limit"))
    );
    echo json_encode($output);
  }
  public function obtenerEnte(){
    $admon=$this->input->get("id");
    //echo($admon);
    if($admon==''){      
      $ente = $this->ente_model->obtenerEnte();
    }else{
      $ente = $this->ente_model->obtenerEnteAdmon($admon);
    }
    foreach ($ente->result_array() as $row){
      $data[] = array(
        'id'        => $row['id'],
        'nombre'    => $row['nombre'],
        'tipo'      => $row['tipo'],
        'direccion' => $row['direccion'],
        'parroquia' => $row['parroquia']
      );
    }
    $output = array(
     'success'   => true,
     'total'     => count($data),
     'data'      => $data
    );
    echo json_encode($output);
  }
  public function actualizarEnte($ente){   
    $arregloEnte = array(                
      "nombre"           => strtoupper($this->input->post("nombre")),          
      "tipo"             => $this->input->post("tipo"),          
      "parroquia"        => $this->input->post("parroquia"),
      "direccion"        => mb_strtoupper($this->input->post("direccion"),'utf-8'),
      "tlf1"             => $this->input->post('codTlf').$this->input->post('local')
    );
    
    
      $arregloEnte_sector = array(                
      "ente"           => $ente,          
      "sector"             => $this->input->post("sector"),          
    );
      
       $this->ente_model->insertEnteSector($arregloEnte_sector);    
      
    $this->ente_model->updateEnte($ente,$arregloEnte);    
    if(mysql_affected_rows()>0){
        return true;           
    }else{
        return false;
    }
  }
    public function guardarEnte(){
      $ente=$this->input->post("id");
      
      if($ente!=''){
        $actualizar=$this->actualizarEnte($ente);
        if($actualizar){
          echo json_encode(array(
            "success"   => true,
            "actualizo" => true,
            "guardo"    => false,
            "msg"       => 'Ente público actualizado con éxito.'
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
        $arregloEnte = array(                
          "nombre"           => strtoupper($this->input->post("nombre")),          
          "tipo"             => $this->input->post("tipo"),          
          "parroquia"        => $this->input->post("parroquia"),
          "direccion"        => strtoupper($this->input->post("direccion")),
          "tlf1"             => $this->input->post('codTlf').$this->input->post('local'),          
          "estatus"          => '1'
        );
        $this->ente_model->insertEnte($arregloEnte);        
        if(mysql_affected_rows()>0){
          echo json_encode(array(
            "success"   => true,
            "actualizo" => false,
            "guardo"    => true,
            "msg"       => 'Ente público registrado con éxito.'
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
  public function eliminarEnte(){
    $ente=$this->input->post("id");
    $existeDivision=$this->ente_model->buscarEnteDivision($ente);
    $existeFuncionario=$this->ente_model->buscarEnteFuncionario($ente);
    if($existeDivision==false && $existeFuncionario==false){
        $this->ente_model->eliminarEnte($ente);
        if(mysql_affected_rows()>0){
            echo json_encode(array(
                "success"   => true,
                "actualizo" => true,
                "guardo"    => false,
                "msg"       => 'Ente público eliminado con éxito.'
            ));
        }else{
            echo json_encode(array(
                "success"   => false,
                "actualizo" => false,
                "guardo"    => false,
                "msg"       => 'No se pudo eliminar.'
            ));
        }
    }else{
        echo json_encode(array(
            "success"   => true,
            "actualizo" => false,
            "guardo"    => false,
            "msg"       => 'No se pudo eliminar. Ente público en uso.'
        ));
    }
  }
}