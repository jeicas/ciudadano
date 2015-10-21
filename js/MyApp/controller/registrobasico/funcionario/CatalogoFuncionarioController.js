Ext.define('MyApp.controller.registrobasico.funcionario.CatalogoFuncionarioController',{
    extend: 'Ext.app.Controller',
    views: [
        'registrobasico.funcionario.FuncionarioPanel',
        'registrobasico.funcionario.CatalogoFuncionarioWindow'
    ],
    refs: [{
        ref: 'mainPanel',
        selector: 'mainpanel'
    },{
        ref: 'panelFuncionario',
        selector: '#panelFuncionario'
    },{
        ref: 'windowCatalogoFuncionario',
        selector: '#windowCatalogoFuncionario'
    }],

    init: function(application) {
        this.control({
            'windowCatalogoFuncionario gridpanel[name=gridFuncionario]':{
                itemdblclick: this.editarFuncionario
            }
        });
    },
    
    editarFuncionario: function (record, item, index, e, eOpts ){        
        var mainPanel = this.getMainPanel();        
        var win = this.getWindowCatalogoFuncionario();
        if(record){
            if(mainPanel.getActiveTab().xtype==='panelFuncionario'){
                formulario=this.getPanelFuncionario();
                win.close();
                formulario.getForm().reset();
                formulario.loadRecord(item);
                if (item.data.movil==''){
                    formulario.down('textfield[name=movil]').reset();                
                    formulario.down('textfield[name=movil]').setDisabled(true);
                }else{
                    formulario.down('textfield[name=movil]').setDisabled(false);
                }
                if (item.data.local==''){
                    formulario.down('textfield[name=local]').reset();
                    formulario.down('textfield[name=local]').setDisabled(true);
                }else{
                    formulario.down('textfield[name=local]').setDisabled(false);
                }
                if(item.data.parroquia!=''){
                    estado=item.data.parroquia.substring(0, 2);
                    municipio=item.data.parroquia.substring(0, 4);
                    formulario.down('combobox[name=estado]').setValue(estado);
                    formulario.down('combobox[name=municipio]').setValue(municipio);
                    parroquiaStore = formulario.down("combobox[name=parroquia]").getStore();
                    parroquiaStore.proxy.extraParams.municipio=municipio;
                    parroquiaStore.load();
                    formulario.down("combobox[name=parroquia]").setDisabled(0);
                    formulario.down("textareafield[name=direccion]").setDisabled(0);
                }else{
                    formulario.down('combobox[name=estado]').setValue('11');
                    municipioStore = formulario.down("combobox[name=municipio]").getStore();
                    municipioStore.proxy.extraParams.estado=11;
                    municipioStore.load();
                    formulario.down("combobox[name=parroquia]").setDisabled(1);
                    formulario.down("textareafield[name=direccion]").setDisabled(1);
                }
                if(item.data.tipoE=='C'){             
                    formulario.down("radiofield[inputValue=C]").setValue(true);
                    formulario.down("combobox[name=ente]").setValue(item.data.ente);                    
                }else{
                    formulario.down("radiofield[inputValue=D]").setValue(true);
                    formulario.down("combobox[name=ente]").setValue(item.data.ente);                    
                }
            }
        }
    },
});