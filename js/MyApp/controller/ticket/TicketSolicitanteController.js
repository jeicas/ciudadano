Ext.define('MyApp.controller.ticket.TicketSolicitanteController',{
    extend: 'Ext.app.Controller',
    views: [        
        'ticket.PanelTicketSolicitante',
        'ticket.GridTicket'
    ],
    refs: [{
        ref: 'panelTicketSolicitante',
        selector: 'panelTicketSolicitante'
    },{
        ref: 'gridTicket',
        selector: 'gridTicket'
    }],

    init: function(application){
        this.control({          
            'panelTicketSolicitante radiogroup[name=rgSolicitante]': {
                change: this.changeSeleccion
            },
            'panelTicketSolicitante combobox[name=tipoTicket]': {
                change: this.changeTipoTicket
            },
            'panelTicketSolicitante combobox[name=sector]': {
                change: this.changeSector
            },
            'panelTicketSolicitante button[name=catalogoCiudadano]':{
                click: this.buscarSolicitante
            },
            'panelTicketSolicitante button[name=catalogoComunidad]':{
                click: this.buscarSolicitante
            },
            'panelTicketSolicitante datefield[name=fechanacimiento]':{
                change: this.cambiarEdad
            },
            'panelTicketSolicitante datefield[name=fechanacimientoC]':{
                change: this.cambiarEdadC
            },
            'panelTicketSolicitante button[name=salir]':{
                click: this.salir
            },
            'panelTicketSolicitante button[name=limpiar]':{
                click: this.limpiar
            },
            'panelTicketSolicitante button[name=guardar]':{
                click: this.guardar
            },
            '#gridTicket button[name=agregar]':{
                click: this.agregarItem
            },
            '#gridTicket actioncolumn[name=eliminar]':{
                click: this.eliminarItem
            },
            'panelTicketSolicitante combobox[name=estado]':{
                select: this.seleccionEstado
            },
            'panelTicketSolicitante combobox[name=municipio]': {
                select: this.seleccionMunicipio
            },
            'panelTicketSolicitante combobox[name=parroquia]': {
                select: this.seleccionParroquia
            },
            'panelTicketSolicitante button[name=buscarSolicitante]': {
                click: this.buscarSolicitante
            },
            'panelTicketSolicitante button[name=buscarContacto]': {
                click: this.buscarSolicitante
            },
            'panelTicketSolicitante #codTlf':{
                change: this.cambiarCodTlf
            }
        });
    },
/////////////////Busquedas
    buscarSolicitante: function(button, e, options){
        me=this;
        var formulario = this.getPanelTicketSolicitante();
        switch( button.name ){
            case 'buscarContacto':
            if(formulario.down('textfield[name=cedulaC]').getValue()!=""){                    
                contacto=Ext.create('MyApp.store.registrobasico.solicitante.ContactoStore');
                contacto.proxy.extraParams.nacionalidad=formulario.down("combobox[name=nacionalidadC]").getValue();
                contacto.proxy.extraParams.cedula=formulario.down("textfield[name=cedulaC]").getValue();
                contacto.load(function(records,operation,success){
                    formulario.down("form[name=completo2]").setDisabled(false);
                    if(operation.resultSet.total>0){
                        contacto.each(function (record){
                            //validar y mandar mensaje si no encontro
                            formulario.down("form[name=completo2]").getForm().loadRecord(record);
                        })
                    }else{                        
                        nacionalidadC=formulario.down('combobox[name=nacionalidadC]').getValue();
                        cedulaC=formulario.down('textfield[name=cedulaC]').getValue();
                        //formulario.down('radiogroup[name=rgSolicitante]').items.items[0].setValue(true);
                        formulario.down("form[name=completo2]").getForm().reset();
                        formulario.down('combobox[name=nacionalidadC]').setValue(nacionalidadC);
                        formulario.down('textfield[name=cedulaC]').setValue(cedulaC);
                        Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'No se encontraron datos relacionados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                    }
                })
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar la nacionalidad y cedula del contacto a buscar.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });                    
            }
            break;
            case 'buscarSolicitante':                
            if(formulario.down('textfield[name=cedula]').getValue()!=""){
                if(formulario.down("radiogroup[name=rgSolicitante]").getValue().seleccion==1){
                    var mensaje= "Debe ingresar la nacionalidad y cedula del solicitante a buscar.";
                    store=Ext.create('MyApp.store.registrobasico.solicitante.PersonaStore');                        
                }else if(formulario.down("radiogroup[name=rgSolicitante]").getValue().seleccion==2){
                    var mensaje= "Debe ingresar la rif completo del consejo comunal a buscar.";
                    store=Ext.create('MyApp.store.registrobasico.solicitante.ComunidadStore');
                }
                store.proxy.extraParams.nacionalidad=formulario.down("combobox[name=nacionalidad]").getValue();
                store.proxy.extraParams.cedula=formulario.down("textfield[name=cedula]").getValue();
                store.load(function(records,operation,success){
                    formulario.down("form[name=completo1]").setDisabled(false);
                    if(operation.resultSet.total>0){
                        store.each(function (record){                            
                            if(record.get('idSolicitante')!=null && record.get('idSolicitante')!=""){
                                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Solicitante ya registrado, ingresar con sus credenciales.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                                me.limpiar();
                            }else{
                                formulario.down("form[name=completo1]").getForm().loadRecord(record);
                                if(record.get('parroquia')!='' && record.get('parroquia')!=null){
                                    if(record.get('parroquia').length>5){
                                        estado=record.get('parroquia').substring(0, 2);
                                        municipio=record.get('parroquia').substring(0, 4);
                                    }else{
                                        estado=record.get('parroquia').substring(0, 1);
                                        municipio=record.get('parroquia').substring(0, 3);   
                                    }
                                    formulario.down('combobox[name=estado]').setValue(estado);
                                    formulario.down('combobox[name=municipio]').setValue(municipio);
                                    municipioStore = formulario.down("combobox[name=municipio]").getStore();
                                    municipioStore.proxy.extraParams.estado=estado;
                                    municipioStore.load();
                                    parroquiaStore = formulario.down("combobox[name=parroquia]").getStore();
                                    parroquiaStore.proxy.extraParams.municipio=municipio;
                                    parroquiaStore.load();
                                    formulario.down("combobox[name=parroquia]").setDisabled(0);
                                    formulario.down("textfield[name=direccion]").setDisabled(0);
                                }else{
                                    formulario.down('combobox[name=estado]').setValue('11');
                                    municipioStore = formulario.down("combobox[name=municipio]").getStore();
                                    municipioStore.proxy.extraParams.estado=11;
                                    municipioStore.load();
                                    formulario.down("combobox[name=parroquia]").setDisabled(1);
                                    formulario.down("textfield[name=direccion]").setDisabled(1);
                                }
                                if(record.get('nombreContacto')!='' && record.get('nombreContacto')!=null){
                                    formulario.down("form[name=completo2]").setDisabled(false);
                                    formulario.down("form[name=completo]").getForm().loadRecord(record);
                                    formulario.down("form[name=completo2]").getForm().loadRecord(record);
                                }else{
                                    formulario.down("form[name=completo2]").setDisabled(true);
                                    formulario.down("form[name=completo2]").getForm().reset();
                                }
                            }                        
                        })
                    }else{                        
                        nacionalidad=formulario.down('combobox[name=nacionalidad]').getValue();
                        cedula=formulario.down('textfield[name=cedula]').getValue();
                        formulario.down("form[name=completo1]").getForm().reset();
                        formulario.down("form[name=completo2]").getForm().reset();
                        //formulario.down('radiogroup[name=rgSolicitante]').items.items[0].setValue(true);
                        formulario.down('combobox[name=nacionalidad]').setValue(nacionalidad);
                        formulario.down('textfield[name=cedula]').setValue(cedula);
                        Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'No se encontraron datos relacionados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                    }
                })
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: mensaje, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }        
    },
/////////////////Cambio seleccion principal
    changeSeleccion: function(grupo,cmp){
        var form = this.getPanelTicketSolicitante();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();        
        form.down("form[name=datosTicket]").getForm().reset();
        form.down("form[name=completo2]").getForm().reset();
        form.down("fieldset[name=fcContacto]").setVisible(false);
        form.down("form[name=completo1]").getForm().reset();
        form.down("tabpanel[name=mitabpanel]").setVisible(true);
        form.down("fieldcontainer[name=fcCedula]").setVisible(true);        
        municipio=form.down("combobox[name=municipio]").getStore();
        municipio.proxy.extraParams.estado="";
        municipio.load();
        form.down("form[name=completo1]").setDisabled(true);
        form.down("form[name=completo2]").setDisabled(true);
        form.down("combobox[name=nacionalidadC]").reset();
        form.down("textfield[name=cedulaC]").reset();
        form.down("combobox[name=nacionalidad]").reset();
        form.down("textfield[name=cedula]").reset();
        form.down("combobox[name=parroquia]").setDisabled(true);
        form.down("textfield[name=direccion]").setDisabled(true);
        form.down("label[name=edad]").setText('Edad: 0 años.');
        form.down("combobox[name=sector]").setDisabled(true);
        form.down("combobox[name=tipoTicket]").setDisabled(true);
        if(cmp.seleccion!=null){
            form.down("combobox[name=tipoTicket]").setDisabled(false);
            if(cmp.seleccion==1){
                form.down('textfield[name=correo]').width = '50%';
                form.down("form[name=completo1]").setVisible(true);
                form.down('textfield[name=razonSolicitante]').setVisible(false);
                form.down('fieldcontainer[name=fcNombre]').setVisible(true);                
                form.down("datefield[name=fechanacimiento]").setVisible(true);
                form.down("label[name=edad]").setVisible(true);
                form.down('textfield[name=razonSolicitante]').allowBlank = true;
                form.down('textfield[name=razonSolicitante]').validateValue(form.down('textfield[name=razonSolicitante]').getValue());
                form.down('textfield[name=nombreSolicitante]').allowBlank = false;
                form.down('textfield[name=nombreSolicitante]').validateValue(form.down('textfield[name=nombreSolicitante]').getValue());
                form.down('textfield[name=apellidoSolicitante]').allowBlank = false;
                form.down('textfield[name=apellidoSolicitante]').validateValue(form.down('textfield[name=apellidoSolicitante]').getValue());
            }else{
                form.down('textfield[name=correo]').width = '100%';
                form.down("fieldset[name=fcContacto]").setVisible(true);
                form.down("form[name=completo1]").setVisible(true);
                form.down('textfield[name=razonSolicitante]').setVisible(true);
                form.down('fieldcontainer[name=fcNombre]').setVisible(false);
                form.down("datefield[name=fechanacimiento]").setVisible(false);
                form.down("label[name=edad]").setVisible(false);
                form.down('textfield[name=nombreSolicitante]').allowBlank = true;
                form.down('textfield[name=nombreSolicitante]').validateValue(form.down('textfield[name=nombreSolicitante]').getValue());
                form.down('textfield[name=apellidoSolicitante]').allowBlank = true;
                form.down('textfield[name=apellidoSolicitante]').validateValue(form.down('textfield[name=apellidoSolicitante]').getValue());
                form.down('textfield[name=razonSolicitante]').allowBlank = false;
                form.down('textfield[name=razonSolicitante]').validateValue(form.down('textfield[name=razonSolicitante]').getValue());
            }
        }
    },
/////////////////Cambiar telefono
    cambiarCodTlf: function(cmp, r){
        formulario=this.getPanelTicketSolicitante();
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
            case 'ccodTlf1':
                if(formulario.down('combobox[name=ccodTlf1]').getValue()!='Ninguno' && formulario.down('combobox[name=ccodTlf1]').getValue()!=0) {
                    formulario.down('textfield[name=movilC]').reset();
                    formulario.down('textfield[name=movilC]').setDisabled(false);
                    formulario.down('textfield[name=movilC]').allowBlank = false;
                    formulario.down('textfield[name=movilC]').validateValue(formulario.down('textfield[name=movilC]').getValue());
                }else{
                    formulario.down('combobox[name=ccodTlf1]').reset();
                    formulario.down('textfield[name=movilC]').reset();                    
                    formulario.down('textfield[name=movilC]').setDisabled(true);
                    formulario.down('textfield[name=movilC]').allowBlank = true;
                    formulario.down('textfield[name=movilC]').validateValue(formulario.down('textfield[name=movilC]').getValue());
                }
            break;
            case 'ccodTlf2':
                if(formulario.down('combobox[name=ccodTlf2]').getValue()!='Ninguno' && formulario.down('combobox[name=ccodTlf2]').getValue()!=0){
                    formulario.down('textfield[name=localC]').reset();                    
                    formulario.down('textfield[name=localC]').setDisabled(false);
                    formulario.down('textfield[name=localC]').allowBlank = false;
                    formulario.down('textfield[name=localC]').validateValue(formulario.down('textfield[name=localC]').getValue());
                }else{
                    formulario.down('combobox[name=ccodTlf2]').reset();
                    formulario.down('textfield[name=localC]').reset();
                    formulario.down('textfield[name=localC]').setDisabled(true);
                    formulario.down('textfield[name=localC]').allowBlank = true;
                    formulario.down('textfield[name=localC]').validateValue(formulario.down('textfield[name=localC]').getValue());
                }
            break;
        }
    },
/////////////////Cambiar edad
    cambiarEdad: function(){
        me=this;
        formulario=this.getPanelTicketSolicitante();
        var fechanacimiento=formulario.down('datefield[name=fechanacimiento]').getValue();
        if(fechanacimiento!=null){
            var ano=Ext.Date.format(fechanacimiento, 'Y');
            var mes=Ext.Date.format(fechanacimiento, 'm');
            var dia=Ext.Date.format(fechanacimiento, 'd');
            numero=me.displayage(ano,mes,dia, "years", 0, "rounddown");
            formulario.down('label[name=edad]').setText('Edad: '+numero+' años.');
        }else{
            formulario.down('label[name=edad]').setText('Edad: 0 años.');
        }
    },
/////////////////Cambiar edadC
    cambiarEdadC: function(){
        me=this;
        formulario=this.getPanelTicketSolicitante();
        var fechanacimiento=formulario.down('datefield[name=fechanacimientoC]').getValue();
        if(fechanacimiento!=null){
            var ano=Ext.Date.format(fechanacimiento, 'Y');
            var mes=Ext.Date.format(fechanacimiento, 'm');
            var dia=Ext.Date.format(fechanacimiento, 'd');
            numero=me.displayage(ano,mes,dia, "years", 0, "rounddown");
            formulario.down('label[name=edadC]').setText('Edad: '+numero+' años.');
        }else{
            formulario.down('label[name=edadC]').setText('Edad: 0 años.');
        }
    },
////////////Calcular edad
    displayage: function(yr, mon, day, unit, decimal, round){
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
        formulario=this.getPanelTicketSolicitante();
        municipioStore = formulario.down("combobox[name=municipio]").getStore();
        formulario.down("combobox[name=parroquia]").clearValue();
        formulario.down("combobox[name=parroquia]").setDisabled(1);
        formulario.down("combobox[name=parroquia]").reset();
        formulario.down("combobox[name=municipio]").clearValue();
        formulario.down("combobox[name=municipio]").setDisabled(0);
        formulario.down("combobox[name=municipio]").reset();
        formulario.down("textfield[name=direccion]").setValue('');
        formulario.down("textfield[name=direccion]").setDisabled(1);
        formulario.down("textfield[name=direccion]").reset();
        municipioStore.proxy.extraParams.estado=formulario.down("combobox[name=estado]").getValue();
        municipioStore.load();
    },
    seleccionMunicipio: function(){
        formulario=this.getPanelTicketSolicitante();
        parroquiaStore = formulario.down("combobox[name=parroquia]").getStore();
        formulario.down("combobox[name=parroquia]").clearValue();
        formulario.down("combobox[name=parroquia]").reset();
        formulario.down("textfield[name=direccion]").reset();
        formulario.down("combobox[name=parroquia]").setDisabled(0);
        formulario.down("textfield[name=direccion]").setValue('');
        formulario.down("textfield[name=direccion]").setDisabled(1);
        parroquiaStore.proxy.extraParams.municipio=formulario.down("combobox[name=municipio]").getValue();
        parroquiaStore.load();
    },
    seleccionParroquia: function(){
        formulario=this.getPanelTicketSolicitante();
        formulario.down("textfield[name=direccion]").reset();
        formulario.down("textfield[name=direccion]").setValue('');
        formulario.down("textfield[name=direccion]").setDisabled(0);
    },
/////////////////Cambiar tipo ticket
    changeTipoTicket: function( a, newValue, oldValue, eOpts){
        var form = this.getPanelTicketSolicitante();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();        
        form.down("combobox[name=sector]").reset();
        form.down('textareafield[name=descripcion]').reset();
        form.down('textareafield[name=descripcion]').setVisible(false);
        if(newValue!=null){
            form.down("combobox[name=sector]").setDisabled(false);
            if(newValue==3){//TIPO TICKET PETICION
                lista.setVisible(true);
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
/////////////////Cambiar sector
    changeSector: function( a, newValue, oldValue, eOpts){
        me=this;
        var form = this.getPanelTicketSolicitante();
        var lista=this.getGridTicket();
        store= lista.getStore();
        modified = store.data.items;
        store.clearData();
        lista.view.refresh();
        if(form.down('combobox[name=tipoTicket]').getValue()==3 && newValue!=null){            
            listaItem=lista.columns[1].initialConfig.editor.store;
            listaItem.proxy.extraParams.sector=newValue;
            listaItem.load();
        }
    },
/////////////////Grid
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
        formulario=this.getPanelTicketSolicitante();
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
/////////////////Botones
    limpiar: function(){
        var form = this.getPanelTicketSolicitante();
        var lista=this.getGridTicket();
        lista.setVisible(false);
        store= lista.getStore();
        store.clearData();
        lista.view.refresh();
        form.getForm().reset();
        form.down("fieldcontainer[name=fcCedula]").setVisible(false);
        form.down("tabpanel[name=mitabpanel]").setVisible(false);
        form.down("form[name=completo1]").setVisible(false);
        form.down("fieldset[name=fcContacto]").setVisible(false);        
    },
    salir: function(button, e, options) {
        formulario=this.getPanelTicketSolicitante();
        formulario.getForm().reset();
        document.location= BASE_URL+'../';
    },    
    pdf: function(){
        me=this;
        formulario=this.getPanelProgramaTrabajo();
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
        formulario=this.getPanelTicketSolicitante();
        grid=this.getGridTicket();
        store= grid.getStore();
        modified = store.data.items
        nitems = store.getCount();
        if(formulario.down("radiogroup[name=rgSolicitante]").getValue().seleccion){
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
                    var str = new Array(6).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);});
                    password = MyApp.util.Md5.encode(str);
                    Ext.get(formulario.getEl()).mask("Guardando... Por favor espere...",'loading');
                    formulario.getForm().submit({
                        url: BASE_URL+'ticket/ticket/guardar',
                        method:'POST',
                        params: {recordsGrid  :  arregloItems, 
                                 clave        :  str,
                                 password     : password
                        },
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
                            //document.location= BASE_URL+'../';
                        },
                    });
                }else{
                    Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar la cantidad solicitada.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
                }
            }else{
                Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
        }else{
            Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe seleccionar tipo de solicitante.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
        }     
    }
});