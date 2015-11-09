<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Atenderticket_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerTicketSolicitante($id){
        $sql=$this->db->query("SELECT IF(historicoticket.funcionariorecibido<>'NULL',ente.nombre,'-') as atendido,ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket, 
        CASE ticket.estatus WHEN 0 THEN 'ELIMINADO' WHEN 1 THEN 'PENDIENTE' WHEN 2 THEN 'RECIBIDO' WHEN 3 THEN 'RECHAZADO' END as estatusTicket,IF(solicitante.persona<>'NULL',concat(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario AND usuario.id=$id
        LEFT JOIN persona ON solicitante.persona=persona.id
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket
        LEFT JOIN funcionario ON historicoticket.funcionariorecibido=funcionario.id
        LEFT JOIN ente ON funcionario.ente=ente.id        
        INNER JOIN sector ON ticket.sector=sector.id
        ORDER BY historicoticket.fecharegistro");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function obtenerTicket($variable){
        $sql=$this->db->query("SELECT IF(historicoticket.funcionariorecibido<>'NULL',ente.nombre,'-') as atendido,ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket,
        CASE ticket.estatus WHEN 0 THEN 'ELIMINADO' WHEN 1 THEN 'PENDIENTE' WHEN 2 THEN 'RECIBIDO' WHEN 3 THEN 'RECHAZADO' END as estatusTicket,IF(solicitante.persona<>'NULL',concat(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario 
        LEFT JOIN persona ON solicitante.persona=persona.id 
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante 
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket
        LEFT JOIN funcionario ON historicoticket.funcionariorecibido=funcionario.id
        LEFT JOIN ente ON funcionario.ente=ente.id        
        INNER JOIN sector ON ticket.sector=sector.id $variable
        ORDER BY historicoticket.fecharegistro");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function updateHistorico($data,$ticket){
        $this->db->where('ticket',$ticket);
        $this->db->update('historicoticket', $data);    
    }
    
    
    
    
       public function obtenerProcedimientoTicket($ticket) {
           
            $sql = "SELECT act.id actividadid, act.descripcion actividad, CASE tact.estatus
                                  WHEN 0 THEN 'ELIMINADO'
                                  WHEN 1 THEN 'PENDIENTE'
                                  WHEN 3 THEN 'RECIBIDO'
				  WHEN 4 THEN 'APROBADO'
                                  WHEN 5 THEN 'RECHAZADO' END as estatus, 
                    tact.observacionresponsable observacionfuncionario, tact.observacionrespuesta respuestafuncionario, 
                    CONCAT(p.nombre, ' ', p.apellido) encargado
                    FROM ticket_actividad tact 
                    INNER JOIN actividad act ON tact.actividad=act.id     
                    INNER JOIN actividad_funcionario actf ON act.id=actf.actividad 
                    INNER JOIN funcionario f ON f.id=actf.funcionario
                    INNER JOIN persona p ON p.id=f.persona
                    WHERE tact.ticket=$ticket";
           
        $query = $this->db->query($sql);
         if ($query->num_rows() > 0) {
              foreach ($query->result() as $row){
                    $resultado[] = $row;
                }
                return $resultado;
                $query->free-result();
        } 
    }
    
}