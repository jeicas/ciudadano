Ext.define('MyApp.view.tramite.GridActividad', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.gridActividad',
     requires: [
        'Ext.selection.CellModel',
         'Ext.selection.CheckboxModel', 
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    selType: 'checkboxmodel',
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'rowediting'
    }],
    store:Ext.create('MyApp.store.tramite.TramiteActividades'),
    emptyText   : 'No hay datos registrados',
    columnLines: true,
    title: 'Procedimientos del Tramite',
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
            text: 'Descripción',            
            autoScroll  : true,
            name: 'desc',
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'descripcion',
            flex: 1,
            editor: {
                xtype: 'textfield',
                name : 'descripcion'
            }
        },{
            text: 'Unidad Responsable',            
            autoScroll  : true,
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'unidad',
            flex: 1,
            editor: {
                xtype: 'textfield',
                name : 'cmbdivision'
            }
        },{
            text:'Responsable',
            dataIndex:'funcionario',
            name:'nombrer',
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex:1,
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
                                property     : 'nombrer',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                },
            },
            editor: new Ext.form.field.ComboBox({
            id:'nombre',
           name:'nombrer',
            store : Ext.create('MyApp.store.tramite.TramiteResponsable'),
            triggerAction: 'all',
            valueField: 'nombre',
            forceSelection:true,
            displayField: 'nombre',
            queryMode: 'local',
        })},{
            text:'Estatus',
            dataIndex:'estatus',
            name:'cmbestatus',
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex:1,
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
                                property     : 'cmbestatus',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                },
            },
            editor: new Ext.form.field.ComboBox({
            id:'cmbestatus',
            name:'cmbestatus1',
            store : Ext.create('MyApp.store.tramite.EstadoTramite'),
            triggerAction: 'all',
            valueField: 'nombre',
            forceSelection:true,
            displayField: 'nombre',
            queryMode: 'local',
        })},
    {
            text:' Dependencia Procedimiento',
            dataIndex:'cmbprocedimiento',
            name:'cmbprocedimiento',
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            flex:1,
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
                                property     : 'procedimiento',
                                value         : this.value,
                                anyMatch      : true,
                                caseSensitive : false
                            });
                        }
                    },
                    buffer: 500
                },
            },
            editor: new Ext.form.field.ComboBox({
            
             name:'cmbprocedimiento1',
            store : Ext.create('MyApp.store.tramite.Actividades'),
            triggerAction: 'all',
            valueField: 'descripcion',
            forceSelection:true,
            displayField: 'descripcion',
            queryMode: 'local',
        })},
            
            
            
            
            {
            text: 'Lapso(dias)',            
            autoScroll  : true,
            name:'lapso',
            renderer: function(v){ return ('<SPAN class="ajustar-texto-grid">'+v+'</SPAN>')},
            dataIndex: 'tiempo',
            flex: 0.3,
            editor: {
                xtype       :'numberfield',
                minValue    : 1,
                //maxValue    : 20,
                name        : 'lapso'
            }
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