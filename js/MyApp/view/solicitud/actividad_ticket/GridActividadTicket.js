Ext.define('MyApp.view.solicitud.actividad_ticket.GridActividadTicket', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.gridActividadTicket',
    itemId: 'gridActividadTicket',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    selModel    : {selType: 'cellmodel'},
    store:Ext.create('MyApp.store.solicitud.TicketActividadStore'),
    emptyText   : 'No hay datos registrados',
    columnLines: true,
    title: 'Descripción de la petición',
    initComponent : function(){
        var me = this;
        me.columns= me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    }, 
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
             else if (record.get('estatus') === 'APROBADO') {
                return 'price-rise';
            }
             else if (record.get('estatus') === 'EN ESPERA') {
                return 'price-';
            }
        }
    },
    buildColumns: function(){
        return [{
            xtype: 'rownumberer'
        },{
            text: 'Procedimiento',
            autoScroll  : true,
            dataIndex: 'actividad',
            flex: 1,            
            editor: {
                xtype: 'textfield',
                name : 'actividad'
            }            
           
        },{
            text: 'Estado',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'estatus',
            flex: 0.5,
            editor: {
                xtype: 'textfield',
                name : 'estatus'
            }
        },{
            text: 'Encargado',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'encargado',
            flex: 1,
            editor: {
                xtype: 'textfield',
                name : 'encargado'
            }
        },{
            text: 'Observación al Funcionario',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'observacionfuncionario',
            flex: 1,
            editor: {
                xtype       :'textfield',
                minValue    : 1,
                editable:false,
                //maxValue    : 20,
                name        : 'observacionfuncionario'
            }
        },
        {
            text: 'Respuesta Funcionario',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'respuestafuncionario',
            flex: 1,
            editor: {
                xtype       :'textfield',
                minValue    : 1,
                editable:false,
                //maxValue    : 20,
                name        : 'respuestafuncionario'
            }
        },{
            xtype       : 'actioncolumn',
            width       : 30,
            sortable    : false,
            menuDisabled: true,
            name        : 'mensaje',
            items: [{
                iconCls : 'icon-mensaje',
                tooltip : 'Enviar Observacion al Funcionario',
                scope   : this
            }]
        }]
    },
    buildDockedItems : function(){
        return [{
                xtype: 'pagingtoolbar',
                dock: 'top',
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