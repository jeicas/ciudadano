Ext.define('MyApp.view.solicitud.actividad_ticket.WinObservacionFuncionario', {
extend: 'Ext.window.Window',
  alias: 'widget.winObservacionFuncionario',
  itemId: 'winObservacionFuncionario',
  title:'Observacion al Funcionario',
  height: '3%',
  width: '30%',
  modal:true,
  
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
                        title: 'Ingrese el motivo por el cual rechaza el procedimiento',
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
                                name: 'idProcedimiento',
                                width: '100%',
                                hidden: true,
                            },
                             {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                width: '100%',
                                margins: '5 0 2 0',
                                items: [{
                                        xtype: 'textarea',
                                        margins: '5 5 5 0',
                                        name: 'observacion',
                                        width: '95%',
                                        labelWidth: 100,
                                         maxLength: 420,
                                        fieldLabel: 'Motivo:',
                                        
                                   },
                               ]
                            } ]
                    },], 
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
            iconCls :'icon-guardar',
            name    :'btnAceptar',
            text    : 'Aceptar',
            disabled:false,
            scope   : this,


          }]
     
    }]
  }
});

