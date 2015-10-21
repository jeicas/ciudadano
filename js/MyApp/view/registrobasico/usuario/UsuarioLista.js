Ext.define('MyApp.view.registrobasico.usuario.UsuarioLista', {
   extend: 'Ext.tab.Panel',
   alias: 'widget.usuarioLista',
   activeTab: 0,
   requires:[
        'Ext.form.*',
        'Ext.tip.QuickTipManager',
        'Ext.util.*',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
        'Ext.toolbar.Paging',
        'Ext.ux.ajax.JsonSimlet',
    ],
    layout:'hbox',

    initComponent: function() {
        var me   = this;
        me.items = me.buildItems();
        me.callParent();
    },
    buildItems : function(){
        return [{
            xtype       : 'gridpanel',
            title       : 'Lista de Usuarios',
            name        : 'gridUsuario',
            autoScroll  : true,            
            store       : valor = Ext.create('MyApp.store.registrobasico.usuario.UsuarioStore'),
            width       : 350,
            height      : '100%',
            plugins     : Ext.create('Ext.grid.plugin.CellEditing'),
            loadMask    : true,
            dockedItems : [Ext.create('Ext.toolbar.Paging', {
                dock:'bottom',
                store: valor
            })],            
            features    : [{
                ftype: 'filters',
                local: true
            },{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl:'<font size=2>{name}</font>',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
            emptyText   : 'No hay datos para mostrar',
            columnLines : true,         
            columns: [{
                dataIndex   : 'usuario',
                flex        : 1,
                text        : 'Usuario',
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
                                    property     : 'usuario',
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
                flex        : 1,
                text        : 'Nombre completo',
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
        },{
            xtype       : 'gridpanel',
            store       : valor = Ext.create('MyApp.store.registrobasico.funcionario.FuncionariosStore'),
            align       : 'center',
            title       : 'Lista de Funcionarios sin usuario',
            stripeRows  : true,
            name        : 'gridFuncionario',
            width       : '100%',
            heigth      : '100%',            
            plugins     : Ext.create('Ext.grid.plugin.CellEditing'),
            loadMask    : true,
            dockedItems : [Ext.create('Ext.toolbar.Paging', {
                dock:'bottom',
                store: valor
            })],            
            features    : [{
                ftype: 'filters',
                local: true
            },{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl:'<font size=2><font size=2>{name}</font>',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
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