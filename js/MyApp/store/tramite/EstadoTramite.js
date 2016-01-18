Ext.define('MyApp.store.tramite.EstadoTramite', {
    fields  : ['id','nombre'],
    data    : [
        {id:'1',nombre:'INICIO'},
        {id:'2',nombre:'PROCESAMIENTO'},
        {id:'3',nombre:'VERIFICACION'},
        {id:'4',nombre:'FINAL'},
        {id:'5',nombre:'DOCUMENTOS'},
    ]
});