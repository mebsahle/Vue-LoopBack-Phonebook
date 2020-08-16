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