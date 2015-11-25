Ext.define('MyApp.model.store.solicitud.TicketEncargadoModel', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'codigoTicket'},
        {name: 'idTicket'},
        {name: 'idActividad'},
        {name: 'actividad'},
        {name: 'peticion'},
        {name: 'cantidad'},
        {name: 'sector'},
        {name: 'idSector'},
        {name: 'idTipoAyuda'},
        {name: 'tipoayuda'},
        {name: 'idEncargado'},
        {name: 'encargado'},
        {name: 'observacion'},
        {name: 'observacionFuncionario'},
        {name: 'respuesta'},
        {name: 'solicitante'},
        {name: 'fechaRegistro'},
        {name: 'estatus'},
    ]
});