Ext.define('MyApp.view.ticket.PanelTicket', {
    extend : 'Ext.form.Panel',
    alias: 'widget.panelTicket',
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
            xtype: 'container',
            layout: 'vbox',
            width:'100%',
            items: [{
                xtype       : 'fieldset',
                margin      :'10 30 0 30',
                width       :'100%',
                heigth      :'100%',    
                title       : 'Datos del solicitante',
                bodyStyle   : 'background-color: transparent;',
                layout      : 'vbox',
                //hidden      : true,
                items:[{
                    xtype : 'fieldcontainer',
                    layout: 'hbox',                    
                    items:[{ 
                        xtype       : 'radiogroup',
                        name        : 'rgSolicitante',
                        allowBlank  : false,
                        margin      :'30 0 0 0',
                        width       : 250,
                        pack        : 'center',
                        columns     : 1,
                        items: [{
                            xtype     : 'radiofield',
                            name      :'seleccion',
                            boxLabel  : 'Persona Natural o Jurídica',
                            inputValue: '1',
                            style     : 'margin-bottom: 10px',
                            checked   :false
                        },{
                            xtype     : 'radiofield',
                            name      :'seleccion',
                            boxLabel  : 'Consejo Comunal o Asociacion Civil',
                            style     : 'margin-bottom: 10px',
                            inputValue: '2',
                            checked   :false
                        }]
                    },{
                        xtype : 'fieldcontainer',
                        layout: 'vbox',
                        width : '100%',
                        name  : 'fcDatos',
                        hidden: true,
                        items:[{
                            xtype       : 'fieldcontainer',
                            fieldLabel  : 'Cédula o Rif',
                            margins     : '5 0 0 30',
                            layout      : 'hbox',
                            labelWidth  : 120,
                            items: [{
                                xtype       : 'combobox',
                                width       : 88,
                                hideLabel   : true,
                                name        : 'nacionalidad',
                                value       : 'V',
                                displayField: 'id',
                                store       : Ext.create('MyApp.store.registrobasico.usuario.rifStore'),
                                valueField  : 'id',
                                editable    : false
                            },{
                                xtype       : 'textfield',
                                margins     : '0 0 0 10',
                                name        : 'cedula',
                                width       : 163,
                                hideLabel   : true,
                                vtype       : 'numero',
                                maxLength   : 8,
                                minLength   : 4,
                                allowBlank  : false,
                            },{
                                xtype   : 'button',
                                iconCls : 'buscar',
                                margins : '0 0 0 10',
                                tooltip :'Buscar solicitante',
                                name    :'buscarSolicitante'
                            }]
                        },{
                            xtype       : 'textareafield',
                            margins     : '5 0 0 30',
                            fieldLabel  : 'Nombre o Razón Social',
                            name        : 'nombreSolicitante',
                            readOnly    : true,
                            labelWidth  : 120,
                            width       : 600,
                            height      : 40
                        },{
                            xtype       : 'textareafield',                            
                            margins     : '5 0 0 30',
                            fieldLabel  : 'Nombre del contacto',
                            name        : 'nombreContacto',
                            readOnly    : true,
                            hidden      : true,
                            labelWidth  : 120,
                            width       : 600,
                            height      : 40
                        },{
                            xtype       : 'textfield',
                            name        : 'estatusComunidad',
                            hidden      : true
                        },{
                            xtype       : 'textfield',
                            name        : 'estatusPersona',
                            hidden      : true
                        },{
                            xtype       : 'textfield',
                            name        : 'idSolicitante',
                            hidden      : true
                        }]
                    }]
                }]
            },{
                xtype : 'fieldset',
                layout: 'vbox',
                margin:'10 30 30 30',
                width :'100%',
                heigth:'100%',           
                title : 'Datos del ticket',
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
                    emptyText   :'Seleccionar',
                    editable    : false,
                    allowBlank  : false,
                    disabled    : true
                },{
                    xtype       : 'combobox',
                    fieldLabel  : 'Sector relacionado',
                    width       : '100%',
                    labelWidth  : 120,
                    name        : 'sector',
                    queryMode   : 'local',
                    store       : Ext.create('MyApp.store.registrobasico.sector.SectorEnteStore'),
                    valueField  : 'id',
                    displayField: 'nombre',
                    emptyText   :'Seleccionar',
                    editable    : false,
                    allowBlank  : false,
                    disabled    : true
                },{
                    xtype       : 'textareafield',
                    fieldLabel  : 'Descripción',                    
                    hidden      : true,
                    name        : 'descripcion',
                    labelWidth  : 120,
                    width       :'100%',
                    height      : 200
                }]
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