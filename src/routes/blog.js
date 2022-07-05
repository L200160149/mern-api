const express = require('express')
const {body} = require('express-validator')

const router = express.Router();

const blogController = require('../controllers/blog');

router.post('/post', [
    body('title').isLength({min: 5}).withMessage('title minimal 5 karakter'),
    body('body').isLength({min: 5}).withMessage('body minimal 5 karakter')
], blogController.createBlogPost)

router.get('/posts', blogController.getAllBlogPost)

router.get('/post/:postId', blogController.getBlogPostById)

router.put('/post/:postId', [
    body('title').isLength({min: 5}).withMessage('title minimal 5 karakter'),
    body('body').isLength({min: 5}).withMessage('body minimal 5 karakter')
], blogController.updateBlogPost)

module.exports = router;