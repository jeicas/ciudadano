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
        $sql = "SELECT a.id, a.descripcion,a.unidadresponsable, a.tiempo,
        IF(a.estatus='1','INICIO', IF(a.estatus='2','PROCEDIMIENTO', IF(a.estatus='3','VERIFICACION', IF(a.estatus='4','FINAL','')))) as estatus,
       concat(p.nacionalidad,'-',p.cedula,' ',p.nombre,'  ',p.apellido) as funcionario, actividad.descripcion as cmbprocedimiento
               FROM actividad as a
               inner join actividad_funcionario as af on af.actividad= a.id
               inner JOIN funcionario as f on af.funcionario=f.id
               inner JOIN persona as p on p.id=f.persona
               left join actividad on actividad.actividad_id=a.id
           WHERE
              a.tramite=$idtramite";
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

    function insertTramiteFuncionario($agregar, $datadiscapacitado) {
        $this->db->set($agregar);
        $this->db->set('tramite', $datadiscapacitado);
        $this->db->insert('tramite_funcionario', $agregar);
        return $query = mysql_insert_id();
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
        $this->db->update('tramite', $ticket);
    }
    
    
   

}
