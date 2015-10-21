Ext.define('MyApp.view.tramite.RecaudosLista', { 
	extend: 'Ext.grid.Panel', 
	alias: 'widget.recaudosLista',
	 itemId: 'recaudosLista',
	requires: [
         'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
    ],
    bodyStyle: {
        background: '#F0F8FF',
         color: '#000',
    },
    selType: 'cellmodel',
    plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'cellplugin'
    }],
    title: 'Recaudos del Tramite',
	store: Ext.create('MyApp.store.tramite.TramiteRecaudos'),
    emptyText   : 'No hay datos registrados',
    columnLines: true,
    viewConfig: {
        getRowClass: function(record, index) {
            var c = record.get('estatus');
            if (c == 'Inactivo') {
                return 'price-fall';
            } else if (c == 'Activo') {
                return 'price-rise';
            }
        }
    },
	
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
			//flex: 0.2,
			text: 'Id',
			hidden:true,
			dataIndex: 'idrecaudo'
		},{ 
			dataIndex: 'nombrerecaudo',
			flex: 1,
			text: 'Nombre',
			editor: {
                xtype: 'textfield',
                name : 'nombrerecaudo'
            }
		},{ 
			flex: 0.5,
			dataIndex: 'requerido',
			text: 'Obligatorio',
			editor: new Ext.form.field.ComboBox({
	            name:'requerido',
	            store : Ext.create('MyApp.store.tramite.Requerido'),
	            triggerAction: 'all',
	            valueField: 'nombre',
	            forceSelection:true,
	            displayField: 'nombre',
	            queryMode: 'local',
        	})
		},{
			flex: 0.6,
			text: 'Estatus',
			dataIndex: 'estatusrecaudo',
			tdCls: 'x-change-cell',
			queryMode: 'local',
			editor: new Ext.form.field.ComboBox({
	            name:'estatusrecaudo',
	            store : Ext.create('MyApp.store.registrobasico.usuario.EstatusStore'),
	            triggerAction: 'all',
	            valueField: 'nombre',
	            forceSelection:true,
	            displayField: 'nombre',
	            queryMode: 'local',
        	})  
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
                name        : 'agregarrecaudos'
            }]
		}];
	}
}); 
