Ext.define('MyApp.store.session.Session', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.session.Session'],
    model: 'MyApp.model.session.Session' , // #2
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'login/login/session',
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

