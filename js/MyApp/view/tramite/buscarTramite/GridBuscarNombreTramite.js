Ext.define('MyApp.view.tramite.buscarTramite.GridBuscarNombreTramite', {
    extend: 'Ext.window.Window',
    alias: 'widget.listaNombreTramites',
    itemId: 'listaNombreTramites',
    height: 400,
    width: 700,
    modal:true,
    title:'Catálogo de Tramites',
    requires: [
        'MyApp.view.tramite.buscarTramite.BuscarNombreTramite'
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
            xtype: 'gridBuscarNombreTramite',
        }]
    },
    buildDockedItems : function(){
        return []
    }
});