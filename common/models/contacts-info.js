'use strict';

module.exports = function(Contactsinfo) {
    // Operation hook to handle create and update info of date
    Contactsinfo.observe('before save', function filterProperties(ctx, next) {
        if(ctx.isNewInstance) {
            ctx.instance.createdAt = new Date()
        } else {
            ctx.data.updatedAt = new Date()
        } next();
    });
};
