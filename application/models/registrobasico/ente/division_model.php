<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Division_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerDivision($idente){
        $this->db->order_by("nombre", "asc");
        return $consulta = $this->db->get_where('division',array('ente' => $idente));
    }
    public function insertDivision($arregloDivision){
        return $this->db->insert('division',$arregloDivision);
    }
    public function deleteDivision($ente){
       $sql="DELETE FROM division WHERE ente=? ";
       return $this->db->query($sql,array($ente));
    }
    public function obtenerDivisionFuncionario($funcionario){
        $sql=$this->db->query("SELECT division.* FROM division INNER JOIN funcionario ON division.id=funcionario.division AND funcionario.id=$funcionario");
        return $sql;
    }
    public function buscarDivisionAuditoria($division){
        $sql=$this->db->query("SELECT id FROM auditoria WHERE division=$division");
        if ($sql->num_rows() > 0){
            return true;
        }else{
            return false;
        }
    }
    public function buscarDivisionFuncionario($division){
        $sql=$this->db->query("SELECT id FROM funcionario WHERE division=$division");
        if ($sql->num_rows() > 0){
            return true;
        }else{
            return false;
        }
    }
    public function buscarDivision($division){
        $sql=$this->db->query("SELECT id FROM division WHERE id=$division");
        if ($sql->num_rows() > 0){
            return true;
        }else{
            return false;
        }
    }
    public function eliminarDivision($division){
       $sql="DELETE FROM division WHERE id=? ";
       return $this->db->query($sql,array($division));
    }
    public function updateDivision($arregloDivision,$division){
        $this->db->where('id',$division);
        $this->db->update('division', $arregloDivision);
    }
}