Ext.define('MyApp.view.historico.HistoricoPanel', {
  extend  : 'Ext.form.Panel',
  alias: 'widget.panelHistorico',
  itemId: 'panelHistorico',
  autoScroll:  false,
   width: '100%',
    height: 300,
  requires: [
   'MyApp.view.historico.ListaHistorico'
  ],
  layout: {
    type: 'fit'
  },  
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
   // me.dockedItems = me.buildDockedItems();
    me.callParent();
  },
  buildItem : function(){
    return [{
      xtype: 'listaHistorico',
    }]
  },
  // buildDockedItems : function(){
  //   return [{
  //     xtype : 'toolbar',
  //     flex  : 1,
  //     dock  : 'top',
  //     items: [{
  //       xtype : 'fieldcontainer',
  //       layout: 'hbox',
  //       items:[{
  //         xtype       : 'radiogroup',
  //         fieldLabel  : 'Buscar por',
  //         name        : 'rgSolicitante',
  //         width       : 250,
  //         pack        : 'center',
  //         columns     : 2,
  //         items: [{
  //           xtype     : 'radiofield',
  //           name      :'seleccion',
  //           boxLabel  : 'Cédula',
  //           inputValue: '1',
  //           style     : 'margin-bottom: 10px',
  //           checked   :false
  //         },{
  //           xtype     : 'radiofield',
  //           name      :'seleccion',
  //           boxLabel  : 'Rif',
  //           style     : 'margin-bottom: 10px',
  //           inputValue: '2',
  //           checked   :false
  //         }]
  //       }]      
  //     },{
  //       xtype       : 'fieldcontainer',
  //       name        : 'cedula',
  //       margins     : '5 0 0 10',
  //       layout      : 'hbox',
  //       hidden      : true,
  //       items: [{
  //         xtype       : 'combobox',
  //         width       : 88,
  //         hideLabel   : true,
  //         name        : 'nacionalidad',
  //         value       : 'V',
  //         displayField: 'id',
  //         store       : Ext.create('MyApp.store.registrobasico.usuario.rifStore'),
  //         valueField  : 'id',
  //         editable    : false
  //       },{
  //         xtype       : 'textfield',
  //         margins     : '0 0 0 10',
  //         name        : 'cedula',
  //         width       : 163,
  //         hideLabel   : true,
  //         vtype       : 'numero',
  //         maxLength   : 8,
  //         minLength   : 4,          
  //       },{
  //         xtype   : 'button',
  //         iconCls : 'buscar',
  //         tooltip : 'Buscar',
  //         name    : 'buscar',
  //         scope   : this,
  //         margins  : '0 0 0 10',
  //       },{
  //         xtype   : 'button',
  //         iconCls : 'icon-limpiar',
  //         tooltip : 'Limpiar',
  //         name    :'limpiar',
  //         margins : '0 0 0 10',
  //         scope   : this,
  //       }]
  //     }]
  //   }]
  // }
});