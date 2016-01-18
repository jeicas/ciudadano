Ext.define('MyApp.model.store.historico.TicketStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'codigoTicket'},
        {name: 'idTicket'},
    	{name: 'tipoTicket'},
    	{name: 'sectorTicket'},
    	{name: 'estatusTicket'},
        {name: 'fechaRegistro'},
    	{name: 'fechaRecibido'},
        {name: 'cedula'},
        {name: 'nacionalidad'},
        {name: 'rifletra'},
        {name: 'rifnumero'},
        {name: 'desde'},
        {name: 'hasta'},
        {name: 'solicitante'},
        {name: 'atendido'}, 
        {name: 'sector'}
    ]
});