const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
    let tomek;

    beforeEach( (done) => {
        tomek = new User({ name: 'Tomek', likes: 0});
        tomek.save()
            .then( () => done());
    });

    function assertName(operation, done) {
        operation
            .then( () => User.find({}))
            .then( (users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Dawid');
                done();
            });
    }

    it('instance type using set and save', (done) => {
        tomek.set('name', 'Dawid');
        assertName(tomek.save(), done);
    });

    it('A model instance can update', (done) => {
        assertName(tomek.update({ name: 'Dawid'}), done);
    });

    it('A model class can update', (done) => {
        assertName(
            User.update({ name: 'Tomek' }, { name: 'Dawid' }),
            done
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Tomek' }, { name: 'Dawid' }),
            done
        );
    });

    it('A model class can update find a record with Id and update', (done) => {
        assertName(
            User.findByIdAndUpdate(tomek._id, { name: 'Dawid'}),
            done
        );
    });

    it('The user can have their postcount incremented by 1', (done) => {
        User.update({ name: 'Tomek' }, { $inc: { likes: 1 } })
            .then( () => User.findOne({ name: 'Tomek'}))
            .then( (user) => {
                assert(user.likes === 1);
                done();
            });
    });
});