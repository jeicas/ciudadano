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
         $username = $this->session->userdata('data');
        $sector = $this->input->get('sector');
        $tipolimi = $this->atenderticket_model->obtenerProcedimientoTicket($ticket, $sector, $username['ente']);
       
        if ($tipolimi) {

            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                "success" => True,
                'data' => $tipolimi)));
        }
    }

    
      public function buscarCuantosProcedimientoTicket() {
        
        $ticket = $this->input->post('idticket');

        $cuantos = $this->atenderticket_model->cuantosProcedimientoTicket($ticket);
        
        if ($cuantos) {
            
                foreach ($cuantos->result_array() as $row) {
                    $valor= $row['cantidad'];
            }
            echo json_encode(array(
                "success"   => true,
                "cuantos" => $valor,
               
              ));
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

    public function rechazarSolicitudTicket() {
        $ticket = $this->input->post('idticket');
        $tipoayuda = $this->input->post('idtipoayuda');
        $observacion = $this->input->post('observacion');

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


        if ($tipolimi && $tipolimit) {
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Solicitud Rechazada satisfactoriamente',
                "success" => True,
                'data' => $tipolimi)));
        }
    }

    public function aprobarActividadTicket() {
        $tipolimi = array();
        $ticket = $this->input->post('idticket');
       
        $fecha = date('Y-m-d H:i:s');

        if ($this->input->post('idProcedimiento')==null || $this->input->post('idProcedimiento')==''){
             $actividad = $this->input->post('idactividad');
        }else {
             $actividad = $this->input->post('idProcedimiento');
        }
        
        
        $sol = array(
            'ticket' => $ticket,
            'actividad' => $actividad,
            'fechaaprobado' => $fecha,
            'estatus' => 4
        );

        $tipolimi = $this->ticket_model->updateEstatusActividadTicket($sol);
        $tipolimit = $this->ticket_model->buscarActividadDependiente($actividad);

        if ($tipolimit) {
            foreach ($tipolimit as $row) {
                $act = $row->id;
                if ($act != null) {
                    $datos = array(
                        'ticket' => $ticket,
                        'actividad' => $act,
                        'estatus' => 1
                    );
                    $data = $this->ticket_model->updateEstatusActividadTicket($datos);
                }
                else $data=true;
            }
        } else
            $data = true;

        if ($tipolimi && $data) {

            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Procedimiento Completado',
                "success" => true,
                'data' => $tipolimi)));
        }
    }

    public function rechazarActividadTicket() {
        $tipolimi = array();
        $ticket = $this->input->post('idticket');
        $actividad = $this->input->post('idProcedimiento');
        $observacion = $this->input->post('observacion');
        $fecha = date('Y-m-d H:i:s');

        $data = array(
            'ticket' => $ticket,
            'actividad' => $actividad,
            'fechaaprobado' => $fecha,
            'observacion' => $observacion,
            'estatus' => 5
        );

        $tipolimi = $this->ticket_model->updateEstatusActividadTicket($data);
        if ($tipolimi) {

            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Procedimiento Rechazado',
                "success" => true,
                'data' => $tipolimi)));
        }
    }

    public function recibirActividadTicket() {
        $tipolimi = array();
        $username = $this->session->userdata('data');

        $ticket = $this->input->post('idticket');
        $actividad = $this->input->post('idprocedimiento');
        $usuario = $username['id'];
        ;

        $fecha = date('Y-m-d H:i:s');

        $sol = array(
            'ticket' => $ticket,
            'actividad' => $actividad,
            'usuario' => $usuario,
            'fecharecibido' => $fecha,
            'estatus' => 2
        );

        $tipolimi = $this->ticket_model->updateEstatusActividadTicket($sol);
        if ($tipolimi) {

            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Petición Recibida',
                "success" => True,
                'data' => $tipolimi)));
        }
    }

    public function enviarMensajeFuncionarioProcedimientoTicket() {
        $tipolimi = array();

        $ticket = $this->input->post('idticket');
        $mensaje = $this->input->post('mensaje');
        $observacion1 = $this->input->post('observacion');
        $observacion2 = $this->input->post('observacionRespuesta');
        $actividad = $this->input->post('idProcedimiento');
        $funcionario = $this->input->post('idFuncionario');

        if ($mensaje == 0) {
            $solic = array(
                'ticket' => $ticket,
                'actividad' => $actividad,
                'usuario' => $funcionario,
                'observacionresponsable' => $observacion1,
            );

            $tipolimi = $this->ticket_model->mensajeFuncionarioProdedimiento($solic);
        } else {
            $solic = array(
                'ticket' => $ticket,
                'actividad' => $actividad,
                'usuario' => $funcionario,
                'observacionresponsable' => $observacion1,
                'observacionrespuesta' => $observacion2,
            );

            $tipolimi = $this->ticket_model->mensajeFuncionarioProdedimiento($solic);
        }


        if ($tipolimi) {
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'msg' => 'Mensaje Enviado',
                "success" => True,
                'data' => $tipolimi)));
        } else {
            $this->output->set_output(json_encode(array(
                'msg' => 'Mensaje no Enviado. Verifique',
                "success" => True,
                'data' => $tipolimi)));
        }
    }
    
    public function buscarRecuadosTicket() {
        $tipolimi = array();
        $ticket = $this->input->get('ticket');
      $username = $this->session->userdata('data');
      
        $tipolimi = $this->ticket_model->obtenerrecaudosticket($ticket, $username['ente']);

        if ($tipolimi) {
           $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                "success" => True,
                'data' => $tipolimi)));
        }
    }
    
        public function aprobarActividadTicketDocumentos($ticket, $actividad) {
        $tipolimi = array();
        $fecha = date('Y-m-d H:i:s');

        $sol = array(
            'ticket' => $ticket,
            'actividad' => $actividad,
            'fechaaprobado' => $fecha,
            'estatus' => 4
        );

        $tipolimi = $this->ticket_model->updateEstatusActividadTicket($sol);


        $tipolimit = $this->ticket_model->buscarActividadDependiente($actividad);

        if ($tipolimit) {
            foreach ($tipolimit as $row) {
                $act = $row->id;
                if ($act != null) {
                    $datos = array(
                        'ticket' => $ticket,
                        'actividad' => $act,
                        'estatus' => 1
                    );
                    $data = $this->ticket_model->updateEstatusActividadTicket($datos);
                }
                else $data=true;
            }
        } else
            $data=true;

       return $data;
    }
    
    
     public function guardarRecuadosTicket() {
        $add       = $_POST['recordsGrid'];
         $ticket   = $this->input->post('ticket');
         $actividad= $this->input->post('actividad');
         
         
        if(isset($add)){
            //coloca todos los recaudos como pendientes. 
                  $arregloRecaudosT = array(
                    "ticket"      => $ticket,
                    'estatus' => 0
                );
        $recaudosT= $this->ticket_model->updateEstatusRecaudosTicketT($arregloRecaudosT);
        
             //actualiza todos los recaudos entregados. 
            $records = json_decode(stripslashes($add));
            foreach($records as $record){
                 $arregloRecaudos = array(
                    "id"      => $record->idrecaudoticket,
                    'estatus' => 1
                );
                 
                $recaudos= $this->ticket_model->updateEstatusRecaudosTicket($arregloRecaudos);  
            }
            
                
                
            if($recaudosT){ 
              echo json_encode(array(
                "success"   => true,
                "actualizo" => true,
                "msg"       => 'Operación exitosa.'
              ));
            }else {
                echo json_encode(array(
                "success"   => true,
                "successDocu" => $documentos, 
                "msg"       => 'Operación fallida.'
              )); 
            }
        }
       
    }

}
