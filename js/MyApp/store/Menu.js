Ext.define('MyApp.store.Menu', {
	extend: 'Ext.data.Store',
	requires: [
		'MyApp.model.menu.Root'
	],
	model: 'MyApp.model.menu.Root',
	proxy: {
		type: 'ajax',
		url: BASE_URL + 'menu/menus',
		reader: {
			type: 'json',
			root: 'items'
		},
		listeners: {
            exception: function(proxy, response, operation){
                /*Ext.MessageBox.show({
                    title: 'Sesión ha expirado',
                    msg: 'No ha habido actividad desde hace varios segundos; inicie sesión nuevamente',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });*/
                document.location= BASE_URL+'login/login/logout';
          	}   
      	}
	}	
});