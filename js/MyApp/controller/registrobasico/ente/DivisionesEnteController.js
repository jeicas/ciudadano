Ext.define('MyApp.controller.registrobasico.ente.DivisionesEnteController',{
    extend: 'Ext.app.Controller',
    views: [
        'registrobasico.ente.DivisionesEnteWindow',
        'registrobasico.ente.EntePanel',
    ],
    refs: [{
        ref: 'windowDivisionesEnte',
        selector: '#windowDivisionesEnte'
    },{
        ref: 'panelEnte',
        selector: '#panelEnte'
    }],

    init: function(application) {
        this.control({
            '#windowDivisionesEnte':{
                render: this.cargarDivision
            },
            '#windowDivisionesEnte button[name=agregarDivision]':{
                click: this.agregarDivision
            },
            '#windowDivisionesEnte button[name=guardar]':{
                click: this.guardarDivision
            },
            '#windowDivisionesEnte actioncolumn[name=eliminarDivision]':{
                click: this.eliminarDivision
            }            
        });
    },
    cargarDivision: function(){
        form=this.getWindowDivisionesEnte();
        formulario=this.getPanelEnte();
        id=formulario.down('textfield[name=id]').getValue();
        storeD= form.down('gridpanel[name=gridDivision]').getStore();
        storeD.proxy.extraParams.id=id;
        storeD.load();        
    },
    agregarDivision: function(){
        me=this;
        formulario=this.getWindowDivisionesEnte();
        form=this.getPanelEnte();
        id=form.down('textfield[name=id]').getValue();        
        store= formulario.down('gridpanel[name=gridDivision]').getStore(); 
        gridPlugin= formulario.down('gridpanel[name=gridDivision]').getPlugin('rowediting');
        var obj = Ext.create('MyApp.store.registrobasico.ente.DivisionStore', {           
            id1: 0,
            nombre: '',
            ente: id
        });
        store.insert(store.getCount(), obj);
        gridPlugin.startEdit(store.getCount()-1, 0);
    },
    eliminarDivision: function( grid, record,rowIndex){
        formulario=this.getWindowDivisionesEnte();
        store= formulario.down('gridpanel[name=gridDivision]').getStore();
        seleccion= store.getAt(rowIndex);
        Ext.MessageBox.confirm('Confirmar', '¿Desea eliminar la división?',
            function(btn) {
                if (btn === 'yes'){                    
                    if(seleccion.data.id1===0){                        
                        gridPlugin= formulario.down('gridpanel[name=gridDivision]').getPlugin('rowediting');
                        store.remove(seleccion);
                        formulario.down('gridpanel[name=gridDivision]').getView().refresh(true);                        
                    }else{
                        Ext.get(formulario.getEl()).mask("Eliminando... Por favor espere...",'loading');
                        var arregloGrid = [];        
                        Ext.each(seleccion, function(record) {
                            arregloGrid.push(Ext.apply(record.data));
                        });
                        arreglo = Ext.encode(arregloGrid);
                        Ext.Ajax.request({
                            method:'POST',
                            url: BASE_URL+'ente/division/eliminarDivision',
                            params: {recordsGrid  :  arreglo },
                            success: function(form,action){
                                Ext.get(formulario.getEl()).unmask();
                                var data= Ext.JSON.decode(form.responseText);
                                Ext.Msg.show({
                                    title:'Informaci&oacute;n',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                if(data.success){
                                    gridPlugin= formulario.down('gridpanel[name=gridDivision]').getPlugin('rowediting');
                                    store.remove(seleccion);
                                    formulario.down('gridpanel[name=gridDivision]').getView().refresh(true);                                    
                                }
                            },
                        });
                    }
                }
            }
        );
    },
    limpiarEnte: function(){
        form=this.getPanelEnte();
        form.getForm().reset();
    },
    guardarDivision: function(){
        me=this;
        formulario=this.getWindowDivisionesEnte();        
        modified = formulario.down('gridpanel[name=gridDivision]').getStore().data.items;
        nobj = formulario.down('gridpanel[name=gridDivision]').getStore().getCount();
        blanco=false;
        if(nobj>0){
            for(i=0;i<=nobj-1;i++){
                if(formulario.down('gridpanel[name=gridDivision]').getStore().data.items[i].store.data.items[i].data.nombre=='' || formulario.down('gridpanel[name=gridDivision]').getStore().data.items[i].store.data.items[i].data.nombre==null){
                    blanco=true;
                }
            }
        }else{
            blanco=true;
        }
        if(blanco!=true){
            Ext.get(formulario.getEl()).mask("Guardando... Por favor espere...",'loading');
            form=this.getPanelEnte();
            ente=form.down('textfield[name=id]').getValue();
            var arregloGrid = [];        
            Ext.each(modified, function(record) {
                arregloGrid.push(Ext.apply(record.data));
            });
            arregloDivision = Ext.encode(arregloGrid);
            Ext.Ajax.request({
                method:'POST',
                url: BASE_URL+'ente/division/guardarDivision',
                params: {recordsGrid  :  arregloDivision, ente: ente },
                success: function(form,action){
                    Ext.get(formulario.getEl()).unmask();
                    var data= Ext.JSON.decode(form.responseText);
                    Ext.Msg.show({
                        title:'Informaci&oacute;n',
                        msg: data.msg,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    }); 
                    formulario.close();
                    me.limpiarEnte();
                },
            });
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar las divisiones del ente.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    }
});