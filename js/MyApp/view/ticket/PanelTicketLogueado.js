Ext.define('MyApp.view.ticket.PanelTicketLogueado', {
    extend : 'Ext.form.Panel',
    alias: 'widget.panelTicketLogueado',
    autoScroll:true,
    requires: [
        'Ext.tab.Tab',
        'Ext.form.Panel',
        'MyApp.view.ticket.GridTicket',
        'Ext.form.*',
        'MyApp.util.Util'
    ],
    initComponent: function() {
        var me   = this;
        me.items = me.buildItems();
        me.callParent(arguments);
    },
    buildItems : function(){
        return [{            
            xtype : 'fieldcontainer',
            layout: 'vbox',
            margin:'30 30 30 30',
            width :'100%',
            heigth:'100%',
            autoScroll:true,
            items : [{
                xtype       : 'combobox',                    
                fieldLabel  : 'Tipo ticket',
                width       :'100%',
                labelWidth  : 120,                   
                name        : 'tipoTicket',
                queryMode   : 'local',                
                store       : Ext.create('MyApp.store.ticket.TipoTicketStore'),
                valueField  : 'id',
                displayField: 'nombre',
                editable    : false,
                emptyText   :'Seleccionar',
                allowBlank  : false
            },{
                xtype       : 'combobox',                    
                fieldLabel  : 'Sector relacionado',
                width       : '100%',
                labelWidth  : 120,                   
                name        : 'sector',
                queryMode   : 'local',
                store       : Ext.create('MyApp.store.registrobasico.sector.SectorStore'),
                valueField  : 'id',
                displayField: 'nombre',
                editable    : false,                    
                emptyText   :'Seleccionar',
                allowBlank  : false,
            },{
                xtype       : 'textareafield',
                fieldLabel  : 'Descripción',                    
                hidden      : true,
                name        : 'descripcion',
                labelWidth  : 120,
                width       :'100%',
                height      : 200
            }]
        },{
            xtype : 'gridTicket',            
            align :'center',
            hidden: true,            
            width : '100%',
            heigth: '100%',
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
        xtype       : 'button',
        width       :  40,
        iconCls     : 'clear-icon32',
        iconAlign   : 'right',
        name        : 'limpiar',
        tooltip     : 'Limpiar los campos',
        scale       : 'large',
    },{
        xtype       : 'button',
        width       : 45,
        iconCls     : 'save-icon32',
        tooltip     : 'Guardar',
        name        : 'guardar',
        scale       : 'large'
    }]
  }]
});