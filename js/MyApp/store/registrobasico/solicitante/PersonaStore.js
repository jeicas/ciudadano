Ext.define('MyApp.store.registrobasico.solicitante.PersonaStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.solicitante.PersonaStore",
    proxy: {
        type: 'ajax',
        url : BASE_URL+'persona/persona/obtenerPersona',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});