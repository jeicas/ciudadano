<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Sector_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerSectorEnte($ente){
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
    
      public function obtenerEnteSector($ente){
        $sql=$this->db->query("SELECT s.id as id, s.nombre as nombre
            FROM sector as s
            INNER JOIN ente_sector as es ON es.sector=s.id and es.ente=$ente
            ORDER BY s.nombre asc");
       return $sql;
    }
    
     public function obtenerSector(){
        $sql=$this->db->query("SELECT s.id as id, s.nombre as nombre
            FROM sector as s
            ORDER BY s.nombre asc");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $sector){
                $tipo[] = $sector;
            }
            return $tipo;
            $sql->free->result();
        }
    }
    public function obtenerSectorTipoayuda($sector, $ente){
        $sql=$this->db->query("SELECT tipoayuda.id as idAyuda, tipoayuda.nombre as ayuda, es.sector as idSector
                                FROM tipoayuda
                                INNER JOIN ente_sector es ON es.sector=$sector and es.ente=$ente
                                INNER JOIN sector_tipoayuda sta ON sta.sector=es.id and sta.tipoayuda=tipoayuda.id

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