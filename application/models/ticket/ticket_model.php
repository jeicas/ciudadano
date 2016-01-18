<?php

if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Ticket_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function insertTicket($arregloTicket) {
        $this->db->insert('ticket', $arregloTicket);
        return $id = mysql_insert_id();
    }

    public function insertTicket_Sector_Tipoayuda($arregloTicket_Sector_Tipoayuda) {
        return $this->db->insert('ticket_tipoayuda', $arregloTicket_Sector_Tipoayuda);
    }

    public function insertHistorico($arregloHistorico) {
        return $this->db->insert('historicoticket', $arregloHistorico);
    }

    public function insertTicketRecaudos($arreglo) {
        return $this->db->insert('recaudosticket', $arreglo);
    }

    public function insertTicketActividad($arreglo) {
        return $this->db->insert('ticket_actividad', $arreglo);
    }

    public function getCodigo() {
        $sql = $this->db->query("SELECT codigo FROM ticket ORDER BY  codigo ASC");
        return $sql;
    }

    public function updateTicket($ticket, $respuesta) {
        $data = array('estatus' => $respuesta);
        $this->db->where('id', $ticket);
        $this->db->update('ticket', $data);
    }

    public function buscarTicket($ticket) {
        $sql = $this->db->query("SELECT  ticket.codigo, DATE_FORMAT(ticket.fecha,'d-m-Y') as fecha, IF(solicitante.persona<>'NULL',CONCAT(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante,
            tipoticket.nombre as nombretipo, tipoticket.id as tipoticket, sector.nombre as nombresector,tsa.descripcion, tsa.cantidad
            FROM ticket
            INNER JOIN solicitante ON ticket.solicitante=solicitante.id AND ticket.id=$ticket
            INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
            INNER JOIN ticket_tipoayuda as tsa ON ticket.id=tsa.ticket            
            INNER JOIN sector ON ticket.sector=sector.id
            LEFT JOIN persona ON solicitante.persona=persona.id
            LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
            GROUP BY ticket.id");
        if ($sql->num_rows() > 0) {
            foreach ($sql->result() as $resultado) {
                $tipo[] = $resultado;
            }
            return $tipo;
            $sql->free - result();
        }
    }

    public function updateEstatusTicket($ticket) {
        $this->db->where('id', $ticket['id']);
        return $this->db->update('ticket', $ticket);
        echo json_encode($this->db->update('ticket', $ticket));
    }

    public function updateObservacionTicket($ticket) {
        $this->db->where('ticket', $ticket['ticket']);
        $this->db->where('tipoayuda', $ticket['tipoayuda']);
        return $this->db->update('ticket_tipoayuda', $ticket);
    }

    public function updateEstatusActividadTicket($ticket) {
        $this->db->where('ticket', $ticket['ticket']);
        $this->db->where('actividad', $ticket['actividad']);
        return $this->db->update('ticket_actividad', $ticket);
    }

    public function mensajeFuncionarioProdedimiento($ticket) {
        $this->db->where('ticket', $ticket['ticket']);
        $this->db->where('actividad', $ticket['actividad']);
        return $this->db->update('ticket_actividad', $ticket);
    }

    public function updateTicketRecaudos($arreglo) {
        $this->db->where('id', $arreglo['id']);
        $this->db->where('recaudotramite', $arreglo['recaudotramite']);
        return $this->db->update('recaudosticket', $arreglo);
    }

    public function buscarTicketSector($ticket) {
        $sql = $this->db->query("SELECT  ticket.codigo, DATE_FORMAT(ticket.fecha,'d-m-Y') as fecha, IF(solicitante.persona<>'NULL',CONCAT(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante,
            tipoticket.nombre as nombretipo, tipoayuda.nombre as ayudaticket, tipoticket.id as tipoticket, sector.nombre as nombresector,tsa.descripcion, tsa.cantidad
            FROM ticket
            INNER JOIN solicitante ON ticket.solicitante=solicitante.id AND ticket.id=$ticket
            INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
            INNER JOIN ticket_tipoayuda as tsa ON ticket.id=tsa.ticket            
            INNER JOIN tipoayuda ON tsa.tipoayuda=tipoayuda.id
            INNER JOIN sector ON ticket.sector=sector.id
            LEFT JOIN persona ON solicitante.persona=persona.id
            LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id");
        if ($sql->num_rows() > 0) {
            foreach ($sql->result() as $resultado) {
                if ($sql->num_rows() > 0) {
                    foreach ($sql->result() as $resultado) {
                        $tipo[] = $resultado;
                    }
                    return $tipo;
                    $sql->free - result();
                    + $sql->free - result();
                }
            }
        }
    }

    public function buscarActividadDependiente($id) {
        $sql = $this->db->query("SELECT id  from actividad where actividad_id=$id");
        if ($sql->num_rows() > 0) {
            foreach ($sql->result() as $usuario) {
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        } else {
            return false;
        }
    }

    public function obtenerrecaudosticket($ticket, $ente) {
        $sql = $this->db->query("SELECT rt.id idrecaudoticket, rt.ticket idticket, t.descripcion tramite, r.nombre as nombrerecaudo, r.id as idrecaudo,
                               IF (r.requerido=1,'SI', 'NO') requerido, 
                               IF (rt.estatus=0,'PENDIENTE', 'ENTREGADO')estatusrecaudo 
                                FROM recaudosticket rt
                                INNER JOIN recaudostramite rtr on rtr.id=rt.recaudotramite 
                                INNER JOIN recaudos r on r.id=rtr.recaudos 
                                INNER JOIN tramite t on rtr.tramite=t.id 
                                INNER JOIN tramite_funcionario tf on tf.tramite=t.id
                                INNER JOIN funcionario f on f.id=tf.funcionario and f.ente=$ente
                                where rt.ticket=$ticket");

        if ($sql->num_rows() > 0) {
            foreach ($sql->result() as $resultado) {
                $tipo[] = $resultado;
            }
            return $tipo;
            $sql->free - result();
        }
    }
    

    public function updateEstatusRecaudosTicket($ticket) {
        $this->db->where('id', $ticket['id']);
        return $this->db->update('recaudosticket', $ticket);
    }
    
      public function updateEstatusRecaudosTicketT($ticket) {
        $this->db->where('ticket', $ticket['ticket']);
        return $this->db->update('recaudosticket', $ticket);
    }
    

    public function obtenerTipoAyudaTicket($ticket) {
        $sql = $this->db->query("SELECT tipoayuda  from ticket_tipoayuda where ticket=$ticket");
         return $sql;
    }
    
}
