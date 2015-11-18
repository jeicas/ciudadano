<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Respuestaticket_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    
    public function obtenerTicket($sector,$tipo,$desde,$hasta){
        $sql=$this->db->query("SELECT ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,IF(solicitante.persona<>'NULL',concat(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante,
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket, IF(historicoticket.fecharecibido<>'NULL','RECIBIDO','PENDIENTE') as estatusTicket
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario
        LEFT JOIN persona ON solicitante.persona=persona.id
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante AND ticket.estatus=1
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id AND tipoticket.id $tipo
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'        
        INNER JOIN sector ON ticket.sector=sector.id AND sector.id $sector
        ORDER BY historicoticket.fecharegistro");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $consulta[] = $usuario;
            }
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function obtenerTicket2($usuario,$tipo,$desde,$hasta){
        $sql=$this->db->query("SELECT ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,IF(solicitante.persona<>'NULL',concat(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante,
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket, IF(historicoticket.fecharecibido<>'NULL','RECIBIDO','PENDIENTE') as estatusTicket
        FROM solicitante
        LEFT JOIN persona ON solicitante.persona=persona.id
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN usuario ON usuario.id=$usuario
        INNER JOIN funcionario ON usuario.id=funcionario.usuario
        INNER JOIN ente ON funcionario.ente=ente.id        
        INNER JOIN ticket ON solicitante.id=ticket.solicitante AND ticket.estatus=1
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id AND tipoticket.id $tipo
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'        
        INNER JOIN sector ON ticket.sector=sector.id
        INNER JOIN ente_sector ON ente.id=ente_sector.ente AND sector.id=ente_sector.sector
        ORDER BY historicoticket.fecharegistro");
        
        echo json_encode($sql);
      /* if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $consulta[] = $usuario;
            }
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }*/
    }    
}