Ext.define('MyApp.controller.tramite.TramiteController', {
    extend: 'Ext.app.Controller',
    views: [
        'tramite.ListaActividad',
        'tramite.TramitePanel',
        'tramite.GridActividad',
        'tramite.buscarTramite.GridBuscarTramite',
        'tramite.buscarTramite.BuscarTramite',
        'tramite.WinMaestroTramite'
    ],
    refs: [{
            ref: 'panelTramite',
            selector: 'panelTramite'
        }, {
            ref: 'GridActividad',
            selector: 'gridActividad'
        }, {
            ref: 'RecaudosLista',
            selector: 'recaudosLista'
        },
        {
            ref: 'listaTramites',
            selector: 'listaTramites'
        },
        {
            ref: 'listaTramites',
            selector: 'listaTramites'
        },
        {
            ref: 'gridBuscarTramites',
            selector: 'gridBuscarTramites'
        },
        {
            ref: 'listaTramites',
            selector: 'listaTramites'
        },
        {
            ref: 'gridBuscarNombreTramite',
            selector: 'gridBuscarNombreTramite'
        }, {
            ref: 'WinMaestroTramite',
            selector: 'winMaestroTramite'
        }],
    init: function (application) {
        this.control({
            'panelTramite button[name=limpiar]': {
                click: this.limpiar
            },
            'panelTramite radiogroup[name=rgAdmon]': {
                change: this.changeSeleccion
            },
            'panelTramite combobox[name=sector]': {
                select: this.seleccionartipoayuda
            },
            'gridActividad button[name=agregar]': {
                click: this.agregarItem
            },
            'gridActividad textfield[name=lapso]': {
                blur: this.guardarActividad
            },
            'gridActividad combobox[name=cmbprocedimiento]': {
                focus: this.buscarActividaddepende
            },
            'panelTramite combobox[name=ente]': {
                select: this.changeEnte,
                change: this.cambio
            },
            'panelTramite button[name=guardar]': {
                click: this.guardarTramite
            },
            'panelTramite radiogroup[name=rgtramite]': {
                change: this.recaudos
            },
            'recaudosLista button[name=agregarrecaudos]': {
                click: this.agregarItemRecaudos
            },
            ' panelTramite combobox[name=nombret]': {
                select: this.buscarActividad
            },
            "panelTramite button[name=agregarAyuda]": {
                click: this.ventanaagregarAyuda
            },
            "panelTramite button[name=agregarTipoTramite]": {
                click: this.ventanaaagregarTipoTramite
            },
            "panelTramite button[name=nuevo]": {
                click: this.ventanaaagregarNombreTramite
            }
            ,
            "panelTramite button[name=buscarTramites]": {
                click: this.listaTramites
            },
            "gridBuscarTramites button[name=verDetalles]": {
                click: this.verDetalles
            },
            "winMaestroTramite button[name=btnGuardar]": {
                click: this.guardarnombre
            },
        });
    },
    listaTramites: function (win, options) {
        var win = Ext.create('MyApp.view.tramite.buscarTramite.GridBuscarTramite');
        win.show();
    },
    guardarActividad: function (field, e, option) {
        // Ext.MessageBox.show({title: 'Alerta', msg: 'Wiii, Ingrso', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});

        formPanel = this.getPanelTramite();
        grid = this.getGridActividad();
        store = grid.getStore();
        num = store.getCount();

        storeC = grid.down('combobox[name=nombrer]').getStore();
        valor = grid.down('combobox[name=nombrer]').getValue();
        for (i = 0; i < storeC.data.items.length; ++i) {
            if (storeC.data.items[i].data['nombre'] == valor) {
                cedula1 = storeC.data.items[i].data['id'];
                idfuncionario = storeC.data.items[i].data['idfuncionario']
                i = storeC.data.items.length + 1;
            } else {
                if (storeC.data.items[i].data['id'] == valor) {
                    idfuncionario = storeC.data.items[i].data['idfuncionario']
                    cedula1 = storeC.data.items[i].data['id'];
                    i = storeC.data.items.length + 1;
                }

            }

        }

        if (store.data.items[num - 1].data.cmbprocedimiento == '' || store.data.items[num - 1].data.cmbprocedimiento == null) {

            actividaddependiente = null;

        } else
        {
            if (store.data.items[num - 1].data['estatus'] === 'INICIO') {

                Ext.MessageBox.show({title: 'Alerta', msg: 'Este tipo de procedimiento no puede depender de una actividad previa', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                 Ext
            }
             else {
                storeP = grid.down('combobox[name=cmbprocedimiento]').getStore();
                valor = grid.down('combobox[name=cmbprocedimiento]').getValue();
                for (i = 0; i < storeP.data.items.length; ++i) {
                    if (storeP.data.items[i].data['descripcion'] == valor) {
                        actividaddependiente = storeP.data.items[i].data['idprocedimiento'];
                        i = storeP.data.items.length + 1;
                    } else {
                        if (storeP.data.items[i].data['id'] == valor) {
                            actividaddependiente = storeP.data.items[i].data['idprocedimiento'];
                            i = storeP.data.items.length + 1;
                        }

                    }

                }
            }

        }
        console.log("valor depende " + actividaddependiente);



        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'tramite/tramite/guardarActividad',
            method: 'POST',
            params: {
                tramite: formPanel.down('textfield[name=idtramite]').getValue(),
                descripcion: store.data.items[num - 1].data['descripcion'],
                unidadresponsable: store.data.items[num - 1].data['unidad'],
                tiempo: store.data.items[num - 1].data['tiempo'],
                estatus: store.data.items[num - 1].data['estatus'],
                funcionario: cedula1,
                idfuncionario: idfuncionario,
                actividadDepende: actividaddependiente,
                id_actividad: store.data.items[num - 1].data['idprocedimiento'],
            },
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);
                if (result.success) {
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
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








    },
    ventanaaagregarTipoTramite: function (win, options) {
        var win = Ext.create('MyApp.view.tramite.ventanasagregar.GridbuscartipoT');
        win.show();
    },
    ventanaaagregarNombreTramite: function (button, e, options) {
        var win = Ext.create('MyApp.view.tramite.WinMaestroTramite');
        win.down('textfield[name=idtramite]').setValue(0);
        win.setTitle('Nuevo Tramite');
        win.show();
    },
    ventanaagregarAyuda: function (win, options) {
        var win = Ext.create('MyApp.view.tramite.ventanasagregar.GridbuscartipoA');
        win.show();
    },
    buscarActividad: function () {
        formPanel = this.getPanelTramite();
        grid = this.getRecaudosLista();
        tramite = formPanel.down("combobox[name=nombret]").getValue();
        formPanel.down("textfield[name=idtramite]").setValue(tramite);
        store1 = grid.getStore();
        store1.clearData();
        store1.proxy.extraParams.tramite = tramite;
        grid.getView().refresh(true);
        store1.load();
    },
    buscarActividaddepende: function () {
        console.log('paso');
        formPanel = this.getPanelTramite();
        grid = this.getGridActividad();
        tramite = formPanel.down("textfield[name=idtramite]").getValue();

        store1 = grid.down("combobox[name=cmbprocedimiento]").getStore();
        store1.clearData();
        store1.proxy.extraParams.tramite = tramite;
        grid.getView().refresh(true);
        store1.load();
    },
    verDetalles: function (win, button, e, options) {
        win = this.getListaTramites();
        formPanel = this.getPanelTramite();
        grid = this.getGridBuscarTramites();
        record = grid.getSelectionModel().getSelection();
        grid2 = this.getRecaudosLista();
        grid3 = this.getGridActividad();
        tramite = record[0].get('idtramite');
        formPanel.down('textfield[name=idtramite]').setValue(record[0].get('idtramite'));
        formPanel.down('textfield[name=nombret]').setValue(record[0].get('nombret'));
        formPanel.down('textfield[name=codigotr]').setValue(record[0].get('codigotr'));
        formPanel.down('textfield[name=tiempot]').setValue(record[0].get('tiempot'));
        formPanel.down('combobox[name=nombre]').setValue(record[0].get('fcLaboral'));
        formPanel.down('combobox[name=tipot]').setValue(record[0].get('tipotramite'));
        formPanel.down('combobox[name=sector]').setValue(record[0].get('sector'));
        formPanel.down('combobox[name=ayudat]').setValue(record[0].get('tipoayuda'));
        // formPanel.getForm().loadRecord(record);

        storeRL = grid2.getStore();
        storeRL.clearData();
        storeRL.proxy.extraParams.tramite = tramite;
        grid2.getView().refresh(true);
        storeRL.load();
        //console.log(store1.data.items[0].get('idrecaudo'));
        if (storeRL.count() > 0) {
            formPanel.down('radiofield[name=seleccionar]').setValue(1);
        } else {
            formPanel.down('radiofield[name=seleccionar]').setValue(2);
        }
        
        store2 = grid3.getStore();
        store2.clearData();
        store2.proxy.extraParams.tramite = tramite;
        grid3.getView().refresh(true);
        store2.load();
        /* grid5 = Ext.ComponentQuery.query('gridActividad')[0];
        store3 = grid5.columns[5].editor.getStore();
        store3.clearData();
        store3.proxy.extraParams.tramite = tramite;
        grid3.getView().refresh(true);
        store3.load();*/
        win.close();
    },
    recaudos: function (grupo, cmp) {
        if (cmp.seleccionar == 1) {
            Ext.ComponentQuery.query('recaudosLista')[0].setVisible(true);
            Ext.ComponentQuery.query('#mitabpanel')[0].setActiveTab(0);
            Ext.ComponentQuery.query('recaudosLista')[0].setDisabled(false);
            // Ext.ComponentQuery.query('recaudosLista')[0].setActiveTab(1); 
            // Ext.ComponentQuery.query('panelTramite mitabpanel')[0].setVisible(true);
            grid9 = this.getRecaudosLista();
            gridStore9 = grid9.getStore();
            gridStore9.clearData();
            grid9.getView().refresh(true);
        } else {
            // Ext.ComponentQuery.query('#mitabpanel')[0].setVisible(); 
            Ext.ComponentQuery.query('#mitabpanel')[0].setActiveTab(1);
            Ext.ComponentQuery.query('recaudosLista')[0].setVisible(false);
            Ext.ComponentQuery.query('recaudosLista')[0].setDisabled(true);
            // Ext.ComponentQuery.query('gridActividad')[0].setActiveTab(1);
            grid9 = this.getRecaudosLista();
            gridStore9 = grid9.getStore();
            gridStore9.clearData();
            grid9.getView().refresh(true);
        }
    },
    agregarItemRecaudos: function (a, e, eOpts) {
        grid3 = this.getRecaudosLista();
        position1 = grid3.getStore().getCount();
        store = this.getRecaudosLista().getStore();
        var plugin1 = grid3.getPlugin('cellplugin');
        var r1 = new Ext.create('MyApp.model.store.tramite.TramiteRecaudos', {
        });
        store.insert(position1, r1);
        plugin1.startEdit(position1 - 1, 0);
        grid3.getView().refresh(true);
    },
    agregarItem: function (a, e, eOpts) {
        grid4 = this.getGridActividad();
        position = grid4.getStore().getCount();
        store = this.getGridActividad().getStore();
        var plugin = grid4.getPlugin('rowediting');
        var r = new Ext.create('MyApp.model.store.tramite.TramiteActividades', {});
        store.insert(position, r);
        plugin.startEdit(position - 1, 0);
        grid4.getView().refresh(true);
    },
    guardarnombre: function () {

        me = this;
        formular = this.getWinMaestroTramite();
        formulari = this.getPanelTramite();
        store = formulari.down('combobox[name=nombret]').getStore();
        formulario = formular.down('form[name=formTramite]').getForm();
        if (formulario.isValid()) {

            var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
            loadingMask.show();
            formulario.submit({
                url: BASE_URL + 'tramite/tramite/guardarNombre',
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
                    formular.close();
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



        /* if (nobj > 0) {
         var arregloGrid = [];
         Ext.each(modified, function (record) {
         arregloGrid.push(Ext.apply(record.data));
         });
         arregloItems = Ext.encode(arregloGrid);
         
         var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
         loadingMask.show();
         
         Ext.Ajax.request({//AQUI ENVIO LA DATA 
         url: BASE_URL + 'tramite/tramite/guardarNombre',
         method: 'POST',
         params: {
         recordsGrid: arregloItems,
         },
         success: function (result, request) {
         result = Ext.JSON.decode(result.responseText);
         if (result.success) {
         
         Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
         }
         else {
         
         
         }
         },
         failure: function (form, action) {
         var result = action.result;
         loadingMask.hide();
         Ext.MessageBox.show({title: 'Alerta', msg: "Ha ocurrido un error. Por vuelva a intentarlo, si el problema persiste comuniquese con el administrador", buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
         
         }
         });
         
         
         
         
         
         
         } else {
         Ext.MessageBox.show({title: 'Informaci&oacute;n', msg: 'Ingresar los datos de la grid Descripcion,Responsable y Division', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
         }*/

    },
    guardarTramite: function () {
        me = this;
        formulario = this.getPanelTramite();
        grid = this.getGridActividad();
        store = grid.getStore();
        modified = store.data.items
        grid1 = this.getRecaudosLista();
        store1 = grid1.getStore();
        modified1 = store1.data.items
        nitems = store.getCount();
        nobj = formulario.down('gridActividad').getStore().getCount();
        // if(!Ext.isEmpty(modified) || !Ext.isEmpty(modified1)){



        storeC = formulario.down('combobox[name=nombre]').getStore();
        valor = formulario.down('combobox[name=nombre]').getValue();
        for (i = 0; i < storeC.data.items.length; ++i) {

            if (storeC.data.items[i].data['nombre'] == valor) {
                cedula1 = storeC.data.items[i].data['id'];
                i = storeC.data.items.length + 1;
            } else {
                if (storeC.data.items[i].data['id'] == valor) {
                    cedula1 = storeC.data.items[i].data['id'];
                    i = storeC.data.items.length + 1;
                }
            }

        }


        if (formulario.getForm().isValid()) {
            if (nobj > 0) {
                var arregloGrid = [];
                Ext.each(modified, function (record) {
                    arregloGrid.push(Ext.apply(record.data));
                });
                arregloItems = Ext.encode(arregloGrid);
                var arregloGridRecaudos = [];
                Ext.each(modified1, function (record) {
                    arregloGridRecaudos.push(Ext.apply(record.data));
                });
                arregloItemsrecaudos = Ext.encode(arregloGridRecaudos);
                var loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: "Guardando por Favor espere..."});
                loadingMask.show();
                formulario.getForm().submit({
                    url: BASE_URL + 'tramite/tramite/guardar',
                    method: 'POST',
                    params: {
                        recordsGrid: arregloItems,
                        recordsGridRecaudos: arregloItemsrecaudos,
                        cedula: cedula1
                    },
                    success: function (form, action) {
                        loadingMask.hide();
                        var data = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.show({
                            title: 'Informaci&oacute;n',
                            msg: data.msg,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        me.limpiar();
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
                Ext.MessageBox.show({title: 'Informaci&oacute;n', msg: 'Ingresar los datos de la grid Descripcion,Responsable y Division', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
            }
        } else {
            Ext.MessageBox.show({title: 'Informaci&oacute;n', msg: 'Debe ingresar todos los datos solicitados.', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO});
        }
    },
    seleccionartipoayuda: function (a, e, eOpts) {
        me = this;
        var formulario = this.getPanelTramite();
        sector = formulario.down('combobox[name=sector]').getValue();
        formulario.down("combobox[name=ayudat]").reset();
        ResponsableStore = formulario.down('combobox[name=ayudat]').getStore();
        ResponsableStore.proxy.extraParams.sector = sector;
        ResponsableStore.load();
    },
    cambio: function (a, newValue, oldValue, eOpts) {
        me = this;
        // console.log(newValue);
        var form = this.getPanelTramite();
        var lista = this.getGridActividad();
        ente = form.down('combobox[name=ente]').getValue();
        store = lista.getStore();
        store.clearData();
        lista.view.refresh();
        if (ente != null) {
            listaItem = lista.columns[3].initialConfig.editor.store;
            listaItem.proxy.extraParams.ente = ente;
            listaItem.load();
        }
    },
    changeEnte: function (a, newValue, oldValue, eOpts) {
        me = this;
        // console.log(newValue);
        var form2 = this.getPanelTramite();
        var lista2 = this.getGridActividad();
        ente2 = form2.down('combobox[name=ente]').getValue();
        store2 = lista2.getStore();
        store2.clearData();
        lista2.view.refresh();
        if (ente2 != null) {
            ResponsableStore = form2.down('combobox[name=nombre]').getStore();
            ResponsableStore.proxy.extraParams.ente = ente;
            ResponsableStore.load();
            // listaItem=lista.columns[3].initialConfig.editor.store;

            // listaItem.proxy.extraParams.nombre=form.down('combobox[name=ente]').getValue();
            // console.log( listaItem.proxy.extraParams.nombre);
            // listaItem.load();
        }
    },
    changeSeleccion: function (grupo, cmp) {
        form = this.getPanelTramite();
        var lista3 = this.getGridActividad();
        store1 = lista3.getStore();
        form.down('combobox[name=ente]').reset();
        form.down('combobox[name=nombre]').reset();
        if (cmp.seleccion == 'C') {
            store = form.down('combobox[name=ente]').getStore();
            form.down('fieldcontainer[name=fcLaboral]').setDisabled(false);
            // store.removeAll();
            store1.clearData();
            lista3.view.refresh();
            store.proxy.extraParams.id = 'C';
            //form.down("combobox[name=ente]").reset();
            store.load();
        } else if (cmp.seleccion == 'D') {
            store = form.down('combobox[name=ente]').getStore();
            form.down('fieldcontainer[name=fcLaboral]').setDisabled(false);
            // store.removeAll();
            store1.clearData();
            lista3.view.refresh();
            store.proxy.extraParams.id = 'D';
            //  form.down("combobox[name=ente]").reset();
            store.load();
        }
    },
    limpiar: function (a, e, eOpts) {
        me = this;
        var formulario = this.getPanelTramite();
        formulario.getForm().reset();
        grid9 = this.getRecaudosLista();
        gridStore9 = grid9.getStore();
        gridStore9.clearData();
        grid9.getView().refresh(true);
        grid10 = this.getGridActividad();
        gridStore10 = grid10.getStore();
        gridStore10.clearData();
        grid10.getView().refresh(true);
    },
    imprimirReporteEstatus: function () {
        window.open(BASE_URL + 'pdfs/reportepdf/reporteEstatusPdf');
    }
});
 