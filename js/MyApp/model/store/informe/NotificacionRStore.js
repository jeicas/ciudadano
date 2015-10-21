Ext.define('MyApp.model.store.informe.NotificacionRStore', {
    extend: 'Ext.data.Model',
    //idProperty: 'id',
    fields: [
    	{name: 'idD'},
        {name: 'idA'},
    	{name: 'auditoria'},
    	{name: 'fecha'},
    	{name: 'codigo'},
    	{name: 'ente'}
    ]
});