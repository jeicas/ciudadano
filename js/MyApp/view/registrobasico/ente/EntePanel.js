Ext.define('MyApp.view.registrobasico.ente.EntePanel', {
    extend : 'Ext.form.Panel',
    alias  : 'widget.panelEnte',
    itemId : 'panelEnte',
    requires:[
        'Ext.form.*',        
        'Ext.util.*',        
        'MyApp.view.registrobasico.ente.ListaEnte'  
    ],
    layout: {
        type: 'hbox'
    },
    autoScroll  : true,    
    initComponent: function() {
        var me = this;
        me.items = me.buildItem();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    
    buildItem : function(){
        return [{
            xtype   : 'panelListaEnte',            
            region  : 'west',
            width   : 400,
            height  : '100%',
        },{
            xtype  : 'container',
            region: 'east',
            margins: '40 0 0 60',
            //width   : 500,
            itemId :'containerUsuario',
            items:[{
                xtype   : 'fieldset',
                layout:{
                    type : 'vbox',
                    align: 'center',
                },
                title   : 'Datos del ente',
                items: [{
                    xtype       : 'textareafield',
                    fieldLabel  : 'Nombre',
                    width       : 400,
                    height      : 60,
                    maxLength   : 200,
                    name        :'nombre',
                    vtype       : 'letra',
                    allowBlank  : false
                },{
                    xtype       : 'textfield',
                    name        : 'id',
                    hidden      : true
                },{
                    xtype       : 'combobox',
                    fieldLabel  : 'Tipo Admón.',
                    width       : 400,                    
                    name        : 'tipo',
                    queryMode   : 'local',
                    store       : Ext.create('MyApp.store.registrobasico.ente.TipoAdmonStore'),
                    valueField  : 'id',
                    displayField: 'nombre',
                    editable    : false,
                    emptyText   :'Seleccionar',
                    allowBlank  : false
                },{
                    xtype       : 'combobox',
                    fieldLabel  : 'Sector',
                    width       : 400,
                    margins     : '0 0 15 0', 
                    name        : 'sector',
                    queryMode   : 'local',
                    store       : Ext.create('MyApp.store.registrobasico.sector.SectorStore'),
                    valueField  : 'id',
                    displayField: 'nombre',
                    editable    : false,
                    emptyText   :'Seleccionar',
                    allowBlank  : false,
                    multiSelect : true
                }]
            },{
                xtype   : 'fieldset',
                layout:{
                    type : 'vbox',
                },
                title   : 'Departamentos o Divisiones del ente',
                items: [{
                    xtype : 'fieldcontainer',
                    layout: 'hbox',
                    items:[{
                        xtype       : 'combobox',
                        fieldLabel  : 'Dpto. o División',
                        width       : 400,
                        labelWidth  : 100,
                        margin      : '0 0 0 0',
                        name        : 'cmbDivision',
                        queryMode   : 'local',                        
                        store       : Ext.create('MyApp.store.registrobasico.ente.DivisionStore'),
                        valueField  : 'id',
                        displayField: 'nombre',
                        editable    : false,
                        emptyText   :'Seleccionar'
                    },{
                        xtype   : 'button',
                        iconCls : 'add',
                        tooltip : 'Agregar',
                        margins : '0 0 0 0',
                        name    : 'agregarDivision'
                    }]
                }]
            },{
                xtype   : 'fieldset',       
                margins : '15 0 0 0',
                name    : 'residencia',
                title   : 'Datos de ubicación',
                layout:{
                    type : 'vbox',
                    align: 'center',
                },
                items: [{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margin      : '20 0 5 0',
                    fieldLabel  : 'Tlf Local',
                    items: [{
                        xtype           : 'combobox',
                        width           : 92,
                        hideLabel       : true,
                        name            : 'codTlf',
                        store           : Ext.create('MyApp.store.registrobasico.telefono.CodLocalStore'),
                        displayField    :'codigo',
                        valueField      :"codigo",
                        editable        : false,
                        forceSelection  : true
                    },{
                        xtype           : 'textfield',
                        name            : 'local',
                        width           : 193,
                        margin          : '0 0 0 10',
                        hideLabel       : true,
                        minLength       : 7,
                        maxLength       : 7,
                        vtype           : 'numero',
                        //disabled        : true
                    }]
                },{
                    xtype       : 'combobox',
                    width       : 400,
                    fieldLabel  : 'Estado',
                    store       :  Ext.create('MyApp.store.registrobasico.estado.EstadoStore'),
                    displayField: "nombre",
                    valueField  : "id",
                    queryMode   : 'local',
                    editable    :  false,
                    value       : "LARA",
                },{
                    xtype       : 'combobox',
                    width       : 400,
                    name        : 'municipio',
                    fieldLabel  : 'Municipio',
                    allowBlank  : false,
                    store       :  Ext.create('MyApp.store.registrobasico.estado.MunicipioStore'),
                    displayField: "nombre",
                    emptyText   : 'Seleccionar',
                    editable    :  false,
                    valueField  : "id",
                    queryMode   :'local',
                },{
                    xtype       : 'combobox',
                    width       : 400,
                    name        : 'parroquia',
                    fieldLabel  : 'Parroquia',
                    emptyText   : 'Seleccionar',
                    allowBlank  : false,
                    editable    : false,
                    displayField: 'nombre',
                    store       : Ext.create('MyApp.store.registrobasico.estado.ParroquiaStore'),
                    valueField  : "id",
                    queryMode   : 'local',
                    //disabled    : true,               
                },{
                    xtype       : 'textareafield',
                    width       : 400,
                    height      : 80,
                    labelWidth  : 100,
                    margin      : '0 0 15 0',
                    name        : 'direccion',
                    fieldLabel  : 'Dirección',
                    maxLength   : 255,
                    allowBlank  : false,
                    //disabled    : true,                
                }]
            }]
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype   : 'toolbar',
            dock    : 'bottom',
            baseCls :'price',
            height  : 40,
            items:[{
                xtype : 'tbfill'
            },{
                xtype       : 'button',
                width       : 40,
                iconCls     : 'eliminar32',
                iconAlign   : 'right',
                name        : 'eliminar',
                tooltip     : 'Eliminar',
                scale       : 'large'
            },{
                xtype       : 'button',
                width       : 40,
                iconCls     : 'clear-icon32',
                iconAlign   : 'right',
                name        : 'limpiar',
                tooltip     : 'Limpiar los campos',
                scale       : 'large',
            },{
                xtype       : 'button',
                width       : 45,
                iconCls     :'save-icon32',
                tooltip     : 'Guardar',
                name        :'guardar',
                scale       : 'large'
            }]
        }]
    }
});