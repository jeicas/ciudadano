Ext.define('MyApp.controller.tramite.solicitud.TramiteSolicitudEncargadoController', {
    extend: 'Ext.app.Controller',
    views: [
        'solicitud.AtenderPeticionEncargadoPanel',
        'solicitud.ListaPeticionEncargado',
        'solicitud.actividad_ticket.WinProcedimientoTicket',
        'solicitud.actividad_ticket.WinObservacionFuncionario', 
        'solicitud.actividad_ticket.WinMensajeAlFuncionario'
    ],
    refs: [
        {
            ref: 'WinProcedimientoTicket',
            selector: 'winProcedimientoTicket'
        },
        {
            ref: 'ListaPeticionEncargado',
            selector: 'listaPeticionEncargado'
        },
          {
            ref: 'WinObservacionFuncionario',
            selector: 'winObservacionFuncionario'
        },
        {
            ref: 'WinMensajeAlFuncionario',
            selector: 'winMensajeAlFuncionario'
        },
    ],
    init: function (application) {
        this.control({
            'atenderPeticionEncargadoPanel actioncolumn[name=aprobar]': {
                click: this.verSeleccionado
            },
             'atenderPeticionEncargadoPanel actioncolumn[name=recibir]': {
                click: this.firmarecibido
            },
             'atenderPeticionEncargadoPanel actioncolumn[name=mensaje]': {
                click: this.enviarMensajeRespuesta
            },
             'winProcedimientoTicket button[name=btnAprobar]': {
                click: this.aprobarProcedimiento
            },
               'winProcedimientoTicket button[name=btnRechazar]': {
                click: this.rechazarProcedimiento
            },
              'winObservacionFuncionario button[name=btnAceptar]': {
                click: this.aceptar
            },
            'winMensajeAlFuncionario button[name=btnEnviar]': {
                click: this.enviarRespuesta
            },
        });
    },
    
    
        verSeleccionado: function (grid, record, rowIndex) {

        store = grid.getStore();
        rec = store.getAt(rowIndex);

        win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinProcedimientoTicket');
            win.down('label[name=lblActividad]').setText(rec.get('actividad'));
            win.down('textfield[name=idProcedimiento]').setValue(rec.get('idActividad'));
            win.down('textfield[name=idticket]').setValue(rec.get('idTicket'));
            win.down('textfield[name=codigoTicket]').setValue(rec.get('codigoTicket'));
            win.down('textfield[name=solicitante]').setValue(rec.get('solicitante'));
            win.down('textfield[name=sector]').setValue(rec.get('sector'));
            win.down('textfield[name=tipoayuda]').setValue(rec.get('tipoayuda'));
            win.down('textfield[name=idTipoAyuda]').setValue(rec.get('idTipoAyuda'));
            win.down('textfield[name=cantidad]').setValue(rec.get('cantidad'));
            win.down('textfield[name=solicitud]').setValue(rec.get('solicitud'));
            win.down('textarea[name=observacion]').setValue(rec.get('observacion'));
            win.down('textarea[name=solicitud]').setValue(rec.get('peticion'));

        win.show();
    },
    
    
    
     aprobarProcedimiento: function () {
         formw = this.getWinProcedimientoTicket();
         solicitud = formw.down('label[name=lblActividad]').getEl().dom.textContent;

        Ext.Msg.show({
            title: 'Confirmar',
            msg: 'Aprobar:  ' + solicitud + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    me = this;

                    formulario = formw.down('form[name=formulario]').getForm();
                    if (formulario.isValid()) {

                        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
                        loadingMask.show();
                        formulario.submit({
                            url: BASE_URL + 'ticket/solicitud/aprobarActividadTicket',
                            method: 'POST',
                            success: function (form, action) {

                                loadingMask.hide();
                                var data = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title: 'Informaci&oacute;n',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                               
                                formw.close(); 
                               /* grid = this.getAtenderPeticionPanel();
                                store = grid.getStore();
                                store.load();*/
                                
                            },
                            failure: function (form, action) {
                                loadingMask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.MessageBox.show({title: 'Verifique los datos', msg: 'Algunos campos no fueron introducidos correctamente', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.MessageBox.show({title: 'Error', msg: 'Error en comunicaci&oacute;n Ajax', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.MessageBox.show({title: 'Error---Verifique!', msg: 'Informacion ingresada es invalida/Servidor invalido', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    default:
                                        Ext.MessageBox.show({title: 'Alerta', msg: 'Se ha detectado algun error', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                                }
                            },
                        });
                    } else {
                        Ext.MessageBox.show({title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
                    }
                }
            }
        });
    },

      
     rechazarProcedimiento: function () {
         formw = this.getWinProcedimientoTicket();
         solicitud = formw.down('label[name=lblActividad]').getEl().dom.textContent;

        Ext.Msg.show({
            title: 'Confirmar',
            msg: 'Esta seguro que desea rechazar el procedimiento :  ' + solicitud + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    
                    win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinObservacionFuncionario');
                    win.down('textfield[name=idticket]').setValue(formw.down('textfield[name=idticket]').getValue());
                   
                    win.down('textfield[name=idProcedimiento]').setValue(formw.down('textfield[name=idProcedimiento]').getValue());
                    win.show();
                   /* */
                }
            }
        });
    },
    
        aceptar: function () {

          formw = this.getWinObservacionFuncionario();
         me = this;

                    formulario = formw.down('form[name=formulario]').getForm();
                    if (formulario.isValid()) {

                        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
                        loadingMask.show();
                        formulario.submit({
                            url: BASE_URL + 'ticket/solicitud/rechazarActividadTicket',
                            method: 'POST',
                            success: function (form, action) {

                                loadingMask.hide();
                                var data = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title: 'Informaci&oacute;n',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                
                                formw.close(); 
                               
                                
                            },
                            failure: function (form, action) {
                                loadingMask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.MessageBox.show({title: 'Verifique los datos', msg: 'Algunos campos no fueron introducidos correctamente', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.MessageBox.show({title: 'Error', msg: 'Error en comunicaci&oacute;n Ajax', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.MessageBox.show({title: 'Error---Verifique!', msg: 'Informacion ingresada es invalida/Servidor invalido', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    default:
                                        Ext.MessageBox.show({title: 'Alerta', msg: 'Se ha detectado algun error', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                                }
                            },
                        });
                    } else {
                        Ext.MessageBox.show({title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
                    }
    },
    
        firmarecibido: function (grid, record, rowIndex) {
         grid2=this.getListaPeticionEncargado();
        store = grid.getStore();
        rec = store.getAt(rowIndex);
          //console.log(grid2.items.items[0].);
          Ext.Ajax.request({
                    url: BASE_URL+'ticket/solicitud/recibirActividadTicket',
                    method: 'POST',
                    params: {
                        idticket:rec.get('idTicket'),
                        idprocedimiento:rec.get('idActividad')
                    },
                    
                     success: function(result, request){
                       data=Ext.JSON.decode(result.responseText);
                       
                        if (data.success){
                              
                              Ext.MessageBox.show({ title: 'Mensaje', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                                grid.getStore().load();
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(result, request){
                    var result = Ext.JSON.decode(result.responseText);   
                     loadingMask.hide();
                            Ext.MessageBox.show({ title: 'Alerta', msg:data.msg , buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }


                }); 
    },
    
    
        enviarMensajeRespuesta: function (grid, record, rowIndex) {
        //formw = this.getListaPeticionEncargado();
        
        store = grid.getStore();
        rec = store.getAt(rowIndex);
         Ext.Ajax.request({
                    url: BASE_URL+'tramite/tramite/buscarEncargadoTramite',
                    method: 'POST',
                    params: {
                        sector:rec.get('idSector'),
                        tipoayuda:rec.get('idTipoAyuda')
                    },
                    
                     success: function(result, request){
                       data=Ext.JSON.decode(result.responseText);
                       
                        if (data.success){
                                   win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinMensajeAlFuncionario');
                                    win.down('textfield[name=idticket]').setValue(rec.get('idTicket'));
                                    win.down('textfield[name=idProcedimiento]').setValue(rec.get('idActividad'));
                                    win.down('textfield[name=idFuncionario]').setValue(rec.get('idEncargado'));
                                    win.down('textarea[name=observacion]').setValue(rec.get('observacionFuncionario'));
                                    Ext.ComponentQuery.query('#winMensajeAlFuncionario  textarea[name=observacion]')[0].setReadOnly(true);
                                    win.down('textarea[name=observacionRespuesta]').setValue(rec.get('respuesta'));
                                    win.down('textfield[name=mensaje]').setValue(1);
                                    win.down('label[name=lblFuncionario]').setText(rec.get('encargado'));
                                    win.down('label[name=lblResponsable2]').setText(data.data[0].responsable);
                                    win.down('label[name=lblNombreTramite]').setText(data.data[0].tramite);
                                    win.down('label[name=lblNombreProcedimiento]').setText(rec.get('actividad'));   
                                win.show();
                            }
                        else{
                           Ext.MessageBox.show({ title: 'Alerta', msg:  data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                           // myapp.util.Util.showErrorMsg(result.msg);
                        }
                    },
                    failure: function(result, request){
                    var result = Ext.JSON.decode(result.responseText);   
                     loadingMask.hide();
                            Ext.MessageBox.show({ title: 'Alerta', msg:data.msg , buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING });
                        }


                }); 
   
    },
    
       enviarRespuesta: function () {

          formw = this.getWinMensajeAlFuncionario();
         
                    formulario = formw.down('form[name=formulario]').getForm();
                    if (formulario.isValid()) {

                        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
                        loadingMask.show();
                        formulario.submit({
                            url: BASE_URL + 'ticket/solicitud/enviarMensajeFuncionarioProcedimientoTicket',
                            method: 'POST',
                            success: function (form, action) {

                                loadingMask.hide();
                                var data = Ext.JSON.decode(action.response.responseText);
                                Ext.Msg.show({
                                    title: 'Informaci&oacute;n',
                                    msg: data.msg,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                                
                                formw.close(); 
                                grid = this.getListaPeticionEncargado();
                                store = grid.getStore();
                                store.load();
                               // console.log(store);
                               
                               
                            },
                            failure: function (form, action) {
                                loadingMask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.MessageBox.show({title: 'Verifique los datos', msg: 'Algunos campos no fueron introducidos correctamente', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.MessageBox.show({title: 'Error', msg: 'Error en comunicaci&oacute;n Ajax', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.MessageBox.show({title: 'Error---Verifique!', msg: 'Informacion ingresada es invalida/Servidor invalido', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.ERROR});
                                        break;
                                    default:
                                        Ext.MessageBox.show({title: 'Alerta', msg: 'Se ha detectado algun error', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                                }
                            },
                        });
                    } else {
                        Ext.MessageBox.show({title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
                    }

    },
});
 