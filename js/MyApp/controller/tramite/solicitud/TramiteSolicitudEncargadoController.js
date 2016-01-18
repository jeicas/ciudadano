Ext.define('MyApp.controller.tramite.solicitud.TramiteSolicitudEncargadoController', {
    extend: 'Ext.app.Controller',
    views: [
        'solicitud.AtenderPeticionEncargadoPanel',
        'solicitud.ListaPeticionEncargado',
        'solicitud.actividad_ticket.WinProcedimientoTicket',
        'solicitud.actividad_ticket.WinObservacionFuncionario',
        'solicitud.actividad_ticket.WinMensajeAlFuncionario',
        'tramite.WinRecaudosTicket',
    ],
    refs: [
        {
            ref: 'WinProcedimientoTicket',
            selector: 'winProcedimientoTicket'
        },
        {
            ref: 'AtenderPeticionEncargadoPanel',
            selector: 'atenderPeticionEncargadoPanel'
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
        {
            ref: 'RecaudosTicketLista',
            selector: 'recaudosTicketLista'
        },
        {
            ref: 'WinRecaudosTicket',
            selector: 'winRecaudosTicket'
        }
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
            'recaudosTicketLista button[name=btnGuardar]': {
                click: this.guardarRecaudosTicket
            },
            'recaudosTicketLista button[name=btnAprobar]': {
                click: this.aprobarProcedimientoDoc
            },
            'recaudosTicketLista button[name=btnRechazar]': {
                click: this.rechazarProcedimientoDoc
            },
        });
    },
    verSeleccionado: function (grid, record, rowIndex) {

        store = grid.getStore();
        rec = store.getAt(rowIndex);
        var i = 0;
        if (rec.get('tipoactividad') == 5) {
            win = Ext.create('MyApp.view.tramite.WinRecaudosTicket');
            win.down('textfield[name=idticket]').setValue(rec.get('idTicket'));
            win.down('textfield[name=idactividad]').setValue(rec.get('idActividad'));
            win.down('textfield[name=actividad]').setValue(rec.get('actividad'));
            win.down('textfield[name=codigoTicket]').setValue(rec.get('codigoTicket'));
            win.down('textfield[name=solicitante]').setValue(rec.get('solicitante'));

            storeRecuados = win.down('recaudosTicketLista').getStore();
            storeRecuados.clearData();
            storeRecuados.proxy.extraParams.ticket = rec.get('idTicket');
            storeRecuados.load();
            grid = win.down('recaudosTicketLista');

            modified = grid.getSelectionModel().getSelection();
            grid.getStore().remove(modified);
            grid.getStore().load();
            grid.getView().refresh(true);

            gridStore = grid.getStore();
            gridStore.load(function (records, operation, success) {
                gridStore.each(function (record) {


                    if (record.data.estatusrecaudo == 'ENTREGADO') {
                        grid.getSelectionModel().select(this, true);
                    } else {
                        i = i + 1;
                    }
                })
                if (i > 0) {
                    win.down('button[name=btnAprobar]').setVisible(false);
                }

            });

            if (rec.get('estatusticket') == 5 || rec.get('estatusticket') == 4) {
                win.down('button[name=btnGuardar]').setVisible(false);
                win.down('button[name=btnRechazar]').setVisible(false);
                win.down('button[name=btnAprobar]').setVisible(false);
            }

            win.show();


        } else {
            if (rec.get('estatus') != 'PENDIENTE') {
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
                if (rec.get('estatus') == 'COMPLETADO') {
                    win.down('button[name=btnAprobar]').setVisible(false);
                }
                if (rec.get('estatus') == 'RECHAZADO') {
                    win.down('button[name=btnRechazar]').setVisible(false);
                }

                if (rec.get('estatusticket') == 5 || rec.get('estatusticket') == 4) {
                    win.down('button[name=btnRechazar]').setVisible(false);
                    win.down('button[name=btnAprobar]').setVisible(false);
                }



                win.show();
            }
        }
    },
    aprobarProcedimiento: function () {
        me = this;
        formw = this.getWinProcedimientoTicket();
        solicitud = formw.down('label[name=lblActividad]').getEl().dom.textContent;
        panel = me.getAtenderPeticionEncargadoPanel();
        grid = panel.down('listaPeticionEncargado');
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
                                store = grid.getStore();
                                store.load();

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
                    formw.close();
                    /* */
                }
            }
        });
    },
    aprobarProcedimientoDoc: function () {
        me = this;
        formw = this.getWinRecaudosTicket();
        solicitud = formw.down('textfield[name=actividad]').getValue();
        panel = me.getAtenderPeticionEncargadoPanel();
        grid = panel.down('listaPeticionEncargado');


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
                                store = grid.getStore();
                                store.load();

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
    rechazarProcedimientoDoc: function () {
        me = this;
        formw = this.getWinRecaudosTicket();
        solicitud = formw.down('textfield[name=actividad]').getValue();


        Ext.Msg.show({
            title: 'Confirmar',
            msg: 'Esta seguro que desea rechazar el procedimiento :  ' + solicitud + '?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (buttonId) {
                if (buttonId == 'yes') {

                    win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinObservacionFuncionario');
                    win.down('textfield[name=idticket]').setValue(formw.down('textfield[name=idticket]').getValue());
                    win.down('textfield[name=idProcedimiento]').setValue(formw.down('textfield[name=idactividad]').getValue());
                    win.show();
                    formw.close();
                    /* */
                }
            }
        });
    },
    aceptar: function () {

        formw = this.getWinObservacionFuncionario();
        me = this;

        panel = me.getAtenderPeticionEncargadoPanel();
        grid = panel.down('listaPeticionEncargado');

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
                    store = grid.getStore();
                    store.load();

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

        grid2 = this.getListaPeticionEncargado();
        store = grid.getStore();
        rec = store.getAt(rowIndex);

        if (rec.get('estatus') == 'PENDIENTE') {

            Ext.Ajax.request({
                url: BASE_URL + 'ticket/solicitud/recibirActividadTicket',
                method: 'POST',
                params: {
                    idticket: rec.get('idTicket'),
                    idprocedimiento: rec.get('idActividad')
                },
                success: function (result, request) {
                    data = Ext.JSON.decode(result.responseText);

                    if (data.success) {

                        Ext.MessageBox.show({title: 'Mensaje', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        grid.getStore().load();
                    }
                    else {
                        Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        // myapp.util.Util.showErrorMsg(result.msg);
                    }
                },
                failure: function (result, request) {
                    var result = Ext.JSON.decode(result.responseText);
                    loadingMask.hide();
                    Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                }


            });
        }

    },
    enviarMensajeRespuesta: function (grid, record, rowIndex) {
        //formw = this.getListaPeticionEncargado();

        store = grid.getStore();
        rec = store.getAt(rowIndex);
        Ext.Ajax.request({
            url: BASE_URL + 'tramite/tramite/buscarEncargadoTramite',
            method: 'POST',
            params: {
                sector: rec.get('idSector'),
                tipoayuda: rec.get('idTipoAyuda')
            },
            success: function (result, request) {
                data = Ext.JSON.decode(result.responseText);

                if (data.success) {
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
                else {
                    Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    // myapp.util.Util.showErrorMsg(result.msg);
                }
            },
            failure: function (result, request) {
                var result = Ext.JSON.decode(result.responseText);
                loadingMask.hide();
                Ext.MessageBox.show({title: 'Alerta', msg: data.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
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
    guardarRecaudosTicket: function () {
        grid = this.getRecaudosTicketLista(),
        grid2 = this.getListaPeticionEncargado();
        modified = grid.getSelectionModel().getSelection();
        var numero=0;
        var collection = grid.getStore().queryBy(function (record, id) {
            return record.get('requerido') == 'SI';
        });
        total = collection.length;
        var arregloGrid = [];
        Ext.each(modified, function (record) {
            if (record.get('requerido') == 'SI') {
                numero = numero + 1;
            }
            arregloGrid.push(Ext.apply(record.data));
        });
        arregloItems = Ext.encode(arregloGrid);
        store = grid.getStore();
        ticket = store.data.items[0].data['idticket'];
        actividad = win.down('textfield[name=idactividad]').getValue();
        if (total == numero) {
            Ext.Ajax.request({//AQUI ENVIO LA DATA 
                url: BASE_URL + 'ticket/solicitud/guardarRecuadosTicket',
                method: 'POST',
                params: {
                    recordsGrid: arregloItems,
                    ticket: ticket,
                    actividad: actividad,
                },
                success: function (result, request) {
                    result = Ext.JSON.decode(result.responseText);
                    if (result.success) {
                        Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                        grid2.getStore().load();
                        
                    }
                    else {

                        Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    }
                },
                failure: function (form, action) {
                    var result = action.result;
                    loadingMask.hide();
                    Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                }
            });
        } else {
            Ext.Msg.alert("Error", "Para terminar el procedimiento  debe consignar todos los recaudos obligatorios");
        }


    }
});
 