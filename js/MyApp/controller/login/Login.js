Ext.define('MyApp.controller.login.Login', { // #1 
  extend: 'Ext.app.Controller',      // #2
  views: [
    'registrobasico.usuario.Contrasena',
    'login.Login',
    'autenticar.Capslocktooltip'
  ] ,
  requires: [
    'MyApp.util.Util' ,
    'MyApp.util.Md5',
    'MyApp.util.ReCaptcha'
  ],
  refs: [{
    ref: 'login',
    selector: '#loginWindow #loginForm'
  },{
    ref: 'mainPanel',
    selector: 'mainpanel'
  },{
      ref: 'capslockTooltip',
      selector: 'capslocktooltip'
  },{
    ref: 'contrasenaForm',
    selector: '#contrasenawindow #contrasenaform'
  },{
    ref: 'appheader',
    selector: '#appheader'
  }],
    
  init: function(application) { 
    this.control({
      "login form textfield": {
        specialkey: this.onTextfieldSpecialKey
      },
      "login form button#submit":{
        click: this.onButtonClickSubmit1
      },
      "login form button#registrate":{
        click: this.onButtonClickSubmit2
      },   
      "login form button#cancel":{
        click: this.onButtonClickCancel
      },
      "login form textfield[name=password]":{
        keypress: this.onTextfieldKeyPress
      },
      "appheader button#logout": {  
        click: this.onButtonClickLogout
      },
      "appheader button#perfil":{  
        click: this.onButtonClickPerfil
      },
      "#contrasenaform  textfield": {
        change: this.onActivarBoton
      }, 
      "#contrasenawindow toolbar button[name=guardarClave]":  {       // #1  
        click: this.onButtonClickSubmit // #2 
      },
      "login form button#contrasena":{
        click: this.onButtonClickContrasena
      }  
    }); 
  },
  onTextfieldSpecialKey: function(field, e, options) {
    if (e.getKey() == e.ENTER){
      var submitBtn = field.up('form').down('button#submit');
      submitBtn.fireEvent('click', submitBtn, e, options);
    }
  },
  onButtonClickSubmit1: function(button, e, options){ 
    var formPanel = button.up('form'), 
    login = button.up('login'),  
    url= BASE_URL + 'login/login/auth' 
    user = formPanel.down('textfield[name=user]').getValue();
    pass = formPanel.down('textfield[name=password]').getValue();         // #5
    if (formPanel.getForm().isValid()) { 
      pass = MyApp.util.Md5.encode(pass);
      Ext.get(login.getEl()).mask("Autentificando... Por favor espere...",'loading');
      Ext.Ajax.request({ 
        url: BASE_URL + 'login/login/auth',
        method:'POST',
        params: { 
          user: user,
          pass: pass
        } ,
        failure: function(conn, response, options, eOpts) {
          Ext.get(login.getEl()).unmask();
          Ext.Msg.show({
            title:'Fallo!',
            msg: result.msg, 
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
      },
        success: function(conn, response, options, eOpts) {
          Ext.get(login.getEl()).unmask();
          var result = Ext.JSON.decode(conn.responseText, true); 
          if (result.success) { 
            login.close();
            document.location = BASE_URL+'app/home';
          }else {
            Ext.Msg.show({
              title:'Fallo!',
              msg: result.msg, 
               icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          }
        },
      });
    }
  },
  onButtonClickSubmit2: function(button, e, options){
    var formPanel = button.up('form'); 
    login = button.up('login');
    login.close();        
    this.getController('ticket.TicketSolicitanteController');
    Ext.widget('panelTicketSolicitante');
  },
  onButtonClickCancel: function(button, e, options){ 
    button.up('form').getForm().reset();
  },
  onButtonClickLogout: function(button, e, options) {
    document.location= BASE_URL+'login/login/logout';
  },
  onButtonClickPerfil: function(button, e, options) {
    var win=Ext.create('MyApp.view.registrobasico.usuario.Contrasena');
    win.show();
  },
  onTextfieldKeyPress: function(field, e, options) {
    var charCode = e.getCharCode(); // #1
    if((e.shiftKey && charCode >= 97 && charCode <= 122) || 
    (!e.shiftKey && charCode >= 65 && charCode <= 90)){
      if(this.getCapslockTooltip() === undefined){ 
        Ext.widget('capslocktooltip');
      }
        this.getCapslockTooltip().show(); 
      } else {
        if(this.getCapslockTooltip() !== undefined){
          this.getCapslockTooltip().hide();
      }
    }
  },
  onActivarBoton : function(button, e, options){
    var win = button.up('contrasena');
    formPanel = win.down('form#contrasenaform').getForm();
    if (formPanel.isValid()){
      Ext.ComponentQuery.query('contrasena toolbar button[name=guardarClave]')[0].setDisabled(false);
    }else{
      Ext.ComponentQuery.query('contrasena toolbar button[name=guardarClave]')[0].setDisabled(true);
    }
  },
   onButtonClickSubmit: function(button, e, options){
    contrasena = button.up('contrasena');    
    pass = contrasena.down('textfield[name=confcontrasena]').getValue();    
    passactual = contrasena.down('textfield[name=contrasenact]').getValue();    
    confcontrasena = MyApp.util.Md5.encode(pass);
    contrasenact = MyApp.util.Md5.encode(passactual);
    Ext.Ajax.request({ 
      url: BASE_URL + 'usuario/usuario/updateContrasena',
      method:'POST',
      params: { 
        clave:confcontrasena,
        contrasena:contrasenact
      },
      failure: function(conn, response, options, eOpts) {
        var result = Ext.JSON.decode(conn.responseText, true); 
        MyApp.util.Util.showbienMsg(result.msg);
      },
      success: function(conn, response, options, eOpts) {
        var result = Ext.JSON.decode(conn.responseText, true);         
        MyApp.util.Util.showbienMsg(result.msg);
        contrasena.close();         
      }
    });
  },
  onButtonClickContrasena: function(button, e, options){ 
    var formPanel = button.up('form'); 
    login = button.up('login');
    login.close();
    var win=Ext.create('MyApp.view.login.Contrasena');
    win.show();
  },
});