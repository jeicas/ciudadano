Ext.define('MyApp.store.registrobasico.solicitante.ContactoStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.solicitante.PersonaStore",
    proxy: {
        type: 'ajax',
        url : BASE_URL+'persona/persona/obtenerContacto',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});