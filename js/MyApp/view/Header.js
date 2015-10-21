Ext.define('MyApp.view.Header', { 
  extend: 'Ext.toolbar.Toolbar',
  alias: 'widget.appheader',
  itemId  : 'appheader',
  /*height: '100%',
  height: '100%',*/
  baseCls:'price',
  ui: 'footer',
  items: [{
    xtype: 'image',                           
    src:  BASE_URL+'../imagen/logo/logoborde1.png',
    height:'80%',
    width:'25%',
  },{ 
    xtype: 'tbfill'
  },{
    xtype: 'label',
    text: 'Sistema de Atención al Ciudadano',
    baseCls:'Three-Dee'
  },{ 
    xtype: 'tbfill'
  },{
    xtype : 'fieldcontainer',
    layout: 'vbox',
    //margins     : '50 0 50 0',
    items:[{
      xtype : 'fieldcontainer',
      layout: 'hbox',
      items:[{
        xtype: 'button',
        margins: '0 0 0 10',
        tooltip: 'Usuario', 
        itemId: 'perfil',
        iconCls: 'user'  
      },{   
        xtype: 'button',
        margins: '0 0 0 10',
        tooltip: 'Salir', 
        itemId: 'logout',
        iconCls: 'logout'  
      }]
    },{        
      xtype: 'label',
      name: 'usuario',      
      text: '',
      width:250,
    }]
  }]
});