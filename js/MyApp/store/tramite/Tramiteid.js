Ext.define('MyApp.store.tramite.Tramiteid', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/obtenerTramiteid',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});