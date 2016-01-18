Ext.define('MyApp.controller.tramite.ActividadController', {
    extend: 'Ext.app.Controller',
    views: [
        'tramite.ListaActividad',
        'tramite.ListaSolicitudesRecaudos',
        'tramite.ActividadPanel',
        'tramite.WinRecaudosTicket',
    ],
    refs: [{
            ref: 'ActividadPanel',
            selector: 'panelActividad'
        }, {
            ref: 'Listactividad',
            selector: 'listaActividad'
        }, {
            ref: 'ListaSolicitudesRecaudos',
            selector: 'listaSolicitudesRecaudos'
        }, {
            ref: 'WinRecaudosTicket',
            selector: 'winRecaudosTicket'
        }, {
            ref: 'RecaudosTicketLista',
            selector: 'recaudosTicketLista'
        }, ],
    init: function (application) {
        this.control({
            'panelActividad combobox[name=nombretramite]': {
                select: this.buscarEstatus
            },
            'listaSolicitudesRecaudos combobox[name=nombretramite]': {
                select: this.buscarEstatus
            },
            'listaSolicitudesRecaudos actioncolumn[name=ver]': {
                click: this.buscarRecaudosTicket
            },
            'recaudosTicketLista button[name=btnGuardar]': {
                click: this.guardarRecaudosTicket
            },
            /* 'recaudosTicketLista':{
                render:this.renderRecaudos
              },*/
        });
    },
    renderRecaudos: function () { 
            this.buscarRecaudosTicket();
    },
    buscarEstatus: function () {
        // formPanel = this.getListaSolicitudesRecaudos();
        grid = this.getListaSolicitudesRecaudos();
        tramite = grid.down("combobox[name=nombretramite]").getValue();
        store = grid.getStore();
        store.clearData();
        store.proxy.extraParams.tramite = tramite;
        grid.getView().refresh(true);
        store.load();
    },
    buscarRecaudosTicket: function (grid, record, rowIndex) {

        store = grid.getStore();
        rec = store.getAt(rowIndex);

        win = Ext.create('MyApp.view.tramite.WinRecaudosTicket');
        win.down('textfield[name=idticket]').setValue(rec.get('idticket'));
        win.down('textfield[name=codigoTicket]').setValue(rec.get('codigoticket'));
        win.down('textfield[name=solicitante]').setValue(rec.get('solicitante'));

        storeRecuados = win.down('recaudosTicketLista').getStore();
        storeRecuados.clearData();
        storeRecuados.proxy.extraParams.ticket = rec.get('idticket');
        storeRecuados.load();
        grid = win.down('recaudosTicketLista');

        modified = grid.getSelectionModel().getSelection();
        grid.getStore().remove(modified);
        grid.getStore().load();
        grid.getView().refresh(true);

        gridStore = grid.getStore();
        gridStore.load(function (records, operation, success) {
            gridStore.each(function (record) {
               if (record.data.estatusrecaudo=='ENTREGADO'){
                   grid.getSelectionModel().select(this, true);   
               }       
                
            })
        });
        win.show();
    },
    guardarRecaudosTicket: function () {
        grid = this.getRecaudosTicketLista(),
        modified = grid.getSelectionModel().getSelection();
        win = this.getWinRecaudosTicket();
        var arregloGrid = [];
        Ext.each(modified, function (record) {
            arregloGrid.push(Ext.apply(record.data));
        });
        arregloItems = Ext.encode(arregloGrid);
        store = grid.getStore();
        ticket = store.data.items[0].data['idticket'];

        Ext.Ajax.request({//AQUI ENVIO LA DATA 
            url: BASE_URL + 'ticket/solicitud/guardarRecuadosTicket',
            method: 'POST',
            params: {
                recordsGrid: arregloItems,
                ticket: ticket,
            },
            success: function (result, request) {
                result = Ext.JSON.decode(result.responseText);
                if (result.success) {
                    Ext.MessageBox.show({title: 'Alerta', msg: result.msg, buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.WARNING});
                    grid.getStore().load();
                    win.close();
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
});
 