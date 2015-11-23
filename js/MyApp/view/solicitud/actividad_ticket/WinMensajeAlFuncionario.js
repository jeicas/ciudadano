Ext.define('MyApp.view.solicitud.actividad_ticket.WinMensajeAlFuncionario', {
    extend: 'Ext.window.Window',
    alias: 'widget.winMensajeAlFuncionario',
    itemId: 'winMensajeAlFuncionario',
    title: 'Observacion al Funcionario',
    height: '50%',
    width: '60%',
    modal: true,
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
                xtype: 'form',
                layout: 'vbox',
                name: 'formulario',
                width: '100%',
                items: [{
                        xtype: 'fieldset',
                        margin: '5 5 0 5',
                        width: '100%',
                        heigth: '100%',
                        title: 'Enviar Mensaje',
                        bodyStyle: 'background-color: transparent;',
                        layout: 'hbox',
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
                                name: 'mensaje',
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
                                xtype: 'textfield',
                                margins: '0 0 0 0',
                                name: 'idFuncionario',
                                width: '100%',
                                hidden: true,
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'vbox',
                                width: '60%',
                                margins: '5 0 2 0',
                                items: [{
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        width: '100%',
                                        margins: '5 0 2 0',
                                        items: [{
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblPara',
                                                width: '10%',
                                                text: 'Para: ',
                                            },
                                            {
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblFuncionario',
                                                width: '100%',
                                                text: 'Carolkis Linares',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        width: '100%',
                                        margins: '5 0 2 0',
                                        items: [{
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblProc',
                                                width: '25%',
                                                text: 'Responsable del Procedimiento: ',
                                            },
                                            {
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblNombreProcedimiento',
                                                width: '100%',
                                                text: 'Recepcion',
                                            },
                                        ]
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
                                                width: '60%',
                                                labelWidth: 50,
                                                maxLength: 420,
                                                fieldLabel: 'Mensaje:',
                                            },
                                        ]
                                    }
                                ]
                            }, {
                                xtype: 'fieldcontainer',
                                layout: 'vbox',
                                width: '60%',
                                margins: '5 0 2 0',
                                items: [{
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        width: '100%',
                                        margins: '5 0 2 0',
                                        items: [{
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblPara2',
                                                width: '10%',
                                                text: 'Para: ',
                                            },
                                            {
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblResponsable2',
                                                width: '100%',
                                                text: 'Carolkis Linares',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        width: '100%',
                                        margins: '5 0 2 0',
                                        items: [{
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblProc',
                                                width: '25%',
                                                text: 'Responsable del Tramite: ',
                                            },
                                            {
                                                xtype: 'label',
                                                margins: '0 0 0 0',
                                                name: 'lblNombreTramite',
                                                width: '100%',
                                                text: 'Fuuuu',
                                            },
                                        ]
                                    },
                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        width: '100%',
                                        margins: '5 0 2 0',
                                        items: [{
                                                xtype: 'textarea',
                                                margins: '5 5 5 0',
                                                name: 'observacionRespuesta',
                                                width: '60%',
                                                labelWidth: 50,
                                                maxLength: 420,
                                                fieldLabel: 'respuesta:',
                                            },
                                        ]
                                    }
                                ]
                            },
                        ]
                    }, ],
            }, ]

    },
    buildDockedItems: function () {
        return [{
                xtype: 'toolbar',
                flex: 1,
                dock: 'bottom',
                height: 40,
                width: '100%',
                items: [{
                        xtype: 'tbfill'
                    },
                    {
                        xtype: 'button',
                        iconCls: 'save',
                        name: 'btnEnviar',
                        text: 'Enviar',
                        disabled: false,
                        scope: this,
                    }]

            }]
    }
});

