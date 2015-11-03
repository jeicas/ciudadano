Ext.define('MyApp.view.solicitud.AtenderPeticionPanel', {
  extend  : 'Ext.form.Panel',
  alias: 'widget.atenderPeticionPanel',
  itemId: 'atenderPeticionPanel',
  autoScroll:  true,
  requires: [
   'MyApp.view.solicitud.ListaPeticion'
  ],
  layout: {
    type: 'fit'
  },  
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.callParent();
  },
  buildItem : function(){
    return [{
      xtype: 'listaPeticion',
    }]
  },

});