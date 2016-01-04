Ext.define('MyApp.view.tramite.TicketRecaudosLista', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.recaudosTicketLista',
    itemId: 'recaudosTicketLista',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    bodyStyle: {
        background: '#F0F8FF',
        color: '#000',
    },
    selType: 'checkboxmodel',
    plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1,
            pluginId: 'cellplugin'
        }],
    title: 'Recaudos del Tramite',
    store: Ext.create('MyApp.store.solicitud.TicketRecaudosStore'),
    emptyText: 'No hay datos registrados',
    columnLines: true,
    viewConfig: {
        getRowClass: function (record, index) {
            var c = record.get('estatus');
            if (c == 'Inactivo') {
                return 'price-fall';
            } else if (c == 'Activo') {
                return 'price-rise';
            }
        }
    },
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [{
                xtype: 'rownumberer'
            }, {
                //flex: 0.2,
                text: 'Id',
                hidden: true,
                dataIndex: 'idrecaudo'
            }, {
                dataIndex: 'nombrerecaudo',
                flex: 1,
                text: 'Nombre',
            }, {
                flex: 0.5,
                dataIndex: 'requerido',
                text: 'Obligatorio',
            }, {
                flex: 0.6,
                text: 'Estatus',
                dataIndex: 'estatusrecaudo',
                tdCls: 'x-change-cell',
                queryMode: 'local',
            }]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: this.store,
                displayInfo: true,
                items: [{
                        xtype: 'button',
                        iconCls: 'save',
                        name: 'btnGuardar',
                        text: 'Guardar',
                        disabled: false,
                        scope: this,
                    }]
            }];
    }
});
