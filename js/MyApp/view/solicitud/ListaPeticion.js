Ext.define('MyApp.view.solicitud.ListaPeticion', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.listaPeticion',
    itemId: 'listaPeticion',
    requires: [
        'Ext.selection.CellModel',        
        'Ext.grid.column.Action',
        'Ext.grid.column.Column'
    ],
    viewConfig: {
        getRowClass: function(record, index) {
            if(record.get('estatusTicket')==='PENDIENTE'){
                return 'price-gol';
            }else if(record.get('estatusTicket')==='RECHAZADO'){
                return 'price-fall';
            }else if(record.get('estatusTicket')==='RECIBIDO'){
                return 'price-rise';
            }else if(record.get('estatusTicket')==='ELIMINADO'){
                return 'price-naranja';
            }
        }
    },
    store       : Ext.create('MyApp.store.solicitud.TicketStore'),
    emptyText   : 'No hay datos registrados',
    columnLines: true,
    initComponent : function(){
        var me = this;
        me.columns= me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
     
    buildColumns: function(){
        return [{
            dataIndex   : 'idTicket',
            hidden : true
        },{
          xtype: 'rownumberer'
        },{
            dataIndex   : 'fechaRegistro',
            text        : 'Registrado',
            width       : 100,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'fechaRegistro',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }               
        },{
            dataIndex   : 'codigoTicket',
            text        : 'Nº Ticket',
            width       : 100,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'codigoTicket',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }               
        },{
            dataIndex   : 'tipoTicket',
            text        : 'Tipo de Ticket',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex        : 0.7,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'tipoTicket',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },{
            dataIndex   : 'sector',
            text        : 'Sector',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex        : 0.7,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'tipoTicket',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        }, {
            dataIndex   : 'tipoayuda',
            text        : 'Tipo de Ayuda',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex        : 0.7,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'tipoTicket',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },{
            dataIndex   : 'solicitante',
            text        : 'Solicitante',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex        : 1,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'solicitante',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },{
            dataIndex   : 'solicitud',
            text        : 'Descripción',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex        : 0.7,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'descripcion',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },{
            dataIndex   : 'cantidad',
            text        : 'Cantidad',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex        : 0.7,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'descripcion',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },{            
            dataIndex: 'estatusTicket',
            text: 'Estatus',
            tdCls: 'x-change-cell',
            flex: 0.6,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'estatusTicket',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },/*{            
            dataIndex: 'atendido',
            text: 'Atendido',
            tdCls: 'x-change-cell',
            flex: 0.8,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        var store = this.up('grid').store;
                        store.clearFilter();
                        if (this.value) {
                            store.filter({
                                property     : 'atendido',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        },{
            xtype: 'actioncolumn',
            width       : 30,
            sortable: false,
            name: 'pdf',
            menuDisabled: true,
            items: [{
                tooltip: 'Pdf',
                icon: '../../imagen/pdf32.png', 
                handler: function(grid, rowIndex, colIndex) {
                    var ticket = grid.getStore().getAt(rowIndex);
                    window.open(BASE_URL+'pdfs/ticketpdf/ticketPdf?ticket='+ticket.get('idTicket'));
                }
            }]
        }*/]
    },
    buildDockedItems : function(){
        return [{
            xtype:'pagingtoolbar',
            dock:'bottom',
            store:this.store,
            displayInfo:true,
            items: [{
                xtype       : 'button',
                iconCls     : 'pdf32',
                name        : 'imprimir',
                text        : 'Imprimir',
                iconAlign   : 'right',
                hidden:true,
                tooltip     : 'Imprimir',
                margins     : '0 0 0 70',
                scale       : 'large'
            }]
        }];
    }
});