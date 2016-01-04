Ext.define('MyApp.store.solicitud.TicketRecaudosStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.solicitud.TicketRecaudosModel",
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/solicitud/buscarRecuadosTicket',
        reader:{
            type:'json',
            root: 'data'
        }
    }
   
});
