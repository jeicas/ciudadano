Ext.define('MyApp.store.Session', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.Session'  ],
    model: 'MyApp.model.Session' , // #2
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'Login/session',
        reader: { 
            type: 'json', 
            root: 'data'   
        } ,
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
             }   
        } 
    }
});

