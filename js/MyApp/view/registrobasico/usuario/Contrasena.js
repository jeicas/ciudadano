Ext.define('MyApp.view.registrobasico.usuario.Contrasena', {
    extend: 'Ext.window.Window',
    alias: 'widget.contrasena',
    itemId: 'contrasenawindow',
    autoShow: true,
    height: 230,
    width: 400,
    modal:true,
    resizable:false,
    draggable:false,
    title: 'Cambio de contraseña del usuario',
    layout: {
        type: 'fit'
    },
     requires:[
        'MyApp.vtypes.Validadores'
    ],
    store: Ext.create('MyApp.store.session.Traersession'),
    initComponent: function() {
        var me = this;
        me.items = me.buildItem();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildItem : function(){
        return [{   
            xtype: 'form',
            id: 'contrasenaform',
            width   : '100%',
            bodyPadding: 30,
            items: [{
                xtype: 'container',
                width   : '100%',
                layout: 'vbox',
                items: [{
                    xtype: 'textfield',
                    inputType: 'password',
                    name: 'contrasenact',
                    labelWidth: 140,
                    fieldLabel: 'Contraseña actual',
                    msgTarget: 'side',
                    allowBlank: false,
                    width: '100%',
                    vtype: 'alphanum'
                },{
                    xtype: 'textfield',
                    inputType: 'password',
                    labelWidth: 140,
                    name: 'pass',
                    id:'pass',
                    fieldLabel: 'Nueva Contrasena',
                    msgTarget: 'side',
                    allowBlank: false,
                    vtype: 'alphanum',
                    width: '100%',
                    minLength:6,
                    maxLength:8,
                },{
                    xtype: 'textfield',
                    inputType: 'password',
                    labelWidth: 140,
                    name: 'confcontrasena',
                    id:'confcontrasena',
                    fieldLabel: 'Confirmar nueva Contraseña',
                    msgTarget: 'side',
                    width: '100%',
                    allowBlank  : false,
                    validator: function(value) {
                        var txtpassPersonal = this.previousSibling('[name=pass]');
                        return (value === txtpassPersonal.getValue()) ? true : 'No coincide con la Nueva Contrasena.'
                    }
                }]
            }]
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [{
                xtype: 'tbfill'
            },{
                xtype: 'button',
                name:'guardarClave',
                iconCls: 'go',
                text: "Guardar",
                disabled: true,
            }]
        }];
    }
});