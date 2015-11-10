Ext.define('MyApp.model.store.solicitud.TicketStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'codigoTicket'},
        {name: 'idTicket'},
    	{name: 'tipoTicket'},
    	{name: 'solicitud'},
    	{name: 'solicitante'},
        {name: 'ente'},
    	{name: 'sector'},
        {name: 'tipoayuda'},
        {name: 'fechaRegistro'},
        {name: 'estatusTicket'},
        {name: 'cantidad'},
        {name: 'idTipoAyuda'},
        {name: 'idSector'},

    ]
});