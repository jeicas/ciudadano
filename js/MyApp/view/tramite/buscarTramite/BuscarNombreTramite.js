Ext.define('MyApp.view.tramite.buscarTramite.BuscarNombreTramite', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridBuscarNombreTramite',
    itemId: 'gridBuscarNombreTramite',
    requires: [
        'Ext.selection.CellModel',
        'Ext.selection.CheckboxModel',
    ],
    selType: 'cellmodel',
    plugins: [{
            ptype: 'cellediting',
            clicksToEdit: 1,
            pluginId: 'cellplugin'
        }],
    store: Ext.create('MyApp.store.tramite.TramiteStore'),
    emptyText: 'No hay datos registrados',
    selType: 'checkboxmodel',
            columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [{
                xtype: 'rownumberer',
                text: 'Nro.',
                width: 35
            }, {
                dataIndex: 'idtramite',
                flex: 0.2,
                text: 'ID',
                hidden: true,
                items: {
                    xtype: 'textfield',
                    flex: 1,
                    margin: 2,
                    enableKeyEvents: true,
                }
            }, {
                flex: 1,
                dataIndex: 'codigotr',
                text: 'Codigo',
                readOnly: true,
                filter: {type: 'string'},
               
            }, {
                text: 'Nombre',
                dataIndex: 'nombret',
                flex: 1,
                tdCls: 'x-change-cell',
                editor: {
                xtype: 'textfield',
                name : 'nombre',
                vtype: 'letra'
            }
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
                        name: 'agregarnombretramite',
                        text: 'Guardar',
                        iconCls: 'save'
                    }, {
                        xtype: 'button',
                        name: 'btnnuevotramite',
                        text: 'Agregar Tipo',
                        iconCls: 'addsolicitud'
                    }]
            }];
    }
});
