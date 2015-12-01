Ext.define('MyApp.controller.registrobasico.ente.EnteController',{
    extend: 'Ext.app.Controller',
    views: [
        'registrobasico.ente.EntePanel',
        'registrobasico.ente.ListaEnte',
        'registrobasico.ente.DivisionesEnteWindow'
    ],
    refs: [{
        ref: 'panelEnte',
        selector: '#panelEnte'
    },{
        ref: 'panelListaEnte',
        selector: '#panelListaEnte'
    },{
        ref: 'windowDivisionesEnte',
        selector: '#windowDivisionesEnte'
    }],

    init: function(application) {
        this.control({
            '#panelListaEnte':{
                itemdblclick: this.editarEnte
            },
            '#panelEnte button[name=agregarDivision]':{
                click: this.agregarDivision
            },
            '#panelEnte button[name=limpiar]':{
                click: this.limpiarEnte
            },
            '#panelEnte button[name=eliminar]':{
                click: this.eliminarEnte
            },
             '#panelEnte button[name=guardar]':{
                click: this.guardarEnte
            },
             '#panelEnte combobox[name=municipio]':{
                change: this.cargarParroquia
            },
        });
    },    
    eliminarEnte: function(){
        me=this;
        formulario=this.getPanelEnte();
        lista=this.getPanelListaEnte();
        id=formulario.down('textfield[name=id]').getValue();
        if(id!=''){          
            Ext.MessageBox.confirm('Confirmar', '¿Desea eliminar el ente?',
                function(btn) {
                    if (btn === 'yes'){
                        Ext.get(formulario.getEl()).mask("Eliminando... Por favor espere...",'loading');
                        Ext.Ajax.request({
                            method:'POST',
                            url : BASE_URL+'ente/ente/eliminarEnte',
                            params :{ id : id },
                            success: function(form,action){
                                Ext.get(formulario.getEl()).unmask();
                                var data= Ext.JSON.decode(form.responseText);
                                me.limpiarEnte();
                                Ext.Msg.show({
                                    title:'Informaci&oacute;n',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                store=lista.getStore();
                                store.reload();
                            },
                        });   
                    }
                }
            );
        }else{
           Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe seleccionar un ente para poder eliminar registro.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    guardarEnte: function(){
        me=this;
        formulario=this.getPanelEnte();
        lista=this.getPanelListaEnte();
        
        if(formulario.getForm().isValid()){            
            Ext.get(formulario.getEl()).mask("Guardando... Por favor espere...",'loading');
            formulario.getForm().submit({
                url: BASE_URL+'ente/ente/guardarEnte',
                method:'POST',
                params: formulario.getForm().getValues(),
                failure: function(form,action){
                    switch (action.failureType) {
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
                    me.limpiarEnte();
                    store=lista.getStore();
                    store.reload();
                },
            });            
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los campos requeridos.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    limpiarEnte: function(){
        form=this.getPanelEnte();
        form.getForm().reset();
    },
    editarEnte: function(record, item, index, e, eOpts){
        formulario=this.getPanelEnte();
        if(record){
            formulario.getForm().reset();            
            formulario.down('combobox[name=cmbDivision]').reset();
            storeD= formulario.down('combobox[name=cmbDivision]').getStore();
            storeD.removeAll();
            storeD.proxy.extraParams.id=item.data['id'];
            storeD.load();
            formulario.loadRecord(item);                        
            if(item.data['parroquia']!=null){
                storeP= formulario.down('combobox[name=parroquia]').getStore();
                parroquia=item.data['parroquia'];
                formulario.down('combobox[name=municipio]').setValue(parroquia.substring(0, 4));
                storeP.proxy.extraParams.municipio=parroquia.substring(0, 4);
                storeP.load();
            }
        }
    },
    agregarDivision: function(){
        formulario=this.getPanelEnte();
        id=formulario.down('textfield[name=id]').getValue();
        if(id!=''){
            this.getController('registrobasico.ente.DivisionesEnteController');
            Ext.widget('windowDivisionesEnte');
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe seleccionar un ente para realizar la acción.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    
    
    
    cargarParroquia: function(){
        formulario=this.getPanelEnte();
        id=formulario.down('combobox[name=municipio]').getValue();
       
        if(id!=''){
            parr=formulario.down('combobox[name=parroquia]').getStore();
            parr.clearData();
            parr.proxy.extraParams.municipio = id;
            parr.load();

           
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe seleccionar un municipio.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    }
    
    
});