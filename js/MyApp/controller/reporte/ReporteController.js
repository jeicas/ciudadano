Ext.define('MyApp.controller.reporte.ReporteController',{
    extend: 'Ext.app.Controller',
    views: [
        'reporte.TicketMunicipioPanel',
        'reporte.TicketSectorPanel',
        'reporte.ListaTicketSector',
        'reporte.ListaTicketMunicipio'
    ],    
    refs: [{
        ref: 'panelTicketMunicipio',
        selector: 'panelTicketMunicipio'
    },{
        ref: 'panelTicketSector',
        selector: 'panelTicketSector'
    },{
        ref: 'listaTicketMunicipio',
        selector: 'listaTicketMunicipio'
    },{
        ref: 'listaTicketSector',
        selector: 'listaTicketSector'
    }],

    init: function(application) {
        this.control({
            'panelTicketMunicipio button[name=buscar]':{
                click: this.buscarReporteMunicipio
            },
            'panelTicketMunicipio button[name=limpiar]':{
                click: this.limpiarReporteMunicipio
            },            
            'panelTicketMunicipio combobox[name=municipio]': {
                select: this.seleccionMunicipio
            },
            'panelTicketSector button[name=buscar]':{
                click: this.buscarReporteSector
            },
            'panelTicketSector button[name=limpiar]':{
                click: this.limpiarReporteSector
            },
            'listaTicketSector button[name=imprimir]':{
                click: this.imprimirReporteSector
            },
            'listaTicketMunicipio button[name=imprimir]':{
                click: this.imprimirReporteMunicipio
            },
        });
    },
    buscarReporteSector: function (){
        me=this;
        var formulario = this.getPanelTicketSector();
        gridStore= this.getListaTicketSector().getStore();
        gridStore.proxy.extraParams.tipoTicket=formulario.down("combobox[name=tipoTicket]").getValue();
        gridStore.proxy.extraParams.sectorTicket=formulario.down('combobox[name=sector]').getValue();
        gridStore.proxy.extraParams.desde=formulario.down("datefield[name=fechaDesde]").getValue();
        gridStore.proxy.extraParams.hasta=formulario.down('datefield[name=fechaHasta]').getValue();
        gridStore.load(); 
    },
    buscarReporteMunicipio: function (){
        me=this;
        var formulario = this.getPanelTicketMunicipio();
        gridStore= this.getListaTicketMunicipio().getStore();
        gridStore.proxy.extraParams.parroquia=formulario.down("combobox[name=parroquia]").getValue();
        gridStore.proxy.extraParams.municipio=formulario.down('combobox[name=municipio]').getValue();
        gridStore.proxy.extraParams.desde=formulario.down("datefield[name=fechaDesde]").getValue();
        gridStore.proxy.extraParams.hasta=formulario.down('datefield[name=fechaHasta]').getValue();
        gridStore.load(); 
    },
    limpiarReporteSector: function(){
        me=this;
        var formulario = this.getPanelTicketSector();
        formulario.getForm().reset();        
        gridStore= this.getListaTicketSector().getStore();
        gridStore.proxy.extraParams.tipoTicket="";
        gridStore.proxy.extraParams.sectorTicket="";
        gridStore.proxy.extraParams.desde="";
        gridStore.proxy.extraParams.hasta="";
        gridStore.load();
    },
    limpiarReporteMunicipio: function(){
        me=this;
        var formulario = this.getPanelTicketMunicipio();
        formulario.getForm().reset();
        gridStore= this.getListaTicketMunicipio().getStore();        
        gridStore.proxy.extraParams.parroquia="";
        gridStore.proxy.extraParams.municipio="";
        gridStore.proxy.extraParams.desde="";
        gridStore.proxy.extraParams.hasta="";
        gridStore.load();
    },
    seleccionMunicipio: function(){
        var formulario = this.getPanelTicketMunicipio();
        parroquiaStore = formulario.down("combobox[name=parroquia]").getStore();
        formulario.down("combobox[name=parroquia]").clearValue();
        formulario.down("combobox[name=parroquia]").reset();        
        formulario.down("combobox[name=parroquia]").setDisabled(0);
        parroquiaStore.proxy.extraParams.municipio=formulario.down("combobox[name=municipio]").getValue();
        parroquiaStore.load();
    },
    imprimirReporteSector: function(){        
        me=this;        
        formulario=this.getPanelTicketSector();
        tipo=formulario.down('combobox[name= tipoTicket]').getValue();
        sector=formulario.down('combobox[name= sector]').getValue();
        desde=Ext.Date.format(formulario.down('datefield[name= fechaDesde]').getValue(),'Y-m-d');
        hasta=Ext.Date.format(formulario.down('datefield[name= fechaHasta]').getValue(),'Y-m-d');
        window.open(BASE_URL+'pdfs/reportepdf/reporteSectorPdf?tipo='+tipo+'&sector='+sector+'&desde='+desde+'&hasta='+hasta);
    },
    imprimirReporteMunicipio: function(){
        me=this;
        formulario=this.getPanelTicketMunicipio();
        municipio=formulario.down('combobox[name= municipio]').getValue();
        parroquia=formulario.down('combobox[name= parroquia]').getValue();
        desde=Ext.Date.format(formulario.down('datefield[name= fechaDesde]').getValue(),'Y-m-d');
        hasta=Ext.Date.format(formulario.down('datefield[name= fechaHasta]').getValue(),'Y-m-d');
        window.open(BASE_URL+'pdfs/reportepdf/reporteMunicipioPdf?municipio='+municipio+'&parroquia='+parroquia+'&desde='+desde+'&hasta='+hasta);
    }
});
 