Ext.define('MyApp.controller.registrobasico.funcionario.FuncionarioController',{
    extend: 'Ext.app.Controller',
    views: [
        'registrobasico.funcionario.FuncionarioPanel',
        'registrobasico.funcionario.CatalogoFuncionarioWindow'
    ],
    refs: [{
        ref: 'mainPanel',
        selector: 'mainpanel'
    },{
        ref: 'appheader',
        selector: '#appheader'
    },{
        ref: 'panelFuncionario',
        selector: '#panelFuncionario'
    },{
        ref: 'windowCatalogoFuncionario',
        selector: '#windowCatalogoFuncionario'
    }],

    init: function(application) {
        this.control({
            '#panelFuncionario button[name=limpiar]':{
                click: this.limpiarFuncionario
            },
            '#panelFuncionario button[name=eliminar]':{
                click: this.eliminarFuncionario
            },
            '#panelFuncionario button[name=guardar]':{
                click: this.guardarFuncionario
            },
            '#panelFuncionario button[name=buscarFuncionario]':{
                click: this.buscarFuncionario
            },
            "#panelFuncionario textfield[name=cedula]": {
                specialkey: this.buscarFuncionarioSpecialKey
            },
            '#panelFuncionario button[name=agregarEnte]':{
                click: this.agregarEnte
            },
            '#panelFuncionario button[name=catalogo]':{
                click: this.catalogoFuncionario
            },
            '#panelFuncionario radiogroup[name=rgAdmon]': {
                change: this.changeSeleccion
            },
            '#panelFuncionario #codTlf':{
                change: this.cambiarCodTlf
            },
            '#panelFuncionario datefield[name=fechanacimiento]':{
                change: this.cambiaredad
            },
             '#panelFuncionario combobox[name=estado]':{
                select: this.seleccionEstado
            },
             '#panelFuncionario combobox[name=municipio]': {
                select: this.seleccionMunicipio
            },
             '#panelFuncionario combobox[name=parroquia]': {
                select: this.seleccionParroquia
            },
        });
    },
    eliminarFuncionario: function(){
        me=this;
        formulario=this.getPanelFuncionario();
        id=formulario.down('textfield[name=id]').getValue();
        if(id!=''){
            /////////////OJO VALIDAR SI ESTA ASIGNADO A UNA AUDITORIA DE ESTATUS 1 NO PUEDE SER ELIMINADA////////////////
            Ext.MessageBox.confirm('Confirmar', '¿Desea eliminar el funcionario?',
                function(btn) {
                    if (btn === 'yes'){
                        Ext.get(formulario.getEl()).mask("Eliminando... Por favor espere...",'loading');
                        Ext.Ajax.request({
                            method:'POST',
                            url : BASE_URL+'funcionario/funcionario/eliminarFuncionario',
                            params :{ id : id },
                            success: function(form,action){
                                Ext.get(formulario.getEl()).unmask();
                                var data= Ext.JSON.decode(form.responseText);
                                me.limpiarFuncionario();
                                Ext.Msg.show({
                                    title:'Informaci&oacute;n',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });                                
                            },
                        });
                    }
                }
            );
        }else{
           Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe consultar un funcionario para poder eliminar registro.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    /////////////////Buscar funcionario
    buscarFuncionario: function(){
        me=this;
        formulario=this.getPanelFuncionario();
        nacionalidad=formulario.down('combobox[name=nacionalidad]').getValue();
        cedula=formulario.down('textfield[name=cedula]').getValue();        
        me.limpiarFuncionario();        
        formulario.down('textfield[name=cedula]').setValue(cedula);
        formulario.down('combobox[name=nacionalidad]').setValue(nacionalidad);
        if(formulario.down('textfield[name=cedula]').isValid()){
            funcionarioStore=Ext.create('MyApp.store.registrobasico.funcionario.FuncionarioStore'),
            Ext.get(formulario.getEl()).mask("Cargando... Por favor espere...",'loading');
            funcionarioStore.proxy.extraParams.cedula=cedula;
            funcionarioStore.proxy.extraParams.nacionalidad=nacionalidad;
            funcionarioStore.load(function(records,operation,success){
            if(funcionarioStore.count()==1){
                    funcionarioStore.each(function (record){
                        if (record.get('estatus')==1){
                            formulario.down("combobox[name=codTlf2]").setDisabled(false);
                            formulario.down("combobox[name=estado]").setDisabled(false);
                            formulario.down("radiogroup[name=rgAdmon]").setDisabled(false);
                            formulario.down("textfield[name=nombre]").setDisabled(false);
                            formulario.down("combobox[name=sexo]").setDisabled(false);
                            formulario.down("datefield[name=fechanacimiento]").setDisabled(false);
                            formulario.down("textfield[name=apellido]").setDisabled(false);
                            formulario.down("combobox[name=codTlf1]").setDisabled(false);
                            formulario.down("textfield[name=correo]").setDisabled(false);
                            formulario.getForm().loadRecord(record);
                            formulario.down("fieldcontainer[name=fcLaboral]").setDisabled(0);
                            Ext.get(formulario.getEl()).unmask();
                            if(record.get('tipoE')=='C'){             
                                formulario.down("radiofield[inputValue=C]").setValue(true);                                
                                formulario.down("combobox[name=ente]").setValue(record.get('ente'));                                
                            }else{                
                                formulario.down("radiofield[inputValue=D]").setValue(true);
                                formulario.down("combobox[name=ente]").setValue(record.get('ente'));                                
                            }
                            if (record.get('movil')=='false'){
                                formulario.down('textfield[name=movil]').reset();
                                formulario.down('textfield[name=movil]').setDisabled(true);
                            }else{
                                formulario.down('textfield[name=movil]').setDisabled(false);
                            }
                            if (record.get('local')=='false'){
                                formulario.down('textfield[name=local]').reset();
                                formulario.down('textfield[name=local]').setDisabled(true);
                            }else{
                                formulario.down('textfield[name=local]').setDisabled(false);
                            }
                            if(record.get('parroquia')!=''){
                                estado=record.get('parroquia').substring(0, 2);
                                municipio=record.get('parroquia').substring(0, 4);
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
                        }else{
                            me.limpiarFuncionario();
                            formulario.down('textfield[name=cedula]').setValue(cedula);
                            formulario.down('textfield[name=nacionalidad]').setValue(nacionalidad);
                            formulario.down('textfield[name=id]').setValue(record.get('id'));
                            Ext.MessageBox.confirm('Confirmar', 'El funcionario fue eliminado. ¿Desea habilitarlo?',
                                function(btn) {
                                    if (btn === 'yes'){
                                         me.activarFuncionario();
                                    }
                                }
                            );
                            Ext.get(formulario.getEl()).unmask();
                        }
                    })
                }else{
                    Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Funcionario no registrado.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                    Ext.get(formulario.getEl()).unmask();
                    formulario.down("combobox[name=parroquia]").reset();
                    formulario.down("textareafield[name=direccion]").reset();
                    formulario.down("textfield[name=local]").reset();
                    formulario.down("textfield[name=movil]").reset();
                    formulario.down("combobox[name=codTlf2]").setDisabled(false);
                    formulario.down("combobox[name=estado]").setDisabled(false);
                    formulario.down("radiogroup[name=rgAdmon]").setDisabled(false);
                    formulario.down("textfield[name=nombre]").setDisabled(false);
                    formulario.down("combobox[name=sexo]").setDisabled(false);
                    formulario.down("datefield[name=fechanacimiento]").setDisabled(false);
                    formulario.down("textfield[name=apellido]").setDisabled(false);
                    formulario.down("combobox[name=codTlf1]").setDisabled(false);
                    formulario.down("textfield[name=correo]").setDisabled(false);
                }
            })
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Ingrese una cedula valida.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            me.limpiarFuncionario();
        }
    },
    buscarFuncionarioSpecialKey: function(field, e, options) {
        me=this;
        if (e.getKey() == e.ENTER){
            me.buscarFuncionario();
        }
    },
    limpiarFuncionario: function(){
        form=this.getPanelFuncionario();
        form.down("combobox[name=parroquia]").setDisabled(1);
        form.down("fieldcontainer[name=fcLaboral]").setDisabled(1);
        form.down("textareafield[name=direccion]").setDisabled(1);
        form.down("textfield[name=local]").setDisabled(1);
        form.down("textfield[name=movil]").setDisabled(1);
        form.getForm().reset();
    },
    catalogoFuncionario: function(){
        this.getController('registrobasico.funcionario.CatalogoFuncionarioController');
        Ext.widget('windowCatalogoFuncionario');
    },
    guardarFuncionario: function(){
        me=this;
        formulario=this.getPanelFuncionario();
        if(formulario.getForm().isValid()){
            if(formulario.down('textfield[name=local]').getValue()!='' || formulario.down('textfield[name=movil]').getValue()!=''){
                Ext.get(formulario.getEl()).mask("Guardando... Por favor espere...",'loading');
                formulario.down('textfield[name=pass]').setValue(MyApp.util.Md5.encode(formulario.down('textfield[name=clave]').getValue()));
                formulario.getForm().submit({
                    url: BASE_URL+'persona/funcionario/guardarFuncionario',
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
                        me.limpiarFuncionario();
                    },
                });
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar al menos un numero telefónico.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los campos requeridos.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }
    },
    ///////////////Activarfuncionario
    activarFuncionario: function(){
        me=this;
        formulario=this.getPanelFuncionario();
        id=formulario.down('textfield[name=id]').getValue();        
        Ext.Ajax.request({
          method: 'POST',
          url : BASE_URL+'funcionario/funcionario/activarFuncionario',
          params: {
            id : id
          },
          failure: function(form,action){
            Ext.get(formulario.getEl()).unmask();
            Ext.Msg.show({
              title:'Error!',
              msg: 'Error al activar funcionario, verifique datos.',
              icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          },
          success : function(form,action){
            data=Ext.JSON.decode(form.responseText);
            Ext.Msg.show({
                title:'Informaci&oacute;n',
                msg: data.msg,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            me.buscarFuncionario();
          }
        });
    },
    changeSeleccion: function(grupo,cmp){
        form=this.getPanelFuncionario();
        store= form.down('combobox[name=ente]').getStore();        
        //form.down('combobox[name=division]').reset();
        form.down('combobox[name=ente]').reset();        
        if(cmp.seleccion=='C'){
            form.down('fieldcontainer[name=fcLaboral]').setDisabled(false);
            store.removeAll();
            store.proxy.extraParams.id='C';
            form.down("combobox[name=ente]").reset();
            //form.down("combobox[name=division]").reset();
            //form.down("combobox[name=categoria]").reset();
            store.load();
        }else if(cmp.seleccion=='D'){ 
            form.down('fieldcontainer[name=fcLaboral]').setDisabled(false);           
            store.removeAll();
            store.proxy.extraParams.id='D';
            form.down("combobox[name=ente]").reset();
            //form.down("combobox[name=division]").reset();
            //form.down("combobox[name=categoria]").reset();
            store.load();
        }
    },
    cambiarCodTlf: function(cmp, r){
        formulario=this.getPanelFuncionario();
        switch( cmp.name ){
            case 'codTlf1':
                if(formulario.down('combobox[name=codTlf1]').getValue()!='Ninguno' && formulario.down('combobox[name=codTlf1]').getValue()!=0) {
                    formulario.down('textfield[name=movil]').reset();
                    formulario.down('textfield[name=movil]').setDisabled(false);
                    formulario.down('textfield[name=movil]').allowBlank = false;
                    formulario.down('textfield[name=movil]').validateValue(formulario.down('textfield[name=movil]').getValue());
                }else{
                    formulario.down('combobox[name=codTlf1]').reset();
                    formulario.down('textfield[name=movil]').reset();                    
                    formulario.down('textfield[name=movil]').setDisabled(true);
                    formulario.down('textfield[name=movil]').allowBlank = true;
                    formulario.down('textfield[name=movil]').validateValue(formulario.down('textfield[name=movil]').getValue());
                }
            break;
            case 'codTlf2':
                if(formulario.down('combobox[name=codTlf2]').getValue()!='Ninguno' && formulario.down('combobox[name=codTlf2]').getValue()!=0){
                    formulario.down('textfield[name=local]').reset();                    
                    formulario.down('textfield[name=local]').setDisabled(false);
                    formulario.down('textfield[name=local]').allowBlank = false;
                    formulario.down('textfield[name=local]').validateValue(formulario.down('textfield[name=local]').getValue());
                }else{
                    formulario.down('combobox[name=codTlf2]').reset();
                    formulario.down('textfield[name=local]').reset();
                    formulario.down('textfield[name=local]').setDisabled(true);
                    formulario.down('textfield[name=local]').allowBlank = true;
                    formulario.down('textfield[name=local]').validateValue(formulario.down('textfield[name=local]').getValue());
                }
            break;
        }
    },
    /////////////////Cambiar edad
    cambiaredad: function(){
        me=this;
        formulario=this.getPanelFuncionario();
        var fechanacimiento=formulario.down('datefield[name=fechanacimiento]').getValue();        
        if(fechanacimiento!=null){
            var ano=Ext.Date.format(fechanacimiento, 'Y');
            var mes=Ext.Date.format(fechanacimiento, 'm');
            var dia=Ext.Date.format(fechanacimiento, 'd');
            numero=me.displayage(ano,mes,dia, "years", 0, "rounddown");
            formulario.down('#edad').setText('Edad: '+numero+' años.');
        }else{
            formulario.down('#edad').setText('Edad: 0 años.');
        }
    },
////////////Calcular edad
    displayage: function(yr, mon, day, unit, decimal, round) {
        var one_day = 1000 * 60 * 60 * 24;
        var one_month = 1000 * 60 * 60 * 24 * 30;
        var one_year = 1000 * 60 * 60 * 24 * 30 * 12;
        today = new Date();
        var pastdate = new Date(yr, mon - 1, day);

        var countunit = unit;
        var decimals = decimal;
        var rounding = round;

        finalunit = (countunit == "days") ? one_day : (countunit == "months") ? one_month : one_year;
        decimals = (decimals <= 0) ? 1 : decimals * 10;

        if (unit != "years") {
            if (rounding == "rounddown") {
                return (Math.floor((today.getTime() - pastdate.getTime()) / (finalunit) * decimals) / decimals);
            }else{
                return (Math.ceil((today.getTime() - pastdate.getTime()) / (finalunit) * decimals) / decimals);
            }
        }else{
            yearspast = today.getFullYear() - yr - 1;
            tail = (today.getMonth() > mon - 1 || today.getMonth() == mon - 1 && today.getDate() >= day) ? 1 : 0;
            pastdate.setFullYear(today.getFullYear());
            pastdate2 = new Date(today.getFullYear() - 1, mon - 1, day);
            tail = (tail == 1) ? tail + Math.floor((today.getTime() - pastdate.getTime()) / (finalunit) * decimals) / decimals : Math.floor((today.getTime() - pastdate2.getTime()) / (finalunit) * decimals) / decimals;
            return (yearspast + tail);
        }
    },
    //////////////Combox direccion(estado,municipio,parroquia)
    seleccionEstado: function(){
        formulario=this.getPanelFuncionario();
        municipioStore = formulario.down("combobox[name=municipio]").getStore();
        formulario.down("combobox[name=parroquia]").clearValue();
        formulario.down("combobox[name=parroquia]").setDisabled(1);
        formulario.down("combobox[name=parroquia]").reset();
        formulario.down("combobox[name=municipio]").clearValue();
        formulario.down("combobox[name=municipio]").setDisabled(0);
        formulario.down("combobox[name=municipio]").reset();
        formulario.down("textareafield[name=direccion]").setValue('');
        formulario.down("textareafield[name=direccion]").setDisabled(1);
        formulario.down("textareafield[name=direccion]").reset();
        municipioStore.proxy.extraParams.estado=formulario.down("combobox[name=estado]").getValue();
        municipioStore.load();
    },
    seleccionMunicipio: function(){
        formulario=this.getPanelFuncionario();
        parroquiaStore = formulario.down("combobox[name=parroquia]").getStore();
        formulario.down("combobox[name=parroquia]").clearValue();
        formulario.down("combobox[name=parroquia]").reset();
        formulario.down("textareafield[name=direccion]").reset();
        formulario.down("combobox[name=parroquia]").setDisabled(0);
        formulario.down("textareafield[name=direccion]").setValue('');
        formulario.down("textareafield[name=direccion]").setDisabled(1);
        parroquiaStore.proxy.extraParams.municipio=formulario.down("combobox[name=municipio]").getValue();
        parroquiaStore.load();
    },
    seleccionParroquia: function(){
        formulario=this.getPanelFuncionario();
        formulario.down("textareafield[name=direccion]").reset();
        formulario.down("textareafield[name=direccion]").setValue('');
        formulario.down("textareafield[name=direccion]").setDisabled(0);
    },
    agregarEnte: function(){
        var form = me.getAppheader();
        usuario=form.down('label[name=usuario]').getEl().dom.innerText;
        if(usuario==="ADMIN. O.A.C.: adminAC"){
            var mainPanel = this.getMainPanel();
            var newTab = mainPanel.items.findBy(
                function (tab){ 
                    return tab.title ==='Registro de entes públicos.'; 
                }
            );
            if (!newTab){
                controller = this.getController('registrobasico.ente.EnteController');
                newTab = mainPanel.add({
                    xtype: 'panelEnte',
                    closable: true,
                    iconCls: 'registro',
                    title: 'Registro de entes públicos.'
                });
            }
            mainPanel.setActiveTab(newTab);
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'No tiene permisos para realizar dicha opción.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        } 
    }
});