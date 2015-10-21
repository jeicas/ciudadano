Ext.define('MyApp.store.registrobasico.estado.EstadoStore',{
	extend:'Ext.data.Store',    
    pageSize: 10,
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'estado/estado/obtenerEstado',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});