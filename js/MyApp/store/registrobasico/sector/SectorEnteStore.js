Ext.define('MyApp.store.registrobasico.sector.SectorEnteStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.Generico",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'sector/sector/obtenerSectorEnte',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});