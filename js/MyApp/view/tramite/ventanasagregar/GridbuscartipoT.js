Ext.define('MyApp.view.tramite.ventanasagregar.GridbuscartipoT', {
    extend: 'Ext.window.Window',
    alias: 'widget.gridbuscartipot',
    itemId: 'gridbuscartipot',
    height: 400,
    width: 700,
    modal:true,
    title:'Catalogo de Tipos de Tramite',
    requires: [
        'MyApp.view.tramite.ventanasagregar.Gridbuscartipotramite'
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
            xtype: 'gridbuscartipotramiet',
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