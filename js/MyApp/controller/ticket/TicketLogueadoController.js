Ext.define('MyApp.controller.ticket.TicketLogueadoController',{
    extend: 'Ext.app.Controller',
    views: [        
        'ticket.GridTicket',
        'ticket.panelTicketLogueado'
    ],
    refs: [{
        ref: 'panelTicketLogueado',
        selector: 'panelTicketLogueado'
    },{
        ref: 'gridTicket',
        selector: 'gridTicket'
    }],

    init: function(application){
        this.control({            
            '#gridTicket button[name=agregar]':{
                click: this.agregarItem
            },
            '#gridTicket actioncolumn[name=eliminar]':{
                click: this.eliminarItem
            },
            'panelTicketLogueado combobox[name=tipoTicket]': {
                change: this.changeTipoTicket
            },
            'panelTicketLogueado combobox[name=sector]': {
                change: this.changeSector
            },
            'panelTicketLogueado button[name=limpiar]':{
                click: this.limpiar
            },
            'panelTicketLogueado button[name=guardar]':{
                click: this.guardar
            },
        });
    },
//**********************PANEL GRID TICKET****************************************    
    eliminarItem: function( grid, record,rowIndex){        
        store= grid.getStore();
        var lista=this.getGridTicket();
        Ext.MessageBox.confirm('Confirmar', '¿Desea eliminar el item?',
            function(btn) {
                if (btn === 'yes'){
                    seleccion= store.getAt(rowIndex);
                    store.remove(seleccion);
                    lista.getView().refresh(true);
                }
            }
        );
    },    
    agregarItem: function(a, e, eOpts){
        me=this;
        formulario=this.getPanelTicketLogueado();
        if(formulario.down("combobox[name=sector]").getValue()!=null && formulario.down("combobox[name=sector]").getValue()!=""){
            var lista=this.getGridTicket();
            store= lista.getStore();
            gridPlugin= lista.getPlugin('rowediting');
            var obj = Ext.create('MyApp.store.ticket.TicketayudaStore');
            store.insert(store.getCount(), obj);
            gridPlugin.startEdit(store.getCount()-1, 0);
            lista.getView().refresh(true);
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar seleccionar un sector.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
//**********************PANEL TICKET LOGUEADO****************************************
    guardar: function(){
        me=this;
        formulario=this.getPanelTicketLogueado();
        grid=this.getGridTicket();
        store= grid.getStore();
        modified = store.data.items
        nitems = store.getCount();        
        if(formulario.getForm().isValid()){
            if(formulario.down('combobox[name=tipoTicket]').getValue()==3){
                blanco=false;
                if(nitems>0){
                    for(i=0;i<=nitems-1;i++){
                        if(store.data.items[i].store.data.items[i].data.cantidad<0 || store.data.items[i].store.data.items[i].data.cantidad==null || store.data.items[i].store.data.items[i].data.cantidad==""){
                            blanco=true;
                        }                    
                    }
                }else{
                    blanco=true;
                }
            }else{
                blanco=false;
            }
            if(!blanco){
                var arregloGrid = [];
                Ext.each(modified, function(record){
                    arregloGrid.push(Ext.apply(record.data));
                });
                arregloItems = Ext.encode(arregloGrid);                
                Ext.get(formulario.getEl()).mask("Guardando... Por favor espere...",'loading');
                formulario.getForm().submit({
                    url: BASE_URL+'ticket/ticket/guardar',
                    method:'POST',
                    params: {recordsGrid  :  arregloItems },
                    failure: function(form,action){
                        switch (action.failureType){
                            case Ext.form.Action.CLIENT_INVALID:
                                 Ext.MessageBox.show({ title: 'Verifique los datos', msg: 'Algunos campos no fueron introducidos correctamente', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
                            break;
                            case Ext.form.Action.CONNECT_FAILURE:
                                 Ext.MessageBox.show({ title: 'Error', msg: 'Error en comunicaci&oacute;n Ajax', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
                            break;
                            case Ext.form.Action.SERVER_INVALID:
                                 Ext.MessageBox.show({ title: 'Error---Verifique!', msg: 'Informacion ingresada es invalida/Servidor invalido', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR });
                            break;
                            default:
                                Ext.MessageBox.show({ title: 'Alerta', msg: 'Se ha detectado algun error', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }
                    },
                    success: function(form,action){
                        Ext.get(formulario.getEl()).unmask();
                        var data= Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.show({
                            title:'Informaci&oacute;n',
                            msg: data.msg,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });                                
                        me.limpiar();                        
                    },
                });
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar la cantidad solicitada.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    changeTipoTicket: function( a, newValue, oldValue, eOpts){
        var form = this.getPanelTicketLogueado();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();        
        form.down("combobox[name=sector]").reset();
        form.down('textareafield[name=descripcion]').reset();
        if(newValue!=null){
            form.down("combobox[name=sector]").setDisabled(false);
            if(newValue==3){
                lista.setVisible(true);
                form.down('textareafield[name=descripcion]').setVisible(false);
                form.down('textareafield[name=descripcion]').allowBlank = true;
                form.down('textareafield[name=descripcion]').validateValue(form.down('textareafield[name=descripcion]').getValue());
            }else{
                lista.setVisible(false);
                form.down('textareafield[name=descripcion]').setVisible(true);
                form.down('textareafield[name=descripcion]').allowBlank = false;
                form.down('textareafield[name=descripcion]').validateValue(form.down('textareafield[name=descripcion]').getValue());
            }
        }
    },
    changeSector: function( a, newValue, oldValue, eOpts){
        me=this;
        var form = this.getPanelTicketLogueado();
        var lista=this.getGridTicket();
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();
        if(form.down('combobox[name=tipoTicket]').getValue()==3 && newValue!=null){            
            listaItem=lista.columns[1].initialConfig.editor.store;
            listaItem.proxy.extraParams.sector=newValue;
            listaItem.load();
        }
    },
    limpiar: function(){
        var form = this.getPanelTicketLogueado();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();
        form.getForm().reset();
        form.down('textareafield[name=descripcion]').setVisible(false);
    }
});