Ext.define('MyApp.model.store.solicitud.TicketActividadModel', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'codigoTicket'},
        {name: 'actividadid'},
    	{name: 'actividad'},
    	{name: 'observacionfuncionario'},
    	{name: 'respuestafuncionario'},
        {name: 'encargado'}, 
        {name: 'idfuncionario'}, 
        {name: 'estatus'}
    ]
}); 