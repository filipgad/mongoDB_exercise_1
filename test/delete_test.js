const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let tomek;

    beforeEach( (done) => {
        tomek = new User({ name: 'Tomek' });
        tomek.save()
            .then( () => done());
    });

    function assertName(operation, done) {
        operation
            .then( () => User.findOne({ name: 'Tomek'}))
            .then( (user) => {
                assert( user === null);
                done();
            });
    }

    it('model instance remove', (done) => {
        assertName(tomek.remove(), done);
    });

    it('class method remove', (done) => {
        assertName(
            User.remove({ name: 'Tomek'}),
            done
        );
    });

    it('class method findOneAndRemove', (done) => {
        assertName(
            User.findOneAndRemove({ name: 'Tomek' }),
            done
        );
    });

    it('class method findByIdAndRemove', (done) => {
        assertName(
            User.findByIdAndRemove(tomek._id),
            done
        );
    });
})