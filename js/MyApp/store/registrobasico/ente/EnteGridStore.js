Ext.define('MyApp.store.registrobasico.ente.EnteGridStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.ente.EnteStore",
    autoLoad: true,
    pageSize: 20,
    groupField: 'tipo',
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ente/ente/obtenerEnteGrid',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});