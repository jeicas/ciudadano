Ext.define('MyApp.controller.tramite.solicitud.TramiteSolicitudController', {
    extend: 'Ext.app.Controller',
    views: [
        'solicitud.AtenderPeticionPanel',
        'solicitud.ListaPeticion',
        'solicitud.actividad_ticket.WinActividadTicket',
        'solicitud.actividad_ticket.GridActividadTicket',
    ],
    refs: [
        {
            ref: 'WinActividadTicket',
            selector: 'winActividadTicket'
        },
         {
            ref: 'WinObservacionSolicitud',
            selector: 'winObservacionSolicitud'
        },
    ],
    init: function (application) {
        this.control({
            'listaPeticion actioncolumn[name=ver]': {
                click: this.verSeleccionado
            },
            'winActividadTicket button[name=btnAprobar]': {
                click: this.aprobarSolicitud
            },
             'winActividadTicket button[name=btnRechazar]': {
                click: this.reprobarSolicitud
            },
            'winObservacionSolicitud button[name=btnAceptar]': {
                click: this.aceptar
            },
        });
    },
    verSeleccionado: function (grid, record, rowIndex) {

        store = grid.getStore();
        rec = store.getAt(rowIndex);

        win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinActividadTicket');
        win.down('textfield[name=idticket]').setValue(rec.get('idTicket'));
        win.down('textfield[name=codigoTicket]').setValue(rec.get('codigoTicket'));
        win.down('textfield[name=solicitante]').setValue(rec.get('solicitante'));
        win.down('textfield[name=sector]').setValue(rec.get('sector'));
        win.down('textfield[name=tipoayuda]').setValue(rec.get('tipoayuda'));
         win.down('textfield[name=idTipoAyuda]').setValue(rec.get('idTipoAyuda'));
        win.down('textfield[name=cantidad]').setValue(rec.get('cantidad'));
        win.down('textfield[name=solicitud]').setValue(rec.get('solicitud'));

        storeProcedimiento = win.down('gridActividadTicket').getStore();
        storeProcedimiento.clearData();
        storeProcedimiento.proxy.extraParams.ticket = rec.get('idTicket');
        storeProcedimiento.load();
        win.show();
    },
    aprobarSolicitud: function () {

        formw = this.getWinActividadTicket();
        solicitud = formw.down('textfield[name=cantidad]').getValue() + ' ' + formw.down('textfield[name=tipoayuda]').getValue();

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
                            url: BASE_URL + 'ticket/solicitud/aprobarSolicitudTicket',
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
    
      reprobarSolicitud: function () {

        formw = this.getWinActividadTicket();
        solicitud = formw.down('textfield[name=cantidad]').getValue() + ' ' + formw.down('textfield[name=tipoayuda]').getValue();

        Ext.Msg.show({
            title: 'Confirmar',
            msg: 'Desea rechazar la solicitud : '+ solicitud+'?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId) {
                if (buttonId == 'yes') {
                    win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinObservacionSolicitud');
                    win.down('textfield[name=idticket]').setValue(formw.down('textfield[name=idticket]').getValue());
                    win.down('textfield[name=idtipoayuda]').setValue(formw.down('textfield[name=idTipoAyuda]').getValue());
                    win.show();
                }
            }
        });
    },
    
    aceptar: function () {

          formw = this.getWinObservacionSolicitud();
          me = this;
         
                    formulario = formw.down('form[name=formulario]').getForm();
                    if (formulario.isValid()) {

                        var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
                        loadingMask.show();
                        formulario.submit({
                            url: BASE_URL + 'ticket/solicitud/rechazarSolicitudTicket',
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
                                /*grid = me.getListaPeticion();
                                store = grid.getStore();
                                store.load();
                                console.log(store);*/
                               
                               
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
 