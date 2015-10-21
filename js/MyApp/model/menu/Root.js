Ext.define('MyApp.model.menu.Root', {
extend: 'Ext.data.Model',
uses: [
		'MyApp.model.menu.Item'
	],
idProperty: 'id',
	fields: [
		{
			name: 'text'
		},
		{
			name: 'iconCls'
		},
		{
			name: 'id'
		},
		{
			name: 'controller'
		},
		{
			name: 'user'
		}
	],
	hasMany: {
		model: 'MyApp.model.menu.Item',
		foreignKey: 'parent_id',
		name: 'items'
	}
});