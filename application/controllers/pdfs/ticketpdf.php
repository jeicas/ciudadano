<?php
if (!defined('BASEPATH'))exit('No direct script access allowed');
class Ticketpdf extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model("ticket/ticket_model");
        $this->load->helper('url');
        $this->load->database();
        $this->load->library('Pdf');
        $this->load->library(array('session'));         
    }
   
    public function ticketPdf(){
        $ticket=$this->input->get("ticket");
        $pdf = new Pdf('L', 'mm', 'A4', true, 'UTF-8', false);        
        $pdf->setPageOrientation('p');
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
        $pdf->SetMargins(PDF_MARGIN_LEFT, 15, PDF_MARGIN_RIGHT);
        //$pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        $pdf->setFontSubsetting(true);
        $pdf->SetFont('times', '', 12, '', true);
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(false);
        $pdf->AddPage();
        $html=null;
        $buscarTicket=$this->ticket_model->buscarTicket($ticket);
        $buscarTicketSector=$this->ticket_model->buscarTicketSector($ticket);
        if($buscarTicket){
            foreach($buscarTicket as $fila1){
            $html = '';
            $html .= "<style type=text/css>";
            $html .= "td{ color: #222}";
            $html .= "</style>";
            $html .= '<table border="0">
                <tr colspan="6">                        
                    <td colspan="2" align="left"><img alt="Imagen" src="imagen/logo/logoborde.png" width="220" heigth="90"/></td>
                    <td colspan="2" ><br></td>
                    <td colspan="2"><p align="right"><b>República Bolivariana de Venezuela<br>Gobernación del Estado Lara</b></p></td>
                </tr><br>
                <tr colspan="6">
                    <td colspan="6" align="right"><b>Ticket: '.$fila1->codigo.'</b></td><br>
                </tr>
                <tr colspan="6">
                    <td colspan="6" align="right"><b>Barquisimeto, '.$fila1->fecha.'</b></td>
                </tr><br>
                <tr colspan="6">
                    <td colspan="6" align="center"><b>REQUERIMIENTO</b></td>
                </tr>
                </table><br>
                
                <table border="1">                
                <tr colspan="6">
                    <td colspan="2" bgColor="#DCDCDC"><p align="center"><b>Solicitante:</b></p></td>
                    <td colspan="4"><p align="center">'.$fila1->solicitante.'</p></td><br>
                </tr>
                <tr colspan="6">
                    <td colspan="2" bgColor="#DCDCDC"><p align="center"><b>Tipo de requerimiento:</b></p></td>
                    <td colspan="4"><p align="center">'.$fila1->nombretipo.'</p></td><br>
                </tr>
                </table><br>';
                if($fila1->tipoticket==3){
                    $html .='
                    <table border="1">
                    <tr colspan="8">
                        <td colspan="8" bgColor="#DCDCDC"><p align="center"><b>DESCRIPCIÓN REQUERIMIENTO.-</b></p></td>
                    </tr>
                    <tr colspan="8">
                        <td colspan="3" bgColor="#DCDCDC"><p align="center"><b>Tipo de ayuda</b></p></td>
                        <td colspan="3" bgColor="#DCDCDC"><p align="center"><b>Descripción</b></p></td>
                        <td colspan="2" bgColor="#DCDCDC"><p align="center"><b>Cantidad</b></p></td>
                    </tr>';
                    foreach($buscarTicketSector as $fila2){
                        $variable=$fila2->nombresector;
                        $html .='<tr colspan="8">
                            <td colspan="3"><p align="center">'.$fila2->ayudaticket.'</p></td>
                            <td colspan="3"><p align="center">'.$fila2->descripcion.'</p></td>
                            <td colspan="2"><p align="center">'.$fila2->cantidad.'</p></td>
                        </tr>';
                    }
                    $html .='<tr colspan="8">
                        <td colspan="8" bgColor="#DCDCDC"><p align="center">SECTOR RELACIONADO AL REQUERIMIENTO: '.$variable.'</p></td><br>
                    </tr>
                    </table>';
                }else{
                    $html .='<table border="1">
                    <tr colspan="6">
                        <td colspan="6" bgColor="#DCDCDC"><p align="center">SECTOR RELACIONADO AL REQUERIMIENTO: '.$fila1->nombresector.'</p></td><br>
                    </tr>
                    <tr colspan="6">
                        <td colspan="6" bgColor="#DCDCDC"><p align="center">DESCRIPCIÓN REQUERIMIENTO.-</p></td><br>
                    </tr>                
                    <tr colspan="6">
                        <td colspan="6"><p align="justify">'.$fila1->descripcion.'</p></td><br>
                    </tr>
                    </table>';
                }
            }            
        }else{            
            $pdf->SetFont('Times','B',18);
            $pdf->Text(5, 25, 'No se encuentra Documento con las características indicadas.');
        }
        $nombre_archivo = utf8_decode("ticket.pdf"); 
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }
}