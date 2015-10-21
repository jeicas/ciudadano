Ext.define('MyApp.model.menu.Item', {
extend: 'Ext.data.Model',
	uses: [
	 'MyApp.model.menu.Root'
	],
	idProperty: 'id',
	fields: [{
		name: 'text'
	},{
		name: 'iconCls'
	},{
		name: 'className'
	},{
		name: 'id'
	},{
		name: 'user'
	},{
		name: 'parent_id'
	},{
		name: 'controller'
	}],
	belongsTo: {
		model: 'MyApp.model.menu.Root',
		foreignKey: 'parent_id'
	}
});