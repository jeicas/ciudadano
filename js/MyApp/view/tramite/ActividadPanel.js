Ext.define('MyApp.view.tramite.ActividadPanel', { 
    extend: 'Ext.form.Panel', 
    alias: 'widget.panelActividad',
  requires: [  
   'MyApp.view.tramite.ListaActividad'
  ],
  layout: { 
    type: 'fit'
  },
  initComponent: function() {
    var me = this;
    me.items = me.buildItem();
    me.dockedItems = me.buildDockedItems();
    me.callParent();
  },
  buildItem : function(){
    return [{   
      xtype: 'listaActividad',
    }]
  },    
  buildDockedItems : function(){
    return [{
    xtype: 'toolbar', 
    flex: 1, 
    dock: 'top', 
    items: [{ 
        xtype: 'combobox',
        fieldLabel:'Tramite',
        name:'nombretramite',
        text: 'Tipo Tramite',
        itemId: 'tipotramite', 
        width:'100%',
        displayField: 'descripcion',
        store       : Ext.create('MyApp.store.tramite.Tramiteid'),
        valueField  : 'id',
        queryMode   :'local',
      }]
    }]   
  } 
}); 
