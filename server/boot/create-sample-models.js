/**
 *          MySQL Corner
 * 
 * // MySQL database sample model and autoupdate
 * 
 */
module.exports = function(app) {
    app.dataSources.userDs.autoupdate('User', function(err) {
        if (err) throw err;

        // app.models.User.create([{
        //     email: 'g@gmail.com',
        //     password: 'looooop'
        // }], function(err, Users) {
        //     if(err) throw err;

        //     console.log('User model: \n', Users);
        // });
    });
};

module.exports = function(app) {
    app.dataSources.contactInfo.autoupdate('Contacts_Info', function(err) {
        if(err) throw err;

        // app.models.Contacts_Info.create([{
        //     BasicInfo: 'Abysinia Mesfin',
        //     Email: 'abyssinia@gmail.com',
        //     PhoneNumber: '+251938000001',
        //     Address: 'Jemmo 1',
        //     WorkingArea: 'Cybersecurity'
        // }], function(err, Contacts_Infos) {
        //     if(err) throw err;

        //     console.log('ContactsInfo model: \n', Contacts_Infos);
        // });
    });
};

module.exports = function(app) {
    app.dataSources.fileStorage.autoupdate('StorageFile', function(err) {
        if (err) throw err;
        
        // app.models.StorageFile.create([{
        //     name: 'OO.jpeg',
        //     type: 'image/jpeg',
        //     url: '/api/containers/common/download/OO.jpeg'
        // }], function(err, StorageFiles) {
        //     if(err) throw err;
        //     console.log('StorageFile: \n', StorageFiles)
        // });
    });
};

/**
 *          POSTGRESQL Corner
 * 
 * // Postgresql database sample model and autoupdate
 * 
 */

module.exports = function(app) {
    app.dataSources.cipgsds.autoupdate('Contacts_Info', function(err) {
        if(err) throw err;

        // app.models.Contacts_Info.create([{
        //     BasicInfo: 'Mebatsion Sahle',
        //     Email: 'mebgee@gmail.com',
        //     PhoneNumber: '+251938000002',
        //     Address: 'Alembank',
        //     WorkingArea: 'Web Development',
        //     picture: 'OO.png'
        // }], function(err, Contacts_Infos) {
        //     if(err) throw err;

        //     console.log('ContactsInfo model: \n', Contacts_Infos);
        // });
    });
};

module.exports = function(app) {
    app.dataSources.fspgsds.autoupdate('StorageFile', function(err) {
        if (err) throw err;
        
        // app.models.StorageFile.create([{
        //     name: 'OO.jpeg',
        //     type: 'image/jpeg',
        //     url: '/api/containers/common/download/OO.jpeg'
        // }], function(err, StorageFiles) {
        //     if(err) throw err;
        //     console.log('StorageFile: \n', StorageFiles)
        // });
    });
};

module.exports = function(app) {
    app.dataSources.usrpgsds.autoupdate('user', function(err) {
        if (err) throw err;

        // app.models.User.create([{
        //     username: 'Meba',
        //     email: 'mebgee@gmail.com',
        //     password: 'l00pback'
        // }], function(err, Users) {
        //     if(err) throw err;

        //     console.log('User model: \n', Users);
        // });
    });
};

module.exports = function(app) {
    app.dataSources.resumeStorage.autoupdate('StorageResume', function(err) {
        if (err) throw err;
        
        // app.models.StorageResume.create([{
        //     name: 'lunatic.docx',
        //     type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        //     url: '/api/containers/resume/download/lunatic.docx'
        // }], function(err, StorageFiles) {
        //     if(err) throw err;
        //     console.log('StorageFile: \n', StorageFiles)
        // });
    });
};
