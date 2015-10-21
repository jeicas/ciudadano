<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 class Login_model extends CI_Model {
   function __construct(){
    $this->load->database();
    $this->load->library('session');
     $this->load->library(array('session'));
  }
  function verificasession($usuario, $password) {
    $this->db->select('usuario');
    $this->db->where('usuario', $usuario);
    $this->db->where('clave', $password);
    $resultado= $this->db->get('usuario');
    return $resultado;
  }
  function verificaUsuario($usuario, $password) {
    $this->db->select('id, usuario,estatus,tipousuario, ente');
    $this->db->where('usuario', $usuario);
    $this->db->where('clave', $password);
    $this->db->limit(1);
    $query = $this->db->get('usuario');
    return $query;
  }
}

