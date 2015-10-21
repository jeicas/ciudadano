Ext.define('MyApp.view.registrobasico.funcionario.CatalogoFuncionarioWindow', {
    extend  : 'Ext.window.Window',
    alias   : 'widget.windowCatalogoFuncionario',    
    itemId  : 'windowCatalogoFuncionario',
    modal   : true,
    width   : 600,
    x       : 50,
    y       : 50,
    heigth  : 500,
    title   : 'Catalogo de funcionarios registrados',
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
        //me.dockedItems = me.buildDockedItems();
        me.callParent(arguments);
    },
    buildItems : function(){
        return [{
            xtype       : 'gridpanel',
            store       : valor = Ext.create('MyApp.store.registrobasico.funcionario.FuncionarioStore'),
            align       : 'center',
            stripeRows  : true,
            name        : 'gridFuncionario',
            width       : '100%',
            heigth      : '100%',            
            plugins     : Ext.create('Ext.grid.plugin.CellEditing'),
            loadMask    : true,
            dockedItems : [Ext.create('Ext.toolbar.Paging', {
                dock:'bottom',
                store: valor, 
                displayInfo: true
            })],
            emptyText   : 'No hay datos para mostrar',
            columnLines : true,         
            columns: [{
                dataIndex   : 'cedulacompleta',
                text        : 'Cedula',
                width       : 150,
                items       : {
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
                                    property     : 'cedulacompleta',
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
                dataIndex   : 'nombrecompleto',
                text        : 'Nombre y Apellido',
                flex : 1,
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
                                    property     : 'nombrecompleto',
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
        }]
    }
});