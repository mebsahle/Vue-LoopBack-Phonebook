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