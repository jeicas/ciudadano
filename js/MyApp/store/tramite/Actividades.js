Ext.define('MyApp.store.tramite.Actividades', {
    extend:'Ext.data.Store',
   
    //autoLoad: true,
    model : "MyApp.model.store.tramite.TramiteActividades",
    proxy: {
        type: 'ajax',
        url :  BASE_URL + 'tramite/tramite/obtenerProcedimientosTramite',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});