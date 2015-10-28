Ext.define('MyApp.store.historico.TicketStore', {
    extend:'Ext.data.Store',
    model : "MyApp.model.store.historico.TicketStore",
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url : BASE_URL+'ticket/historico/historicoTicket',
        reader:{
            type:'json',
            root: 'data'
        }
    }
});