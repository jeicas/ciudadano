<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Persona_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    public function eliminarPersona($id){
	    $sql=$this->db->query("UPDATE persona,funcionario SET persona.estatus=0 WHERE persona.cedula=funcionario.cedula AND persona.nacionalidad=funcionario.nacionalidad AND funcionario.id=$id");
	    return $sql;
    }
    public function activarPersona($id){
	    $sql=$this->db->query("UPDATE persona,funcionario SET persona.estatus=1 WHERE persona.cedula=funcionario.cedula AND persona.nacionalidad=funcionario.nacionalidad AND funcionario.id=$id");
	    return $sql;
    }
    public function insertPersona($arregloPersona){
        $this->db->insert('persona', $arregloPersona);
        return $id =mysql_insert_id();
    }
    public function insertSolicitante($arregloSolicitante){
        $this->db->insert('solicitante', $arregloSolicitante);
        return $id =mysql_insert_id();
    }
    public function updatePersona($arregloPersona,$nacionalidad,$cedula){
        $this->db->where('cedula',$cedula);
        $this->db->where('nacionalidad',$nacionalidad);
        $this->db->update('persona',$arregloPersona);
    }
    public function obtenerPersona($nacionalidad,$cedula){
        $sql=$this->db->query("SELECT solicitante.id as idSolicitante, persona.nacionalidad as nacionalidad, persona.cedula as cedula, persona.nombre as nombreSolicitante, persona.apellido as apellidoSolicitante,
        persona.fechanacimiento as fechanacimiento,persona.correo as correo,persona.sexo as sexo, persona.parroquia as parroquia, persona.direccion as direccion,
        SUBSTRING(persona.tlf1,1,3) as codTlf1,SUBSTRING(persona.tlf2,1,3) as codTlf2,SUBSTRING(persona.tlf1,4) as movil,SUBSTRING(persona.tlf2,4) as local, persona.estatus as estatusPersona
            FROM persona
            LEFT JOIN solicitante ON  persona.id=solicitante.persona
            WHERE persona.nacionalidad='$nacionalidad' AND persona.cedula=$cedula AND persona.estatus=1");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $persona){
                $tipo[] = $persona;
            }
            return $tipo;
            $sql->free->result();
        }
    }
    public function obtenerContacto($nacionalidad,$cedula){
        $sql=$this->db->query("SELECT persona.nacionalidad as nacionalidadC, persona.cedula as cedulaC, persona.nombre as nombreContacto, persona.apellido as apellidoContacto,
        persona.fechanacimiento as fechanacimientoC,persona.correo as correoC,persona.sexo as sexoC, persona.parroquia as parroquiaC, persona.direccion as direccionC,
        SUBSTRING(persona.tlf1,1,3) as ccodTlf1,SUBSTRING(persona.tlf2,1,3) as ccodTlf2,SUBSTRING(persona.tlf1,4) as movilC,SUBSTRING(persona.tlf2,4) as localC, persona.estatus as estatusContacto 
        FROM persona WHERE persona.nacionalidad='$nacionalidad' AND persona.cedula=$cedula AND persona.estatus=1");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $persona){
                $tipo[] = $persona;
            }
            return $tipo;
            $sql->free->result();
        }
    }
}