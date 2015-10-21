Ext.define('MyApp.view.login.Login', {
  extend    :'Ext.window.Window',
  alias     :'widget.login',
  resizable :false,
  draggable :false,
  itemId    :'loginWindow',
  autoShow  :true,
  height    :350,
  width     :600,
  layout    :'fit',
  iconCls   :'key',
  title     :"Login",
  closeAction: 'hide',
  closable  :false,
  items: [{
    xtype   :'form',
    frame   :false,
    bodyPadding:15,
    itemId  :'loginForm',
    layout: {
      align :'center',
      pack  :'center',
      type  :'vbox'
    },
    dockedItems: [{
      xtype :'toolbar',
      dock  :'bottom',
      items :[{
        xtype:'tbfill'
      },{ 
        xtype   :'button',
        itemId  :'cancel',
        iconCls :'icon-limpiar',
        text    :'Limpiar'
      },{
        xtype   :'button',
        itemId  :'submit',
        iconCls :'go',
        formBind:true,
        text    :"Aceptar"
      }]
    }],
    items: [{
      xtype: 'image',                           
      src: BASE_PATH+'imagen/logo/logoborde.png',
      height:80,
      width:240,
    },{
      xtype   :'container',
      border: 1,
      layout: {
        align :'center',
        pack  :'center',
        type  :'hbox'
      },
      margin:'10 0 0 0',
      items: [{ 
        xtype   :'container',
        border: 1,
        layout: {
          align :'center',
          pack  :'center',
          type  :'vbox'
        },
        margin  :'0 50 0 0',
        items: [{
          xtype :'label',
          text  :'Nuevo usuario',
          margin:'0 0 10 0'
        },{
          xtype   :'button',
          itemId  :'registrate',
          iconCls :'useradd',
          scale   :'medium',
          text    :'Registrate Aquí'
        }]
      },{ 
        xtype: 'container',
        items: [{
          xtype     :'textfield',
          labelWidth:70,
          allowBlank:false,
          name      :'user',
          fieldLabel: "Usuario",
          maxLength : 25
        },{
          xtype     :'textfield',
          labelWidth:70,
          allowBlank:false,
          inputType :'password',
          name      :'password',
          maxLength : 15,
          name      : 'password',
          fieldLabel: "Contraseña",
          enableKeyEvents: true,
          id        : 'password'
        },{
          xtype   :'button',
          itemId  :'contrasena',
          scale   :'small',
          margin  :'0 0 0 79',
          width   : '67%',
          text    :'Olvide mi contraseña'
        }]
      }]
    }]
  }]
}); 