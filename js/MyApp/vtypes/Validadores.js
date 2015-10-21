Ext.define('MyApp.vtypes.Validadores', { 
    //email: /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/,
    init: function () {
      var me = this;
        //pin number
        this.correoFn();
        this.numeroFn();
        this.letraFn();
        //etc..
      },
      correoFn:function () {
       var me = this;
       Ext.apply(Ext.form.field.VTypes, {
         correo : function(value, field) {
          return /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/.test(value);
        },
        correoText : 'No es un correo Valido,debe tener el formato ejemplo@gmail.com',
       //correoMask : /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/,
     });
     },

     numeroFn:function () {
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
       numero : function(value, field) {
        return /[0-9]/.test(value);
      },
      numeroText : 'Los datos ingresado no son válidos. Solo números',
      numeroMask : /[0-9]/,
    });
    },

    letraFn:function () {
      var me = this;
      Ext.apply(Ext.form.field.VTypes, {
       letra : function(value, field) {
        return /[A-Za-z ]/.test(value);
      },
      letraText : 'Los datos ingresado no son válidos. Solo letras',
      letraMask : /[A-Za-z ]/,
    });
    }
  });