const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
    const tomek = new User({ name: 'Tomek' });

    tomek.save()
        .then( () => {
            assert(!tomek.isNew);
            done();
        });
    });
});