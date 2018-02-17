const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const tomek = new User({
            name: 'Tomek',
            posts: [{ title: 'MongoDB ninja'}]
        });

        tomek.save()
            .then( () => User.findOne({ name: 'Tomek' }))
            .then( (user) => {
                assert(tomek.postCount === 1);
                done();
            });
    });
});