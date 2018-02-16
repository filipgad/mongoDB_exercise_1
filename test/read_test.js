const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let tomek;

    beforeEach( (done) => {
        tomek = new User({ name: 'Tomek'});

        tomek.save()
            .then( () => done() );
    });

    it('finds all users with a name of Tomek', (done) => {
        User.find({ name: 'Tomek' })
            .then( (users) => {
                assert(users[0]._id.toString() === tomek._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: tomek._id })
            .then( (user) => {
                assert(user.name === 'Tomek');
                done();
            });
    })
});