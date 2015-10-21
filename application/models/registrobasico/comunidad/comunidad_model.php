<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Comunidad_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    public function insertComunidad($arregloComunidad){
        $this->db->insert('comunidad', $arregloComunidad);
        return $id =mysql_insert_id();
    }
    public function updateComunidad($arregloComunidad,$nacionalidad,$cedula){
    	$this->db->where('rifnumero',$cedula);
        $this->db->where('rifletra',$nacionalidad);
        $this->db->update('comunidad',$arregloComunidad);
    }
    public function obtenerComunidad($nacionalidad,$cedula){
        $sql=$this->db->query("SELECT persona.nacionalidad as nacionalidadC, persona.cedula as cedulaC, persona.nombre as nombreContacto,persona.apellido as apellidoContacto,
       	persona.fechanacimiento as fechanacimientoC, SUBSTRING(persona.tlf1,1,3) as ccodTlf1,SUBSTRING(persona.tlf2,1,3) as ccodTlf2,SUBSTRING(persona.tlf1,4) as movilC,
       	SUBSTRING(persona.tlf2,4) as localC, persona.estatus as estatusContacto,persona.correo as correoC,persona.parroquia as parroquiaC, persona.direccion as direccionC,
        solicitante.id as idSolicitante, comunidad.rifletra as nacionalidad, comunidad.rifnumero as cedula, comunidad.razonsocial as razonSolicitante,
        comunidad.correo as correo,comunidad.parroquia as parroquia, comunidad.direccion as direccion,
        SUBSTRING(comunidad.tlf1,1,3) as codTlf1,SUBSTRING(comunidad.tlf2,1,3) as codTlf2,SUBSTRING(comunidad.tlf1,4) as movil,SUBSTRING(comunidad.tlf2,4) as local, comunidad.estatus as estatusComunidad
            FROM comunidad
            LEFT JOIN solicitante ON comunidad.id=solicitante.comunidad
            LEFT JOIN persona ON comunidad.persona=persona.id AND persona.estatus=1
            WHERE comunidad.rifletra='$nacionalidad' AND comunidad.rifnumero=$cedula AND comunidad.estatus=1");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $persona){
                $tipo[] = $persona;
            }
            return $tipo;
            $sql->free->result();
        }
    }
}