Ext.define('MyApp.model.store.informe.PreliminarStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'idIP',        		type: 'int'},
        {name: 'idA',               type: 'int'},
    	{name: 'codigo',    		type: 'string'},
    	{name: 'nombreE',      		type: 'string'},
    	{name: 'nombreT',      		type: 'string'},
        {name: 'nombre',            type: 'string'},
        {name: 'estado',            type: 'string'},
        {name: 'tipo',              type: 'string'},
    	{name: 'fecha',      		type: 'string'},
        {name: 'fechaB',            type: 'string'}        
    ]
});