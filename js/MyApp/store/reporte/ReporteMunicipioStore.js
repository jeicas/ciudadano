Ext.define('MyApp.store.reporte.ReporteMunicipioStore',{
    extend:'Ext.data.Store',    
    model : "MyApp.model.store.historico.TicketStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/reporte/reporteMunicipio',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});