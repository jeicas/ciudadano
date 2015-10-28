<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Solicitud extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model("ticket/atenderticket_model");
    }
    public function historicoTicket(){
      $username = $this->session->userdata('data');            
      if($username['tipousuario']==4){
        $ticket = $this->atenderticket_model->obtenerTicketSolicitante($username['id']);
      }else{
        if($this->input->get("cedula")!=''){
          $variable=" WHERE persona.nacionalidad='".$this->input->get("nacionalidad")."' AND persona.cedula=".$this->input->get("cedula");
        }else{
          if($this->input->get("rifnumero")!=''){
            $variable=" WHERE comunidad.rifletra='".$this->input->get("rifletra")."' AND comunidad.rifnumero=".$this->input->get("rifnumero");
          }else{          
            $variable="";
          }
        }
        $ticket = $this->atenderticket_model->obtenerTicket($variable);
      }
      $this->output->set_content_type('application/json');
      $this->output->set_output(json_encode(array(
        'success'   => true,
        'total'     => count($ticket),
        'data'      => $ticket
      )));
    }
}