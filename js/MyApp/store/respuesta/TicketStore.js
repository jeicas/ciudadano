Ext.define('MyApp.store.respuesta.TicketStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.historico.TicketStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/respuesta/respuestaTicket',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});