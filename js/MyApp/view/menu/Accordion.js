Ext.define('MyApp.view.menu.Accordion', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainmenu',
    autoScroll: true,
    layout: {
        type: 'accordion'
    },
    collapsible: false,
    hideCollapseTool: false,
    title: 'Menú de Opciones'
});