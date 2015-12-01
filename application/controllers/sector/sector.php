<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sector extends CI_Controller{
  public function __construct(){
    parent::__construct();
    $this->load->model("registrobasico/sector/sector_model");
  }
  public function obtenerSectorEnte(){
      $username = $this->session->userdata('data');
      
    $sector = $this->sector_model->obtenerSectorEnte($username['ente']);
    $this->output->set_content_type('application/json');
    $this->output->set_output(json_encode(array(
      'success'   => true,
      'total'     => count($sector),
      'data'      => $sector
    )));
  }
    public function obtenerSector(){
      $username = $this->session->userdata('data');
      
    $sector = $this->sector_model->obtenerSector();
    $this->output->set_content_type('application/json');
    $this->output->set_output(json_encode(array(
      'success'   => true,
      'total'     => count($sector),
      'data'      => $sector
    )));
  }
  public function obtenerSectorTipoayuda(){
    if($this->input->get("sector")!=""){
      $sector = $this->sector_model->obtenerSectorTipoayuda($this->input->get("sector"));
      $this->output->set_content_type('application/json');
      $this->output->set_output(json_encode(array(
        'success'   => true,
        'total'     => count($sector),
        'data'      => $sector
      )));
    }
  }
}