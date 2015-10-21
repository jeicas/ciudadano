Ext.define('MyApp.model.store.informe.NotificacionStore', {
    extend: 'Ext.data.Model',
    //idProperty: 'id',
    fields: [
    	{name: 'idD'},
        {name: 'idIP'},
    	{name: 'fecha1'},
    	{name: 'hora1'},
    	{name: 'fecha2'},
    	{name: 'hora2'},
    	{name: 'fechaD'},
    	{name: 'estatus'}
    ]
});