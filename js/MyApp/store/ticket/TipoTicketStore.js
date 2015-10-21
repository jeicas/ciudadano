Ext.define('MyApp.store.ticket.TipoTicketStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/tipoticket/obtenerTipoTicket',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});