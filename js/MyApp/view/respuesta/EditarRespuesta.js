Ext.define('MyApp.view.respuesta.EditarRespuesta', {
	extend: 'Ext.window.Window',
	alias: 'widget.editarRespuesta',
	itemId: 'editarRespuesta',
	height: 400,
	width: 650,
	modal:true,
	draggable:false,
	requires: ['MyApp.util.Util'],
	resizable:false,
	title:'Respuesta al requerimiento del ciudadano',

	initComponent: function() {
	    var me = this;
	    me.items = me.buildItem();
	    me.dockedItems = me.buildDockedItems();
	    me.callParent();
  	},
	buildItem : function(){
        return [{   
			xtype: 'form',
			bodyPadding: 5,
			layout: {
				type: 'vbox', 
				align: 'stretch'
			},
			items:[{
				xtype: 'fieldset',
				title: 'Datos del requerimiento',
				defaults: {					
					xtype: 'textfield',
				},
				items: [{					
			        hidden: true,
			        name: 'idTicket',
			    },{
		            fieldLabel: 'Solicitante',
			        labelWidth: 90,
			        width : 600,
			        name: 'solicitante',
			        height: 50,
			        readOnly: true
		        },{
			        xtype         : 'combobox',
			        width : 600,
			        name          :'tipoTicket',
			        labelWidth: 90,
			        fieldLabel    : 'Tipo',
			        store         : Ext.create('MyApp.store.ticket.TipoTicketStore'),
			        valueField    : 'id',
			        displayField  : 'nombre',
			        readOnly: true
			        
				},{
			        xtype         : 'combobox',
			        width : 600,
			        name          :'sectorTicket',
			        labelWidth: 90,
			        fieldLabel    : 'Sector',
			        store         : Ext.create('MyApp.store.registrobasico.sector.SectorStore'),
			        valueField    : 'id',
			        displayField  : 'nombre',
			        readOnly: true
			        
				}]	
			},{
				xtype: 'fieldset',
				flex: 2,
				title: 'Datos de la respuesta',
				layout: 'vbox',
				items: [{
			        xtype         : 'combobox',
			        width         : 400,
			        name          :'respuesta',
			        labelWidth    : 200,
			        fieldLabel    : 'Respuesta al requerimiento',
			        store         : Ext.create('MyApp.store.respuesta.RespuestaStore'),
			        valueField    : 'id',
			        displayField  : 'nombre',
			        allowBlank 	  : false,
			        forceSelection: true,
			        margins: '10 0 10 120',
				},{
		            xtype         : 'textareafield',
		            fieldLabel: 'Descripción de la respuesta',
			        labelWidth: 90,
			        width : 600,
			        name: 'descripcion',
			        height: 70			        
		        }]	
			}]
		}]
	},
	buildDockedItems : function(){
    	return [{
	        xtype: 'toolbar',
	        flex: 1,
	        dock: 'bottom',
	        ui: 'footer',
	        layout: {
	            pack: 'end',
	            type: 'hbox'
	        },
	        items: [{
                xtype       : 'button',                
                iconCls     : 'pdf32',
                iconAlign   : 'right',
                tooltip     : 'Requerimiento',
                scale       : 'large',
                name        : 'pdf'
            },{
	            xtype 	: 'button',	                     	
	           	name	: 'guardar',
	           	scale   : 'large',
	            iconCls : 'save-icon32',
	        }]
	    }]
	},
});