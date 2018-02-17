const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
    let tomek, blogPost, comment;

    beforeEach( (done) => {
        tomek = new User({ name: 'Tomek' });
        blogPost = new BlogPost({ title: 'MongoDB ninja', content: 'How to achieve a ninja level in MongoDB?' });
        comment = new Comment({ content: 'Very good post!' });

        tomek.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = tomek;

        Promise.all([ tomek.save(), blogPost.save(), comment.save() ])
            .then( () => done());
    });

    it('saves a relation between a user and blogpost', (done) => {
        User.findOne({ name: 'Tomek' })
            .populate('blogPosts')
            .then( (user) => {
                assert(user.blogPosts[0].title === 'MongoDB ninja');
                done();
            });
    });

    it('saves a full relations graph', (done) => {
        User.findOne({ name: 'Tomek' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then( (user) => {
                assert(user.name === 'Tomek');
                assert(user.blogPosts[0].title === 'MongoDB ninja');
                assert(user.blogPosts[0].comments[0].content === 'Very good post!');
                assert(user.blogPosts[0].comments[0].user.name === 'Tomek');
                done();
            });
    });
});