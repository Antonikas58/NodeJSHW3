const http = require('http');
var Datastore = require('nedb');
var Sdb = new Datastore({
    inMemoryOnly: true
});
const ODataServer = require('simple-odata-server');
const Adapter = require('simple-odata-server-nedb');
var db = new Datastore({
    inMemoryOnly: true
});


var model = {
    namespace: "liolia",
    entityTypes: {
        "UserType": {
            "_UserId": {
                "type": "Edm.String",
                key: true
            },
            "name": {
                "type": "Edm.String"
            },
            "lastname": {
                "type": "Edm.String"
            },
            "email": {
                "type": "Edm.String"
            },

 
        },
        "WorkerType": {
            "_WorkerId": {
                "type": "Edm.String",
                key: true
            },
            "name": {
                "type": "Edm.String"
            },
            "lastname": {
                "type": "Edm.String"
            },
            "email": {
                "type": "Edm.String"
            },

            "age": {
                "type": "Edm.Int32"
            },
        }
    },
    entitySets: {
        "users": {
            entityType: "liolia.UserType"
        },
        "workers": {
            entityType: "liolia.WorkerType"
        }
    }
};


var odataServer = ODataServer("http://localhost:8080")
    .model(model)
    .adapter(Adapter(function (es, cb) {
        cb(null, db)
    }));


http.createServer(odataServer.handle.bind(odataServer)).listen(8080);

console.log('application is working on port 8080');
