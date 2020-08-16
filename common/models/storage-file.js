'use strict';

var CONTAINER_URL = '/api/containers/'

module.exports = function(Storagefile) {

    Storagefile.upload = function(ctx, options, cb) {
      options = options || {};
      // First create a directory /server/storage/common
      //files will reside here
      ctx.req.params.container = 'common'
      // console.log(ctx.req.params);
      /**
       * ctx.req express request object
       * ctx.result express reaponse object
       */

       Storagefile.app.models.Container.upload(ctx.req, ctx.result,
        options, function(err, fileObj) {
            if(err) {
                return cb(null, {
                    status:'failed',
                    message: err.message,
                });
            } else {
                var fileInfo = fileObj.files.image;
                var obj = [];
                console.log('fileInfo', fileInfo)
                fileInfo.forEach(function(item) {
                    obj.push({
                        name: item.name,
                        type: item.type,
                        url: CONTAINER_URL + item.container + 
                        '/download/' + item.name,
                    });
                });
                Storagefile.create(obj, function(err, instances) {
                    if(err) {
                        return cb(null, {
                            message: err.message,
                        });
                    } else {
                        cb(null, instances);
                        console.log('Data sent to the database!')
                    }
                });
            }
        });
    };

    Storagefile.remoteMethod(
        'upload', {
            description: 'Upload a file',
            accepts: [
                {arg: 'ctx', type: 'object', http: {source: 'context'}},
                {arg: 'options', type: 'object', http: {source: 'query'}},
            ],
            // returning file (stream) response
            returns: {
                arg: 'fileObject', type: 'object', root: true,
            },
            // on which http method is the remoteMethod exposed
            http: {verb: 'post'},
        }
    );
};
