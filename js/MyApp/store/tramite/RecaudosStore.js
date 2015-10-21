Ext.define('MyApp.store.tramite.RecaudosStore', {
    extend:'Ext.data.Store',
    pageSize: 20,
    //autoLoad: true,
    model : "MyApp.model.store.tramite.TramiteRecaudos",
    proxy: {
        type: 'ajax',
        url :  BASE_URL + 'tramite/tramite/obtenerTramiteLista',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});