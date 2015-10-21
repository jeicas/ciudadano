Ext.define('MyApp.controller.Menu', {
  extend: 'Ext.app.Controller',
  models: [
    'menu.Root',
    'menu.Item'
  ],
  stores: [
    'Menu'
  ],
  views:  [
    'menu.Accordion',
    'menu.Item',
    'Header'
  ],
  refs: [{
    ref: 'mainPanel',
    selector: 'mainpanel'
  },{
    ref: 'appheader',
    selector: '#appheader'
  },{
    ref: 'panelBitacora',
    selector: 'panelBitacora'
  }],

  init: function(application) {
    this.control({
      "mainmenu": {
        render: this.onPanelRender
      },
      "mainmenuitem": {
        itemclick: this.onTreepanelItemClick
      }
    });
  },

  onPanelRender: function(abstractcomponent, options){
    me=this;
    me.limpiar();
    this.getMenuStore().load(function(records, op, success){
      var menuPanel = Ext.ComponentQuery.query('mainmenu')[0];
      var form = me.getAppheader();
      form.down('label[name=usuario]').setText(records[0].data.user);
      Ext.each(records, function(root){
        var menu = Ext.create('MyApp.view.menu.Item',{
          title: root.get('text'),
          iconCls: root.get('iconCls'),
        });
        Ext.each(root.items(), function(itens){          
          Ext.each(itens.data.items, function(item){
            menu.getRootNode().appendChild({
              text: item.get('text'), 
              leaf: true, 
              iconCls: item.get('iconCls'),
              id: item.get('id'),
              className: item.get('className'),
              controller: item.get('controller')
            });
          }); 
        });
        menuPanel.add(menu);        
      });      
    });
  },
  limpiar: function(){
    var mainPanel = this.getMainPanel();    
    mainPanel.removeAll();
  },

  onTreepanelSelect: function(selModel, record, index, options){
    var mainPanel = this.getMainPanel();
    var newTab = mainPanel.items.findBy(
      function (tab){ 
        return tab.title === record.get('text'); 
      }
    );
    if (!newTab){
      if(record.raw.controller!=''){
        controller = this.getController(record.raw.controller);
      }
      newTab = mainPanel.add({  
        xtype: record.raw.className,
        closable: true,
        iconCls: record.get('iconCls'),
        title: record.get('text')        
      });
    }
    mainPanel.setActiveTab(newTab); 
  },

  onTreepanelItemClick: function(view, record, item, index, event,options){
    this.onTreepanelSelect(view, record, index, options);
  }
});