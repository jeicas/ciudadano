Ext.define('MyApp.store.solicitud.TicketActividadStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.solicitud.TicketActividadModel",
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/solicitud/buscarProcedimientoTicket',
        reader:{
            type:'json',
            root: 'data'
        }
    }
   
});
