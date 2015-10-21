Ext.define('MyApp.view.tramite.WinMaestroTramite', {
    extend: 'Ext.window.Window',
    alias: 'widget.winMaestroTramite',
    itemId: 'winMaestroTramite',
    title: '',
    height: 150,
    width: 330,
    modal: true,
    requires: ['Ext.form.*'],
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        var me = this;
        me.items = me.buildItem();
        me.dockedItems = me.buildDockedItems();
        me.callParent();
    },
    buildItem: function () {
        return [
            {
                xtype: 'container',
                height: 118,
                width: 281,
              
              
                layout: 'absolute',
                items: [{
                        xtype: 'form',
                        name:'formTramite',
                        height: 270,
                        width: 676,
                        layout: 'vbox',
                        items: [
                            {
                                xtype: 'textfield',
                                margin:'5 0 0 10',
                                width: 300,
                                hidden: true,
                                fieldLabel: 'id:',
                                name: 'idtramite'
                            },
                            {
                                xtype: 'textfield',
                                margin:'5 10 10 10',
                                width: 300,
                                allowBlank: false,
                                fieldLabel: 'Nombre:',
                                name: 'nombre'
                            }
                        ]// fin del contenedor


                    }]
            }



        ]
    },
    buildDockedItems: function () {
        return [{
                xtype: 'toolbar',
                flex: 1,
                dock: 'bottom',
                items: [{
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'save',
                        name: 'btnGuardar',
                        // itemId: 'addAvance', 
                        text: 'Guardar',
                        disabled: false,
                        //formBind: true,
                        scope: this,
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-limpiar',
                        name: 'btnLimpiar',
                        text: 'Limpiar'
                    }]
            }]
    }
});