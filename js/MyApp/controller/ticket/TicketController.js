Ext.define('MyApp.controller.ticket.TicketController',{
    extend: 'Ext.app.Controller',
    views: [        
        'ticket.PanelTicket',
        'ticket.GridTicket',         
    ],
    refs: [{
        ref: 'panelTicket',
        selector: 'panelTicket'
    },{
        ref: 'gridTicket',
        selector: 'gridTicket'
    }],

    init: function(application){
        this.control({          
            'panelTicket radiogroup[name=rgSolicitante]': {
                change: this.changeSeleccion
            },
            'panelTicket combobox[name=tipoTicket]': {
                change: this.changeTipoTicket
            },
            'panelTicket combobox[name=sector]': {
                change: this.changeSector
            },
            'panelTicket button[name=limpiar]':{
                click: this.limpiar
            },
            'panelTicket button[name=guardar]':{
                click: this.guardar
            },            
            'panelTicket button[name=pdf]':{
                click: this.pdf
            },
            'panelTicket button[name=buscarSolicitante]':{
                click: this.buscarSolicitante
            },
            '#gridTicket button[name=agregar]':{
                click: this.agregarItem
            },
            '#gridTicket actioncolumn[name=eliminar]':{
                click: this.eliminarItem
            }
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
        formulario=this.getPanelTicket();
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
//**********************PANEL TICKET OPERADOR OFICINA****************************************    
    buscarSolicitante: function(a, e, eOpts){
        me=this;
        var formulario = this.getPanelTicket();
        if(formulario.down('textfield[name=cedula]').getValue()!=""){
            if(formulario.down('radiogroup[name=rgSolicitante]').getValue().seleccion==1){
                var mensaje= "Debe ingresar la nacionalidad y cedula del solicitante a buscar.";
                store=Ext.create('MyApp.store.registrobasico.solicitante.PersonaStore');
            }else{
                var mensaje= "Debe ingresar la rif completo del consejo comunal a buscar.";
                store=Ext.create('MyApp.store.registrobasico.solicitante.ComunidadStore');
            }
            store.proxy.extraParams.nacionalidad=formulario.down("combobox[name=nacionalidad]").getValue();
            store.proxy.extraParams.cedula=formulario.down("textfield[name=cedula]").getValue();
            store.load(function(records,operation,success){                
                if(operation.resultSet.total>0){
                    store.each(function (record){
                        formulario.getForm().loadRecord(record);
                        if(record.get('razonSolicitante')!=null && record.get('razonSolicitante')!=""){
                            formulario.down('textareafield[name=nombreSolicitante]').setValue(record.get('razonSolicitante'));
                            formulario.down('textareafield[name=nombreContacto]').setValue(record.get('nombreContacto')+' '+ record.get('apellidoContacto'));
                        }else{
                            formulario.down('textareafield[name=nombreSolicitante]').setValue(record.get('nombreSolicitante')+' '+ record.get('apellidoSolicitante'));
                        }
                    })
                }else{
                    nacionalidad=formulario.down('combobox[name=nacionalidad]').getValue();
                    cedula=formulario.down('textfield[name=cedula]').getValue();
                    formulario.getForm().reset();
                    me.limpiar();
                    formulario.down('combobox[name=nacionalidad]').setValue(nacionalidad);
                    formulario.down('textfield[name=cedula]').setValue(cedula);
                    Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'No se encontraron datos relacionados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });                    
                }
            })
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: mensaje, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }        
    },
    changeSeleccion: function(grupo,cmp){
        var form = this.getPanelTicket();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();        
        form.down('fieldcontainer[name=fcDatos]').setVisible(true);
        form.down("combobox[name=nacionalidad]").reset();
        form.down("textfield[name=cedula]").reset();
        form.down("textareafield[name=nombreSolicitante]").reset();
        form.down("textareafield[name=nombreContacto]").reset();
        form.down("combobox[name=tipoTicket]").reset();
        form.down("combobox[name=sector]").setDisabled(true);
        form.down("combobox[name=tipoTicket]").setDisabled(true);
        if(cmp.seleccion!=null){
            form.down("combobox[name=tipoTicket]").setDisabled(false);
            if(cmp.seleccion==1){
                form.down('textareafield[name=nombreContacto]').setVisible(false);
            }else{            
                form.down('textareafield[name=nombreContacto]').setVisible(true);
            }
        }
    },
    changeTipoTicket: function( a, newValue, oldValue, eOpts){
        var form = this.getPanelTicket();
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
        var form = this.getPanelTicket();
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
        var form = this.getPanelTicket();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();
        form.getForm().reset();
        form.down('fieldcontainer[name=fcDatos]').setVisible(false);
        form.down('textareafield[name=nombreContacto]').setVisible(false);
        form.down('textareafield[name=descripcion]').setVisible(false);
    },    
    pdf: function(){
        me=this;
        formulario=this.getPanelTicket();
        programa=formulario.down('textfield[name=idP]').getValue();
        if(programa!=0){
            //console.log('HACER PDF');
            window.open(BASE_URL+'pdfs/programapdf/programaPdf?programa='+programa);
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe consultar un programa de trabajo para poder generar el archivo.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    guardar: function(){
        me=this;
        formulario=this.getPanelTicket();
        grid=this.getGridTicket();
        store= grid.getStore();
        modified = store.data.items
        nitems = store.getCount();        
        if(formulario.getForm().isValid()){
           // if(formulario.down('combobox[name=tipoTicket]').getValue()==3){
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
            // }else{
            //     Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            // }
        }
    }
});