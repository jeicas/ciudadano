Ext.define('MyApp.model.store.auditoria.ObjetivoespecificoActividad', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'objetivo_especifico'},
    	{name: 'descripcion'},
        {name: 'descripcionOE'},
    	{name: 'acta'},
    	{name: 'cedula_analitica'},
    	{name: 'ninguno'},
    	{name: 'oficio_memo'},
    	{name: 'cedula_hallazgo'},
    	{name: 'otros'}
    ]    
});