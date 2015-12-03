<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ente_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerEnte(){
    	$this->db->order_by("nombre", "asc");
        return $consulta = $this->db->get_where('ente',array('estatus' => 1));
    }
    public function obtenerEnteAdmon($admon){
        $this->db->order_by("nombre", "asc");
        return $consulta = $this->db->get_where('ente',array('tipo' => $admon,'estatus' => 1));
    }
    public function insertEnte($arregloEnte){
        $this->db->insert('ente',$arregloEnte);
        return $this->db->insert_id();
    }
    
      public function insertEnteSector($arregloEnte){
        return $this->db->insert('ente_sector',$arregloEnte);
    }
    public function buscarEnteFuncionario($ente){
        $sql=$this->db->query("SELECT id FROM funcionario WHERE ente=$ente");
        if ($sql->num_rows() > 0){
            return true;
        }else{
            return false;
        }
    }
    public function buscarEnteDivision($ente){
        $sql=$this->db->query("SELECT id FROM division WHERE ente=$ente");
        if ($sql->num_rows() > 0){
            return true;
        }else{
            return false;
        }
    }
    public function eliminarEnte($id){
        $data = array('estatus' => '0');
        $this->db->where('id',$id);
        return $this->db->update('ente', $data);
    }
    public function updateEnte($ente,$arregloEnte){
        $this->db->where('id',$ente);
       return $this->db->update('ente',$arregloEnte);
    }
    
     public function deleteEnteSector($ente){
        $this->db->where('ente',$ente);
        return $this->db->delete('ente_sector');
    }
}