Ext.define('MyApp.store.registrobasico.sector.SectorStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'sector/sector/obtenerSector',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});