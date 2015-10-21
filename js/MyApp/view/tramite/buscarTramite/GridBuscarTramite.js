Ext.define('MyApp.view.tramite.buscarTramite.GridBuscarTramite', {
    extend: 'Ext.window.Window',
    alias: 'widget.listaTramites',
    itemId: 'listaTramites',
    height: 400,
    width: 700,
    modal:true,
    title:'Catálogo de Tramites',
    requires: [
        'MyApp.view.tramite.buscarTramite.BuscarTramite'
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
            xtype: 'gridBuscarTramites',
        }]
    },
    buildDockedItems : function(){
        return []
    }
});