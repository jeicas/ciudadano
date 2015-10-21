Ext.define('MyApp.model.store.registrobasico.funcionario.FuncionarioStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'idF'},
        {name: 'idU'},
        {name: 'nacionalidad',     type: 'string'},
        {name: 'cedula',           type: 'string'},
        {name: 'cedulacompleta',   type: 'string'},
        {name: 'nombrecompleto',   type: 'string'},
        {name: 'nombre',           type: 'string'},
    	{name: 'apellido',         type: 'string'},
    	{name: 'sexo',             type: 'string'},
    	{name: 'correo',           type: 'string'},
    	{name: 'fechanacimiento',  type: 'string'},
    	{name: 'codTlf1'},
    	{name: 'movil',            type: 'string'},
        {name: 'codTlf2'},
        {name: 'local' ,           type: 'string'},
    	{name: 'direccion',        type: 'string'},
        {name: 'ente'  ,           type: 'string'},        
        {name: 'tipoE'  ,          type: 'string'},
        {name: 'parroquia',        type: 'string'},
        {name: 'usuario',          type: 'string'},
        {name: 'estatus',          type: 'string'},
        {name: 'tipousuario',      type: 'string'}        
    ]
});