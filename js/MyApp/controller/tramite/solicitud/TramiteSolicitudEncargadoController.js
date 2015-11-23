Ext.define('MyApp.controller.tramite.solicitud.TramiteSolicitudEncargadoController', {
    extend: 'Ext.app.Controller',
    views: [
        'solicitud.AtenderPeticionEncargadoPanel',
        'solicitud.ListaPeticionEncargado',
        'solicitud.actividad_ticket.WinProcedimientoTicket',
        'solicitud.actividad_ticket.WinObservacionFuncionario'
    ],
    refs: [
        {
            ref: 'WinProcedimientoTicket',
            selector: 'winProcedimientoTicket'
        },
          {
            ref: 'WinObservacionFuncionario',
            selector: 'winObservacionFuncionario'
        },
    ],
    init: function (application) {
        this.control({
            'atenderPeticionEncargadoPanel actioncolumn[name=aprobar]': {
                click: this.verSeleccionado
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
                                formulario.close();
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
                                formulario.close();
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
    
});
 