<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipoticket extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model("ticket/tipoticket_model");
    }
    public function obtenerTipoTicket(){
        $tipoticket = $this->tipoticket_model->obtenerTipoTicket();
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
          'success'   => true,
          'total'     => count($tipoticket),
          'data'      => $tipoticket
        )));
    }
}