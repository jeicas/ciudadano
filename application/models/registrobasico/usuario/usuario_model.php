<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    public function getUsuario($id){// funcion para el captcha
        $sql= "SELECT usuario.usuario FROM usuario   WHERE usuario.id=?";
        return $this->db->query($sql, array($id));         
    }
    public function getFuncionario($id){
        $sql=$this->db->query("SELECT funcionario.id FROM usuario
        INNER JOIN funcionario ON usuario.id=funcionario.usuario AND usuario.id=$id");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function getSolicitante($id){
        $sql=$this->db->query("SELECT solicitante.id FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario AND usuario.id=$id");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function getUsuarioComunidad($cedula,$nacionalidad,$correo){
        $sql=$this->db->query("SELECT usuario.id FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario 
        INNER JOIN comunidad ON solicitante.comunidad=comunidad.id AND comunidad.rifnumero=$cedula AND comunidad.rifletra='$nacionalidad' AND comunidad.correo='$correo'");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function getUsuarioPersona($cedula,$nacionalidad,$correo){
        $sql=$this->db->query("SELECT usuario.id FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario 
        INNER JOIN persona ON solicitante.persona=persona.id AND persona.nacionalidad='$nacionalidad' AND persona.cedula=$cedula AND persona.correo='$correo'");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function getUsuarioFuncionario($cedula,$nacionalidad,$correo){
        $sql=$this->db->query("SELECT usuario.id FROM usuario
        INNER JOIN funcionario ON usuario.id=funcionario.usuario
        INNER JOIN persona ON funcionario.persona=persona.id AND persona.nacionalidad='$nacionalidad'  AND persona.cedula=$cedula AND persona.correo='$correo'");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $tipo[] = $usuario;
            }
            return $tipo;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function obtenerUsuario(){
        $sql= "SELECT persona.*, usuario.funcionario, usuario.clave, usuario.tipousuario, usuario.estatus as uestatus,  tipo_usuario.id, tipo_usuario.nombre as tipo_usuario, funcionario.id as funcionario,usuario.usuario, usuario.id as idU
        FROM funcionario, usuario, tipo_usuario,persona 
        WHERE usuario.funcionario=funcionario.id AND usuario.tipousuario=tipo_usuario.id AND funcionario.persona=persona.id
        ORDER BY persona.nombre";
        return $consulta=$this->db->query($sql,array());
    }
    public function buscarUsuario($id){
        $sql= "SELECT * FROM usuario, persona,funcionario WHERE usuario.id=? AND funcionario.usuario=usuario.id AND persona.id=funcionario.persona";
        $consulta=$this->db->query($sql,array($funcionario));
        if($consulta->num_rows() == 1){
            return true;
        }else{
            return false;
        }        
    }
    public function existeUsuario($usuario){
        $sql=$this->db->query("SELECT * FROM usuario WHERE usuario.usuario='$usuario'");
        if ($sql->num_rows() > 0){        
            return true;
        }else{
            return false;
        }        
    }
    public function insertUsuario($arregloUsuario){
        $this->db->insert('usuario', $arregloUsuario);
        return $id =mysql_insert_id();
    }
    public function updateUsuario($id,$arregloUsuario){
        $this->db->where('id', $id);
        $this->db->update('usuario', $arregloUsuario);
    }
    public function verificasession($usuario) {
        $this->db->select('usuario');
        $this->db->where('usuario', $usuario);
        $resultado= $this->db->get('usuario');
        return $resultado;
    }
    public function claveActual($id,$clave){
       return $this->db->get_where('usuario',array('id'=>$id,'clave'=>$clave));
    }
    public function updateContrasena($id,$clave){
      $data = array('clave' => $clave);
      $this->db->where('id',$id);
      $this->db->update('usuario',$data);
    }
    public function eliminarUsuario($id){
        $data = array('estatus' => '0');
        $this->db->where('id',$id);
        $this->db->update('usuario', $data);
    }
    public function activarUsuario($id){
        $data = array('estatus' => '1');
        $this->db->where('id',$id);
        $this->db->update('usuario', $data);
    }
}