<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Categoria extends CI_Controller
{
    public function __construct(){
        parent::__construct();
        $this->load->model("registrobasico/funcionario/categoria_model");
    }

    public function obtenerCategoria(){
        $categoria = $this->categoria_model->obtenerCategoria();
        if($categoria->num_rows()>0){
            foreach ($categoria->result_array() as $row){
                $data[] = array(
                    'id'          => $row['id'],
                    'nombre'      => $row['nombre']
                    );
            }
            $output = array(
                'success' => true,
                'data'    => $data,
                'total'   => count($data));
            echo json_encode($output);
        }else{
            echo json_encode(array(
                "success"   => false
                ));
        }
    }
}