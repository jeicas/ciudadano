Ext.define('MyApp.model.store.informe.GenericoStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'idIP'},
    	{name: 'descripcion'},
    	{name: 'imagen'},
    	{name: 'criterio'},
        {name: 'condicion'},
    	{name: 'titulo'},
    	{name: 'causa'},
    	{name: 'efecto'}	
    ]
});