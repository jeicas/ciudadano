<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sector_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerSector($ente){
        $sql=$this->db->query("SELECT s.id as id, s.nombre as nombre
            FROM sector as s
            INNER JOIN ente_sector as es ON es.sector=s.id and es.ente=$ente
            ORDER BY s.nombre asc");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $sector){
                $tipo[] = $sector;
            }
            return $tipo;
            $sql->free->result();
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