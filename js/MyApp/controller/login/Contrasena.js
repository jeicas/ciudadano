Ext.define('MyApp.controller.login.Contrasena',{
  extend: 'Ext.app.Controller',
  views: ['login.Contrasena'],
  requires: ['MyApp.util.ReCaptcha'],
  refs: [{
    ref: 'contrasena',
    selector: 'contrasena'
  }],
  init: function(application) { 
    this.control({ 
      "contrasena button#guardar":{
        click: this.guardar
      },
      "contrasena button#salir":{
        click: this.salirContrasena
      },
      "contrasena radiogroup":{
        change: this.changeSeleccion
      }
    }); 
  },
  changeSeleccion: function(grupo,cmp){
    var formulario = this.getContrasena();        
    formulario.down('combobox[name=nacionalidad]').reset();
    formulario.down('textfield[name=cedula]').reset();
    formulario.down('textfield[name=contrasena]').reset();
    formulario.down('textfield[name=recontrasena]').reset();
    formulario.down('textfield[name=correo]').reset();
    if(cmp.seleccion!=null){
      formulario.down("fieldset[name=datos]").setDisabled(false);
    }
  },
  guardar: function(button, e, options){
    me=this;
    var formulario=button.up('form'); 
    contra = button.up('contrasena'),  
    console.log(recaptcha.getResponse());
    if(recaptcha.getResponse()!=''){
      nacionalidad=formulario.down('combobox[name=nacionalidad]').getValue();
      cedula=formulario.down('textfield[name=cedula]').getValue();
      pass= formulario.down('textfield[name=contrasena]').getValue();
      seleccion= formulario.down('radiogroup[name=rgSolicitante]').getValue();
      contrasena = MyApp.util.Md5.encode(pass);
      correo= formulario.down('textfield[name=correo]').getValue();
      Ext.get(contra.getEl()).mask("Verificando... Por favor espere...",'loading');
      Ext.Ajax.request({
        url: BASE_URL + 'login/login/verifica_captcha',
        method:'POST',
        params: {
          seleccion: seleccion,
          nacionalidad: nacionalidad,
          cedula: cedula,
          contrasena: contrasena,
          correo: correo,
          recaptcha_challenge_field: recaptcha.getChallenge(),
          recaptcha_response_field: recaptcha.getResponse()
        } ,
        failure: function(form,action){
          Ext.get(contra.getEl()).unmask();
            Ext.Msg.show({
              title:'Error!',
              msg: form.responseText,
              icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          },
          success: function(form,action){
            Ext.get(contra.getEl()).unmask();
            datos=Ext.JSON.decode(form.responseText);
            if (datos.success!=false){
              Ext.Msg.alert('Informaci&oacute;n', 'Contraseña actualizada exitosamente', function(btn){ //Step 2
                  if(btn === 'ok' || btn==='cancel'){
                    formulario.getForm().reset();
                    formulario.close();
                    formulario.destroy();
                    document.location= BASE_URL+'../';
                  }
                });
              }
            else{
              Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Los datos suministrados no son correctos', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
            }
          }
      });     
    }else{
      Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar la imagen del ReCaptcha', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
    }
  },
  salirContrasena: function(){
    document.location= BASE_URL+'../';
  }
});