Ext.define('MyApp.store.registrobasico.estado.ParroquiaStore', {
	extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",    
    proxy: {
        type: 'ajax',
        url : BASE_URL+'estado/estado/obtenerParroquia',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});