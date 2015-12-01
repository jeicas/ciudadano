<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Ticket extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("ticket/ticket_model");
        $this->load->model("registrobasico/usuario/usuario_model");
        $this->load->model("registrobasico/persona/persona_model");
        $this->load->model("registrobasico/comunidad/comunidad_model");
        $this->load->model("tramite/tramite_model");
    }

    public function guardar() {
        $username = $this->session->userdata('data');
        $codigo = $this->obtenerCodigo();
        if ($username['login_ok'] == false) {
            $funcionario = NULL;
            $password = $this->input->post("password");
            $username = $this->session->userdata('data');
            if ($this->input->post("seleccion") == 2) {
                $insertPersona = NULL;
                if ($this->input->post("estatusContacto") == null || $this->input->post("estatusContacto") == "") {
                    $arregloContacto = array(
                        'nacionalidad' => $this->input->post("nacionalidadC"),
                        "cedula" => $this->input->post("cedulaC"),
                        "nombre" => strtoupper($this->input->post("nombreContacto")),
                        "apellido" => strtoupper($this->input->post("apellidoContacto")),
                        "correo" => strtoupper($this->input->post("correoC")),
                        'fechanacimiento' => $this->input->post("fechanacimientoC"),
                        "tlf1" => $this->input->post('ccodTlf1') . $this->input->post('movilC'),
                        "tlf2" => $this->input->post('ccodTlf2') . $this->input->post('localC'),
                        "estatus" => 1
                    );
                    $insertContacto = $this->persona_model->insertPersona($arregloContacto);
                }
                if ($this->input->post("estatusComunidad") == null || $this->input->post("estatusComunidad") == "") {
                    $arregloComunidad = array(
                        'rifletra' => $this->input->post("nacionalidad"),
                        "rifnumero" => $this->input->post("cedula"),
                        "razonsocial" => strtoupper($this->input->post("razonSolicitante")),
                        "correo" => strtoupper($this->input->post("correo")),
                        "parroquia" => $this->input->post("parroquia"),
                        "direccion" => strtoupper($this->input->post("direccion")),
                        "tlf1" => $this->input->post('codTlf1') . $this->input->post('movil'),
                        "tlf2" => $this->input->post('codTlf2') . $this->input->post('local'),
                        "contacto" => $insertContacto,
                        "estatus" => 1
                    );
                    $insertComunidad = $this->comunidad_model->insertComunidad($arregloComunidad);
                    $nombre = strtoupper($this->input->post("razonSolicitante"));
                }
            } else if ($this->input->post("seleccion") == 1) {
                $insertComunidad = NULL;
                if ($this->input->post("estatusPersona") == null || $this->input->post("estatusPersona") == "") {
                    $arregloPersona = array(
                        'nacionalidad' => $this->input->post("nacionalidad"),
                        "cedula" => $this->input->post("cedula"),
                        "nombre" => strtoupper($this->input->post("nombreSolicitante")),
                        "apellido" => strtoupper($this->input->post("apellidoSolicitante")),
                        "correo" => strtoupper($this->input->post("correo")),
                        'fechanacimiento' => $this->input->post("fechanacimiento"), //formato fecha
                        "parroquia" => $this->input->post("parroquia"),
                        "direccion" => strtoupper($this->input->post("direccion")),
                        "tlf1" => $this->input->post('codTlf1') . $this->input->post('movil'),
                        "tlf2" => $this->input->post('codTlf2') . $this->input->post('local'),
                        "estatus" => 1
                    );
                    $insertPersona = $this->persona_model->insertPersona($arregloPersona);
                    $nombre = strtoupper($this->input->post("nombreSolicitante")) . ' ' . strtoupper($this->input->post("apellidoSolicitante"));
                }
            }
            if ($this->input->post("idSolicitante") == null || $this->input->post("idSolicitante") == "") {
                $arregloUsuario = array(
                    'clave' => $password,
                    "usuario" => strtoupper($this->input->post("nacionalidad")) . $this->input->post("cedula"),
                    "tipousuario" => 4,
                    "estatus" => 1
                );
                $insertUsuario = $this->usuario_model->insertUsuario($arregloUsuario);

                $arregloSolicitante = array(
                    "persona" => $insertPersona,
                    "comunidad" => $insertComunidad,
                    "usuario" => $insertUsuario,
                    "estatus" => 1
                );
                $solicitante = $this->persona_model->insertSolicitante($arregloSolicitante);
            }
            $this->emailUsuario($this->input->post("correo"), $nombre, $this->input->post("cedula"), $this->input->post("nacionalidad"), $codigo, $this->input->post("clave"));
        } else if ($username['login_ok']) {
            if ($username['tipousuario'] == 4) {
                //buscar el id del solicitante con el id del usuario logueado
                $solicitante = $this->usuario_model->getSolicitante($username['id']);
                if ($solicitante != false) {
                    foreach ($solicitante as $row) {
                        $solicitante = $row->id;
                    }
                }
                $funcionario = NULL;
            } else {
                $funcionario = $this->usuario_model->getFuncionario($username['id']);
                if ($funcionario != false) {
                    foreach ($funcionario as $row) {
                        $funcionario = $row->id;
                    }
                }
                $solicitante = $this->input->post("idSolicitante");
            }//ojo falta lo del correo si esta logueado hay que buscarlo
            $this->emailTicket($this->input->post("correo"), $codigo);
        }
        $arregloTicket = array(
            'fecha' => date('Y-m-d H:i:s'),
            'solicitante' => $solicitante,
            'codigo' => $codigo,
            'sector' => $this->input->post("sector"),
            'tipoticket' => $this->input->post("tipoTicket"),
            'estatus' => 1
        );
        $insertTicket = $this->ticket_model->insertTicket($arregloTicket);
        if ($this->input->post("tipoTicket") == 3) {
            $items = $_POST['recordsGrid'];
            if (isset($items)) {
                $records = json_decode($items);
                foreach ($records as $record) {
                    $arregloTicket_Sector_Tipoayuda = array(
                        "ticket" => $insertTicket,
                        //"sector"        => $this->input->post("sector"),            
                        //"tipoayuda"     => $record->ayuda,
                        "tipoayuda" => $record->ayuda,
                        "cantidad" => $record->cantidad,
                        "descripcion" => strtoupper($record->descripcion)
                    );
                    $this->ticket_model->insertTicket_Sector_Tipoayuda($arregloTicket_Sector_Tipoayuda);
                    
                    
                     /*****************************************/
       // Guarda el procedimiento de la solicitud creada
         
        //tramite que tiene asocioado a la peticion
                    //echo json_encode($this->input->post("sector").$record->ayuda);
        $procedimiento=$this->tramite_model->obtenerActividadTramite($this->input->post("sector"),$record->ayuda);
       
              foreach ($procedimiento->result_array() as $proc)
              {
                   
                  $dataTicketProcedimiento=array ( 
                      "ticket"=>$insertTicket,
                      "actividad"=> $proc['actividad'],
                      "estatus"=>$proc['estatus'],
                  );
                  $ticketAct=$this->ticket_model->insertTicketActividad($dataTicketProcedimiento);
              }
          

        /*******************************************/

                    
                    
                }
            }
        } else {
            $arregloTicket_Sector_Tipoayuda = array(
                "ticket" => $insertTicket,
                //"sector"        => $this->input->post("sector"),
                "descripcion" => strtoupper($this->input->post("descripcion"))
            );
            $this->ticket_model->insertTicket_Sector_Tipoayuda($arregloTicket_Sector_Tipoayuda);
        }
        $arregloHistorico = array(
            'fecharegistro' => date('Y-m-d H:i:s'),
            'funcionarioregistro' => $funcionario,
            'ticket' => $insertTicket
        );
        $this->ticket_model->insertHistorico($arregloHistorico);

      
      
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

//**************************************************************
    public function emailUsuario($correo, $nombre, $cedula, $nacionalidad, $codigo, $clave) {
        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.googlemail.com',
            'smtp_port' => '465',
            'smtp_user' => 'pinedaisa@gmail.com',
            'smtp_pass' => 'jinisa2016',
            'mailtype' => 'html',
            'starttls' => true,
            'newline' => "\r\n"
        );
        $this->load->library('email', $config);
        $this->email->from($correo, 'Atención al Ciudadano');
        $this->email->to($correo);
        $this->email->subject('Entrevista - Atención al Ciudadano');
        $this->email->message('<h1>Entrevista</h1>
      <p>Estimado(a): <b>' . $nombre . '</b></p>
      <p>Fue registrado con exito su ticket con el codigo:' . $codigo . '.</p>
      <p>Puede acceder al sistema mediante las siguiente coordenadas:</p>
      <p>USUARIO: <b>' . strtoupper($nacionalidad) . $cedula . '</b></p>
      <p>CLAVE POR DEFECTO: <b>' . $clave . '</b></p>
      <p></p>
      <p><b>Sístema de registro Atención al Ciudadano</b></p>
      <p><b>Lara... Tierra Progresista</b></p>');
        $this->email->send();
    }

//**************************************************************
    public function emailTicket($correo, $codigo) {
        $config = Array(
            'protocol' => 'smtp',
            'smtp_host' => 'ssl://smtp.googlemail.com',
            'smtp_port' => '465',
            'smtp_user' => 'pinedaisa@gmail.com',
            'smtp_pass' => 'jinisa2016',
            'mailtype' => 'html',
            'starttls' => true,
            'newline' => "\r\n"
        );
        $this->load->library('email', $config);
        $this->email->from($correo, 'Atención al Ciudadano');
        $this->email->to($correo);
        $this->email->subject('Entrevista - Atención al Ciudadano');
        $this->email->message('<h1>Entrevista</h1>
      <p>Estimado(a) ciudadano(a)</p>
      <p>Fue registrado con exito su ticket con el codigo:' . $codigo . '.</p>
      <p>Puede acceder al sistema mediante sus coordenadas asignadas en el correo anterior:</p>      
      <p></p>
      <p><b>Sístema de registro Atención al Ciudadano</b></p>
      <p><b>Lara... Tierra Progresista</b></p>');
        $this->email->send();
    }

//***********************************************************************
    public function obtenerCodigo() {
        $getCodigo = $this->ticket_model->getCodigo();
        $ano = substr(date('Y'), 2);
        $letra = 'OAC';
        if ($getCodigo->num_rows() > 0) {
            foreach ($getCodigo->result_array() as $row) {
                $data[] = array('codigo' => $row['codigo']);
            }
            $suma = substr($row['codigo'], 4, 3) + 1;
            if ($suma < 10) {
                $suma = '00' . $suma;
            } else {
                if ($suma < 100) {
                    $suma = '0' . $suma;
                } else {
                    $suma = $suma;
                }
            }
            $codigo = $letra . '-' . $suma . '-' . $ano;
        } else {
            $codigo = $letra . '-001-' . $ano;
        }
        return $codigo;
    }

}