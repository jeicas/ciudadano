Ext.define('MyApp.controller.tramite.solicitud.TramiteSolicitudController', {
    extend: 'Ext.app.Controller',
    views: [
        'solicitud.AtenderPeticionPanel',
        'solicitud.ListaPeticion',
        /*'solicitud.actividad_ticket.WinActividadTicket',
        'solicitud.actividad_ticket.GridActividadTicket',*/
    ],
    refs: [
        {
                ref: 'WinActividadTicket',
                selector: 'winActividadTicket'
                },
    ],
    init: function (application) {
        this.control({
            'listaPeticion actioncolumn[name=ver]': {
                click: this.verSeleccionado
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
         win.down('textfield[name=cantidad]').setValue(rec.get('cantidad'));
         win.down('textfield[name=solicitud]').setValue(rec.get('solicitud'));
         
          storeProcedimiento=win.down('gridActividadTicket').getStore();
          storeProcedimiento.clearData();
          storeProcedimiento.proxy.extraParams.ticket=rec.get('idTicket');
          storeProcedimiento.load();  
          win.show();
    },
});
 