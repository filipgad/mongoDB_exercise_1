const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let tomek, blogPost;

    beforeEach( (done) => {
        tomek = new User({ name: 'Tomek' });
        blogPost = new BlogPost({ title: 'MongoDB ninja', content: 'How to achieve a ninja level in MongoDB?' });

        tomek.blogPosts.push(blogPost);

        Promise.all([ tomek.save(), blogPost.save() ])
            .then( () => done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        tomek.remove()
            .then( () => BlogPost.count())
            .then( (count) => {
                assert( count === 0);
                done();
            });
    });
});