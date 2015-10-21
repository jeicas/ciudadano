Ext.define('MyApp.view.tramite.ventanasagregar.GridbuscartipoA', {
    extend: 'Ext.window.Window',
    alias: 'widget.gridbuscartipoa',
    itemId: 'gridbuscartipoa',
    height: 400,
    width: 700,
    modal:true,
    title:'Catalogo de Tipos de Ayudas',
    requires: [
        'MyApp.view.tramite.ventanasagregar.Gridbuscartipoayuda'
    ],
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
        return [{
            xtype: 'gridbuscartipoayuda',
        }]
    },
    buildDockedItems : function(){
        return [{
            xtype : 'toolbar',
            flex  : 1,
            dock  : 'top',
        }]
    }
});