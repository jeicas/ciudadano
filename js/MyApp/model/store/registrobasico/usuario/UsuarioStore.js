Ext.define('MyApp.model.store.registrobasico.usuario.UsuarioStore', {
    extend: 'Ext.data.Model',    
    pageSize: 15,    
    fields: [
        {name: 'idU',              type: 'string'},
    	{name: 'nacionalidad',     type: 'string'},
        {name: 'cedula',           type: 'string'},
        {name: 'nombre',           type: 'string'},
        {name: 'nombrecompleto',   type: 'string'},
    	{name: 'apellido',         type: 'string'},
        {name: 'usuario',          type: 'string'},
        {name: 'correo',           type: 'string'},
    	{name: 'tipousuario',      type: 'string'},
        {name: 'tipo_usuario',     type: 'string'},
        {name: 'funcionario',      type: 'string'},
        {name: 'uestatus',         type: 'string'}
    ]
});