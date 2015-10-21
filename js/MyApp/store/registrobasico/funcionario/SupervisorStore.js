Ext.define('MyApp.store.registrobasico.funcionario.SupervisorStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.funcionario.FuncionarioStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'funcionario/funcionario/obtenerSupervisor',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});