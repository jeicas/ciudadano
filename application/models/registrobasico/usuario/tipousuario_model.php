<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipousuario_model extends CI_Model{

	public function __construct(){
		parent::__construct();
	}

	public function obtenerTipoUsuario(){
		$this->db->order_by("nombre", "asc");
		return $consulta = $this->db->get('tipo_usuario');
	}
}