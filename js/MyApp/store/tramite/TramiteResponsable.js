Ext.define('MyApp.store.tramite.TramiteResponsable', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'tramite/tramite/obtenerTramiteResponsable',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});