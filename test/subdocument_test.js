const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('can create subdocument', (done) => {
        const tomek = new User({ 
            name: 'Tomek', 
            posts: [{ title: 'MongoDB ninja' }] 
        });

        tomek.save()
            .then( () => User.findOne({ name: 'Tomek' }))
            .then( (user) => {
                assert(user.posts[0].title === 'MongoDB ninja');
                done();
            }); 
    });

    it('can add subdocuments to an existing record', (done) => {
        const tomek = new User({ 
            name: 'Tomek',
            posts: []
        });

        tomek.save()
            .then( () => User.findOne({ name: 'Tomek' }))
            .then( (user) => {
                user.posts.push({ title: 'Awesome features in mongoDB'});
                return user.save();
            })
            .then( () => User.findOne({ name: 'Tomek' }))
            .then( (user) => {
                assert(user.posts[0].title === 'Awesome features in mongoDB');
                done();
            });
    });

    it('can remove an existing subdocument', (done) => {
        const tomek = new User({
            name: 'Tomek',
            posts: [{ title: 'MongoDB ninja' }]
        });

        tomek.save()
            .then( () => User.findOne({ name: 'Tomek' }))
            .then( (user) => {
                user.posts[0].remove();
                return user.save();
            })
            .then( () => User.findOne({ name: 'Tomek' }))
            .then( (user) => {
                assert(user.posts.length === 0);
                done();
            });
    });
});