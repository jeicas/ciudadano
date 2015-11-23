Ext.define('MyApp.view.solicitud.actividad_ticket.WinProcedimientoTicket', {
extend: 'Ext.window.Window',
  alias: 'widget.winProcedimientoTicket',
  itemId: 'winProcedimientoTicket',
  title:'Detalles de la Petición',
  height: '55%',
  width: '60%',
  modal:true,
  requires: [
    
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
                        title: 'DATOS DEL PROCEDIMIENTO',
                        bodyStyle: 'background-color: transparent;',
                        layout: 'vbox',
                        //hidden      : true,
                        items: [{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                width: '100%',
                                
                                margins: '5 0 2 0',
                                
                                items: [{
                                        xtype: 'label',
                                        margins: '5 5 5 0',
                                        name: 'lblActividad',
                                        width: '90%',
                                        readOnly:true, 
                                        text: '',
                                        
                                   },
                                    {
                                xtype: 'textfield',
                                margins: '0 0 0 0',
                                name: 'idProcedimiento',
                                width: '100%',
                                hidden: true,
                            },
                              ]
                            },
                            ]
                    },{
                        xtype: 'fieldset',
                        margin: '5 5 0 5',
                        width: '100%',
                        heigth: '100%',
                        title: 'DATOS DE LA SOLICITUD',
                        bodyStyle: 'background-color: transparent;',
                        layout: 'vbox',
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
                                name: 'idTipoAyuda',
                                width: '100%',
                                hidden: true,
                            },
                            
                             {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                width: '100%',
                                
                                margins: '5 0 2 0',
                                
                                items: [{
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
                                       
                                   },]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                width: '100%',
                                margins: '2 0 2 0',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        margins: '2 5 5 0',
                                        name: 'sector',
                                        width: '30%',
                                        labelWidth: 100,
                                       readOnly:true, 
                                        fieldLabel: 'Sector',
                                    },
				  {
                                        xtype: 'textfield',
                                        margins: '2 5 5 0',
                                        name: 'tipoayuda',
                                        width: '45%',
                                        labelWidth: 100,
                                       readOnly:true, 
                                        fieldLabel: 'Tipo Ayuda',
                                    },
                                      {
                                        xtype: 'textfield',
                                        margins: '2 5 5 0',
                                        name: 'cantidad',
                                        width: '16%',
                                        labelWidth: 80,
                                       readOnly:true, 
                                        fieldLabel: 'Cantidad',
                                    },
                                   ]
                            },  {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                width: '100%',
                                margins: '2 0 2 0',
                                items: [
                                    {
                                        xtype: 'textarea',
                                        margins: '5 5 5 0',
                                        name: 'solicitud',
                                        width: '44%',
                                        labelWidth: 100,
                                       readOnly:true, 
                                        fieldLabel: 'Descripción',
                                    },
				  {
                                        xtype: 'textarea',
                                        margins: '5 5 5 0',
                                        name: 'observacion',
                                        width: '47%',
                                        labelWidth: 100,
                                       readOnly:true, 
                                        fieldLabel: 'Observación',
                                    },
                                   ]
                            }]
                    }], 
            }, ]
    
  },
  buildDockedItems : function(){
    return [{
      xtype : 'toolbar',
      flex  : 1,
      dock  : 'bottom',
      height  : 40,
          width: '100%',
          items:[{
            xtype : 'tbfill'
          },
          {
            xtype   : 'button',
            iconCls :'save',
            name    :'btnAprobar',
            text    : 'Aprobar',
            disabled:false,
            scope   : this,


          },{
            xtype   : 'button',
            iconCls :'icon-limpiar',
            name      :'btnRechazar',
            text    : 'Rechazar'
          }]
     
    }]
  }
});

