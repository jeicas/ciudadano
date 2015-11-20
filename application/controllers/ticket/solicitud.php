<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Solicitud extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("ticket/atenderticket_model");
        $this->load->model("ticket/ticket_model");
    }

    public function historicoTicket() {
        $username = $this->session->userdata('data');
        if ($username['tipousuario'] == 4) {
            $ticket = $this->atenderticket_model->obtenerTicketSolicitante($username['id']);
        } else {
            if ($this->input->get("cedula") != '') {
                $variable = " WHERE persona.nacionalidad='" . $this->input->get("nacionalidad") . "' AND persona.cedula=" . $this->input->get("cedula");
            } else {
                if ($this->input->get("rifnumero") != '') {
                    $variable = " WHERE comunidad.rifletra='" . $this->input->get("rifletra") . "' AND comunidad.rifnumero=" . $this->input->get("rifnumero");
                } else {
                    $variable = "";
                }
            }
            $ticket = $this->atenderticket_model->obtenerTicket($variable);
        }
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($ticket),
            'data' => $ticket
        )));
    }

    public function buscarProcedimientoTicket() {
        $tipolimi = array();
        $ticket = $this->input->get('ticket');

        $tipolimi = $this->atenderticket_model->obtenerProcedimientoTicket($ticket);

        if ($tipolimi) {

            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                "success" => True,
                'data' => $tipolimi)));
        }
    }

    public function aprobarSolicitudTicket() {
        $tipolimi = array();
        $ticket = $this->input->post('idticket');
        $sol = array(
            'id' => $ticket,
            'estatus' => 4
        );

        $tipolimi = $this->ticket_model->updateEstatusTicket($sol);
        if ($tipolimi) {

            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Solicitud Aprobada',
                "success" => True,
                'data' => $tipolimi)));
        }
    }

    public function rechazarSolicitudTicket(){
         $ticket = $this->input->post('idticket'); 
         $tipoayuda = $this->input->post('idtipoayuda'); 
        $observacion =$this->input->post('observacion'); 
        //$tipolimi = array();
       /* 
        */     
        
      
        $sol = array(
            'id' => $ticket,
            'estatus' => 5
        );  

       
       
        $soli = array(
            'ticket' => $ticket,
            'tipoayuda' => $tipoayuda,
            'observacion' => $observacion
        );
        
       
       
       $tipolimit = $this->ticket_model->updateObservacionTicket($soli);
      $tipolimi = $this->ticket_model->updateEstatusTicket($sol);
        if ($tipolimi) {
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Solicitud Rechazada satisfactoriamente',
                "success" => True,
                'data' => $tipolimi)));
        }
        
     
    }

    public function enviarMensajeFuncionarioProcedimientoTicket() {
        $tipolimi = array();
        
        $ticket = $this->input->post('ticket');
        $observacion = $this->input->post('observacion');
        $actividad = $this->input->post('procedimiento');
          
        
        $solic = array(
            'id' => $ticket, 
            'actividad' => $actividad,
            'observacionresponsable' => $observacion,
            
        );

        $tipolimi = $this->ticket_model->mensajeFuncionarioProdedimiento($solic);

        if ($tipolimi) {
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Mensaje Enviado',
                "success" => True,
                'data' => $tipolimi)));
        }else {
            $this->output->set_output(json_encode(array(
                'msg' => 'Mensaje no Enviado. Verifique',
                "success" => True,
                'data' => $tipolimi)));
        }
    }

}
