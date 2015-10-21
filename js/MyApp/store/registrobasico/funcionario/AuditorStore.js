Ext.define('MyApp.store.registrobasico.funcionario.AuditorStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.funcionario.FuncionarioStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'funcionario/funcionario/obtenerAuditor',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});