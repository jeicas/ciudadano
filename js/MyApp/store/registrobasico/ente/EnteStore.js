Ext.define('MyApp.store.registrobasico.ente.EnteStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.ente.EnteStore",
    autoLoad: true,
    groupField: 'tipo',
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ente/ente/obtenerEnte',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});