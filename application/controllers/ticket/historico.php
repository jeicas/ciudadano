<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Historico extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("ticket/historicoticket_model");
        $this->load->model("registrobasico/sector/sector_model");
    }

    public function historicoTicket() {
        
        $username = $this->session->userdata('data');
        
        if ($username['tipousuario'] == 4) {
            $ticket = $this->historicoticket_model->obtenerTicketSolicitante($username['id']);
        } else {
             
            if ($username['tipousuario'] == 1){
                if ($this->input->get("cedula") != '') {
                    $variable = " WHERE persona.nacionalidad='" . $this->input->get("nacionalidad") . "' AND persona.cedula=" . $this->input->get("cedula");
                } else {
                   
                    if ($this->input->get("rifnumero") != '') {
                        $variable = " WHERE comunidad.rifletra='" . $this->input->get("rifletra") . "' AND comunidad.rifnumero=" . $this->input->get("rifnumero");
                    } else {
                        $variable = "";
                    }
                }
                $ticket = $this->historicoticket_model->obtenerTicket($variable);
            } else {
                 
                //obtenemos el sector o sectores al que pertenece el ente loqueado

                $sector = $this->sector_model->obtenerEnteSector($username['ente']);
                 
                foreach ($sector->result_array() as $rows) {
                    
                    if ($this->input->get("cedula") != '') {
                        $variable = " WHERE persona.nacionalidad='" . $this->input->get("nacionalidad") . "' AND persona.cedula=" . $this->input->get("cedula") . " AND sector.id=" . $rows['id'];
                    } else {
                        if ($this->input->get("rifnumero") != '') {
                            $variable = " WHERE comunidad.rifletra='" . $this->input->get("rifletra") . "' AND comunidad.rifnumero=" . $this->input->get("rifnumero") . " AND sector.id=" . $rows['id'];
                        } else {
                            $variable = "AND sector.id=" . $rows['id'];
                        }
                    }
                    $ticket = $this->historicoticket_model->obtenerTicket($variable);
                    $this->output->set_content_type('application/json');
                    $this->output->set_output(json_encode(array(
                        'success' => true,
                        'total' => count($ticket),
                        'data' => $ticket
                    )));
                }
            }
        }
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($ticket),
            'data' => $ticket
        )));
    }

}
