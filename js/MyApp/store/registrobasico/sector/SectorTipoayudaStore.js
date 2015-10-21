Ext.define('MyApp.store.registrobasico.sector.SectorTipoayudaStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.registrobasico.sector.SectorTipoayudaStore",
    proxy: {
        type: 'ajax',
        url : BASE_URL+'sector/sector/obtenerSectorTipoayuda',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});