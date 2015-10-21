Ext.define('MyApp.store.registrobasico.funcionario.CategoriaStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'funcionario/categoria/obtenerCategoria',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});