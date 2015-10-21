Ext.define('MyApp.view.reporte.TicketMunicipioPanel', {
  extend  : 'Ext.form.Panel',
  alias: 'widget.panelTicketMunicipio',
  itemId: 'panelTicketMunicipio',
  autoScroll:  true,
  requires: [
   'MyApp.view.reporte.listaTicketMunicipio'
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
      xtype: 'listaTicketMunicipio',
    }]
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'top',
      layout      : 'vbox',
      items: [{
        xtype       : 'fieldcontainer',
        margins   : '0 0 0 30',
        layout      : 'hbox',
        items: [{
          xtype       : 'combobox',
          fieldLabel  : 'Municipio',          
          name        : 'municipio',
          queryMode   : 'local',
          store       :  Ext.create('MyApp.store.registrobasico.estado.MunicipioStore'),
          valueField  : 'id',
          displayField: 'nombre',
          emptyText   :'Seleccionar',
          editable    : false
        },{
          xtype       : 'combobox',
          fieldLabel  : 'Parroquia',          
          name        : 'parroquia',
          labelWidth  : 120,
          queryMode   : 'local',
          store       :  Ext.create('MyApp.store.registrobasico.estado.ParroquiaStore'),
          valueField  : 'id',
          displayField: 'nombre',
          margins  : '0 0 0 30',
          emptyText   :'Seleccionar',
          editable    : false                          
        },{
          xtype   : 'button',
          iconCls : 'buscar',
          tooltip : 'Buscar',
          name    : 'buscar',
          scope   : this,
          margins  : '0 0 0 10',
        },{
          xtype   : 'button',
          iconCls : 'icon-limpiar',
          tooltip : 'Limpiar',
          name    :'limpiar',
          margins : '0 0 0 10',
          scope   : this,
        }]
      },{
        xtype       : 'fieldcontainer',
        margins   : '0 0 0 30',
        fieldLabel  : 'Rango de fecha',
        layout      : 'hbox',
        items: [{
          xtype     : 'datefield',
          width     : 150,
          margins   : '0 0 0 30',
          labelWidth: 40,
          fieldLabel: 'Desde',
          name      : 'fechaDesde'                    
        },{
          xtype     : 'datefield',
          width     : 150,
          labelWidth: 40,
          fieldLabel: 'Hasta',
          margins   : '0 0 0 185',
          name      : 'fechaHasta'          
        }]
      }]
    }]
  }
});