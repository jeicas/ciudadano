Ext.define('MyApp.controller.tramite.ActividadController',{
    extend: 'Ext.app.Controller',
    views: [        
        'tramite.ListaActividad',
        'tramite.ListaSolicitudesRecaudos',
        'tramite.ActividadPanel',
        'tramite.WinRecaudosTicket'
    ],
    refs: [{
        ref: 'ActividadPanel',
        selector: 'panelActividad'
    },{
        ref: 'Listactividad',
        selector: 'listaActividad'
    }, {
        ref: 'ListaSolicitudesRecaudos',
        selector: 'listaSolicitudesRecaudos'
    },  {
        ref: 'WinRecaudosTicket',
        selector: 'winRecaudosTicket'
    }],

    init: function(application){
        this.control({            
            'panelActividad combobox[name=nombretramite]':{
                select: this.buscarEstatus
            },
              'listaSolicitudesRecaudos combobox[name=nombretramite]':{
                select: this.buscarEstatus
            },
           'listaSolicitudesRecaudos actioncolumn[name=ver]':{
                click: this.buscarRecaudosTicket
            },
        });
    },
     buscarEstatus: function(){
       // formPanel = this.getListaSolicitudesRecaudos();
        grid = this.getListaSolicitudesRecaudos();
        tramite= grid.down("combobox[name=nombretramite]").getValue();
        store= grid.getStore();
        store.clearData();
        store.proxy.extraParams.tramite=tramite;
        grid.getView().refresh(true);
        store.load();  
    },
    
    
    buscarRecaudosTicket: function(grid, record, rowIndex){
       
       store = grid.getStore();
        rec = store.getAt(rowIndex);
    
        win = Ext.create('MyApp.view.tramite.WinRecaudosTicket');
        win.down('textfield[name=idticket]').setValue(rec.get('idticket'));
        win.down('textfield[name=codigoTicket]').setValue(rec.get('codigoticket'));
        win.down('textfield[name=solicitante]').setValue(rec.get('solicitante'));
        
        storeRecuados = win.down('recaudosTicketLista').getStore();
        storeRecuados.clearData();
        storeRecuados.proxy.extraParams.ticket = rec.get('idticket');
        storeRecuados.load();
        win.show();
    },
});
 