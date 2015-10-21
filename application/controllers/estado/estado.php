<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Estado extends CI_Controller
{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/estado/estado_model");
    $this->load->model("registrobasico/estado/municipio_model");
    $this->load->model("registrobasico/estado/parroquia_model");
  }
  public function obtenerEstado(){
    $estados = $this->estado_model->obtenerEstado();
    foreach ($estados->result_array() as $row){
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
  public function obtenerMunicipio(){
    if($this->input->get("estado")==null || $this->input->get("estado")==''){
      $estado='11';
    }else{
      //$estado=$this->input->get("estado");
      $estado='11';
    }
    $municipio = $this->municipio_model->obtenerMunicipio($estado);
    foreach ($municipio->result_array() as $row){
      $data[] = array(
        'id'      => $row['id'],
        'nombre'  => $row['nombre'],
        'estado'  => $row['estado']);
    }
    $output = array(
      'success' => true,
      'data'    => $data,
      'total'   => count($data));
    echo json_encode($output);
  }
  public function obtenerParroquia(){
    $parroquias = $this->parroquia_model->obtenerParroquia($this->input->get("municipio"));
    foreach ($parroquias->result_array() as $row){
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
}