Ext.define('MyApp.store.solicitud.TicketStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.solicitud.TicketStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/buscarSolicitudesEnteSectorTipoAyuda',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});