Ext.define('MyApp.view.solicitud.ListaPeticionEncargado', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.listaPeticionEncargado',
    itemId: 'listaPeticionEncargado',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.column.Action',
        'Ext.grid.column.Column'
    ],
    viewConfig: {
        getRowClass: function (record, index) {
            if (record.get('estatusTicket') === 'PENDIENTE') {
                return 'price-gol';
            } else if (record.get('estatusTicket') === 'RECHAZADO') {
                return 'price-fall';
            } else if (record.get('estatusTicket') === 'RECIBIDO') {
                return 'price-rise';
            } else if (record.get('estatusTicket') === 'ELIMINADO') {
                return 'price-naranja';
            }
        }
    },
    store: Ext.create('MyApp.store.solicitud.TicketEncargadoStore'),
    emptyText: 'No hay datos registrados',
    columnLines: true,
    initComponent: function () {
        var me = this;
        me.columns = me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildColumns: function () {
        return [{
                dataIndex: 'idTicket',
                hidden: true
            },{
                dataIndex: 'idTipoAyuda',
                hidden: true
            },{
                dataIndex: 'idSector',
                hidden: true
            },{
                dataIndex: 'idEncargado',
                hidden: true
            }, 
            {
                dataIndex: 'idActividad',
                hidden: true
            },{
                xtype: 'rownumberer'
            }, {
                dataIndex: 'fechaRegistro',
                text: 'Registrado',
                width: 100,
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
                                    property: 'fechaRegistro',
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
                dataIndex: 'codigoTicket',
                text: 'Nº Ticket',
                width: 100,
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
                                    property: 'codigoTicket',
                                    value: this.value,
                                    anyMatch: true,
                                    caseSensitive: false
                                });
                            }
                        },
                        buffer: 500
                    }
                }
            },  {
                dataIndex: 'sector',
                text: 'Sector',
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
                flex: 0.7,
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
                                    property: 'tipoTicket',
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
                dataIndex: 'tipoayuda',
                text: 'Tipo de Ayuda',
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
                flex: 0.7,
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
                                    property: 'tipoTicket',
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
                dataIndex: 'solicitante',
                text: 'Solicitante',
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
                flex: 1,
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
                                    property: 'solicitante',
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
                dataIndex: 'peticion',
                text: 'Descripción',
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
                flex: 0.7,
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
                                    property: 'peticion',
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
                dataIndex: 'cantidad',
                text: 'Cantidad',
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
                flex: 0.7,
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
                                    property: 'cantidad',
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
                dataIndex: 'estatus',
                text: 'Estatus',
                tdCls: 'x-change-cell',
                flex: 0.6,
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
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
                                    property: 'estatus',
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
                dataIndex: 'observacionFuncionario',
                text: 'Observaciones del Funcionario',
                tdCls: 'x-change-cell',
                flex: 0.6,
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
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
                                    property: 'observacionFuncionario',
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
                dataIndex: 'respuesta',
                text: 'Respuesta',
                tdCls: 'x-change-cell',
                flex: 0.6,
                renderer: function (v) {
                    return ('<SPAN class="ajustar-texto-grid">' + v + '</SPAN>')
                },
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
                                    property: 'respuesta',
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
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                name: 'recibir',
                menuDisabled: true,
                items: [{
                        tooltip: 'Atender la Peticion',
                        icon: '../../imagen/pdf32.png'

                    }]
            }, 
        {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                name: 'aprobar',
                menuDisabled: true,
                items: [{
                        tooltip: 'Aprobar Peticion',
                        icon: '../../imagen/pdf32.png'

                    }]
            }, 
        {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                name: 'mensaje',
                menuDisabled: true,
                items: [{
                        tooltip: 'Enviar Mensaje',
                        icon: '../../imagen/pdf32.png'

                    }]
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
                        iconCls: 'pdf32',
                        name: 'imprimir',
                        text: 'Imprimir',
                        iconAlign: 'right',
                        hidden: true,
                        tooltip: 'Imprimir',
                        margins: '0 0 0 70',
                        scale: 'large'
                    }]
            }];
    }
});