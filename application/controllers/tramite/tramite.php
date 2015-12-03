<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Tramite extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("tramite/tramite_model");
    }

    public function obtenerTramiteid() {
        $username = $this->session->userdata('data');
        $tipoticket = $this->tramite_model->obtenerTramiteid($username['id']);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($tipoticket),
            'data' => $tipoticket
        )));
    }

    public function obtenerTramite() {
        $username = $this->session->userdata('data');
        $tipoticket = $this->tramite_model->obtenerTramite($username['ente']);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($tipoticket),
            'data' => $tipoticket
        )));
    }

    public function obtenerTramiteProcedimiento() {
        if ($tipoticket = $this->tramite_model->obtenerprocedimiento($this->input->get('tramite'))) {
            foreach ($tipoticket->result_array() as $row) {
                if ($row['cmbprocedimiento'] != NULL) {
                    $procedimientod = $row['cmbprocedimiento'];
                } else {
                    $procedimientod = '';
                }

                $data[] = array(
                    'idprocedimiento' => $row['id'],
                    'descripcion' => $row['descripcion'],
                    'unidad' => $row['unidadresponsable'],
                    'tiempo' => $row['tiempo'],
                    'estatus' => $row['estatus'],
                    'cmbprocedimiento' => $procedimientod,
                    'funcionario' => $row['funcionario']
                );
            }
            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        } else {
            $output = array(
                'success' => true,
                'total' => 0,
            );
            echo json_encode($output);
        }
    }

    public function obtenerProcedimientosTramite() {


        if ($tipoticket = $this->tramite_model->obtenerprocedimiento($this->input->get('tramite'))) {
            foreach ($tipoticket->result_array() as $row) {
                $data[] = array(
                    'idprocedimiento' => $row['id'],
                    'descripcion' => $row['descripcion'],
                    'estatus' => $row['estatus']
                );
            }
            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        } else {
            $output = array(
                'success' => true,
                'total' => 0,
            );
            echo json_encode($output);
        }
    }

    public function obtenerTramitetODO() {
        $username = $this->session->userdata('data');


        if ($tipoticket = $this->tramite_model->obtenerTramitetODO($this->input->get('tramite'))) {
            foreach ($tipoticket->result_array() as $row) {
                $data[] = array(
                    'idrecaudo' => $row['id'],
                    'nombrerecaudo' => $row['nombrerecaudo'],
                    'requerido' => $row['requerido'],
                    'estatusrecaudo' => $row['estatusrecaudo'],
                );
            }
            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        }
    }

    public function obtenerTramiteLista() {
        $username = $this->session->userdata('data');

        echo json_encode('id tramite: ' . $this->input->get('tramiteid'));
        if ($tipoticket = $this->tramite_model->obtenerTramiteListaR($this->input->get('tramite'))) {
            foreach ($tipoticket->result_array() as $row) {
                $data[] = array(
                    'idrecaudo' => $row['id'],
                    'nombrerecaudo' => $row['nombre'],
                    'requerido' => $row['requerido'],
                    'estatusrecaudo' => $row['estatus'],
                );
            }
            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        } else {
            $output = array(
                'success' => true,
            );
            echo json_encode($output);
        }
    }

    public function obtenerTramiteResponsable() {
        $tipolimi = array();
        $username = $this->session->userdata('data');
        if ($tipolimi = $funcionario = $this->tramite_model->ObtenerTramiteResponsable($username['ente'])) {
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                "success" => True,
                'data' => $tipolimi)));
        }
    }

    function buscaridCodigo() {
        $sql = "SELECT  max(id) as codigo
              FROM tramite";
        $query = $this->db->query($sql, array());
        if ($query->num_rows() == 1) {
            return $query;
        } else {
            return false;
        }
    }

    public function obtenercodigo() {
        $getCodigo = $this->buscaridCodigo();
        $letra = 'CO-TR';
        $ano = substr(date('Y'), 2);
        if ($getCodigo->num_rows() > 0) {
            foreach ($getCodigo->result_array() as $row) {
                $data[] = array('codigo' => $row['codigo']);
            }
            $suma = substr($row['codigo'], 7, -3) + 1;
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

    public function guardar() {
        //$obj = $_POST['recordsGrid'];
        $username = $this->session->userdata('data');
        $recaudos = $_POST['recordsGridRecaudos'];
        $codigo = $this->obtenercodigo();


        $buscarfuncionario = $this->tramite_model->onteneridfuncionario($this->input->post('cedula'));
        foreach ($buscarfuncionario->result_array() as $row) {
            $data[] = array(
                'id' => $row['idfuncionario'],
            );
        }


        $buscarsector_tipoayuda = $this->tramite_model->obteneridSector_tipoAyuda($this->input->post("sectorr"), $this->input->post("ayudat"));
        foreach ($buscarsector_tipoayuda->result_array() as $rows) {
            $datos[] = array(
                'id' => $rows['id'],
            );
        }

        $arreglotramite = array(
            "id" => $this->input->post("idtramit"),
            "codigo" => $codigo,
            "tiempo" => $this->input->post("tiempot"),
            "tipotramite" => $this->input->post("tipo"),
            "usuario" => $username['id'],
            "sector_tipoayuda" => $rows['id'],
            "estatus" => 1,
        );
        $funcionariotramite = array(
            "funcionario" => $row['idfuncionario'],
        );
        if ($arreglotramite['id'] != "") {
            $tramite = $this->tramite_model->updateTramite($arreglotramite);
            $tramite_funcionario = $this->tramite_model->deleteTramiteFuncionario($arreglotramite['id'], $funcionariotramite['funcionario']);
            $tramitefuncionario = $this->tramite_model->insertTramiteFuncionario($funcionariotramite, $arreglotramite['id']);
            if (isset($recaudos)) {
                $records = json_decode($recaudos);
                foreach ($records as $record1) {
                    if ($record1->requerido == 'SI') {
                        $requerido = 1;
                    } else {
                        $requerido = 2;
                    }
                    if ($record1->estatusrecaudo == 'ACTIVO' || $record1->estatusrecaudo == '') {
                        $estatusrecaudo = 1;
                    } else {
                        $estatusrecaudo = 2;
                    }
                    $arreglorecaudos = array(
                        "nombre" => $record1->nombrerecaudo,
                        "requerido" => $requerido,
                        "estatus" => $estatusrecaudo,
                    );
                    $tramiterecaudos = array(
                        "id" => $record1->idrecaudo,
                        "estatus" => $estatusrecaudo,
                    );


                    $deleterecaudos = $this->tramite_model->deleteTramiteRecaudos($record1->idrecaudo);
                    $recaudos = $this->tramite_model->insertRecaudos($arreglorecaudos);
                    $tramiterecaudos = $this->tramite_model->insertTramiteRecaudos($tramiterecaudos, $arreglotramite['id'], $recaudos);
                }
            }

            echo json_encode(array(
                "success" => true,
                "actualizo" => $recaudos,
                "msg" => 'Registrado con exito.'
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "msg" => 'No se pudo registrar.' . $obj
            ));
        }
    }

    public function guardarNombre() {

        $username = $this->session->userdata('data');
        $id = $this->input->post("idtramite");
        $descripcion = $this->input->post("nombre");
        $codigo = $this->obtenercodigo();
        if ($id == 0) {
            $arreglotramite = array(
                "descripcion" => $descripcion,
                "codigo" => $codigo,
                "usuario" => $username['id'],
                "estatus" => 1
            );
            $tramite = $this->tramite_model->insertTramite($arreglotramite);
            $tramiteUp = true;
        } else {

            $arreglotramiteUp = array(
                "id" => $id,
                "descripcion" => $descripcion,
                "estatus" => 1
            );
            $tramite = 1;
            $tramiteUp = $this->tramite_model->updateTramite($arreglotramiteUp);
        }


        if ($tramite > 0 || $tramiteUp) {
            echo json_encode(array(
                "success" => true,
                "actualizo" => $tramiteUp,
                "guardo" => $tramite,
                "msg" => 'Operación Exitosa.'
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "actualizo" => $tramiteUp,
                "guardo" => $tramite,
                "msg" => 'No se pudo realizar la operación.'
            ));
        }
    }

    public function guardarTipoTramite() {

        $username = $this->session->userdata('data');
        $id = $this->input->post("idtipotramite");
        $descripcion = $this->input->post("nombre");

        if ($id == 0) {
            $arreglotramite = array(
                "nombre" => $descripcion,
                "ente" => $username['ente'],
            );


            $ttramite = $this->tramite_model->insertTipoTramite($arreglotramite);
            $tramiteUp = true;
        } else {

            $arreglotramiteUp = array(
                "id" => $id,
                "nombre" => $descripcion,
            );
            $ttramite = true;
            $tramiteUp = $this->tramite_model->updateTipoTramite($arreglotramiteUp);
        }


        if ($ttramite || $tramiteUp) {
            echo json_encode(array(
                "success" => true,
                "actualizo" => $tramiteUp,
                "guardo" => $ttramite,
                "msg" => 'Operación Exitosa.'
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "actualizo" => $tramiteUp,
                "guardo" => $ttramite,
                "msg" => 'No se pudo realizar la operación.'
            ));
        }
    }

    public function eliminarTipoTramite() {


        $id = $this->input->post("idtipotramite");



        $arreglotramiteUp = array(
            "id" => $id,
        );
        $ttramite = $this->tramite_model->deleteTipoTramite($arreglotramiteUp);



        if ($ttramite) {
            echo json_encode(array(
                "success" => true,
                "guardo" => $ttramite,
                "msg" => 'Operación Exitosa.'
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "guardo" => $ttramite,
                "msg" => 'No se pudo realizar la operación.'
            ));
        }
    }

    public function guardarTipoAyuda() {


        $id = $this->input->post("idtipoayuda");
        $descripcion = $this->input->post("nombre");
        $sector = $this->input->post("idsector");

        if ($id == 0) {
            $arreglo = array(
                "nombre" => $descripcion,
            );
            $tatramite = $this->tramite_model->insertTipoAyuda($arreglo);
            $arreglota = array(
                "sector" => $sector,
                "tipoayuda" => $tatramite
            );
            $tastramite = $this->tramite_model->insertSectorTipoAyuda($arreglota);
            $tramiteUp = $tastramite;
        } else {

            $arreglo = array(
                "id" => $id,
                "nombre" => $descripcion,
            );
            $tramiteUp = $this->tramite_model->updateTipoAyuda($arreglo);
            $tastramite = $tramiteUp;
        }


        if ($tastramite || $tramiteUp) {
            echo json_encode(array(
                "success" => true,
                "actualizo" => $tramiteUp,
                "guardo" => $tastramite,
                "msg" => 'Operación Exitosa.'
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "actualizo" => $tramiteUp,
                "guardo" => $tastramite,
                "msg" => 'No se pudo realizar la operación.'
            ));
        }
    }

    public function guardarActividad() {
        if ($this->input->post('estatus') == 'INICIO' || $this->input->post('estatus') == '') {
            $estatus = 1;
        } else if ($this->input->post('estatus') == 'PROCESAMIENTO') {
            $estatus = 2;
        } else if ($this->input->post('estatus') == 'VERIFICACION') {
            $estatus = 3;
        } else if ($this->input->post('estatus') == 'FINAL') {
            $estatus = 4;
        }


        $buscarfuncionario = $this->tramite_model->onteneridfuncionario($this->input->post('funcionario'));
        foreach ($buscarfuncionario->result_array() as $row) {
            $data[] = array(
                'id' => $row['idfuncionario'],
            );
        }

        $depende = $this->input->post("actividadDepende");

        if ($depende == '') {
            $depende = null;
            $estatus2 = 1;
        } else {
            $depende = $this->input->post("actividadDepende");
            $estatus2 = 3;
        }
        $actividades = array(
            "descripcion" => $this->input->post('descripcion'),
            "unidadresponsable" => $this->input->post("unidadresponsable"),
            "tiempo" => $this->input->post("tiempo"),
            "estatus" => $estatus,
            "estatus2" => $estatus2,
            "actividad_id" => $depende,
            "tramite" => $this->input->post("tramite"),
        );

        if ($actividades['unidadresponsable'] || $row['idfuncionario'] != '') {


            $actividad = $this->tramite_model->insertActividades($actividades, $actividades['tramite']);

            $actividadesfuncionario = array(
                "funcionario" => $row['idfuncionario'],
                "actividad" => $actividad
            );

            $actividadfuncionario = $this->tramite_model->insertActividadesFuncionarios($actividadesfuncionario);
        }



        if ($actividadfuncionario) {
            echo json_encode(array(
                "success" => true,
                "actualizo" => $actividadfuncionario,
                "guardo" => $actividad,
                "msg" => 'Registrado con exito.'
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "actualizo" => $actividadfuncionario . $row['idfuncionario'],
                "guardo" => $actividad,
                "msg" => 'No se pudo registrar.'
            ));
        }
    }

    public function buscarTramites() {
        $username = $this->session->userdata('data');
        if ($tipoticket = $this->tramite_model->buscarListaTramites($username['id'])) {
            foreach ($tipoticket->result_array() as $row) {
                $data[] = array(
                    'idtramite' => $row['id'],
                    'nombret' => $row['nombre'],
                    'codigotr' => $row['codigo'],
                    'tiempot' => $row['tiempo'],
                    'tipotramite' => $row['tipot'],
                    'sector' => $row['sector'],
                    'tipoayuda' => $row['tipoa'],
                    'fcLaboral' => $row['responsable'],
                );
            }
            $output = array(
                'success' => true,
                'total' => count($data),
                'data' => array_splice($data, $this->input->get("start"), $this->input->get("limit"))
            );
            echo json_encode($output);
        } else {
            $output = array(
                'success' => true,
            );
            echo json_encode($output);
        }
    }

    function buscarSolicitudesEnteSectorTipoAyuda() {
        $username = $this->session->userdata('data');
        if ($username['tipousuario'] == 2) {
            $solicitudes = $this->tramite_model->obtenerSolicitudes($username['ente']);
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array(
                'success' => true,
                'total' => count($solicitudes),
                'data' => $solicitudes
            )));
        } else {
            if ($username['tipousuario'] == 3) {
                $responsable = $this->tramite_model->obtenerSectorTipoAyudaResponsable($username['ente'], $username['id']);
                foreach ($responsable->result_array() as $row) {
                    $solicitudes = $this->tramite_model->obtenerSolicitudesSectorTipoU($username['ente'], $row['id_sector'], $row['id_tipoayuda']);
                    $this->output->set_content_type('application/json');
                    $this->output->set_output(json_encode(array(
                        'success' => true,
                        'total' => count($solicitudes),
                        'data' => $solicitudes
                    )));
                }
            }
        }
    }

    function buscarSolicitudesEncargadoProcedimiento() {
        $username = $this->session->userdata('data');

        $condicion = 'f.usuario=' . $username['id'] . ' and e.id=' .
                // echo json_encode($condicion);
                $solicitudes = $this->tramite_model->obtenerSolicitudesProcedimientoEncargado($condicion);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($solicitudes),
            'data' => $solicitudes
        )));
    }

    function buscarEncargadoTramite() {


        $condicion = ' sta.sector=' . $this->input->post('sector') . ' and sta.tipoayuda=' . $this->input->post('tipoayuda');

        $datos = $this->tramite_model->obtenerDatosEncargadoTramite($condicion);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($datos),
            'data' => $datos
        )));
    }

    function buscarTramiteSolicitudes() {

        $tramite = $this->input->get('tramite');
        $username = $this->session->userdata('data');
        $ente = $username['ente'];

        $datos = $this->tramite_model->obtenerSolicitudesTramite($ente, $tramite);
        //echo json_encode($datos);
        $this->output->set_content_type('application/json');
        $this->output->set_output(json_encode(array(
            'success' => true,
            'total' => count($datos),
            'data' => $datos
        )));
    }

}
