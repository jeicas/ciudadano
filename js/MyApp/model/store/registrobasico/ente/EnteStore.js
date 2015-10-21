Ext.define('MyApp.model.store.registrobasico.ente.EnteStore', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'    },
    	{name: 'nombre'},
    	{name: 'tipo'  },
        {name: 'parroquia'},
        {name: 'direccion'}
    ]
});