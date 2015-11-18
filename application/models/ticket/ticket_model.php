<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ticket_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function insertTicket($arregloTicket){
        $this->db->insert('ticket', $arregloTicket);
        return $id =mysql_insert_id();
    }
    public function insertTicket_Sector_Tipoayuda($arregloTicket_Sector_Tipoayuda){
        return $this->db->insert('ticket_tipoayuda', $arregloTicket_Sector_Tipoayuda);        
    }
    public function insertHistorico($arregloHistorico){
        return $this->db->insert('historicoticket',$arregloHistorico);
    }
    
        public function insertTicketActividad($arreglo){
        return $this->db->insert('ticket_actividad',$arreglo);
    }
    
    
    public function getCodigo(){
        $sql=$this->db->query("SELECT codigo FROM ticket ORDER BY  codigo ASC");
        return $sql;
    }
    public function updateTicket($ticket,$respuesta){
        $data = array('estatus' => $respuesta);
        $this->db->where('id',$ticket);
        $this->db->update('ticket', $data);
    }
    public function buscarTicket($ticket){        
        $sql=$this->db->query("SELECT  ticket.codigo, DATE_FORMAT(ticket.fecha,'d-m-Y') as fecha, IF(solicitante.persona<>'NULL',CONCAT(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante,
            tipoticket.nombre as nombretipo, tipoticket.id as tipoticket, sector.nombre as nombresector,tsa.descripcion, tsa.cantidad
            FROM ticket
            INNER JOIN solicitante ON ticket.solicitante=solicitante.id AND ticket.id=$ticket
            INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
            INNER JOIN ticket_tipoayuda as tsa ON ticket.id=tsa.ticket            
            INNER JOIN sector ON ticket.sector=sector.id
            LEFT JOIN persona ON solicitante.persona=persona.id
            LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
            GROUP BY ticket.id");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $resultado){
                $tipo[] = $resultado;
            }
            return $tipo;
            $sql->free-result();
        }
    }
   
}