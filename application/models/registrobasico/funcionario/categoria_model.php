<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Categoria_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }

    public function obtenerCategoria(){
        $this->db->order_by("nombre", "asc");
        return $consulta = $this->db->get('categoria');
    }
}