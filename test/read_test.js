const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    let tomek, dawid, kasia, basia;

    beforeEach( (done) => {
        tomek = new User({ name: 'Tomek' });
        dawid = new User({ name: 'Dawid' });
        kasia = new User({ name: 'Kasia' });
        basia = new User({ name: 'Basia' });

        Promise.all([ tomek.save(), dawid.save(), kasia.save(), basia.save() ])
            .then( () => done());
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
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then( (users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Dawid');
                assert(users[1].name === 'Kasia');
                done();
            });
    });
});