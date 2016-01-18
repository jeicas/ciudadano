Ext.define('MyApp.controller.tramite.solicitud.TramiteSolicitudController', {
    extend: 'Ext.app.Controller',
    views: [
        'solicitud.AtenderPeticionPanel',
        'solicitud.ListaPeticion',
        'solicitud.actividad_ticket.WinActividadTicket',
        'solicitud.actividad_ticket.GridActividadTicket',
         'solicitud.actividad_ticket.WinMensajeAlFuncionario',
    ],
    refs: [
        {
            ref: 'AtenderPeticionPanel',
            selector: 'atenderPeticionPanel'
        },
         {
            ref: 'ListaPeticion',
            selector: 'listaPeticion'
        },
         {
            ref: 'WinActividadTicket',
            selector: 'winActividadTicket'
        },
         {
            ref: 'WinObservacionSolicitud',
            selector: 'winObservacionSolicitud'
        },
        {
            ref: 'WinMensajeAlFuncionario',
            selector: 'winMensajeAlFuncionario'
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
              'winActividadTicket actioncolumn[name=mensaje]': {
                click: this.enviarMensajeFuncionario
            },
            'winObservacionSolicitud button[name=btnAceptar]': {
                click: this.aceptar
            },
             'winMensajeAlFuncionario button[name=btnEnviar]': {
                click: this.enviar
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
        win.down('textarea[name=observacion]').setValue(rec.get('observacion'));
        
        storeProcedimiento = win.down('gridActividadTicket').getStore();
        storeProcedimiento.clearData();
        storeProcedimiento.proxy.extraParams.ticket = rec.get('idTicket');
        storeProcedimiento.proxy.extraParams.tipoayuda = rec.get('idTipoAyuda');
        storeProcedimiento.proxy.extraParams.sector = rec.get('idSector');
        storeProcedimiento.load();
        
        
        Ext.Ajax.request({
                    url: BASE_URL+'ticket/solicitud/buscarCuantosProcedimientoTicket',
                    method: 'POST',
                    params: {
                        idticket:rec.get('idTicket'), 
                    },
                     success: function(result, request){
                       var data=Ext.JSON.decode(result.responseText); 
                        if (data.success){
                            if (data.cuantos>0)
                            {
                                win.down('button[name=btnAprobar]').setVisible(false); 
                            }
                            
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
        
        
        win.show();
    },
    aprobarSolicitud: function () {
      me=this;
        formw = this.getWinActividadTicket();
        solicitud = formw.down('textfield[name=cantidad]').getValue() + ' ' + formw.down('textfield[name=tipoayuda]').getValue();
        panel = me.getAtenderPeticionPanel();
        grid = panel.down('listaPeticion');
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
                                
                                formw.close(); 
                                 store = grid.getStore();
                                store.load()
                              
                                
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
        solicitud = formw.down('textfield[name=cantidad]').getValue() + ' ' + formw.down('textfield[name=idTipoAyuda]').getValue();

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
                    formw.close();
                }
            }
        });
    },
    
    aceptar: function () {

          formw = this.getWinObservacionSolicitud();
          me = this;
           panel = me.getAtenderPeticionPanel();
        grid = panel.down('listaPeticion');
         
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
    
    
       enviarMensajeFuncionario: function (grid, record, rowIndex) {
        formw = this.getWinActividadTicket();
        
        store = grid.getStore();
        rec = store.getAt(rowIndex);
     
        win = Ext.create('MyApp.view.solicitud.actividad_ticket.WinMensajeAlFuncionario');
        win.down('textfield[name=idticket]').setValue(formw.down('textfield[name=idticket]').getValue());
        win.down('textfield[name=idProcedimiento]').setValue(rec.get('actividadid'));
        win.down('textfield[name=idFuncionario]').setValue(rec.get('idfuncionario'));
        win.down('textfield[name=mensaje]').setValue(0);
        win.down('label[name=lblFuncionario]').setText(rec.get('encargado'));
        win.down('label[name=lblNombreProcedimiento]').setText(rec.get('actividad'));
        win.down('textarea[name=observacion]').setValue(rec.get('observacionfuncionario'));
        win.down('textarea[name=observacionRespuesta]').setValue(rec.get('respuestafuncionario'));
        Ext.ComponentQuery.query('#winMensajeAlFuncionario  textarea[name=observacionRespuesta]')[0].setReadOnly(true);
         win.down('label[name=lblPara2]').setVisible(false);
         win.down('label[name=lblResponsable2]').setVisible(false);
         win.down('label[name=lblProc]').setVisible(false);
        win.down('label[name=lblNombreTramite]').setVisible(false);
        win.show();
    },
    
    
    enviar: function () {

          formw = this.getWinMensajeAlFuncionario();
          me = this;
         
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
 