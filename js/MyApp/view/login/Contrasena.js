Ext.define('MyApp.view.login.Contrasena', {
  extend : 'Ext.form.Panel',
  alias: 'widget.contrasena',
  itemId: 'contrasena',
  requires:['Ext.form.*','Ext.tip.QuickTipManager'],
  layout:{
    type : 'vbox',
    align: 'center',
  },
  title : 'Olvide mi contraseña',
  autoShow: true,
  autoRender: true,
  width: '40%',  
  initComponent: function() {
    var me   = this;
    me.items = me.buildItems();
    me.callParent(arguments);
  },
  buildItems : function(){
    return [{
      xtype   :'container',
      border: 1,
      width       : '90%',
      layout: {
        align :'center',
        pack  :'center',
        type  :'vbox'
      },
      margin:'20 0 0 0',
      items: [{
        xtype   : 'fieldset',
        width       : '80%',
        title   : 'Seleccione',
        items: [{
          xtype       : 'radiogroup',
          name        : 'rgSolicitante',
          allowBlank  : false,
          width       :'100%',
          pack        : 'center',
          columns     : 1,
          items: [{
              xtype     : 'radiofield',
              name      : 'seleccion',
              boxLabel  : 'Funcionario',
              inputValue: '1',
              style     : 'margin-bottom: 10px',
              checked   :false
          },{
              xtype     : 'radiofield',
              name      : 'seleccion',
              boxLabel  : 'Persona Natural o Jurídica',
              style     : 'margin-bottom: 10px',
              inputValue: '2',
              checked   :false
          },{
              xtype     : 'radiofield',
              name      : 'seleccion',
              boxLabel  : 'Consejo Comunal',
              style     : 'margin-bottom: 10px',
              inputValue: '3',
              checked   :false
          }]
        }]
      },{
        xtype   : 'fieldset',
        layout  :'vbox',
        title   : 'Datos',
        name    : 'datos',
        disabled: true,
        width   : '80%',
        items: [{
          xtype       : 'fieldcontainer',
          fieldLabel  : 'Cédula o Rif',
          width       : '100%',
          layout      :'hbox',
          items:[{
            xtype       : 'combobox',
            width       : '30%',
            hiddenLabel : true,
            name        : 'nacionalidad',
            value       : 'V',
            displayField: 'id',
            store       : Ext.create('MyApp.store.registrobasico.usuario.rifStore'),
            valueField  : 'id',
            editable    : false
          },{
            xtype       : 'textfield',
            margins     : '0 0 0 10',
            name        : 'cedula',
            hiddenLabel : true,
            width       : '70%',
            vtype       : 'numero',
            maxLength   : 8,
            minLength   : 4,
            allowBlank  : false
          }]
        },{
          xtype       :'textfield',
          width       : '100%',
          allowBlank  :false,
          name        :'correo',
          vtype       :'correo',
          fieldLabel  : 'E-mail'
        },{
          xtype       : 'textfield',
          fieldLabel  : 'Contraseña',
          width       : '100%',
          name        :'contrasena',
          inputType   :'password',
          vtype       :'alphanum',
          minLength   : 4,
          allowBlank  : false
        },{
          xtype       : 'textfield',
          fieldLabel  : 'Confirmar',
          width       : '100%',
          name        :'recontrasena',
          inputType   :'password',
          allowBlank  : false,
          validator: function(value) {
            var txtcontrasena = this.previousSibling('[name=contrasena]');
            return (value === txtcontrasena.getValue()) ? true : 'No coinciden las contraseñas.'
          }
        },{
          xtype       : 'panel',
          border      : false,          
          height      : 150,
          width       : 350,
          itemId      : 'reCaptcha',
          items       : [recaptcha]
        }]
      }]
    }]
  },
  dockedItems:[{
    xtype   : 'toolbar',
    dock    : 'bottom',
    height  : 40,
    width: '100%',
    items:[{
      xtype : 'tbfill'
    },{
      xtype   : 'button',
      iconCls :'cancel',
      id      :'salir',
      text    : 'Salir'
    },{
      xtype   : 'button',
      iconCls :'save',
      id      :'guardar',
      text    : 'Guardar',
      disabled:true,
      formBind: true,
      scope   : this,
    }]
  }]
});
var recaptcha = Ext.create('MyApp.util.ReCaptcha',{
  name: 'recaptcha',
  recaptchaId: 'recaptcha',
  publickey: '6LcJAPUSAAAAACZ_vvBx46SqeL0eSQTh5JhkKcLC',
  theme: 'white',
  lang: 'es'
});