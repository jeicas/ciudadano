Ext.define('MyApp.view.tramite.ventanasagregar.Gridbuscartipotramite', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.gridbuscartipotramiet',
	itemId: 'gridbuscartipotramiet',
	requires: [
        'Ext.selection.CellModel', 
        'Ext.selection.CheckboxModel',    
    ],
    selType: 'cellmodel',
     plugins: [{
        ptype: 'cellediting',
        clicksToEdit: 1,
        pluginId: 'cellplugin'
    }],
	store: Ext.create('MyApp.store.tramite.Tramite'),
    //selType: 'checkboxmodel',
	columnLines: true,
	initComponent : function(){
	    var me = this;
	    me.columns= me.buildColumns();
	    me.dockedItems = me.buildDockedItems();
	    me.callParent();
	 },
	buildColumns: function(){
	return [{
            xtype:'rownumberer',
            text:'Nro.',
            width:35
        },{ 
            dataIndex: 'id',
            flex: 0.2,
            text: 'ID',
            hidden: true,
            items    : {
                xtype: 'textfield',
                flex : 1,
                margin: 2,
                enableKeyEvents: true,
            }
        },{
			flex: 1,
			dataIndex: 'nombre',
			text: 'Nombres',
			filter: {type: 'string'},
	        editor: {
	        	xtype: 'textfield',
	            allowBlank: false,
	            id: 'nombre',
	        }
		},{
            xtype: 'actioncolumn',
            width: 80,
            text:'Eliminar',
            //id:'deletipoc',
            aling:'center',
            sortable: false,
            menuDisabled: true,
            items: [{
                iconCls: 'delet',
                tooltip: 'Eliminar',
                scope: this,
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
				xtype: 'button',
				name      :'agregartipoc',
				text    : 'Guardar',
				iconCls:'save'
			},{ 
                xtype: 'button',
                name      :'btnnuevotipo',
                text    : 'Agregar Tipo',
                iconCls:'addsolicitud'
            },{
                text: 'Cancelar Cambios',
                margins:'0 30 0 0',
                tooltip: 'Cancelar',
                name: 'btncancelartipo',
                iconCls: 'pencil_delete'
            }]
		}];
	}
});
