<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Parroquia_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerParroquia($idmunicipio){
    	$this->db->order_by("nombre", "asc");
    	return $consulta = $this->db->get_where('parroquia',array('municipio' => $idmunicipio));
    }    
}