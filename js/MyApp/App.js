/*
SISTEMA DE ATENCION AL CIUDADANO - TRAMITES
ELABORADO POR ING. ORIANA FIGUEROA, ING. FREMBELING RAMOS, ING. CAROLKIS LINARES, ING. KARINA GERDEZ 
ABRIL 2015
*/
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../../js/ext/examples/ux');
Ext.application({
	name		: "MyApp",
	appFolder 	: BASE_PATH+"js/MyApp",
	controllers	: [
	    'MyApp.controller.Menu',	    
	    'MyApp.controller.login.Login'	   
	],
	requires:    [
		'MyApp.view.login.Login',
		'MyApp.controller.login.Login',
		'MyApp.vtypes.Validadores'
    ],
	launch		: function(){
		Ext.create('MyApp.vtypes.Validadores').init();
		var win = Ext.create("MyApp.view.Viewport")
	}
});
