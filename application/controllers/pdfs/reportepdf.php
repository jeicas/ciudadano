<?php
if (!defined('BASEPATH'))exit('No direct script access allowed');
class Reportepdf extends CI_Controller {
    function __construct() {
        parent::__construct();
        $this->load->model("ticket/reporteticket_model");
        $this->load->helper('url');
        $this->load->database();        
        $this->load->library('Pdf');
        $this->load->library(array('session'));         
    }
   
    public function reporteMunicipioPdf(){
        $parroquia=($this->input->get("parroquia")!='null')?'='.$this->input->get("parroquia"):'LIKE "%"';        
        $desde=($this->input->get("desde")!='')?$this->input->get("desde"):'LIKE "%"';
        $hasta=($this->input->get("hasta")!='')?$this->input->get("hasta"):date('Y-m-d');
        $municipio=($this->input->get("municipio")!='null')?'='.$this->input->get("municipio"):'LIKE "%"';
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
        $reporteMunicipio=$this->reporteticket_model->reporteMunicipioPDF($municipio,$parroquia,$desde,$hasta);
        if($reporteMunicipio){
            $pdf->Image("imagen/logo/logoborde.png",$x = 5,$y = 5,$w = 70,$h = 40,$type = '',$link = '',$align = 'right',$resize = false,$dpi = 300,$palign = '',$ismask = false,$imgmask = false,$border = 0,$fitbox = false,$hidden = false,$fitonpage = false,$alt = false,$altimgs = array());
            $pdf->Text (120, 15, "República Bolivariana de Venezuela", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
            $pdf->Text (120, 20, "Gobernación del Estado Lara", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
            $pdf->Text (120, 25, "Oficina de Atención al Ciudadano.", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);            
            $pdf->SetFont('Times','B',12);
            $pdf->Text(60, 35, 'Reporte Estadistico de ticket por municipio.');
            if($desde=='LIKE "%"'){
                $desde='---';
            }
            $pdf->Text(65, 40, 'Para la fecha: '.$desde.' al '.$hasta);
            $x=60;
            $y=0;
            $i=0;
            foreach($reporteMunicipio as $fila1){
                if($i==0){
                    $y=$y+60;
                }else{
                    $y=$y+90;    
                }                
                $i=$i+1;
                $reporteParroquias=$this->reporteticket_model->reporteParroquiaMunicipio($fila1->municipio,$desde,$hasta);
                foreach($reporteParroquias->result_array() as $fila2){                                              
                    $arregloDatos[]=array(
                        'municipio'=>$fila2['nombreM'],
                        'parroquia'=>$fila2['nombreP'],
                        'contador'=>$fila2['contador'],
                        'estatus' =>$fila2['contador']
                    );
                }                
                $pdf->Ln(20);
                $pdf->Text (13, $y-5, 'Municipio '.$fila1->nombreM, $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='center', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
                $pdf->graficoPDF($arregloDatos,'Grafico'.$i,array($x,$y,90,100),'');
                unset($arregloDatos);
            }
        }else{            
            $pdf->SetFont('Times','B',18);            
            $pdf->Text(14, 40, 'No se encuentra información con las características indicadas.');            
        }  
        $nombre_archivo = utf8_decode("listado.pdf"); 
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }
    public function reporteSectorPdf(){
        $tipo=($this->input->get("tipo")!='null')?'='.$this->input->get("tipo"):'LIKE "%"';        
        $desde=($this->input->get("desde")!='')?$this->input->get("desde"):'LIKE "%"';
        $hasta=($this->input->get("hasta")!='')?$this->input->get("hasta"):date('Y-m-d');
        $sector=($this->input->get("sector")!='null')?'='.$this->input->get("sector"):'LIKE "%"';
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
        $reporteSector=$this->reporteticket_model->reporteSectorPDF($sector,$tipo,$desde,$hasta);
        if($reporteSector){
            $pdf->Image("imagen/logo/logoborde.png",$x = 5,$y = 5,$w = 70,$h = 40,$type = '',$link = '',$align = 'right',$resize = false,$dpi = 300,$palign = '',$ismask = false,$imgmask = false,$border = 0,$fitbox = false,$hidden = false,$fitonpage = false,$alt = false,$altimgs = array());
            $pdf->Text (120, 15, "República Bolivariana de Venezuela", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
            $pdf->Text (120, 20, "Gobernación del Estado Lara", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
            $pdf->Text (120, 25, "Oficina de Atención al Ciudadano.", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);            
            $pdf->SetFont('Times','B',12);
            if($tipo!='LIKE "%"' AND $sector!='LIKE "%"'){
                $pdf->Text(70, 35, 'Reporte resumen de ticket registrados.');
            }else if($sector!='LIKE "%"'){
                $pdf->Text(60, 35, 'Reporte Estadistico de ticket registrados por Sector.');
            }else if($tipo!='LIKE "%"'){
                $pdf->Text(60, 35, 'Reporte Estadistico de tipos de ticket registrados.');
            }else{
                $pdf->Text(70, 35, 'Reporte resumen de ticket registrados.');
            }
            if($desde=='LIKE "%"'){
                $desde='-';
            }
            $pdf->Text(75, 40, 'Para la fecha: '.$desde.' al '.$hasta);
            $anterior=null;
            foreach($reporteSector as $fila){
                if($sector!='LIKE "%"'){
                    if($tipo!='LIKE "%"'){
                        $pdf->SetFillColor('150','210','255');
                        $pdf->Ln(20);
                        $pdf->Cell (0, 0, 'Cuadro Resumen', 1, 1, 'C',1);
                        $pdf->Cell (75, 0,'Tipo ticket', 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                        $pdf->Cell (75, 0,'Sector relacionado', 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                        $pdf->Cell (30, 0,'Cantidad', 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                        $pdf->Cell (75, 0,$fila->tipo, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                        $pdf->Cell (75, 0,$fila->sector, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                        $pdf->Cell (30, 0,$fila->cantidad, 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                        $variable=null;
                    }else{
                        $arregloDatos[]=array(
                            'contador'=>$fila->cantidad,
                            'tipo'=>$fila->tipo,
                            'estatus' =>'sector'
                        );
                        $variable='SECTOR '.$fila->sector;
                    }                    
                }else{
                    if($tipo!='LIKE "%"'){
                        $arregloDatos[]=array(
                            'contador'=>$fila->cantidad,
                            'sector'=>$fila->sector,
                            'estatus' =>'tipo'
                        );
                        $variable='TIPO DE TICKET '.$fila->tipo;
                    }else{                        
                        $pdf->SetFillColor('150','210','255');                        
                        if($anterior==null){
                            $pdf->Ln(20);
                            $pdf->Cell (0, 0, 'Cuadro Resumen', 1, 1, 'C',1);
                            $pdf->Cell (0, 0, 'TICKET TIPO '.$fila->tipo, 1, 1, 'C',0);
                            $pdf->Cell (140, 0, 'Sector relacionado', 1, 0, 'C',1);
                            $pdf->Cell (40, 0, 'Cantidad', 1, 1, 'C',1);
                            $pdf->Cell (140, 0,$fila->sector, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                            $pdf->Cell (40, 0,$fila->cantidad, 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M'); 
                        }else{
                            if($anterior==$fila->tipo){                                
                                $pdf->Cell (140, 0,$fila->sector, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                                $pdf->Cell (40, 0,$fila->cantidad, 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M'); 
                            }else{
                                $pdf->Ln(20);
                                $pdf->Cell (0, 0, 'Cuadro Resumen', 1, 1, 'C',1);
                                $pdf->Cell (0, 0, 'TICKET TIPO '.$fila->tipo, 1, 1, 'C',0);
                                $pdf->Cell (140, 0, 'Sector relacionado', 1, 0, 'C',1);
                                $pdf->Cell (40, 0, 'Cantidad', 1, 1, 'C',1);
                                $pdf->Cell (140, 0,$fila->sector, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                                $pdf->Cell (40, 0,$fila->cantidad, 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M'); 
                            }
                        }                        
                        $anterior=$fila->tipo;
                        $variable=null;
                    }                    
                }
            }
            //'Representación grafica de las parroquias del '.$fila1->nombreM
            $pdf->Ln(20);
            if($tipo!=$sector && $variable!=null){
                $pdf->graficoPDF($arregloDatos,'Grafico',array(60,50,90,100),$variable);
            }
        }else{
            $pdf->SetFont('Times','B',18);            
            $pdf->Text(14, 40, 'No se encuentra información con las características indicadas.');            
        }  
        $nombre_archivo = utf8_decode("listado.pdf"); 
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }

    public function reporteEstatusPdf(){        
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
        $reporteEstatus=$this->reporteticket_model->reporteEstatusPDF();
        if($reporteEstatus){
            $pdf->Image("imagen/logo/logoborde.png",$x = 5,$y = 5,$w = 70,$h = 40,$type = '',$link = '',$align = 'right',$resize = false,$dpi = 300,$palign = '',$ismask = false,$imgmask = false,$border = 0,$fitbox = false,$hidden = false,$fitonpage = false,$alt = false,$altimgs = array());
            $pdf->Text (120, 15, "República Bolivariana de Venezuela", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
            $pdf->Text (120, 20, "Gobernación del Estado Lara", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);
            $pdf->Text (120, 25, "Oficina de Atención al Ciudadano.", $fstroke=false, $fclip=false, $ffill=true, $border=0, $ln=0, $align='left', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M', $rtloff=false);            
            $pdf->SetFont('Times','B',12);
            $pdf->Text(60, 50, 'Reporte estadistico del estatus de los Ticket registrados.');
            foreach($reporteEstatus->result_array() as $fila){
                $arregloDatos[]=array(
                    'estatus'=>$fila['estatus'],
                    'contador'=>$fila['contador']
                );
            }            
            $pdf->Ln(10);
            $pdf->SetFillColor('150','210','255');
            $pdf->Cell (0, 0, 'Cuadro Resumen', 1, 1, 'C',1);
            $pdf->Cell (75, 0,'Tipo ticket', 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
            $pdf->Cell (75, 0,'Sector relacionado', 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
            $pdf->Cell (30, 0,'Cantidad', 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
            $reporteCuadro=$this->reporteticket_model->reporteEstatusCuadroPDF();
            foreach($reporteCuadro as $fila2){
                $pdf->Cell (75, 0,$fila2->tipo, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                $pdf->Cell (75, 0,$fila2->sector, 1, 0, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                $pdf->Cell (30, 0,$fila2->cantidad, 1, 1, 'C', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
                $total=$fila2->total;
            }
            $pdf->Cell (150, 0,'Total de ticket', 1, 0, 'R', $fill=false, $link='', $stretch=0, $ignore_min_height=false, $calign='T', $valign='M');
            $pdf->Cell (30, 0, $total, 1, 1, 'C',1);
            $pdf->Ln(10);
            $pdf->graficoPDF($arregloDatos,'Grafico',array(60,'',90,100),'');
        }else{
            $pdf->SetFont('Times','B',18);            
            $pdf->Text(14, 40, 'No se encuentra información con las características indicadas.');            
        }
        $nombre_archivo = utf8_decode("listado.pdf");
        $pdf->writeHTMLCell($w = 0,$h = 0,$x='',$y = '',$html,$border = 0,$ln = 1,$fill = 0,$reseth=true,$align='C',$autopadding= true);
        $pdf->Output($nombre_archivo, 'I');
    }
}