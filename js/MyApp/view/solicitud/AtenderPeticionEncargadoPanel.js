Ext.define('MyApp.view.solicitud.AtenderPeticionEncargadoPanel', {
  extend  : 'Ext.form.Panel',
  alias: 'widget.atenderPeticionEncargadoPanel',
  itemId: 'atenderPeticionEncargadoPanel',
  autoScroll:  true,
  requires: [
   'MyApp.view.solicitud.ListaPeticionEncargado'
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
      xtype: 'listaPeticionEncargado',
    }]
  },

});