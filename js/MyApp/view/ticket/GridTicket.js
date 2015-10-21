Ext.define('MyApp.view.ticket.GridTicket', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.gridTicket',
    itemId: 'gridTicket',
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
    title: 'Descripción de la petición',
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
            text: 'Tipo ayuda',
            autoScroll  : true,
            dataIndex: 'ayuda',
            flex: 1,            
            editor: {
                xtype       : 'combobox',
                name        : 'ayuda',
                store       : Ext.create('MyApp.store.registrobasico.sector.SectorTipoayudaStore'),
                displayField: 'ayuda',
                valueField  : 'idAyuda',
            },            
            /*renderer: function(val) { 
           
                
                //console.log(Ext.ComponentQuery.query('combobox[name=cayuda]').rawValue);            
               //return Ext.ComponentQuery.query('combo')[0].getStore().getById(val).data.ayuda;
            },
            //scope: this*/
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
            text: 'Cantidad',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'cantidad',
            flex: 0.3,
            editor: {
                xtype       :'numberfield',
                minValue    : 1,
                editable:false,
                //maxValue    : 20,
                name        : 'cantidad'
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