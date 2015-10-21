<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Division extends CI_Controller
{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/ente/division_model");
  }  
  public function obtenerDivision(){
    $ente=$this->input->get("id");
    //echo ($ente);
    $division = $this->division_model->obtenerDivision($ente);
    foreach ($division->result_array() as $row){
      $data[] = array(
        'id'        => $row['id'],
        'nombre'    => $row['nombre'],
        'ente'      => $row['ente']
      );
    }
    $output = array(
     'success'   => true,
     'total'     => count($data),
     'data'      => $data
    );
    echo json_encode($output);
  }
  public function guardarDivision(){
    $obj = $_POST['recordsGrid'];
    //echo($obj);
    if(isset($obj)){
      $records = json_decode($obj);      
      foreach($records as $record){        
        $arregloDivision = array(          
          "nombre" => mb_strtoupper($record->nombre,'utf-8'),
          "ente"   => $record->ente
        );
        if($record->id1===""){
          $this->division_model->updateDivision($arregloDivision,$record->id);          
        }else{
          $this->division_model->insertDivision($arregloDivision);          
        }
      }      
      echo json_encode(array(
        "success"   => true,
        "actualizo" => true,
        "guardo"    => false,
        "msg"       => 'Divisiones registradas con exito.'
      ));      
    }else{
      echo json_encode(array(
        "success"   => false,
        "actualizo" => $updateD1,
        "guardo"    => $updateD,
        "msg"       => 'No se pudo registrar.'
      ));
    }
  }
  public function eliminarDivision(){
    $obj = $_POST['recordsGrid'];
    $records = json_decode(stripslashes($obj));    
    foreach($records as $record){      
      if($record->id1===""){
        $existe1= $this->division_model->buscarDivisionAuditoria($record->id);
        $existe2= $this->division_model->buscarDivisionFuncionario($record->id);
        if($existe1!=true && $existe2!=true){
          $this->division_model->eliminarDivision($record->id);
          echo json_encode(array(
            "success"   => true,
            "actualizo" => true,
            "guardo"    => false,
            "msg"       => 'División eliminada con exito.'
          ));
        }else{
          echo json_encode(array(
            "success"   => false,
            "actualizo" => false,
            "guardo"    => false,
            "msg"       => 'No se pudo eliminar. División esta en uso.'
          ));
        }
      }
    }    
  }
}