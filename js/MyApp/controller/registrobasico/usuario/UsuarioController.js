Ext.define('MyApp.controller.registrobasico.usuario.UsuarioController', {
  extend: 'Ext.app.Controller',
  views: ['registrobasico.usuario.UsuarioPanel'],
  requires: [
    'MyApp.util.Util',
    'MyApp.util.Md5'
  ],
  refs: [{
    ref: 'panelUsuario',
    selector: '#panelUsuario'
  }],
    
  init: function(application){
    this.control({      
      '#panelUsuario gridpanel[name=gridUsuario]':{
        itemdblclick: this.editarUsuario
      },
      '#panelUsuario gridpanel[name=gridFuncionario]':{
        itemdblclick: this.editarFuncionario
      },
      "#panelUsuario button[name=guardar]":{
        click: this.guardarUsuario
      },
      "#panelUsuario button[name=limpiar]":{
        click: this.limpiarUsuario
      },
      "#panelUsuario button[name=eliminar]":{
        click: this.eliminarUsuario
      },
      '#panelUsuario':{
        render: this.iniciarStore
      },
    });
  },
  iniciarStore: function(){
    formulario=this.getPanelUsuario();
    storeU= formulario.down('gridpanel[name=gridUsuario]').getStore();
    store= formulario.down('gridpanel[name=gridFuncionario]').getStore();
    store.proxy.extraParams.origen='usuario';
    store.load();
    storeU.load();
  },
/////////////// Guardar o editar usuario
  guardarUsuario: function(button, e ,options){
    me=this;
    formulario=this.getPanelUsuario();
    if(formulario.down('textfield[name=funcionario]').getValue()!=''){
      if(formulario.getForm().isValid()){
        var hashmd5= MyApp.util.Md5.encode(formulario.down('textfield[name=clave]').getValue());
        formulario.down('textfield[name=clave]').setValue(hashmd5);
        formulario.down('textfield[name=reclave]').setValue(hashmd5);
        Ext.Ajax.request({
          url: BASE_URL+'usuario/usuario/guardarUsuario',
          method:'POST',
          params:formulario.getForm().getValues(),
          failure: function(form,action){
            Ext.get(formulario.getEl()).unmask();
            Ext.Msg.show({
              title:'Error!',
              msg: form.responseText,
              icon: Ext.Msg.ERROR,
              buttons: Ext.Msg.OK
            });
          },
          success : function(form,action){
            Ext.get(formulario.getEl()).unmask();
              var data= Ext.JSON.decode(form.responseText);
              Ext.Msg.show({
                  title:'Informaci&oacute;n',
                  msg: data.msg,
                  icon: Ext.Msg.INFO,
                  buttons: Ext.Msg.OK
              }); 
            me.limpiarUsuario();
            me.iniciarStore();
          }
        });      
      }else{
        Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe ingresar los datos solicitados', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });      
      }
    }else{
      Ext.MessageBox.show({ title: 'Informaci&oacute;n', msg: 'Debe seleccionar un usuario para realizar la acción', buttons: Ext.MessageBox.OK, icon: Ext.MessageBox.INFO });
    }
  },
////////////////Limpiar usuario
  limpiarUsuario: function(){
    formulario=this.getPanelUsuario();
    formulario.getForm().reset();
    formulario.down('textfield[name=usuario]').setDisabled(0);
  },
  editarUsuario: function (record, item, index, e, eOpts ){
    me=this;
    formulario=this.getPanelUsuario();
    if(record){      
      formulario.getForm().reset();      
      formulario.loadRecord(item);
      if(item.data.usuario!=''){
        formulario.down('textfield[name=usuario]').setDisabled(1);
      }else{
        formulario.down('textfield[name=usuario]').setDisabled(0);
      }
    }
  },
  editarFuncionario: function (record, item, index, e, eOpts ){
    me=this;
    formulario=this.getPanelUsuario();
    if(record){      
      formulario.getForm().reset();      
      formulario.loadRecord(item);
      if(item.data.usuario!=''){
        formulario.down('textfield[name=usuario]').setDisabled(1);
      }else{
        formulario.down('textfield[name=usuario]').setDisabled(0);
      }
    }
  }
});