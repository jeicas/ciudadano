Ext.define('MyApp.model.store.Generico', {
    extend: 'Ext.data.Model',    
    pageSize: 10,
    fields: [
    	{name: 'id'},
        {name: 'idfuncionario'},
    	{name: 'nombre'},
    	{name: 'ayuda'},
    	{name: 'descripcion'},
    	{name: 'estatustipoc'},
    ]    
});