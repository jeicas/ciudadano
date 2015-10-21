<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Funcionario_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    public function insertFuncionario($arregloFuncionario){
        $this->db->insert('funcionario', $arregloFuncionario);
        return $id =mysql_insert_id();
    }    
    public function updateFuncionario($funcionario,$arregloFuncionario){
        $this->db->where('id',$funcionario);
        $this->db->update('funcionario',$arregloFuncionario);
    }
    public function eliminarFuncionario($id){
        $data = array('estatus' => '0');
        $this->db->where('id',$id);
        $this->db->update('funcionario', $data);
    }
    public function activarFuncionario($id){
        $data = array('estatus' => '1');
        $this->db->where('id',$id);
        $this->db->update('funcionario', $data);
    }
    public function catalogoFuncionario(){
        $sql=$this->db->query("SELECT funcionario.id as idF, funcionario.usuario as idU,persona.nacionalidad, persona.cedula,persona.nombre,persona.apellido,CONCAT(persona.nombre,' ',persona.apellido)as nombrecompleto,
            persona.fechanacimiento, SUBSTRING(persona.tlf1,1,3) as codTlf1,SUBSTRING(persona.tlf2,1,3) as codTlf2,SUBSTRING(persona.tlf1,4) as movil, ente.tipo as tipoE,usuario.usuario, funcionario.estatus,persona.sexo,
            SUBSTRING(persona.tlf2,4) as local,persona.correo,persona.parroquia, persona.direccion as direccion,ente.id as ente, usuario.tipousuario,CONCAT(persona.nacionalidad,'-',persona.cedula)as cedulacompleta
            FROM persona
            INNER JOIN funcionario ON persona.id=funcionario.persona AND funcionario.estatus=1
            INNER JOIN ente ON funcionario.ente=ente.id
            INNER JOIN usuario ON funcionario.usuario=usuario.id");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $persona){
                $tipo[] = $persona;
            }
            return $tipo;
            $sql->free->result();
        }
    }
    public function catalogoFuncionarioOficina($idUsuario){
        $sql=$this->db->query("SELECT funcionario.id as idF, funcionario.usuario as idU,persona.nacionalidad, persona.cedula,persona.nombre,persona.apellido,CONCAT(persona.nombre,' ',persona.apellido)as nombrecompleto,
            persona.fechanacimiento, SUBSTRING(persona.tlf1,1,3) as codTlf1,SUBSTRING(persona.tlf2,1,3) as codTlf2,SUBSTRING(persona.tlf1,4) as movil, ente.tipo as tipoE,usuario.usuario, funcionario.estatus,persona.sexo,
            SUBSTRING(persona.tlf2,4) as local,persona.correo,persona.parroquia, persona.direccion as direccion,ente.id as ente, usuario.tipousuario,CONCAT(persona.nacionalidad,'-',persona.cedula)as cedulacompleta
            FROM persona
            INNER JOIN funcionario ON persona.id=funcionario.persona AND funcionario.estatus=1
            INNER JOIN funcionario as funcionarioLogeado ON funcionario.usuario=$idUsuario
            INNER JOIN ente ON funcionario.ente=ente.id AND funcionarioLogeado.ente=ente.id
            INNER JOIN usuario ON funcionario.usuario=usuario.id");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $persona){
                $tipo[] = $persona;
            }
            return $tipo;
            $sql->free->result();
        }
    }
    public function obtenerFuncionario($nacionalidad,$cedula){
        $sql=$this->db->query("SELECT funcionario.id as idF, funcionario.usuario as idU,persona.nacionalidad, persona.cedula,persona.nombre,persona.apellido,CONCAT(persona.nombre,' ',persona.apellido)as nombrecompleto,
            persona.fechanacimiento, SUBSTRING(persona.tlf1,1,3) as codTlf1,SUBSTRING(persona.tlf2,1,3) as codTlf2,SUBSTRING(persona.tlf1,4) as movil, ente.tipo as tipoE,usuario.usuario, funcionario.estatus,persona.sexo,
            SUBSTRING(persona.tlf2,4) as local,persona.correo,persona.parroquia, persona.direccion as direccion,ente.id as ente, usuario.tipousuario,CONCAT(persona.nacionalidad,'-',persona.cedula)as cedulacompleta
            FROM persona
            INNER JOIN funcionario ON persona.id=funcionario.persona AND funcionario.estatus=1
            INNER JOIN ente ON funcionario.ente=ente.id AND persona.cedula=$cedula AND persona.nacionalidad='$nacionalidad'
            INNER JOIN usuario ON funcionario.usuario=usuario.id");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $persona){
                $tipo[] = $persona;
            }
            return $tipo;
            $sql->free->result();
        }
    }
}