Ext.define('MyApp.view.Viewport', {
	extend: 'Ext.container.Viewport',
	alias: 'widget.mainviewport',
	requires:[
		'MyApp.view.Header',
		'MyApp.view.menu.Accordion',
		'MyApp.view.menu.Mainpanel',
	],
	store: Ext.create('MyApp.store.session.Session'),
	layout: {type: 'border'  },
	initComponent : function(){
		var me = this;
		me.items = me.buildItem();
		me.callParent();
	},
	buildItem : function(){
		return [{
			xtype: 'mainmenu',
			width: '23%',
			collapsible: true,
			region: 'west',
			'text':'Base',
		},{
			xtype: 'appheader',
			//width: '10%', 
			height: '20%', 
			region: 'north'
		},{
			xtype: 'mainpanel',
			region: 'center',
			width: '100%',
			//bodyCls:'degradado',
			bodyStyle: "background­color:#999999;", 
		},{
			xtype: 'container',
			region: 'south',
			height: '2%',
			baseCls:'price',
			html: '<div id="titleHeader"><center><span style="font-size:10px;">Oficina de Informática - División de Desarrollo de Sistemas.</span></center></div>'
		}]
	}
});