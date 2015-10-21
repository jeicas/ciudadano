Ext.define('MyApp.store.session.Traersession', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.session.Traersession' 
    ],
    model: 'MyApp.model.session.Traersession', // #2
    proxy: { 
        type:'ajax', 
        url: BASE_URL + 'login/login/traersession',
        reader: { 
            type: 'json', 
            root: 'data'   
        }  
    }
});