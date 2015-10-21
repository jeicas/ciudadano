Ext.define('MyApp.view.registrobasico.ente.DivisionesEnteWindow', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.windowDivisionesEnte',    
    itemId  : 'windowDivisionesEnte',
    modal   : true,
    width   : 600,
    heigth  : 500,
    title   : 'Divisiones del Ente',
    autoShow: true,
    layout:{
        type : 'vbox',
        align: 'center'
    },
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
        'Ext.toolbar.Paging',
        'Ext.ux.ajax.JsonSimlet',
    ], 

    initComponent: function(){
        var me   = this;
        me.items = me.buildItems();
        me.dockedItems = me.buildDockedItems();
        me.callParent(arguments);
    },
    buildItems : function(){
        return [{
            xtype       : 'gridpanel',
            store       :  valor = Ext.create('MyApp.store.registrobasico.ente.DivisionStore'),
            align       : 'center',
            name        : 'gridDivision',            
            width       : '100%',
            heigth      : '100%',
            autoScroll  : true,
            selModel    : {selType: 'cellmodel'},
            plugins     : [Ext.create('Ext.grid.plugin.CellEditing',{pluginId: 'rowediting',clicksToEdit: 1})],
            emptyText   : 'No hay datos registrados',
            dockedItems : [Ext.create('Ext.toolbar.Paging', {
                dock:'bottom',
                store: valor, 
                displayInfo: true,
            })],
            columns: [{
                xtype: 'rownumberer'
            },{
                dataIndex   : 'id',
                hidden      : true
            },{
                dataIndex   : 'id1',
                hidden      : true
            },{
                dataIndex   : 'ente',
                hidden      : true
            },{
                text        : 'Nombre de la división',
                sortable    : true,
                flex        : 1,
                autoScroll  : true,
                dataIndex   : 'nombre',
                renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
                editor:{
                    xtype       :'textareafield',
                    allowBlank  : false,
                    height      : 80,
                    autoScroll  : true
                }
            },{
                xtype       : 'actioncolumn',
                width       : 30,
                sortable    : false,
                menuDisabled: true,
                name        : 'eliminarDivision',
                items: [{
                    iconCls : 'eliminar',
                    tooltip : 'Eliminar división',
                    scope   : this
                }]
            }]
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype   : 'toolbar',
            dock    : 'bottom',
            baseCls :'price',
            height  : 40,
            items:[{
                xtype : 'tbfill'
            },{
                xtype       : 'button',
                width       :  40,
                iconCls     : 'agregar',
                margins     : '0 0 0 30',
                iconAlign   : 'right',
                tooltip     : 'Agregar División',
                scale       : 'large',
                name        : 'agregarDivision'
            },{
                xtype       : 'button',
                width       : 45,
                iconCls     :'save-icon32',
                tooltip     : 'Guardar',
                name        :'guardar',
                scale       : 'large'
            }]
        }]
    }
});