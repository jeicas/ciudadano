<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once dirname(__FILE__) . '/tcpdf/tcpdf.php';
require_once('jpgraph.php');
require_once('jpgraph_pie.php');
require_once ("jpgraph_pie3d.php");

class Pdf extends TCPDF
{
    function __construct(){
        parent::__construct();
    }
   public function graficoPDF($datos = array(),$nombreGrafico = NULL,$ubicacionTamamo = array(),$titulo = NULL){ 
	  //construccion de los arrays de los ejes x e y
		if(!is_array($datos) || !is_array($ubicacionTamamo)){
	   		echo "los datos del grafico y la ubicacion deben de ser arreglos";
	  	}
	  	elseif($nombreGrafico == NULL){
	   		echo "debe indicar el nombre del grafico a crear";
	  	}else{ 
	   		#obtenemos los datos del grafico  
	   		//echo json_encode($datos);
	   		foreach ($datos as $key => $value){
	   			if($value['estatus']===$value['contador']){
	   				$data[] = $value['contador'];
			    	$nombres[] = $value['parroquia'].' ('.$value['contador'].')'; 
	   			}else if($value['estatus']==='tipo'){
	   				$data[] = $value['contador'];
			    	$nombres[] = $value['sector'].' ('.$value['contador'].')'; 
			    }else if($value['estatus']==='sector'){			    	
	   				$data[] = $value['contador'];
			    	$nombres[] = $value['tipo'].' ('.$value['contador'].')';			    
	   			}else if($value['estatus']!=$value['contador']){
	   				$data[] = $value['contador'];
			    	$nombres[] = $value['estatus'].' ('.$value['contador'].')';
	   			}			        
	   		} 
		   $x = $ubicacionTamamo[0];
		   $y = $ubicacionTamamo[1]; 
		   $ancho = $ubicacionTamamo[2];  
		   $altura = $ubicacionTamamo[3];  
		   $color[] = ['red','blue','yellow','green','orange','pink','purple','silver','olive','grey','lime','sky blue','black','brown'];
		   #Creamos un grafico vacio
		   $graph = new PieGraph(400,300);
		   #indicamos titulo del grafico si lo indicamos como parametro
		   	if(!empty($titulo)){
	    		$graph->title->Set($titulo);
	   		}   
		   //Creamos el plot de tipo tarta
		   $p1 = new PiePlot3D($data);
		   $p1->SetSliceColors($color);
		   #indicamos la leyenda para cada porcion de la tarta
		   $p1->SetLegends($nombres);
		   //Añadirmos el plot al grafico
		   $graph->Add($p1);
		   //mostramos el grafico en pantalla
		   unlink("$nombreGrafico.png");
		   $graph->Stroke("$nombreGrafico.png"); 
		   $this->Image("$nombreGrafico.png",$x,$y,$ancho,$altura);  
	  	} 
 	} 
}