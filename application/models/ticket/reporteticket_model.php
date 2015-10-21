<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reporteticket_model extends CI_Model{

    public function __construct(){
        parent::__construct();
    }
    
    public function reporteSector($sector,$tipo,$desde,$hasta){
        $sql=$this->db->query("SELECT ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,IF(solicitante.persona<>'NULL',concat(persona.nombre,' ',persona.apellido),comunidad.razonsocial) as solicitante,
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket, IF(historicoticket.fecharecibido<>'NULL','RECIBIDO','PENDIENTE') as estatusTicket
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario
        LEFT JOIN persona ON solicitante.persona=persona.id
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id AND tipoticket.id $tipo
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'        
        INNER JOIN sector ON ticket.sector=sector.id AND sector.id $sector
        ORDER BY historicoticket.fecharegistro");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $consulta[] = $usuario;
            }
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function reporteMunicipio($parroquia,$municipio,$desde,$hasta){
        $sql=$this->db->query("SELECT ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,CONCAT(persona.nombre,' ',persona.apellido) as solicitante,
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket, persona.parroquia,IF(historicoticket.fecharecibido<>'NULL','RECIBIDO','PENDIENTE') as estatusTicket
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario
        INNER JOIN persona ON solicitante.persona=persona.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante
        INNER JOIN parroquia ON persona.parroquia=parroquia.id AND parroquia.id $parroquia
        INNER JOIN municipio ON parroquia.municipio=municipio.id AND municipio.id $municipio
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'        
        INNER JOIN sector ON ticket.sector=sector.id
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id        
        UNION 
        SELECT ticket.codigo as codigoTicket, DATE_FORMAT(historicoticket.fecharegistro,'%d-%m-%Y') as fechaRegistro,comunidad.razonsocial as solicitante, 
        ticket.id as idTicket, tipoticket.nombre as tipoTicket, sector.nombre as sectorTicket, comunidad.parroquia,IF(historicoticket.fecharecibido<>'NULL','RECIBIDO','PENDIENTE') as estatusTicket
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario
        INNER JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante
        INNER JOIN parroquia ON comunidad.parroquia=parroquia.id AND parroquia.id $parroquia
        INNER JOIN municipio ON parroquia.municipio=municipio.id AND municipio.id $municipio
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'
        INNER JOIN sector ON ticket.sector=sector.id
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
        ORDER BY fechaRegistro,idTicket");
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){                
                $consulta[] = $usuario;                
            }
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function reporteSectorPDF($sector,$tipo,$desde,$hasta){
        $sql=$this->db->query("SELECT ticket.id as total,count(DISTINCT(ticket.id))as cantidad,tipoticket.nombre as tipo, sector.nombre as sector 
        FROM ticket        
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id AND tipoticket.id $tipo
        INNER JOIN sector ON ticket.sector=sector.id AND sector.id $sector
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'
        GROUP BY tipoticket.id,sector.id");
        if ($sql->num_rows() > 0){
            $total=0;
            foreach ($sql->result() as $usuario){
                $total=$total+$usuario->cantidad;
                $usuario->total=$total;
                $consulta[] = $usuario;                
            }            
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function reporteMunicipioPDF($municipio,$parroquia,$desde,$hasta){
        $sql=$this->db->query("SELECT municipio.id as municipio, municipio.nombre as nombreM,count(*) as contador      
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario
        LEFT JOIN persona ON solicitante.persona=persona.id
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante
        INNER JOIN parroquia ON  comunidad.parroquia= parroquia.id OR persona.parroquia=parroquia.id AND parroquia.id $parroquia
        INNER JOIN municipio ON parroquia.municipio=municipio.id AND municipio.id $municipio
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'
        GROUP BY municipio.id");        
        if ($sql->num_rows() > 0){
            foreach ($sql->result() as $usuario){
                $consulta[] = $usuario;
            }
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function reporteParroquiaMunicipio($municipio,$desde,$hasta){
        $sql=$this->db->query("SELECT municipio.nombre as nombreM,parroquia.nombre as nombreP, IF(solicitante.persona<>'null',persona.parroquia,comunidad.parroquia)as parroquias,count(*) as contador      
        FROM usuario
        INNER JOIN solicitante ON usuario.id=solicitante.usuario
        LEFT JOIN persona ON solicitante.persona=persona.id
        LEFT JOIN comunidad ON solicitante.comunidad=comunidad.id
        INNER JOIN ticket ON solicitante.id=ticket.solicitante
        INNER JOIN parroquia ON  comunidad.parroquia= parroquia.id OR persona.parroquia=parroquia.id
        INNER JOIN municipio ON parroquia.municipio=municipio.id AND municipio.id = $municipio
        INNER JOIN historicoticket ON ticket.id=historicoticket.ticket AND DATE(historicoticket.fecharegistro) BETWEEN '$desde' AND '$hasta'
        GROUP BY parroquia.id");
        if ($sql->num_rows() > 0){
            /*foreach ($sql->result() as $usuario){                
                $consulta[] = $usuario;                
            }*/
            return $sql;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function reporteEstatusPDF(){
        $sql=$this->db->query("SELECT CASE ticket.estatus WHEN 1 THEN 'Pendiente'  WHEN 2 THEN 'Recibido'  WHEN 3 THEN 'Rechazado' END as estatus, count(ticket.estatus) as contador
        FROM ticket  GROUP BY ticket.estatus");
        if ($sql->num_rows() > 0){
            return $sql;
            $sql->free->result();
        }else{
            return false;
        }
    }
    public function reporteEstatusCuadroPDF(){
        $sql=$this->db->query("SELECT ticket.id as total,COUNT(DISTINCT(ticket.id)) as cantidad,tipoticket.nombre as tipo, sector.nombre as sector FROM ticket        
        INNER JOIN tipoticket ON ticket.tipoticket=tipoticket.id
        INNER JOIN sector ON ticket.sector=sector.id
        GROUP BY tipoticket.id,sector.id");
       if ($sql->num_rows() > 0){
            $total=0;
            foreach ($sql->result() as $usuario){
                $total=$total+$usuario->cantidad;
                $usuario->total=$total;
                $consulta[] = $usuario;                
            }            
            return $consulta;
            $sql->free->result();
        }else{
            return false;
        }
    }
}