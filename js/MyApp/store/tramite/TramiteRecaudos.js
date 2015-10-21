Ext.define('MyApp.store.tramite.TramiteRecaudos', {
    extend:'Ext.data.Store',
    pageSize: 12,
   // autoLoad: true,
    model : "MyApp.model.store.tramite.TramiteRecaudos",
    proxy: {
        type: 'ajax',
        url :  BASE_URL + 'tramite/tramite/obtenerTramitetODO',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});