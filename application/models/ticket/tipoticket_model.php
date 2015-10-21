<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipoticket_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerTipoTicket(){
        $this->db->order_by("nombre", "asc");
        $consulta = $this->db->get('tipoticket');
        $tipo=array();  
        if ($consulta->num_rows() > 0){
            foreach ($consulta->result() as $tipoticket){
                $tipo[] = $tipoticket;
            }
            return $tipo;
            $consulta->free->result();
        }
    }
}