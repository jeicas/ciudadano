Ext.define('MyApp.model.store.auditoria.CredencialStore', {
    extend: 'Ext.data.Model',
    fields: [    	
        {name: 'id',                type: 'string'},
        {name: 'idE',               type: 'string'},
    	{name: 'codigo',    		type: 'string'},
    	{name: 'ente',      		type: 'string'},
        {name: 'auditoria',         type: 'string'},
        {name: 'fechacredencial',   type: 'string'}
    ]
});