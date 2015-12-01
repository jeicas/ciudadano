Ext.define('MyApp.view.tramite.TramitePanel', {
    extend : 'Ext.form.Panel',
    alias: 'widget.panelTramite',
    autoScroll:true,
    requires: [
        'Ext.tab.Tab',
        'Ext.form.Panel',
        'MyApp.view.tramite.GridActividad',
        'MyApp.view.tramite.RecaudosLista',
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
                title       : 'Datos del Tramite',
                bodyStyle   : 'background-color: transparent;',
                layout      : 'vbox',
                //hidden      : true,
                items:[{
                    xtype       : 'textfield',                        
                    margins     : '5 0 5 0',
                    name        : 'idtramite',
                    width       : '100%',
                    hidden  : true,
                },
                {
                    xtype       : 'textfield',                        
                    margins     : '5 0 5 0',
                    name        : 'idtipotramite',
                    width       : '100%',
                    hidden  : true,
                },
                {
                    xtype       : 'textfield',                        
                    margins     : '5 0 5 0',
                    name        : 'idtipoayuda',
                    width       : '100%',
                    hidden  : true,
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                     width       : '100%',
                    margins     : '5 0 5 0',
                    items: [{
                        xtype       : 'textfield',                        
                        margins     : '5 5 5 0',
                        name        : 'codigotr',
                        width       : '45%',
                        labelWidth  : 132,
                        disabled:true,
                        fieldLabel   : 'Codigo Tramite',
                    }, 
                {
                        xtype   : 'button',
                        iconCls : 'buscar',
                        tooltip : 'Buscar',
                        margins : '5 0 0 7',
                        cls: 'icon-clave',
                        name    : 'buscarTramites',
                    },]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                     width       : '100%',
                    margins     : '5 0 5 0',
                    items: [{
                        xtype       : 'combobox',                        
                        margins     : '5 5 5 0',
                        name        : 'nombret',
                        width       : '90%',
                        labelWidth  : 132,
                        fieldLabel   : 'Nombre Tramite',
                        allowBlank  : false,
                        displayField: 'descripcion',
                        store       : Ext.create('MyApp.store.tramite.Tramiteid'),
                        valueField  : 'id',
                        queryMode   :'local',
                    },{ 
                        xtype: 'button',
                        text: '',
                        margins     : '5 5 5 0',
                        itemId: 'nuevo',
                        name: 'nuevo',
                        tooltip : 'Agregar',
                        cls: 'icon-clave',
                        iconCls: 'add' 
                  },
              { 
                        xtype: 'button',
                        text: '',
                        margins: '5 5 5 0',
                        itemId: 'editar',
                        name: 'editar',
                        hidden: true,
                        tooltip : 'Editar',
                         cls: 'icon-clave',
                        iconCls: 'edit' 
                  },]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margins     : '5 0 5 0',
                    items: [{
                        xtype       : 'combobox',
                        width       : 400,
                        labelWidth  : 132,
                        margins     : '5 0 5 0',
                        fieldLabel  : 'Tipo Tramite:',
                        emptyText   : 'Seleccionar',
                        name        : 'tipot',
                        displayField: 'nombre',
                        store       : Ext.create('MyApp.store.tramite.Tramite'),
                        valueField  : 'id',
                        queryMode   :'local',
                        allowBlank  : false,
                        editable    : false    
                    },{
                        xtype   : 'button',
                        iconCls : 'add',
                        tooltip : 'Agregar',
                        margins : '5 0 0 7',
                         cls: 'icon-clave',
                        name    : 'agregarTipoTramite',
                    },{
                        xtype   : 'button',
                        iconCls : 'edit',
                        tooltip : 'Editar',
                         cls: 'icon-clave',
                        margins : '5 0 0 7',
                        hidden: true,
                        name    : 'editarTipoTramite',
                    },{
                        xtype       : 'numberfield',
                        margins     : '0 0 0 100',
                        width       : 220,
                        fieldLabel  : 'Lapso(dias)',
                        value:0,
                        minValue:0,
                        name        : 'tiempot',                                              
                    },{
                        xtype  : 'label',
                        itemId : 'dia',
                        width  : 200,
                        margins: '5 0 0 10',
                        text   : 'día(s).'
                    }]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margins     : '0 0 0 0',
                    hideLabel   : true,
                    items: [{
                        xtype       : 'combobox',
                        fieldLabel  : 'Sector relacionado',
                        width       : 400,
                        labelWidth  : 132,
                        name        : 'sector',
                        queryMode   : 'local',
                        store       : Ext.create('MyApp.store.registrobasico.sector.SectorEnteStore'),
                        valueField  : 'id',
                        displayField: 'nombre',
                        emptyText   :'Seleccionar',
                        editable    : false,
                        allowBlank  : false,
                    }, {
                        xtype       : 'combobox',
                        name        : 'ayudat',
                        width       : 350,
                        allowBlank  : false,
                        store       : Ext.create('MyApp.store.registrobasico.sector.SectorTipoayudaStore'),
                        displayField: 'ayuda',
                        valueField  : 'idAyuda',
                    },{
                        xtype   : 'button',
                        iconCls : 'add',
                        tooltip : 'Agregar',
                        margins : '0 0 0 5',
                        hidden  : true,
                         cls: 'icon-clave',
                        name    : 'agregarAyuda'
                    }, {
                        xtype   : 'button',
                        iconCls : 'edit',
                        tooltip : 'Editar',
                        margins : '0 0 0 5',
                        hidden  : true,
                         cls: 'icon-clave',
                        name    : 'editarAyuda'
                    }]
                }] 
            },{
                xtype: 'fieldset',
                width       :'100%',
                heigth      :'100%',
                margin      :'10 30 0 30',
                title: 'Datos del Responsable del Tramite',
                layout: 'vbox',
                items: [{
                    xtype       : 'fieldcontainer',
                    name        : 'fcLaboral',
                   // disabled    : true,
                    layout      : 'hbox',
                    items: [{
                        xtype       : 'fieldcontainer',
                        layout      : 'vbox',
                        items: [{
                            xtype       : 'fieldcontainer',
                            fieldLabel  : 'Cédula o Rif y Nombre',
                            margins     : '5 0 0 0',
                            layout      : 'hbox',
                            labelWidth  : 121,
                            items: [{
                                xtype         : 'combobox',
                                name          : 'nombre',
                                width         : 550,
                                labelWidth  : 132,
                                valueField      : 'id',
                                displayField    : 'nombre',
                                margin        : '0 0 0 10',
                                allowBlank  : false,
                                vtype         : 'letra',
                                store       : Ext.create('MyApp.store.tramite.TramiteResponsable'),
                                disabled      : false,
                                queryMode       : 'local',
                        }]},{ 
                    xtype       : 'radiogroup',
                    name        : 'rgtramite',
                    allowBlank  : false,
                    labelWidth:132,
                    fieldLabel   : '¿Posee Recaudos el Tramite?',
                    margin      :'30 0 0 0',
                    width       : 300,
                    pack        : 'center',
                    columns     : 2,
                    items: [{
                        xtype     : 'radiofield',
                        name      :'seleccionar',
                        boxLabel  : 'Si',
                        inputValue: '1',
                        style     : 'margin-bottom: 10px',
                        checked   :false
                    },{
                        xtype     : 'radiofield',
                        name      :'seleccionar',
                        boxLabel  : 'No',
                        style     : 'margin-bottom: 10px',
                        inputValue: '2',
                        checked   :true
                    }]
                }]
                    }]
                }]
            }]
        },{ 
            xtype: 'tabpanel',
            layout : "border",
            itemId:'mitabpanel',
            height:430,
            activeTab: 0,
            margin:'10 0 0 0',
            width: '100%',
                items:[{
                xtype : 'recaudosLista',            
                itemId:'recaudosLista',
                align :'center',
               // hidden:true,
                activeTab: 0,
                margin:'15 0 10 0',
                width : '100%',
                heigth: '100%',
            },{
                xtype : 'gridActividad',
                margin:'15 0 10 0',  
                activeTab: 1,
                itemId:'gridActividad',
                align :'center',    
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