Ext.define('MyApp.view.reporte.TicketSectorPanel', {
  extend  : 'Ext.form.Panel',
  alias: 'widget.panelTicketSector',
  itemId: 'panelTicketSector',
  autoScroll:  true,
  requires: [
   'MyApp.view.reporte.listaTicketSector'
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
      xtype: 'listaTicketSector',
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
          fieldLabel  : 'Tipo ticket',          
          name        : 'tipoTicket',
          queryMode   : 'local',
          store       : Ext.create('MyApp.store.ticket.TipoTicketStore'),
          valueField  : 'id',
          displayField: 'nombre',
          emptyText   :'Seleccionar',
          editable    : false
        },{
          xtype       : 'combobox',
          fieldLabel  : 'Sector relacionado',          
          name        : 'sector',
          labelWidth  : 120,
          queryMode   : 'local',
          store       : Ext.create('MyApp.store.registrobasico.sector.SectorStore'),
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