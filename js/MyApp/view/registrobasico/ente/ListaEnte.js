Ext.define('MyApp.view.regiatrobasico.ente.ListaEnte', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.panelListaEnte',
    itemId: 'panelListaEnte',
    requires: [
        'Ext.selection.CellModel',
        'Ext.ux.grid.FiltersFeature',
        'Ext.grid.column.Action',
        'Ext.grid.column.Column'
    ],
    features : [{
        ftype: 'filters',
        local: true
    },{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl:'<font size=3>Tipo Admón: <font size=3>{name}{[values.name=="C" ? "entralizado" : "escentralizado"]}</font> ({rows.length} Ente{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }], 
    viewConfig: {},
    autoScroll  : true,
    title       : 'Lista de Entes Públicos',
    store       : Ext.create('MyApp.store.registrobasico.ente.EnteGridStore'),
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
            dataIndex   : 'id',
            hidden      : true
        },{
            flex        : 1,
            dataIndex   : 'nombre',
            text        : 'Ente Público',
            renderer    : function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},            
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
                                property     : 'nombre',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                }
            }
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype:'pagingtoolbar',
            dock:'bottom',
            store:this.store
        }];
    }
});