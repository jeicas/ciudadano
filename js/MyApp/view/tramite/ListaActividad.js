Ext.define('MyApp.view.tramite.ListaActividad', {
    extend: 'Ext.grid.Panel', 
    alias: 'widget.listaActividad',
    requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    actionColumns:false,
    viewConfig: {
        getRowClass: function(record, index) {
            var c = record.get('estatusrecaudo');
            if (c == 'INACTIVO') {
                return 'price-fall';
            } else if (c == 'ACTIVO') {
                return 'price-rise';
            }
        }
    },
     emptyText   : 'No hay datos registrados',
    store: Ext.create('MyApp.store.tramite.RecaudosStore'),
    initComponent : function(){
        var me = this;
        me.columns= me.buildColumns();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
     },
    buildColumns: function(){
        return [{
            flex: 0.2,
            text: 'Id',
            hidden:true,
            dataIndex: 'idrecaudo'
        },{ 
            flex: 2,
            dataIndex: 'nombrerecaudo',
            text: 'Nombre'
        },{ 
            flex: 0.6,
            dataIndex: 'requerido',
            text: 'Obligatorio'
        },{
            flex: 0.6,
            text: 'Estatus',
            dataIndex: 'estatusrecaudo',
            tdCls: 'x-change-cell',
            queryMode: 'local',       
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype:'pagingtoolbar',
            dock:'bottom',
            store:this.store,
            displayInfo:true
        }];
    }
});