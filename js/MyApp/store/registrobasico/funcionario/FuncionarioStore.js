Ext.define('MyApp.store.registrobasico.funcionario.FuncionarioStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.funcionario.FuncionarioStore",
    autoLoad: true,    
    proxy: {
        type: 'ajax',
        url : BASE_URL+'persona/funcionario/obtenerFuncionario',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});