Ext.define('MyApp.store.tramite.TramiteSolicitudes', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.tramite.TramiteSolicitudesModel",
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/buscarTramiteSolicitudes',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});