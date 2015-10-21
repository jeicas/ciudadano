<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Estado_model extends CI_Model{

	public function __construct(){
		parent::__construct();
	}

	public function obtenerEstado(){
		$this->db->order_by("nombre", "asc");
		return $consulta = $this->db->get_where('estado',array('id' => 11));
	}
}