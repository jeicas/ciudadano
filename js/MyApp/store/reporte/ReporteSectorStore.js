Ext.define('MyApp.store.reporte.ReporteSectorStore',{
	extend:'Ext.data.Store',    
    model : "MyApp.model.store.historico.TicketStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/reporte/reporteSector',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});