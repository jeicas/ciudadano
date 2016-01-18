Ext.define('MyApp.view.tramite.ListaSolicitudesRecaudos', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaSolicitudesRecaudos',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    actionColumns: false,
    viewConfig: {
           getRowClass: function (record, index) {
             if (record.get('estatus') === 'PENDIENTE') {
                return 'price-gol';
            } else if (record.get('estatus') === 'RECHAZADO') {
                return 'price-fall';
            } else if (record.get('estatus') === 'RECIBIDO') {
                return 'price-azul';
            } else if (record.get('estatus') === 'ELIMINADO') {
                return 'price-naranja';
            }
             else if (record.get('estatus') === 'COMPLETADO') {
                return 'price-rise';
            }
        }
    },
    emptyText: 'No hay datos registrados',
    store: Ext.create('MyApp.store.tramite.TramiteSolicitudes'),
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [{
                flex: 0.2,
                text: 'Id',
                hidden: true,
                dataIndex: 'idtramite'
            }, {
                xtype: 'rownumberer'
            },
            {
                flex: 0.5,
                text: 'Tipo de Ayuda',
                dataIndex: 'tipoayuda',
               
                queryMode: 'local',
                      items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'tipoayuda',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
                
            },
            {
                flex: 0.5,
                dataIndex: 'codigoticket',
                text: 'Codigo Ticket', 
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                    listeners: {
                        keyup: function () {
                            var store = this.up('grid').store;
                            store.clearFilter();
                            if (this.value) {
                                store.filter({
                                    property: 'codigoticket',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            }, {
                flex: 1.6,
                dataIndex: 'solicitud',
                text: 'Solicitud'
            },
            {
                flex: 0.3,
                text: 'Cantidad',
                dataIndex: 'cantidad',
                
                queryMode: 'local',
            },
            {
                flex: 1,
                text: 'Solicitante',
                dataIndex: 'solicitante',
                
                queryMode: 'local',
            }, {
                flex: 0.5,
                text: 'Estatus',
                dataIndex: 'estatus',
                tdCls: 'x-change-cell',
                queryMode: 'local',
            }, 
         {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                name: 'ver',
                menuDisabled: true,
                items: [{
                        tooltip: 'Registrar Recaudos',
                        icon: '../../imagen/btn/registro.png'

                    }]
            }]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'toolbar',
                dock: 'top',
                store: this.store,
                displayInfo: true,
                items: [{
                        xtype: 'combobox',
                        fieldLabel: 'Tramite',
                        name: 'nombretramite',
                        text: 'Tipo Tramite',
                        itemId: 'tipotramite',
                        width: '100%',
                        displayField: 'descripcion',
                        store: Ext.create('MyApp.store.tramite.Tramiteid'),
                        valueField: 'id',
                        queryMode: 'local',
                    }]
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
                displayInfo: true
            }];
    }
});