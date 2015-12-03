Ext.define('MyApp.controller.tramite.ActividadController',{
    extend: 'Ext.app.Controller',
    views: [        
        'tramite.ListaActividad',
        'tramite.ListaSolicitudesRecaudos',
        'tramite.ActividadPanel'
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
    }],

    init: function(application){
        this.control({            
            'panelActividad combobox[name=nombretramite]':{
                select: this.buscarEstatus
            },
              'listaSolicitudesRecaudos combobox[name=nombretramite]':{
                select: this.buscarEstatus
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
});
 