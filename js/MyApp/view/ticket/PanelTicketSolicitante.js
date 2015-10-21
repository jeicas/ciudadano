Ext.define('MyApp.view.ticket.PanelTicketSolicitante', {
    extend : 'Ext.form.Panel',
    alias: 'widget.panelTicketSolicitante',
    autoScroll:true,
    autoShow: true,
    autoRender: true,
    frame: true,
    width:'100%',
    requires: [
        'Ext.tab.Tab',
        'Ext.form.Panel',
        'MyApp.view.ticket.GridTicket',
        'Ext.form.*',
        'MyApp.util.Util',
        'MyApp.vtypes.Validadores'
    ],
    title: 'Registro de solicitud',
    initComponent: function() {
        var me   = this;
        me.items = me.buildItems();
        me.callParent(arguments);
    },
    buildItems : function(){
        return [{
            xtype  : 'form',
            name   : 'completo',
            width  :'100%',
            layout: 'vbox',
            border: false,
            items: [{                
                xtype       :'fieldset',
                margin      :'10 20 0 20',
                width       :'100%',   
                title       : 'Datos del solicitante',
                bodyStyle   : 'background-color: transparent;',
                layout      : 'vbox',
                items:[{
                    xtype       : 'fieldcontainer',
                    width       :'100%',
                    layout      : 'hbox',
                    items: [{
                        xtype       : 'radiogroup',
                        name        : 'rgSolicitante',
                        allowBlank  : false,
                        fieldLabel  : 'Seleccionar',
                        width       :'100%',
                        pack        : 'center',
                        columns     : 2,
                        items: [{
                            xtype     : 'radiofield',
                            margin    : '0 0 0 200',
                            name      : 'seleccion',
                            boxLabel  : 'Persona Natural o Jurídica',
                            inputValue: '1',
                            style     : 'margin-bottom: 10px',
                            checked   :false
                        },{
                            xtype     : 'radiofield',
                            name      : 'seleccion',
                            boxLabel  : 'Consejo Comunal o Asociacion Civil',
                            style     : 'margin-bottom: 10px',
                            inputValue: '2',
                            checked   :false
                        }]
                    }]
                },{                    
                    xtype       : 'fieldcontainer',
                    fieldLabel  : 'Cédula o Rif',
                    width       :'100%',
                    layout      : 'hbox',
                    name        : 'fcCedula',
                    hidden      : true,
                    labelWidth  : 120,
                    items: [{
                        xtype       : 'combobox',
                        width       :'10%',
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
                        width       :'30%',
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
                    xtype  : 'form',
                    name   : 'completo1',
                    width  :'100%',
                    layout : 'vbox',
                    border : false,
                    disabled:true,
                    hidden  : true,
                    items: [{
                        xtype       : 'textfield',
                        fieldLabel  : 'Razón Social',
                        name        : 'razonSolicitante',
                        labelWidth  : 120,     
                        width       : '100%',
                        hidden      : true
                    },{
                        xtype       : 'fieldcontainer',
                        width       :'100%',
                        name        :'fcNombre',
                        layout      : 'hbox',
                        labelWidth  : 120,
                        items: [{
                            xtype       : 'textfield',
                            fieldLabel  : 'Nombres',
                            name        : 'nombreSolicitante',
                            labelWidth  : 120,
                            vtype       : 'letra',
                            width       : '50%'
                        },{
                            xtype       : 'textfield',
                            fieldLabel  : 'Apellidos',
                            margin      : '0 1 0 30',
                            name        : 'apellidoSolicitante',
                            vtype       : 'letra',
                            labelWidth  : 120,     
                            width       : '50%'
                        }]
                    },{
                        xtype       : 'fieldcontainer',
                        layout      : 'hbox',
                        width       :'100%',                       
                        items: [{
                            xtype       : 'textfield',
                            fieldLabel  : 'Correo:',
                            name        : 'correo',
                            labelWidth  : 120,     
                            width       : '51%',
                            vtype       : 'correo',
                            allowBlank  : false,
                        },{
                            xtype       : 'datefield',
                            margins     : '0 0 0 30',
                            width       :'30%',
                            labelWidth  : 120,     
                            fieldLabel  : 'Fecha Nacimiento.',
                            name        : 'fechanacimiento',
                            format      : 'Y/m/d',
                            //allowBlank  : false,
                            hidden      : true,
                            maxValue    : valor=Ext.Date.add(new Date(), Ext.Date.YEAR, -17)                        
                        },{
                            xtype  : 'label',
                            name   : 'edad',
                            width  :'30%',
                            margins: '5 0 0 20',
                            text   : 'Edad: 0 años.',
                            hidden : true,
                        }]
                    },{
                        xtype       : 'fieldcontainer',
                        layout      : 'hbox',
                        width       : '100%',
                        items: [{
                            xtype       : 'fieldcontainer',
                            layout      : 'hbox',
                            width       : '50%',
                            labelWidth  : 120,
                            fieldLabel  : 'Teléfono Celular',
                            items: [{
                                xtype         : 'combobox',
                                width         : '23%',
                                hideLabel     : true,
                                name          : 'codTlf1',
                                itemId        : 'codTlf',
                                store         : Ext.create('MyApp.store.registrobasico.telefono.CodCelularStore'),
                                displayField  :'codigo',
                                valueField    :'codigo',
                                editable      : false,
                            },{
                                xtype         : 'textfield',
                                name          : 'movil',
                                width         : '76%',
                                margin        : '0 0 0 10',
                                hideLabel     : true,
                                minLength     : 7,
                                maxLength     : 7,
                                vtype         : 'numero',
                                disabled      : true
                            }]
                        },{
                            xtype       : 'fieldcontainer',
                            layout      : 'hbox',
                            margin      : '0 0 0 30',
                            labelWidth  : 120,
                            width       : '50%',
                            fieldLabel  : 'Teléfono Local',
                            items: [{
                                xtype         : 'combobox',
                                width         : '23%',
                                hideLabel     : true,
                                name          : 'codTlf2',
                                itemId        : 'codTlf',
                                store         : Ext.create('MyApp.store.registrobasico.telefono.CodLocalStore'),
                                displayField  :'codigo',
                                valueField    :'codigo',
                                editable      : false,
                            },{
                                xtype         : 'textfield',
                                name          : 'local',
                                width         : '76%',
                                margin        : '0 0 0 10',
                                hideLabel     : true,
                                minLength     : 7,
                                maxLength     : 7,
                                vtype         : 'numero',
                                disabled      : true
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
                    },{                
                        xtype       : 'combobox',
                        labelWidth  : 120,     
                        width       : '100%',
                        name        : 'estado',
                        fieldLabel  : 'Estado',
                        store       :  Ext.create('MyApp.store.registrobasico.estado.EstadoStore'),
                        displayField: "nombre",
                        valueField  : "id",
                        queryMode   : 'local',
                        editable    :  false,
                        value       : "LARA",
                    },{
                        xtype       : 'combobox',
                        labelWidth  : 120,     
                        width       : '100%',
                        name        : 'municipio',
                        fieldLabel  : 'Municipio',
                        allowBlank  : false,
                        store       : Ext.create('MyApp.store.registrobasico.estado.MunicipioStore'),
                        displayField: "nombre",
                        emptyText   : 'Seleccionar',
                        editable    : false,
                        valueField  : "id",
                        queryMode   :'local',
                    },{
                        xtype       : 'combobox',
                        labelWidth  : 120,     
                        width       : '100%',
                        name        : 'parroquia',
                        fieldLabel  : 'Parroquia',
                        emptyText   : 'Seleccionar',
                        editable    : false,
                        displayField: 'nombre',
                        store       : Ext.create('MyApp.store.registrobasico.estado.ParroquiaStore'),
                        valueField  : "id",
                        queryMode   : 'local',
                        disabled    : true,
                        allowBlank  : false,
                    },{
                        xtype       : 'textfield',
                        labelWidth  : 120,     
                        width       : '100%',                   
                        name        : 'direccion',
                        fieldLabel  : 'Dirección',
                        maxLength   : 255,
                        allowBlank  : false,
                        disabled    : true,
                    }]
                }]                               
            },{                
                xtype       :'fieldset',
                margin      :'10 20 0 20',
                width       :'100%',
                name        : 'fcContacto',    
                title       : 'Datos del contacto',
                bodyStyle   : 'background-color: transparent;',
                layout      : 'vbox',
                hidden      : true,
                items:[{
                    xtype       : 'fieldcontainer',
                    fieldLabel  : 'Cédula o Rif',
                    width       :'100%',
                    layout      : 'hbox',
                    labelWidth  : 120,
                    items: [{
                        xtype       : 'combobox',
                        width       : '10%',
                        hideLabel   : true,
                        name        : 'nacionalidadC',
                        value       : 'V',
                        displayField: 'id',
                        store       : Ext.create('MyApp.store.registrobasico.usuario.rifStore'),
                        valueField  : 'id',
                        editable    : false
                    },{
                        xtype       : 'textfield',
                        margins     : '0 0 0 20',
                        name        : 'cedulaC',
                        width       :'30%',
                        hideLabel   : true,
                        vtype       : 'numero',
                        maxLength   : 8,
                        minLength   : 4,
                        //allowBlank  : false,
                    },{
                        xtype   : 'button',
                        iconCls : 'buscar',
                        margins : '0 0 0 10',
                        tooltip :'Buscar contacto',
                        name    :'buscarContacto'
                    }]
                },{
                    xtype  : 'form',
                    name   : 'completo2',
                    width  :'100%',
                    border: false,
                    disabled: true,                    
                    items: [{
                        xtype       : 'fieldcontainer',
                        width       :'100%',
                        layout      : 'hbox',
                        labelWidth  : 120,
                        items: [{
                            xtype       : 'textfield',
                            fieldLabel  : 'Nombres',
                            name        : 'nombreContacto',
                            labelWidth  : 120,     
                            width       : '50%'
                        },{
                            xtype       : 'textfield',
                            fieldLabel  : 'Apellidos',
                            margin      : '0 1 0 30',
                            name        : 'apellidoContacto',
                            labelWidth  : 120,     
                            width       : '50%'
                        }]
                    },{
                        xtype       : 'fieldcontainer',
                        layout      : 'hbox',
                        width       :'100%',                      
                        items: [{
                            xtype       : 'textfield',
                            fieldLabel  : 'Correo:',
                            name        : 'correoC',
                            labelWidth  : 120,     
                            width       : '50%',
                            vtype       : 'correo',
                            //allowBlank  : false,
                        },{
                            xtype       : 'datefield',
                            margins     : '0 0 0 30',
                            width       :'30%',
                            labelWidth  : 125,     
                            fieldLabel  : 'Fecha Nacimiento.',
                            name        : 'fechanacimientoC',
                            format      : 'Y/m/d',
                            //allowBlank  : false,
                            maxValue    : valor=Ext.Date.add(new Date(), Ext.Date.YEAR, -17)                        
                        },{
                            xtype  : 'label',
                            name   : 'edadC',
                            width  :'30%',
                            margins: '5 0 0 20',
                            text   : 'Edad: 0 años.'
                        },{
                            xtype       : 'textfield',
                            name        : 'estatusContacto',
                            hidden      : true
                        }]
                    },{
                        xtype       : 'fieldcontainer',
                        layout      : 'hbox',
                        width       :'100%',
                        items: [{
                            xtype       : 'fieldcontainer',
                            layout      : 'hbox',
                            width       : '50%',
                            labelWidth  : 120,
                            fieldLabel  : 'Teléfono Celular',
                            items: [{
                                xtype         : 'combobox',
                                width         :'23%',
                                hideLabel     : true,
                                name          : 'ccodTlf1',
                                itemId        : 'codTlf',
                                store         : Ext.create('MyApp.store.registrobasico.telefono.CodCelularStore'),
                                displayField  :'codigo',
                                valueField    :'codigo',
                                editable      : false,
                            },{
                                xtype         : 'textfield',
                                name          : 'movilC',
                                margins       : '0 0 0 10',
                                width         :'76%',
                                minLength     : 7,
                                maxLength     : 7,
                                vtype         : 'numero',
                                disabled      : true
                            }]
                        },{
                            xtype       : 'fieldcontainer',
                            layout      : 'hbox',
                            margin      : '0 0 0 30',
                            width       : '50%',
                            labelWidth  : 120,
                            fieldLabel  : 'Teléfono Local',
                            items: [{
                                xtype         : 'combobox',
                                width         :'23%',
                                name          : 'ccodTlf2',
                                itemId        : 'codTlf',
                                store         : Ext.create('MyApp.store.registrobasico.telefono.CodLocalStore'),
                                displayField  :'codigo',
                                valueField    :'codigo',
                                editable      : false,
                            },{
                                xtype         : 'textfield',
                                name          : 'localC',
                                margins       : '0 0 0 10',
                                width         :'76%',
                                minLength     : 7,
                                maxLength     : 7,
                                vtype         : 'numero',
                                disabled      : true
                            }]
                        }]
                    }]
                }]
            },{
                xtype   : 'tabpanel',
                layout  : "border",
                width   : '100%',
                margin  : '10 0 0 0',
                name  : 'mitabpanel',
                hidden  : true,
                items:[{
                    xtype :'form',
                    title : 'Datos del ticket',
                    name  : 'datosTicket',                    
                    border: false,
                    width : '100%',
                    autoScroll: true,
                    items:[{
                        xtype       : 'fieldcontainer',
                        width       :'100%',
                        margin      :'10 20 0 20',
                        layout      : 'vbox',
                        items: [{
                            xtype       : 'combobox',                    
                            fieldLabel  : 'Tipo ticket',
                            width       : '100%',
                            labelWidth  : 120,                   
                            name        : 'tipoTicket',
                            queryMode   : 'local',
                            store       : Ext.create('MyApp.store.ticket.TipoTicketStore'),
                            valueField  : 'id',
                            displayField: 'nombre',
                            editable    : false,
                            emptyText   : 'Seleccionar',
                            allowBlank  : false,
                            disabled    : true,
                        },{
                            xtype       : 'combobox',                    
                            fieldLabel  : 'Sector relacionado',
                            width       : '100%',
                            labelWidth  :  120,                   
                            name        : 'sector',
                            queryMode   : 'local',
                            store       : Ext.create('MyApp.store.registrobasico.sector.SectorStore'),
                            valueField  : 'id',
                            displayField: 'nombre',                    
                            emptyText   : 'Seleccionar',
                            allowBlank  : false,
                            disabled    : true,
                            editable    : false
                        },{
                            xtype       : 'textareafield',
                            fieldLabel  : 'Descripción',                    
                            hidden      : true,
                            name        : 'descripcion',
                            labelWidth  : 120,
                            width       :'100%',
                            height      : 80
                        }]
                    }]
                }]
            },{
                xtype : 'gridTicket',            
                align :'center',
                hidden: true,            
                width : '100%',
                heigth: '100%',
            }]
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
        iconCls     : 'cerrar',
        iconAlign   : 'right',
        name        : 'salir',
        tooltip     : 'Salir',
        scale       : 'large',
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