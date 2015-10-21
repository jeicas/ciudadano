Ext.define('MyApp.store.registrobasico.ente.DivisionStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.ente.DivisionStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ente/division/obtenerDivision',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});