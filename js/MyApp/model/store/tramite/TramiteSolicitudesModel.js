Ext.define('MyApp.model.store.tramite.TramiteSolicitudesModel', {
	extend: 'Ext.data.Model',
    fields: [
    	{name: 'codigoticket'},
        {name: 'idtramite'},
    	{name: 'tramite'},
        {name: 'solicitud'},
    	{name: 'cantidad'},
    	{name: 'tipoayuda'},
    	{name: 'solicitante'},
        {name: 'estatus'},
     
    ],   
});