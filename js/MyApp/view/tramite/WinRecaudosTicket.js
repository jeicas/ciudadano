Ext.define('MyApp.view.tramite.WinRecaudosTicket', {
extend: 'Ext.window.Window',
  alias: 'widget.winRecaudosTicket',
  itemId: 'winRecaudosTicket',
  title:'Recaudos solicitados para la petición.',
  height: '55%',
  width: '60%',
  modal:true,
  requires: [
    'MyApp.view.tramite.TicketRecaudosLista'
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
    return [
     {
                xtype: 'form',
                layout: 'vbox',
                name: 'formulario',
                width: '100%',
                items: [{
                        xtype: 'fieldset',
                        margin: '5 5 0 5',
                        width: '100%',
                        heigth: '100%',
                        title: 'DATOS DE LA SOLICITUD',
                        bodyStyle: 'background-color: transparent;',
                        layout: 'hbox',
                        //hidden      : true,
                        items: [{
                                xtype: 'textfield',
                                margins: '0 0 0 0',
                                name: 'idticket',
                                width: '100%',
                                hidden: true,
                            },
                            {
                                xtype: 'textfield',
                                margins: '0 0 0 0',
                                name: 'idactividad',
                                width: '10%',
                                hidden: true,
                            },{
                                xtype: 'textfield',
                                margins: '0 0 0 0',
                                name: 'idsolicitante',
                                width: '100%',
                                hidden: true,
                            },
                          {
                                        xtype: 'textfield',
                                        margins: '5 5 5 0',
                                        name: 'actividad',
                                        width: '30%',
                                        labelWidth: 100,
                                        readOnly:true, 
                                        fieldLabel: 'Procedimiento',
                                        
                                   },  
                          
                          {
                                        xtype: 'textfield',
                                        margins: '5 5 5 0',
                                        name: 'codigoTicket',
                                        width: '30%',
                                        labelWidth: 100,
                                        readOnly:true, 
                                        fieldLabel: 'Nro. Ticket',
                                        
                                   },
                               {
                                        xtype: 'textfield',
                                        margins: '5 5 5 0',
                                        name: 'solicitante',
                                        width: '61%',
                                        labelWidth: 100,
                                        readOnly:true, 
                                        fieldLabel: 'Solicitante',
                                       
                                   }
                            ]
                    },{ 
            xtype: 'tabpanel',
            layout : "border",
            itemId:'mitabpanel',
            height:220,
            activeTab: 0,
            margin:'10 0 0 0',
            width: '100%',
                items:[{
                xtype : 'recaudosTicketLista',            
                itemId:'recaudosTicketLista',
                align :'center',
               // hidden:true,
                activeTab: 0,
                margin:'0 0 10 0',
                width : '100%',
                heigth: '100%',
            }]
        }], 
            }, ]
    
  },
  buildDockedItems : function(){
    return []
  }
});

