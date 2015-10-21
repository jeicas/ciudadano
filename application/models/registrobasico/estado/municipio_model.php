<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Municipio_model extends CI_Model{

	public function __construct(){
		parent::__construct();
	}

	public function obtenerMunicipio($idestado){
		$this->db->order_by("nombre", "asc");
		return $consulta = $this->db->get_where('municipio',array('estado' => $idestado));
	}
}