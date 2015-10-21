Ext.define('MyApp.view.registrobasico.usuario.UsuarioPanel', {
    extend : 'Ext.form.Panel',
    alias  : 'widget.panelUsuario',
    itemId : 'panelUsuario',
    requires:[
        'Ext.form.*',
        'Ext.tip.QuickTipManager',
        'Ext.util.*',
        'Ext.ux.ajax.SimManager',
        'Ext.ux.grid.FiltersFeature',
        'Ext.toolbar.Paging',
        'Ext.ux.ajax.JsonSimlet',
        'MyApp.view.registrobasico.usuario.UsuarioLista'
    ],
    layout:'hbox',
    title : 'Registro de Usuario',

    initComponent: function() {
        var me   = this;
        me.items = me.buildItems();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildItems : function(){
        return [{
            xtype   : 'usuarioLista',            
            region  : 'west',
            width   : 400,
            height  : '100%',
        },{
            xtype  : 'container',
            margins: '80 0 0 80',
            itemId :'containerUsuario',
            region : 'east',
            items:[{
                xtype   : 'fieldset',
                width   : 450,
                layout:{
                    type : 'vbox',
                    align: 'center',
                },
                title   : 'Datos del Usuario',
                items: [{
                    xtype       : 'fieldcontainer',
                    fieldLabel  : 'Cédula',
                    margins     : '20 0 0 0', 
                    layout      : 'hbox',
                    items:[{
                        xtype       : 'combobox',
                        width       : 70,
                        hiddenLabel : true,
                        name        : 'nacionalidad',
                        value       : 'V',
                        displayField: 'id',
                        store       : Ext.create('MyApp.store.registrobasico.usuario.rifStore'),
                        valueField  : 'id',
                        forceSelect : true,
                        readOnly    : true
                    },{
                        xtype       : 'textfield',
                        name        : 'cedula',                        
                        width       : 200,
                        margins : '0 0 0 5',
                        hiddenLabel : true,
                        readOnly    : true
                    }]
                },{
                    xtype   : 'fieldcontainer', 
                    name    :'datos',
                    layout  :'vbox',
                    items:[{
                        xtype       : 'textfield',
                        fieldLabel  : 'Nombres',
                        width       : 380,
                        name        :'nombre',
                        readOnly    : true
                    },{
                        xtype       : 'textfield',
                        name        : 'funcionario',
                        hidden      : true
                    },{
                        xtype       : 'textfield',
                        name        : 'idU',
                        hidden      : true
                    },{
                        xtype       : 'textfield',
                        fieldLabel  : 'Apellidos',
                        width       : 380,
                        name        :'apellido',
                        readOnly    : true,
                    },{
                        xtype       : 'textfield',
                        fieldLabel  : 'E-mail',
                        width       : 380,
                        name        :'correo',
                        readOnly    : true,
                    },{
                        xtype       : 'textfield',
                        fieldLabel  : 'Usuario',
                        width       : 380,
                        name        :'usuario',
                        allowBlank  : false
                    },{
                        xtype       : 'textfield',
                        fieldLabel  : 'Contraseña',
                        width       : 380,
                        name        :'clave',
                        inputType   :'password',
                        vtype       :'alphanum',
                        minLength   : 4,
                        allowBlank  : false
                    },{
                        xtype       : 'textfield',
                        fieldLabel  : 'Confirmar',
                        width       : 380,
                        name        :'reclave',
                        inputType   :'password',
                        allowBlank  : false,
                        validator: function(value) {
                            var txtpassPersonal = this.previousSibling('[name=clave]');
                            return (value === txtpassPersonal.getValue()) ? true : 'No coinciden las contraseñas.'
                        }
                    },{
                        xtype       : 'combobox',
                        fieldLabel  : 'Tipo usuario',
                        width       : 380,
                        name        : 'tipousuario',
                        queryMode   : 'local',
                        store       : Ext.create('MyApp.store.registrobasico.usuario.TipoUsuarioStore'),
                        valueField  : 'id',
                        displayField: 'nombre',
                        emptyText   : 'Seleccionar',
                        forceSelect : true,
                        allowBlank  : false
                    },{
                        xtype       : 'combobox',
                        fieldLabel  : 'Estatus',
                        width       : 380,
                        margins     : '0 0 15 0', 
                        name        : 'uestatus',
                        queryMode   : 'local',
                        store       : Ext.create('MyApp.store.registrobasico.usuario.EstatusStore'),
                        valueField  : 'id',
                        displayField: 'nombre',
                        emptyText   : 'Seleccionar',
                        forceSelect : true,
                        allowBlank  : false
                    }]
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
                iconCls     :'clear-icon32',
                iconAlign   : 'right',
                name        :'limpiar',
                tooltip     : 'Limpiar los campos',
                scale       : 'large',
            },{
                xtype       : 'button',
                width       : 45,
                iconCls     : 'save-icon32',
                tooltip     : 'Guardar usuario',
                name        : 'guardar',
                scale       : 'large'
            }]
        }]
    }
});