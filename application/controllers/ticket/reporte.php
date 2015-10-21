<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reporte extends CI_Controller{
  public function __construct(){
      parent::__construct();
      $this->load->model("ticket/reporteticket_model");
  }
  public function reporteMunicipio(){
    $username = $this->session->userdata('data');
    $parroquia=($this->input->get("parroquia")!='')?'='.$this->input->get("parroquia"):'LIKE "%"';
    $desde=($this->input->get("desde")!='')?substr($this->input->get("desde"),0,10):'LIKE "%"';
    $hasta=($this->input->get("hasta")!='')?substr($this->input->get("hasta"),0,10):date('Y-m-d');
    $municipio=($this->input->get("municipio")!='')?'='.$this->input->get("municipio"):'LIKE "%"';
    $ticket = $this->reporteticket_model->reporteMunicipio($parroquia,$municipio,$desde,$hasta);
    $this->output->set_content_type('application/json');
    $this->output->set_output(json_encode(array(
      'success'   => true,
      'total'     => count($ticket),
      'data'      => $ticket
    )));
  }
  public function reporteSector(){
    $username = $this->session->userdata('data');
    $tipo=($this->input->get("tipoTicket")!='')?'='.$this->input->get("tipoTicket"):'LIKE "%"';
    $desde=($this->input->get("desde")!='')?substr($this->input->get("desde"),0,10):'LIKE "%"';
    $hasta=($this->input->get("hasta")!='')?substr($this->input->get("hasta"),0,10):date('Y-m-d');
    $sector=($this->input->get("sectorTicket")!='')?'='.$this->input->get("sectorTicket"):'LIKE "%"';        
    $ticket = $this->reporteticket_model->reporteSector($sector,$tipo,$desde,$hasta);
    $this->output->set_content_type('application/json');
    $this->output->set_output(json_encode(array(
      'success'   => true,
      'total'     => count($ticket),
      'data'      => $ticket
    )));
  }
}