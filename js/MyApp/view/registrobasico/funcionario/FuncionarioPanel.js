Ext.define('MyApp.view.registrobasico.funcionario.FuncionarioPanel', {
    extend : 'Ext.form.Panel',
    alias  : 'widget.panelFuncionario',
    itemId : 'panelFuncionario',
    requires: [
        'Ext.form.*',
        'Ext.grid.*',
        'Ext.tip.QuickTipManager',
        'Ext.util.*',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
        'Ext.toolbar.Paging',
        'Ext.ux.ajax.JsonSimlet',
    ],
    layout: {
        type : 'vbox',
        align: 'center',
    },
    autoScroll: true,
    title: 'Registro de Funcionario',
    initComponent: function() {
        var me   = this;
        me.items = me.buildItems();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildItems : function(){
        return [{
            xtype   : 'container',
            anchor  : '100%',
            layout  : 'vbox',
            align   : 'top',
            items: [{
                xtype   : 'fieldset',
                width   : 930,
                margins : '15 0 0 0', 
                layout  :'vbox',
                title   : 'Datos del Funcionario',
                items: [{
                    xtype       : 'fieldcontainer',
                    fieldLabel  : 'Cédula',
                    margins     : '20 0 0 0',
                    layout      : 'hbox',
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
                        xtype       : 'textfield',
                        name        : 'idF',
                        hidden      : true
                    },{
                        xtype       : 'textfield',
                        name        : 'idU',
                        hidden      : true
                    },{
                        xtype   : 'button',
                        iconCls : 'buscar',
                        margins : '0 0 0 10',
                        tooltip :'Buscar funcionario',
                        name    :'buscarFuncionario'
                    }]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margins     : '5 0 5 0',
                    items: [{
                        xtype       : 'textfield',
                        width       : 400,
                        fieldLabel  : 'Apellidos:',
                        name        : 'apellido',
                        allowBlank  : false,
                        vtype       : 'letra'
                    },{
                        xtype       : 'datefield',
                        margins     : '0 0 0 100',
                        width       : 220,
                        fieldLabel  : 'Fecha Nac.',
                        name        : 'fechanacimiento',
                        format      : 'Y/m/d',
                        allowBlank  : false,
                        maxValue    : valor=Ext.Date.add(new Date(), Ext.Date.YEAR, -17)                        
                    },{
                        xtype  : 'label',
                        itemId : 'edad',
                        width  : 200,
                        margins: '5 0 0 10',
                        text   : 'Edad: 0 años.'
                    }]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margins     : '0 0 0 0',
                    hideLabel   : true,
                    items: [{
                        xtype       : 'textfield',
                        width       : 400,
                        fieldLabel  : 'Nombres:',
                        name        : 'nombre',
                        allowBlank  : false,
                        vtype       : 'letra',
                    },{
                        xtype       : 'combobox',
                        fieldLabel  : 'Sexo:',
                        margins     : '5 0 0 100',
                        name        : 'sexo',
                        store       : Ext.create('MyApp.store.registrobasico.usuario.sexoStore'),
                        width       : 360,
                        displayField:'nombre',
                        valueField  :"codigo",
                        allowBlank  : false,
                        editable    : false
                    }]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margins     : '0 0 10 0',
                    fieldLabel  : 'Tlf Celular',
                    items: [{
                        xtype         : 'combobox',
                        width         : 92,
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
                        width         : 193,
                        margin        : '0 0 0 10',
                        hideLabel     : true,
                        minLength     : 7,
                        maxLength     : 7,
                        vtype         : 'numero',
                        disabled      : true
                    },{
                        xtype       : 'textfield',
                        fieldLabel  : 'Correo:',
                        margins     : '0 0 0 99',
                        name        : 'correo',
                        width       : 360,
                        vtype       : 'correo',
                        allowBlank  : false,
                    }]
                }]                        
            },{
                xtype   : 'fieldset',
                width   : 930,
                name    : 'residencia',
                //disabled: true,  
                title   : 'Datos de Residencia',
                items: [{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margin      : '20 0 10 0',
                    fieldLabel  : 'Tlf Local',
                    items: [{
                        xtype           : 'combobox',
                        width           : 92,
                        hideLabel       : true,
                        name            : 'codTlf2',
                        itemId          : 'codTlf',
                        store           : Ext.create('MyApp.store.registrobasico.telefono.CodLocalStore'),
                        displayField    :'codigo',
                        valueField      :'codigo',
                        editable        : false
                    },{
                        xtype           : 'textfield',
                        name            : 'local',
                        width           : 193,
                        margin          : '0 0 0 10',
                        hideLabel       : true,
                        minLength       : 7,
                        maxLength       : 7,
                        vtype           : 'numero',
                        disabled        : true
                    }]
                },{
                    xtype       : 'fieldcontainer',
                    layout      : 'hbox',
                    margin      : '0 0 10 0',
                    items: [{
                        xtype       : 'fieldcontainer',
                        layout      : 'vbox',                        
                        items: [{
                            xtype       : 'combobox',
                            width       : 400,
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
                            disabled    : true,
                        }]
                    },{
                        xtype       : 'textareafield',
                        width       : 430,
                        margin      : '0 0 0 70',
                        height      : 80,
                        labelWidth  : 80,
                        name        : 'direccion',
                        fieldLabel  : 'Dirección',
                        maxLength   : 255,
                        disabled    : true,
                    }]
                }]
            },{
                xtype: 'fieldset',
                width: 930,                
                title: 'Datos laborales',
                layout: 'vbox',
                items: [{
                    xtype       : 'fieldcontainer',
                    margin      : '10 0 0 60',
                    layout: {
                        type : 'hbox',
                        align: 'center',
                    },
                    items: [{
                        xtype       : 'radiogroup',
                        name        : 'rgAdmon',
                        allowBlank  : false,
                        width       : 500,
                        margin      : '0 0 0 150',
                        pack        : 'center',
                        columns     : 2,
                        items: [{
                            xtype     : 'radiofield',
                            name      :'seleccion',
                            boxLabel  : 'Admón. Centralizada',
                            inputValue: 'C',
                            style     : 'margin-bottom: 10px',
                            checked   :false
                        },{
                            xtype     : 'radiofield',
                            name      :'seleccion',
                            boxLabel  : 'Admón. Descentralizada',
                            style     : 'margin-bottom: 10px',
                            inputValue: 'D',
                            checked   :false
                        }]
                    }]                    
                },{
                    xtype       : 'fieldcontainer',
                    name        : 'fcLaboral',
                    disabled    : true,
                    layout      : 'hbox',
                    items: [{
                        xtype       : 'fieldcontainer',
                        layout      : 'vbox',
                        items: [{
                            xtype       : 'fieldcontainer',
                            layout      : 'hbox',
                            items: [{
                                xtype           : 'combobox',
                                width           : 850,
                                labelWidth      : 90,
                                name            :'ente',                                
                                fieldLabel      : 'Ente',
                                store           : Ext.create('MyApp.store.registrobasico.ente.EnteStore'),
                                valueField      : 'id',
                                displayField    : 'nombre', 
                                editable        : false,  
                                queryMode       : 'local',
                                triggerAction   : 'all',
                                selecOnFocus    : true,
                                allowBlank      : false
                            },{
                                xtype   : 'button',
                                iconCls : 'add',
                                tooltip : 'Agregar',
                                margins : '0 0 0 5',
                                name    : 'agregarEnte'
                            }]
                        }]
                    }/*,{
                        xtype       : 'fieldcontainer',
                        layout      : 'vbox',                        
                        items: [{
                            xtype           : 'combobox',
                            width           : 340,
                            labelWidth      : 90,
                            name            : 'categoria',
                            margin          : '20 0 0 70',
                            fieldLabel      : 'Categoria',
                            store           : Ext.create('MyApp.store.registrobasico.funcionario.CategoriaStore'),
                            valueField      : 'id',
                            displayField    : 'nombre', 
                            editable        : false,
                            queryMode       : 'local',
                            triggerAction   : 'all',
                            selecOnFocus    : true,
                            allowBlank      : false
                        }]
                    }*/]
                }]
            },{
                xtype: 'fieldset',               
                title: 'Datos del usuario',
                width: 930,   
                layout: 'vbox',
                items: [{
                    xtype           : 'textfield',
                    margin          : '10 0 0 0',
                    width           : 880,
                    labelWidth      : 90,
                    name            : 'usuario',                    
                    fieldLabel      : 'Usuario',
                    allowBlank      : false
                },{
                    xtype           : 'textfield',
                    margin          : '10 0 0 0',
                    width           : 880,
                    labelWidth      : 90,
                    name            : 'clave',                    
                    fieldLabel      : 'Contraseña',
                    inputType       :'password',
                    minLength       : 4,
                    allowBlank      : false
                },{
                    xtype           : 'textfield',
                    hidden          : true,
                    name            : 'pass',                    
                    
                },{
                    xtype           : 'textfield',
                    margin          : '10 0 0 0',
                    width           : 880,
                    labelWidth      : 90,                    
                    fieldLabel      : 'Confirmar',
                    inputType       :'password',
                    allowBlank      : false,
                    validator: function(value) {
                        var txtpassPersonal = this.previousSibling('[name=clave]');
                        return (value === txtpassPersonal.getValue()) ? true : 'No coinciden las contraseñas.'
                    }
                },{
                    xtype           : 'combobox',
                    margin          : '10 0 10 0',
                    width           : 880,
                    labelWidth      : 90,
                    name            : 'tipousuario',                    
                    fieldLabel      : 'Tipo usuario',
                    store           : Ext.create('MyApp.store.registrobasico.usuario.TipoUsuarioStore'),
                    valueField      : 'id',
                    displayField    : 'nombre', 
                    editable        : false,
                    queryMode       : 'local',
                    triggerAction   : 'all',
                    selecOnFocus    : true,
                    allowBlank      : false
                }]
            }]
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype   : 'toolbar',
            dock    : 'bottom',
            baseCls : 'price',
            height  : 40,
            items: [{
                xtype : 'tbfill'
            },{
                xtype       : 'button',
                width       :  40,
                iconCls     : 'eliminar32',
                iconAlign   : 'right',
                name        : 'eliminar',
                tooltip     : 'Eliminar funcionario',
                scale       : 'large'
            },{
                xtype       : 'button',
                width       :  45,
                iconCls     : 'buscar32',
                tooltip     : 'Catalogo funcionario',
                name        : 'catalogo',
                scale       : 'large'
            },{
                xtype       : 'button',
                width       :  40,
                iconCls     : 'clear-icon32',
                iconAlign   : 'right',
                name        : 'limpiar',
                tooltip     : 'Limpiar los campos',
                scale       : 'large'
            },{
                xtype       : 'button',
                width       :  45,
                iconCls     : 'save-icon32',
                tooltip     : 'Guardar funcionario',
                name        : 'guardar',
                scale       : 'large'
            }]
        }]
    }
});