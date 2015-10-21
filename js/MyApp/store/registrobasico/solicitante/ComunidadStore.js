Ext.define('MyApp.store.registrobasico.solicitante.ComunidadStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.solicitante.PersonaStore",
    proxy: {
        type: 'ajax',
        url : BASE_URL+'persona/comunidad/obtenerComunidad',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});