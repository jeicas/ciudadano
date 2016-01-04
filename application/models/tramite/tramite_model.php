<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Tramite_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function obtenerTramiteid($usuario) {
        $this->db->order_by("descripcion", "asc");
        $this->db->where("usuario", $usuario);
        $consulta = $this->db->get('tramite');
        $tipo = array();
        if ($consulta->num_rows() > 0) {
            foreach ($consulta->result() as $tipoticket) {
                $tipo[] = $tipoticket;
            }
            return $tipo;
            $consulta->free->result();
        }
    }

    public function obtenerTramite($ente) {
        $this->db->order_by("nombre", "asc");
        $this->db->where("ente", $ente);
        $consulta = $this->db->get('tipotramite');
        $tipo = array();
        if ($consulta->num_rows() > 0) {
            foreach ($consulta->result() as $tipoticket) {
                $tipo[] = $tipoticket;
            }
            return $tipo;
            $consulta->free->result();
        }
    }

    public function obtenerprocedimiento($idtramite) {
        /* $sql = "SELECT a.id, a.descripcion,a.unidadresponsable, a.tiempo,
          IF(a.estatus='1','INICIO', IF(a.estatus='2','PROCEDIMIENTO', IF(a.estatus='3','VERIFICACION', IF(a.estatus='4','FINAL','')))) as estatus,
          concat(p.nacionalidad,'-',p.cedula,' ',p.nombre,'  ',p.apellido) as funcionario, actividad.descripcion as cmbprocedimiento
          FROM actividad as a
          inner join actividad_funcionario as af on af.actividad= a.id
          inner JOIN funcionario as f on af.funcionario=f.id
          inner JOIN persona as p on p.id=f.persona
          left join actividad on actividad.actividad_id=a.id
          WHERE
          a.tramite=$idtramite"; */
        $sql = "select a.id, a.descripcion,a.unidadresponsable, a.tiempo, 
                 IF(a.estatus='1','INICIO', IF(a.estatus='2','PROCEDIMIENTO', IF(a.estatus='3','VERIFICACION', IF(a.estatus='4','FINAL','')))) as estatus,
                 concat(p.nacionalidad,'-',p.cedula,' ',p.nombre,'  ',p.apellido) as funcionario, 
                 act.descripcion as cmbprocedimiento,act.id, 
                 act.estatus as actestatus
               FROM actividad as a
               inner join actividad_funcionario as af on af.actividad= a.id
               inner JOIN funcionario as f on af.funcionario=f.id
               inner JOIN persona as p on p.id=f.persona
               left join actividad act on a.actividad_id=act.id where a.tramite=$idtramite";
        $query = $this->db->query($sql, array($idtramite));



        if ($query->num_rows() > 0) {
            return $query;
        } else {
            return false;
        }
    }

    function obtenerTramitetODO($idtramite) {
        $sql = "SELECT upper(recaudos.nombre) as nombrerecaudo,recaudos.id,
        IF(recaudos.estatus='1','ACTIVO', IF(recaudos.estatus='2','INACTIVO','')) as estatusrecaudo,
        IF(recaudos.requerido='1','SI',
        IF(recaudos.requerido='2','NO','')) as requerido 
       
    FROM recaudos 
    INNER JOIN recaudostramite ON recaudostramite.recaudos=recaudos.id
    INNER JOIN tramite ON recaudostramite.tramite=tramite.id
    INNER JOIN usuario ON tramite.usuario=usuario.id
    INNER JOIN tipotramite ON tipotramite.id=tramite.tipotramite
    INNER JOIN ente ON ente.id=tipotramite.ente AND 
    tramite.id=$idtramite";
        $query = $this->db->query($sql, array($idtramite));
        if ($query->num_rows() > 0) {
            return $query;
        } else {
            return false;
        }
    }

    function obtenerTramiteListaR($idtramite) {
        $sql = "SELECT upper(recaudos.nombre) as nombre,recaudos.id,
        IF(recaudos.estatus='1','ACTIVO',
        IF(recaudos.estatus='2','INACTIVO','')) as estatus,
        IF(recaudos.requerido='1','SI',
        IF(recaudos.requerido='2','NO','')) as requerido 
    FROM recaudos 
    INNER JOIN recaudostramite ON recaudostramite.recaudos=recaudos.id
    INNER JOIN tramite ON recaudostramite.tramite=tramite.id
    INNER JOIN usuario ON tramite.usuario=usuario.id
    INNER JOIN tipotramite ON tipotramite.id=tramite.tipotramite
    INNER JOIN ente ON ente.id=tipotramite.ente AND 
    tramite.id=$idtramite";
        $query = $this->db->query($sql, array($idtramite));
        if ($query->num_rows() > 0) {
            return $query;
        } else {
            return false;
        }
    }

    function onteneridfuncionario($cedula) {
        $sql = "SELECT funcionario.id as idfuncionario
        FROM funcionario
        INNER JOIN persona  ON persona.id=funcionario.persona
        INNER JOIN ente On funcionario.ente=ente.id
        inner join usuario on usuario.ente=ente.id
        WHERE persona.cedula=$cedula and funcionario.estatus=1";
        $query = $this->db->query($sql, array($cedula));
        if ($query->num_rows() > 0) {
            return $query;
        } else {
            return false;
        }
    }

    function obteneridSector_tipoAyuda($sector, $tipoayuda) {
        $sql = "SELECT id from sector_tipoayuda where sector=$sector and tipoayuda=$tipoayuda";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            return $query;
        } else {
            return false;
        }
    }

    function ObtenerTramiteResponsable($ente) {
        $query1 = $this->db->query("SELECT persona.cedula as id,funcionario.id as idfuncionario,concat(persona.nacionalidad,'-',persona.cedula,' ',persona.nombre,'  ',persona.apellido) as nombre,persona.tlf1,persona.correo 
        FROM funcionario
        INNER JOIN persona ON persona.id=funcionario.persona
        INNER JOIN ente On funcionario.ente=ente.id
        inner join usuario on usuario.ente=ente.id
        WHERE ente.id=$ente and funcionario.estatus=1");
        $tipo = array($ente);
        if ($query1->num_rows() > 0) {
            foreach ($query1->result() as $municipio) {
                $tipo[] = $municipio; //TRAE EL ARRAY
            }
            return $tipo;
            $query1->free - result();
        }
    }

    function buscarListaTramites($id) {
        $query = $this->db->query("SELECT t.id, t.codigo, 
       t.descripcion as nombre, 
       t.tiempo, 
       tt.nombre as tipot,
       s.nombre as sector,
       ta.nombre as tipoa,
       concat(p.nacionalidad,'-',p.cedula,' ',p.nombre,'  ',p.apellido) as responsable
      
       
     FROM tramite as t
      LEFT JOIN tipotramite as tt on t.`tipotramite`=tt.`id`
      
     LEFT JOIN sector_tipoayuda as sta on t.`sector_tipoayuda`=sta.id
      LEFT JOIN sector as s on sta.sector=s.id
      LEFT JOIN tipoayuda as ta on sta.tipoayuda = ta.id
      
       LEFT JOIN tramite_funcionario as tf on tf.tramite= t.id
       LEFT JOIN funcionario as f on tf.funcionario=f.id
       LEFT JOIN persona as p on p.id=f.persona
       
    where t.usuario=$id
     ");

        if ($query->num_rows() > 0) {
            return $query;
        } else {
            return false;
        }
    }

    public function insertTramite($arregloTicket) {
        $this->db->insert('tramite', $arregloTicket);
        return mysql_insert_id();
    }

    public function insertTipoTramite($arregloTicket) {

        return $this->db->insert('tipotramite', $arregloTicket);
    }

    public function insertRecaudos($arregloTicket) {
        $this->db->insert('recaudos', $arregloTicket);
        return mysql_insert_id();
    }

    function insertTramiteRecaudos($agregar, $datatramite, $datarecaudos) {
        $this->db->set($agregar);
        $this->db->set('tramite', $datatramite);
        $this->db->set('recaudos', $datarecaudos);
        $this->db->insert('recaudostramite', $agregar);
        return $query = mysql_insert_id();
    }

    function deleteTramiteRecaudos($agregar) {
        $this->db->where('id', $agregar);
        return $this->db->delete('recaudostramite');
    }

    function insertTramiteFuncionario($agregar, $datadiscapacitado) {
        $this->db->set($agregar);
        $this->db->set('tramite', $datadiscapacitado);
        $this->db->insert('tramite_funcionario', $agregar);
        return $query = mysql_insert_id();
    }

    function deleteTramiteFuncionario($agregar, $datadiscapacitado) {
        $this->db->where('tramite', $agregar);
        $this->db->where('funcionario', $datadiscapacitado);
        return $this->db->delete('tramite_funcionario');
    }

    public function insertActividades($arregloTicket, $dataactividad) {
        $this->db->set('tramite', $dataactividad);
        $this->db->insert('actividad', $arregloTicket);
        return mysql_insert_id();
    }

    function insertActividadesFuncionarios($agregar) {
        return $this->db->insert('actividad_funcionario', $agregar);
    }

    public function updateTramite($ticket) {
        $this->db->where('id', $ticket['id']);
        return $this->db->update('tramite', $ticket);
    }

    public function updateTipoTramite($ticket) {
        $this->db->where('id', $ticket['id']);
        return $this->db->update('tipotramite', $ticket);
    }

    public function deleteTipoTramite($ticket) {
        $this->db->where('id', $ticket['id']);
        return $this->db->delete('tipotramite');
    }

    public function insertTipoAyuda($arreglo) {
        $this->db->insert('tipoayuda', $arreglo);
        return mysql_insert_id();
    }

    public function insertSectorTipoAyuda($arreglo) {
        return $this->db->insert('sector_tipoayuda', $arreglo);
    }

    public function updateTipoAyuda($ticket) {
        $this->db->where('id', $ticket['id']);
        return $this->db->update('tipoayuda', $ticket);
    }

    public function obtenerSolicitudes($ente) {

        $sql = "SELECT t.id idTicket,
                            t.codigo codigoTicket,
                            tt.nombre tipoTicket,
                            tta.descripcion solicitud,
                            IF(sol.persona<>'NULL',CONCAT(p.nombre,' ',p.apellido),com.razonsocial) as solicitante,
                            e.nombre ente,
                            s.id idSector, 
                            s.nombre sector, 
                            ta.nombre tipoayuda, 
                            ta.id idTipoAyuda, 
                            tta.cantidad cantidad,
                            tta.observacion observacion,
                            DATE_FORMAT(t.fecha,'%d-%m-%Y') as fechaRegistro, 
                            CASE t.estatus
                                  WHEN 0 THEN 'ELIMINADO'
                                  WHEN 1 THEN 'PENDIENTE'
                                  WHEN 2 THEN 'RECIBIDO'
                                  WHEN 3 THEN 'EN PROCESO' 
                                  WHEN 4 THEN 'COMPLETADO' 
                                  WHEN 5 THEN 'RECHAZADO' END as estatusTicket 
                        FROM  ente e 
                        INNER JOIN ente_sector es ON es.ente=e.id 
                        INNER JOIN sector s on es.sector=s.id 
                        INNER JOIN sector_tipoayuda sta on sta.sector=s.id
                        INNER JOIN tipoayuda ta on ta.id=sta.tipoayuda 
                        INNER JOIN ticket t on s.id=t.sector 
                        INNER JOIN ticket_tipoayuda tta on t.id=tta.ticket and tta.tipoayuda=ta.id 
                        INNER JOIN solicitante sol on sol.id=t.solicitante
                        LEFT JOIN persona p on sol.persona=p.id
                        LEFT JOIN comunidad com on com.id=sol.comunidad
                        INNER JOIN tipoticket tt on t.tipoticket=tt.id  
                        WHERE e.id=$ente";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                $resultado[] = $row;
            }
            return $resultado;
            $query->free - result();
        }
    }

    public function obtenerSolicitudesSectorTipoU($ente, $sector, $tipoa) {
        $sql = "SELECT t.id idTicket,
                                t.codigo codigoTicket,
                                tt.nombre tipoTicket,
                                tta.descripcion solicitud,
                                IF(sol.persona<>'NULL',CONCAT(p.nombre,' ',p.apellido),com.razonsocial) as solicitante,
                                e.nombre ente, 
                                s.id idSector,
                                s.nombre sector, 
                                ta.nombre tipoayuda, 
                                ta.id idTipoAyuda, 
                                tta.cantidad cantidad,
                                tta.observacion observacion,
                                DATE_FORMAT(t.fecha,'%d-%m-%Y') as fechaRegistro, 
                                CASE t.estatus
                                      WHEN 0 THEN 'ELIMINADO'
                                  WHEN 1 THEN 'PENDIENTE'
                                  WHEN 2 THEN 'RECIBIDO'
                                  WHEN 3 THEN 'EN PROCESO' 
                                  WHEN 4 THEN 'COMPLETADO' 
                                  WHEN 5 THEN 'RECHAZADO' END as estatusTicket 
                            FROM  ente e 
                            INNER JOIN ente_sector es ON es.ente=e.id 
                            INNER JOIN sector s on es.sector=s.id 
                            INNER JOIN sector_tipoayuda sta on sta.sector=s.id and s.id=$sector 
                            INNER JOIN tipoayuda ta on ta.id=sta.tipoayuda and ta.id=$tipoa 
                            INNER JOIN ticket t on s.id=t.sector 
                            INNER JOIN ticket_tipoayuda tta on t.id=tta.ticket and tta.tipoayuda=ta.id 
                            INNER JOIN solicitante sol on sol.id=t.solicitante
                            LEFT JOIN persona p on sol.persona=p.id
                            LEFT JOIN comunidad com on com.id=sol.comunidad
                            INNER JOIN tipoticket tt on t.tipoticket=tt.id  
                            WHERE e.id=$ente";
        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row) {
                $resultado[] = $row;
            }
            return $resultado;
            $query->free - result();
        }
    }

    public function obtenerSectorTipoAyudaResponsable($ente, $usuario) {
        $sql = "SELECT  distinct p.nombre, 
                                 s.nombre sector,s.id id_sector, 
                                 ta.nombre tipoayuda,
                                 ta.id id_tipoayuda,
                                 t.descripcion tramite
                    FROM  ticket_tipoayuda tta 
                        INNER JOIN sector_tipoayuda sta on sta.tipoayuda=tta.tipoayuda
                        INNER JOIN tramite t on t.sector_tipoayuda=sta.id
                        INNER JOIN tramite_funcionario tf on tf.tramite=t.id
                        INNER JOIN funcionario f on tf.funcionario=f.id
                        INNER JOIN persona p on f.persona=p.id
                        INNER JOIN usuario u on u.id=f.usuario and f.usuario=$usuario
                        INNER JOIN tipoayuda ta on ta.id=sta.tipoayuda 
                        INNER JOIN sector s on s.id=sta.sector
                        INNER JOIN ente_sector es on s.id=es.sector and es.ente=$ente";

        $query = $this->db->query($sql);
        return $query;
    }

    public function obtenerSolicitudesProcedimientoEncargado($condicion) {
        $sql = "SELECT DISTINCT ti.codigo codigoTicket,  
                        ti.id idTicket, 
                        e.nombre ente,
                        a.id idActividad,
                        a.descripcion actividad,  
                        tita.descripcion peticion,
                        tita.cantidad cantidad,
                        s.nombre sector,
                        s.id idSector,
                        ta.id idTipoAyuda,
                        ta.nombre tipoayuda,
                        f.id as idEncargado,
                        concat(p.nombre, ' ', p.apellido) encargado,
                        tita.observacion observacion,
                        tta.observacionresponsable observacionFuncionario, 
                        tta.observacionrespuesta respuesta, 
                        tta.observacion observacion, 
                        IF(sol.persona<>'NULL',concat(pp.nombre,' ',pp.apellido),com.razonsocial) as  solicitante,
                        DATE_FORMAT(ti.fecha,'%d-%m-%Y') as fechaRegistro, 
                        CASE tta.estatus
                                  WHEN 0 THEN 'ELIMINADO'
                                  WHEN 1 THEN 'PENDIENTE'
                                  WHEN 2 THEN 'RECIBIDO'
                                  WHEN 3 THEN 'EN ESPERA'  
                                  WHEN 4 THEN 'COMPLETADO' 
                                  WHEN 5 THEN 'RECHAZADO' END as estatus

                    FROM  ticket_actividad tta 
                      INNER JOIN ticket ti ON ti.id=tta.ticket 
                      INNER JOIN actividad a ON a.id=tta.actividad AND tta.estatus!=3
                      INNER JOIN actividad_funcionario af ON af.actividad=tta.actividad
                      INNER JOIN funcionario f ON f.id=af.funcionario
                      INNER JOIN persona p on p.id=f.persona
                      INNER JOIN ticket_tipoayuda tita ON tita.ticket=ti.id  
		      INNER JOIN sector_tipoayuda sta ON sta.sector=ti.sector
                      INNER JOIN sector s ON s.id=sta.sector 
                      INNER JOIN ente_sector es ON es.sector=s.id
                      INNER JOIN ente e ON e.id=es.ente 
                      INNER JOIN tipoayuda ta ON ta.id=tita.tipoayuda
                      INNER JOIN solicitante sol ON sol.id=ti.solicitante
                      LEFT JOIN persona pp ON pp.id=sol.persona
                      LEFT JOIN comunidad com ON com.id=sol.comunidad
                      left join ticket_actividad ttac on a.id=ttac.actividad 
                      LEFT JOIN actividad act ON act.id=a.actividad_id
                      LEFT JOIN ticket_actividad ttta ON ttta.actividad=act.id
           where  $condicion ";

        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row1) {
                $resultado[] = $row1;
            }
            return $resultado;
            $query->free - result();
        }
    }

    public function obtenerActividadTramite($sector, $tipoayuda) {
        $sql = "SELECT a.id actividad, a.estatus2 estatus
                    FROM actividad a
                        INNER JOIN tramite t ON t.id = a.tramite
                        INNER JOIN sector_tipoayuda sta ON sta.id = t.sector_tipoayuda
                        AND sta.sector =$sector
                        AND sta.tipoayuda =$tipoayuda";

        $query = $this->db->query($sql);
        return $query;
        // echo json_encode($sql);
        /* if ($query->num_rows() > 0) {
          foreach ($query->result() as $row1){
          $resultado[] = $row1;
          }
          return $resultado;
          $query->free-result();

          } */
    }

    public function obtenerDatosEncargadoTramite($condicion) {
        $sql = "Select concat(p.nombre, ' ', p.apellido) responsable, t.descripcion tramite, e.nombre ente
                        from tramite t 
                        inner join tramite_funcionario tf on t.id=tf.tramite 
                        inner join funcionario f on f.id=tf.funcionario 
                        inner join persona p on p.id=f.persona
                        inner join sector_tipoayuda sta on t.sector_tipoayuda=sta.id
                        inner join ente_sector es on es.sector=sta.sector
                        inner join ente e on e.id=es.ente  
                  where  $condicion";
        //echo json_encode($sql);

        $query = $this->db->query($sql);
        if ($query->num_rows() > 0) {
            foreach ($query->result() as $row1) {
                $resultado[] = $row1;
            }
            return $resultado;
            $query->free - result();
        }
    }

    public function obtenerSolicitudesTramite($ente, $tramite) {
        $sql = "SELECT DISTINCT ti.codigo codigoticket,tr.id idtramite,tr.descripcion tramite,
                        tta.descripcion solicitud, tta.cantidad, ta.nombre tipoayuda, 
                        IF(sol.persona<>'NULL',concat(pp.nombre,' ',pp.apellido),com.razonsocial) as  solicitante, 
                        CASE ti.estatus
                                  WHEN 0 THEN 'ELIMINADO'
                                  WHEN 1 THEN 'PENDIENTE'
                                  WHEN 2 THEN 'RECIBIDO'
                                  WHEN 3 THEN 'EN ESPERA'  
                                  WHEN 4 THEN 'COMPLETADO' 
                                  WHEN 5 THEN 'RECHAZADO' END as estatus
 
                    FROM tramite tr
                    INNER JOIN sector_tipoayuda sta on  sta.id=tr.sector_tipoayuda
                    INNER JOIN ticket ti on ti.sector=sta.sector 
                    INNER JOIN ticket_tipoayuda tta on tta.tipoayuda=sta.tipoayuda and ti.id=tta.ticket
                    INNER JOIN tipoayuda ta on ta.id=tta.tipoayuda
                    INNER JOIN ente_sector es on es.sector=ti.sector and es.ente=$ente
                    INNER JOIN solicitante sol ON sol.id=ti.solicitante
                    LEFT JOIN persona pp ON pp.id=sol.persona
                    LEFT JOIN comunidad com ON com.id=sol.comunidad
                   WHERE tr.id=$tramite";

        $query = $this->db->query($sql);

        if ($query->num_rows() > 0) {

            foreach ($query->result() as $row1) {
                $resultado[] = $row1;
            }
            return $resultado;
            $query->free - result();
        }
    }

    public function obtenerRecaudosTramite($sector, $tipoayuda) {
        $sql = "SELECT rt.id recaudotramite
                    FROM recaudostramite rt 
                    INNER JOIN tramite t ON rt.tramite=t.id
                    INNER JOIN sector_tipoayuda sta ON t.sector_tipoayuda=sta.id AND sta.sector=$sector AND sta.tipoayuda= $tipoayuda
                    ";
          
              $query = $this->db->query($sql);
                    return $query;
            /*$query = $this->db->query($sql);
              if ($query->num_rows() > 0) {
              foreach ($query->result() as $row1){
              $resultado[] = $row1;
              }
              return $resultado;
              $query->free-result();

            } */
    }

}
