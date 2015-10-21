Ext.define('MyApp.store.tramite.Tramite', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/obtenerTramite',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});