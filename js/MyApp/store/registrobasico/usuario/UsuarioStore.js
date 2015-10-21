Ext.define('MyApp.store.registrobasico.usuario.UsuarioStore', {
    extend:'Ext.data.Store',
    autoLoad: true,
    groupField: 'tipo_usuario',
    model : "MyApp.model.store.registrobasico.usuario.UsuarioStore",
    proxy: {
        type: 'ajax',
        url : BASE_URL+'usuario/usuario/obtenerUsuario',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});