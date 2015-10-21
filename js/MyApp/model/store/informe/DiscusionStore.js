Ext.define('MyApp.model.store.informe.DiscusionStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'idID'},
    	{name: 'idIP'},
        {name: 'idD'},
    	{name: 'hallazgo', type: 'string'},
    	{name: 'manifiesto', type: 'string'}      
    ]
});