Ext.define('MyApp.controller.ticket.HistoricoController',{
    extend: 'Ext.app.Controller',
    views: [        
        'historico.ListaHistorico',
        'historico.HistoricoPanel'
    ],
    refs: [{
        ref: 'panelHistorico',
        selector: 'panelHistorico'
    },{
        ref: 'listaHistorico',
        selector: 'listaHistorico'
    }],

    init: function(application){
        this.control({            
            'panelHistorico button[name=buscar]':{
                click: this.buscar
            },
            'panelHistorico button[name=limpiar]':{
                click: this.limpiar
            },
            'panelHistorico radiogroup[name=rgSolicitante]': {
                change: this.changeSeleccion
            },
            'listaHistorico button[name=imprimir]':{
                click: this.imprimirReporteEstatus
            },
        });
    },
    buscar: function(a, e, eOpts){

        me=this;
        var formulario = this.getPanelHistorico();
        gridStore= this.getListaHistorico().getStore();
        if(formulario.down('textfield[name=cedula]').getValue()!=""){
            if(formulario.down('radiogroup[name=rgSolicitante]').getValue().seleccion==1){            
                gridStore.proxy.extraParams.nacionalidad=formulario.down("combobox[name=nacionalidad]").getValue();
                gridStore.proxy.extraParams.cedula=formulario.down('textfield[name=cedula]').getValue();
                
            }else if(formulario.down('radiogroup[name=rgSolicitante]').getValue().seleccion==2){
                gridStore.proxy.extraParams.rifletra=formulario.down("combobox[name=nacionalidad]").getValue();
                gridStore.proxy.extraParams.rifnumero=formulario.down('textfield[name=cedula]').getValue();   
            }
            gridStore.load();
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe llenar la cedula o rif.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    limpiar: function(a, e, eOpts){
        me=this;
        var formulario = this.getPanelHistorico();
        formulario.getForm().reset();
        formulario.down('fieldcontainer[name=cedula]').setVisible(false);
        gridStore= this.getListaHistorico().getStore();
        gridStore.proxy.extraParams.nacionalidad="";
        gridStore.proxy.extraParams.cedula="";
        gridStore.proxy.extraParams.rifletra="";
        gridStore.proxy.extraParams.rifnumero="";
        gridStore.load();
    },
    changeSeleccion: function(grupo,cmp){
        var formulario = this.getPanelHistorico();
        formulario.down('fieldcontainer[name=cedula]').setVisible(true);
        formulario.down('combobox[name=nacionalidad]').setValue('V');
        formulario.down('textfield[name=cedula]').setValue('');
    },
    imprimirReporteEstatus: function(){        
        window.open(BASE_URL+'pdfs/reportepdf/reporteEstatusPdf');
    }
});
 