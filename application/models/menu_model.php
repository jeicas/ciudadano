<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Menu_model extends CI_Model {
  function __construct(){
    $this->load->database();
    $this->load->library('session','data');
  }
  function cargarmenu() {
    $username=$this->session->userdata('data');
    $usuario = $username['usuario_id'];
    $pass=$username['password'];
    $queryString= $this->db->query("Select p.menu menuId, tipousuario.nombre 
      FROM usuario u INNER JOIN menu_tipousuario p ON u.tipousuario= p.tipousuario 
      INNER JOIN menu m ON p.menu = m.id
      INNER JOIN tipousuario ON u.tipousuario=tipousuario.id
      WHERE u.usuario ='$usuario' AND u.clave='$pass'");
    $folder = array();
    if ($queryString ->num_rows() > 0){
      $in = '('; 
        foreach($queryString->result_array() as $user){
          $in .= $user['menuId'] . ","; 
        }
      $in = substr($in, 0, -1) . ")";
      $tipo_usuario=$user['nombre'];
      $queryString->free_result(); 
      $sql= $this->db->query(" SELECT * FROM menu WHERE padre IS NULL  AND id in $in");
      if ($sql->num_rows() > 0){
        foreach($sql->result_array() as $r){
          $sqlquery = $this->db->query("SELECT * FROM menu WHERE padre = '".$r['id'] ."' AND id in $in");
          if ($sqlquery->num_rows() > 0){
            $count =mysql_affected_rows();
            //$count = $sqlquery->num_rows();
            if ($count>0){
              $r['leaf'] = false;
              $r['user'] = strtoupper($tipo_usuario).': '.$username['usuario']; 
              $r['items'] = array(); 
              foreach($sqlquery->result_array() as $item ){
                $item['leaf'] = true; 
                $r['items'][] = $item;                
              }
            }else {
              $r['leaf'] = true;
            }
            $folder[] = $r; 
          } 
        }
       return $folder;
      }
    }
  }
}