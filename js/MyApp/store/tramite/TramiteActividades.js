Ext.define('MyApp.store.tramite.TramiteActividades', {
    extend:'Ext.data.Store',
    pageSize: 12,
   // autoLoad: true,
    model : "MyApp.model.store.tramite.TramiteActividades",
    proxy: {
        type: 'ajax',
        url :  BASE_URL + 'tramite/tramite/obtenerTramiteProcedimiento',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});