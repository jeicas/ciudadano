<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sector_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerSector(){
        $this->db->order_by("nombre", "asc");
        $consulta = $this->db->get('sector');
        $tipo=array();  
        if ($consulta->num_rows() > 0){
            foreach ($consulta->result() as $sector){
                $tipo[] = $sector;
            }
            return $tipo;
            $consulta->free->result();
        }
    }
    public function obtenerSectorTipoayuda($sector){
        $sql=$this->db->query("SELECT tipoayuda.id as idAyuda, tipoayuda.nombre as ayuda, sector.id as idSector
            FROM tipoayuda
            INNER JOIN sector ON sector.id=$sector
            INNER JOIN sector_tipoayuda ON sector.id=sector_tipoayuda.sector AND tipoayuda.id=sector_tipoayuda.tipoayuda
            ORDER BY tipoayuda.nombre asc");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $sector){
                $tipo[] = $sector;
            }
            return $tipo;
            $sql->free->result();
        }
    }
}