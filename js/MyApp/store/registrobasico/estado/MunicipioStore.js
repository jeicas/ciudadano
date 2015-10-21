Ext.define('MyApp.store.registrobasico.estado.MunicipioStore', {
	extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    groupField: 'estado',
    proxy: {
        type: 'ajax',
        url : BASE_URL+'estado/estado/obtenerMunicipio',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});
