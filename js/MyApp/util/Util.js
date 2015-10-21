Ext.define('MyApp.util.Util', {
  statics : { 
    required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
    decodeJSON : function (text) { // #2
      var result = Ext.JSON.decode(text, true);
      if (!result){
        result = {};
        result.success = false;
        result.msg = text;
      }
      return result;
    },
    showErrorMsg: function (text) { // #3
      Ext.Msg.show({
        title:'Error!',
        msg: text,
        icon: Ext.Msg.ERROR,
        buttons: Ext.Msg.OK
      });
    },
     showbienMsg: function (text) { // #3
      Ext.Msg.show({
        title:'guardado!',
        msg: text,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
      });
    },
     showdeleteMsg: function (text) { // #3
      Ext.Msg.show({
        title:'Eliminado!',
        msg: text,
        icon: Ext.Msg.INFO,
        buttons: Ext.Msg.OK
      });
    }
  }
});