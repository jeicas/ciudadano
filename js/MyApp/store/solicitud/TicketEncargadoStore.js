Ext.define('MyApp.store.solicitud.TicketEncargadoStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.solicitud.TicketEncargadoModel",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/buscarSolicitudesEncargadoProcedimiento',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});