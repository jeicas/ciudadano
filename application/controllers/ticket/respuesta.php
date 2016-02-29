<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Respuesta extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("ticket/ticket_model");
        $this->load->model("ticket/historicoticket_model");
        $this->load->model("ticket/respuestaticket_model");
        $this->load->model("ticket/ticket_model");
        $this->load->model("tramite/tramite_model");
        $this->load->model("registrobasico/usuario/usuario_model");
    }

    public function respuestaTicket() {
        $username = $this->session->userdata('data');
        $tipo = ($this->input->get("tipoTicket") != '') ? '=' . $this->input->get("tipoTicket") : 'LIKE "%"';
        $desde = ($this->input->get("desde") != '') ? substr($this->input->get("desde"), 0, 10) : 'LIKE "%"';
        $hasta = ($this->input->get("hasta") != '') ? substr($this->input->get("hasta"), 0, 10) : date('Y-m-d');
        if ($username['tipousuario'] == 1) {
            $sector = ($this->input->get("sectorTicket") != '') ? '=' . $this->input->get("sectorTicket") : 'LIKE "%"';
            $ticket = $this->respuestaticket_model->obtenerTicket($sector, $tipo, $desde, $hasta);
           // echo json_encode($username['id'] . ' tipo ' . $tipo . ' Desde ' . $desde . ' Hasta' . $hasta);
        } else if ($username['tipousuario'] == 2) {

            $ticket = $this->respuestaticket_model->obtenerTicket2($username['id'], $tipo, $desde, $hasta);
            //echo json_encode($username['id'] . ' tipo ' . $tipo . ' Desde ' . $desde . ' Hasta' . $hasta);
        }
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($ticket),
            'data' => $ticket
        )));
    }

    public function insertRespuesta() {
        //$this->input->post("descripcion");
        //buscamos si tiene tramites registrados
        $username = $this->session->userdata('data');
        if ($this->input->post("tipoTicket") == 'PETICIÓN') {
            $tramite = $this->tramite_model->cuantosTramites($username['ente']);

            if ($tramite != null) {
                /*                 * ************************************** */
                // Guarda el procedimiento de la solicitud creada
                //tramite que tiene asocioado a la peticion
                //echo json_encode($this->input->post("sector").$record->ayuda);
                $tipoayuda = $this->ticket_model->obtenerTipoAyudaTicket($this->input->post("idTicket"));
                foreach ($tipoayuda->result_array() as $row) {
                    $idtipoayuda = $row['tipoayuda'];
                }

                $procedimiento = $this->tramite_model->obtenerActividadTramite($this->input->post("sector"), $idtipoayuda);

                foreach ($procedimiento->result_array() as $proc) {

                    $dataTicketProcedimiento = array(
                        "ticket" => $this->input->post("idTicket"),
                        "actividad" => $proc['actividad'],
                        "estatus" => $proc['estatus'],
                    );
                    $ticketAct = $this->ticket_model->insertTicketActividad($dataTicketProcedimiento);
                }


                /*                 * **************************************** */

                /*                 * ************************************** */
                // Guarda los recaudos que pertenecen a la solicitud creada
                //recaudos que tiene asocioado a la peticion  

                $procedimiento2 = $this->tramite_model->obtenerRecaudosTramite($this->input->post("sector"), $idtipoayuda);

                foreach ($procedimiento2->result_array() as $proces) {

                    $dataRecaudoTicket = array(
                        "recaudotramite" => $proces['recaudotramite'],
                        "ticket" => $this->input->post("idTicket"),
                    );
                    $ticketActi = $this->ticket_model->insertTicketRecaudos($dataRecaudoTicket);
                }

                /*                 * **************************************** */

                $funcionario = $this->usuario_model->getFuncionario($username['id']);
                if ($funcionario != false) {
                    foreach ($funcionario as $row) {
                        $funcionario = $row->id;
                    }
                    $this->ticket_model->updateTicket($this->input->post("idTicket"), $this->input->post("respuesta"));
                    $arregloHistorico = array(
                        'fecharecibido' => date('Y-m-d H:i:s'),
                        'funcionariorecibido' => $funcionario
                    );
                    $this->historicoticket_model->updateHistorico($arregloHistorico, $this->input->post("idTicket"));

                    if (mysql_affected_rows() > 0) {
                        echo json_encode(array(
                            "success" => true,
                            "guardo" => true,
                            "msg" => 'Registrado con éxito.'
                        ));
                    } else {
                        echo json_encode(array(
                            "success" => false,
                            "guardo" => false,
                            "msg" => 'No se pudo registrar.'
                        ));
                    }
                }
            } else {
                echo json_encode(array(
                    "success" => true,
                    "guardo" => true,
                    "msg" => 'No  puede realizar esta operación, porque No tiene tramites registrados.'
                ));
            }
        } else {
            $funcionario = $this->usuario_model->getFuncionario($username['id']);
            if ($funcionario != false) {
                foreach ($funcionario as $row) {
                    $funcionario = $row->id;
                }
                $this->ticket_model->updateTicket($this->input->post("idTicket"), $this->input->post("respuesta"));
                $arregloHistorico = array(
                    'fecharecibido' => date('Y-m-d H:i:s'),
                    'funcionariorecibido' => $funcionario
                );
                $this->historicoticket_model->updateHistorico($arregloHistorico, $this->input->post("idTicket"));

                if (mysql_affected_rows() > 0) {
                    echo json_encode(array(
                        "success" => true,
                        "guardo" => true,
                        "msg" => 'Registrado con éxito.'
                    ));
                } else {
                    echo json_encode(array(
                        "success" => false,
                        "guardo" => false,
                        "msg" => 'No se pudo registrar.'
                    ));
                }
            }
        }
    }

}
