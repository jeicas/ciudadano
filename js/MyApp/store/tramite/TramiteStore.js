Ext.define('MyApp.store.tramite.TramiteStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.tramite.TramiteModel",
    
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/buscarTramites',
        reader:{
            type:'json',
            root: 'data'
        }
    },
    autoLoad: true,
});