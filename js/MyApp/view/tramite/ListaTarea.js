Ext.define('MyApp.view.tramite.ListaTarea', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.listaTarea',
    itemId: 'listaTarea',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    selModel    : {selType: 'cellmodel'},
    plugins     : [Ext.create('Ext.grid.plugin.CellEditing',{pluginId: 'rowediting',clicksToEdit: 1})],
    store:Ext.create('MyApp.store.ticket.TicketayudaStore'),
    emptyText   : 'No hay datos registrados',
    columnLines: true,
    title: 'Tarea(s) de la  actividad',
    initComponent : function(){
        var me = this;
        me.columns= me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },     
    buildColumns: function(){
        return [{
            xtype: 'rownumberer'
        },{
            text: 'Titulo',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'titulo',
            flex: 1,
            editor: {
                xtype: 'textfield',
                name : 'titulo'
            }
        },{
            text: 'Descripción',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'descripcion',
            flex: 1,
            editor: {
                xtype: 'textfield',
                name : 'descripcion'
            }
        },{
            xtype       : 'actioncolumn',
            width       : 30,
            sortable    : false,
            menuDisabled: true,
            name        : 'eliminar',
            items: [{
                iconCls : 'eliminar',
                tooltip : 'Eliminar item',
                scope   : this
            }]
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype:'pagingtoolbar',
            dock:'bottom',
            store:this.store,
            displayInfo:true,
            items: [{
                xtype       : 'button',
                width       :  40,
                iconCls     : 'agregar',
                margins     : '0 0 0 30',
                iconAlign   : 'right',
                tooltip     : 'Agregar item',
                scale       : 'large',
                name        : 'agregar'
            }]
        }];
    }
});