Ext.Loader.setConfig({
  enabled : true,
  paths : {
    MyApp : BASE_PATH+"js/MyApp" ,
  }
});
Ext.application({
  name    : "MyApp",
  appFolder   : BASE_PATH+"js/MyApp",
  controllers : [
    //'MyApp.controller.Menu',
    'MyApp.controller.login.Contrasena',
    'MyApp.controller.login.Login',
  ],
  requires:[
    'MyApp.view.login.Login',
    'MyApp.view.login.Contrasena',
    'MyApp.controller.login.Login',
    'MyApp.vtypes.Validadores'
  ]
});
Ext.onReady(function(){
  Ext.create('MyApp.vtypes.Validadores').init();
  var MyViewPrincipal = Ext.create("MyApp.view.login.Login");
  MyViewPrincipal.show();
});
