Ext.define('MyApp.controller.ticket.RespuestaController',{
    extend: 'Ext.app.Controller',
    views: [
        'respuesta.ListaRespuesta',
        'respuesta.RespuestaPanel',
        'respuesta.EditarRespuesta'
    ],
    refs: [{
        ref: 'panelRespuesta',
        selector: 'panelRespuesta'
    },{
        ref: 'listaRespuesta',
        selector: 'listaRespuesta'
    },{
        ref: 'appheader',
        selector: '#appheader'
    },{
        ref: 'editarRespuesta',
        selector: 'editarRespuesta'
    }],

    init: function(application){
        this.control({            
            'panelRespuesta ':{
                render: this.render
            },
            'panelRespuesta button[name=buscar]':{
                click: this.buscar
            },
            'panelRespuesta button[name=limpiar]':{
                click: this.limpiar
            },
            'listaRespuesta actioncolumn[name=editarSeleccionado]':{
                click: this.editarSeleccionado
            },
            'editarRespuesta button[name=guardar]':{
                click: this.guardarRespuesta
            },
            'editarRespuesta button[name=pdf]':{
                click: this.pdfRespuesta
            }
        });
    },
    render:function(){
        me=this;
        var form = me.getAppheader();
        var formulario = me.getPanelRespuesta();
        usuario=form.down('label[name=usuario]').getEl().dom.innerText;
        if(usuario==="ADMIN. O.A.C.: adminAC"){
            formulario.down('combobox[name=sector]').setDisabled(false);
        }else{
            formulario.down('combobox[name=sector]').setDisabled(true);
        }
    },
    buscar: function(a, e, eOpts){
        
        me=this;
        var formulario = this.getPanelRespuesta();
        gridStore= this.getListaRespuesta().getStore();
        gridStore.proxy.extraParams.tipoTicket=formulario.down("combobox[name=tipoTicket]").getValue();
        gridStore.proxy.extraParams.sectorTicket=formulario.down('combobox[name=sector]').getValue();
        gridStore.proxy.extraParams.desde=formulario.down("datefield[name=fechaDesde]").getValue();
        gridStore.proxy.extraParams.hasta=formulario.down('datefield[name=fechaHasta]').getValue();
        gridStore.load();        
    },
    limpiar: function(a, e, eOpts){
        me=this;
        var formulario = this.getPanelRespuesta();
        formulario.getForm().reset();        
        gridStore= this.getListaRespuesta().getStore();
        gridStore.proxy.extraParams.tipoTicket="";
        gridStore.proxy.extraParams.sectorTicket="";
        gridStore.proxy.extraParams.desde="";
        gridStore.proxy.extraParams.hasta="";
        gridStore.load();
    },
    editarSeleccionado: function ( grid, record,rowIndex){
        me=this;
        grid = this.getListaRespuesta();
        store= grid.getStore();
        record= store.getAt(rowIndex);
        if(record){            
            if (grid.store.data.items[rowIndex].data.estatusTicket=='PENDIENTE'){
                var editWindow = Ext.create('MyApp.view.respuesta.EditarRespuesta');
                editWindow.down('form').getForm().reset();
                editWindow.down('form').loadRecord(record);
                editWindow.show();
            }
        }
    },
    guardarRespuesta: function (button){
        me=this;
        var win = button.up('editarRespuesta');
        formulario = win.down('form');
        grid=this.getListaRespuesta().getStore();
        if(formulario.getForm().isValid()){
            formulario.getForm().submit({
                clientValidation: true,                
                url: BASE_URL + 'ticket/respuesta/insertRespuesta',
                success: function(form, action) {
                    var result = action.result;
                    if(result.success){
                        Ext.Msg.alert('Información', result.msg);
                        formulario.getForm().reset();
                        grid.load();
                        win.close();
                    }else{
                        Ext.Msg.alert('Verifique', result.msg);
                    }
                },
                failure: function(form, action){
                    switch (action.failureType){
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Fallo', 'Los campos no pueden ser guardados con un valor invalido');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Failure', 'Ajax communication failed');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                            Ext.Msg.alert('Error', action.result.msg);
                    }
                    win.close();                    
                }                
            });
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Faltan datos para registrar.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }        
    },
    pdfRespuesta: function(button){
        me=this;
        var win = button.up('editarRespuesta');
        formulario = win.down('form');        
        if(formulario.down('textfield[name=idTicket]').getValue()!=""){
            window.open(BASE_URL+'pdfs/ticketpdf/ticketPdf?ticket='+formulario.down('textfield[name=idTicket]').getValue());
        }
    }
});