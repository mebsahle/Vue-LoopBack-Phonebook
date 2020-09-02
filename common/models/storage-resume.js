'use strict';

var CONTAINER_URL = '/api/containers/'

module.exports = function(Storageresume) {
    Storageresume.upload = function(ctx, options, cb) {
        options = options || {};
        // First create a directory /server/storage/resume
        // resumes will put here
        ctx.req.params.container = 'resume'

        Storageresume.app.models.Container.upload(ctx.req, ctx.result,
            options, function(err, resumeObj) {
                if(err) {
                    return cb(null, {
                        staus: 'failed',
                        message: err.message,
                    });
                } else {
                    var fileInfo = resumeObj.files.file;
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
                    Storageresume.create(obj, function(err, instances) {
                        if(err) {
                            return cb(null, {
                                message: err.message,
                            });
                        } else {
                            cb(null, instances);
                            console.log('CV Data sent to the database!')
                        }
                    });
                }
            });
    };
    
    Storageresume.remoteMethod(
        'upload', {
            description: 'Upload a resume',
            accepts: [
                { arg: 'ctx', type: 'object', http: {source: 'context' }},
                { arg: 'options', type: 'object', http: {source: 'query'}},
            ],
            // returning file(stream) response
            returns: {
                arg: 'fileObject', type: 'object', root: true,
            },
            // on which http method is the remoteMethod exposed
            http: {verb: 'post'}, 
        }
    );
};
