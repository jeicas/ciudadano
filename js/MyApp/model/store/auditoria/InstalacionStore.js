Ext.define('MyApp.model.store.auditoria.InstalacionStore', {
    extend: 'Ext.data.Model',
    fields: [    	
        {name: 'id',                type: 'string'},
        {name: 'si',                type: 'string'},
        {name: 'no',                type: 'string'},
		{name: 'idI',               type: 'string'},
		{name: 'idE',               type: 'string'},
    	{name: 'codigo',    		type: 'string'},
    	{name: 'ente',      		type: 'string'},
        {name: 'auditoria',         type: 'string'},
        {name: 'fechainstalacion',  type: 'string'}
    ]
});