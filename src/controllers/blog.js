const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
// import path
const path = require('path')
// file system
const fs = require('fs')

exports.createBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("No file");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const Posting = new BlogPost({
    title: title,
    body: body,
    image: image,
    author: {
      uid: 1,
      name: "Dewaning",
    },
  });

  Posting.save()
    .then((result) => {
      const rest = {
        message: "Create Blog",
        data: result,
      };
      res.status(201).json(rest);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};


exports.getAllBlogPost = (req, res, next) => {
  // untuk menangani pagination
  // agar load data tidak terlalu berat
  // jika client tidak mengirimkan currentPage default 1
  const currentPage = req.query.page || 1;
  // jika client tidak mengirimkan perPage default 5
  const perPage = req.query.perPage || 5;
  let totalItems;

  BlogPost.find()
  .countDocuments()
  .then(count => {
    totalItems = count
    return BlogPost.find()
    .skip((parseInt(currentPage) - 1) * parseInt(perPage))
    .limit(parseInt(perPage))
  })
  .then(result => {
    res.status(200).json({
      message: 'Data Blog Post Berhasil Dipanggil',
      data: result,
      total_data: totalItems,
      per_page: parseInt(perPage),
      current_page: parseInt(currentPage)
    })
  })
  .catch(err => {
    next(err)
  })
}

exports.getBlogPostById = (req, res, next) => {
  const postId = req.params.postId
  BlogPost.findById(postId)
  .then(result => {
    if(!result) {
      const error = new Error('Blog Post tidak ditemukan')
      error.errorStatus = 404;
      throw error;
    }
    res.status(200).json({
      message: 'Data Post Blog Detail Berhasil',
      data: result
    })
  })
  .catch(err => {
    next(err)
  })
}

exports.updateBlogPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = errors.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("No file");
    err.errorStatus = 422;
    throw err;
  }

  const title = req.body.title;
  const image = req.file.path;
  const body = req.body.body;

  const postId = req.params.postId
  // then = promise
  // multiple promise
  BlogPost.findById(postId)
  .then(post => {
    if(!post) {
      const err = new Error('Blog Post tidak ditemukan');
      err.errorStatus = 404;
      throw err;
    }

    post.title = title;
    post.body = body;
    post.image = image;

    return post.save();
  })
  .then(result => {
    res.status(200).json({
      message: 'Update berhasil',
      data: result
    })
  })
  .catch(err => {
    next(err)
  })
}

exports.deleteBlogPost = (req, res, next) => {
  const postId = req.params.postId;

  BlogPost.findById(postId)
  .then(post => {
    if(!post) {
      const err = new Error('Blog Post tidak ditemukan');
      err.errorStatus = 404;
      throw err;
    }

    // delete image
    removeImage(post.image)
    // ini akan memanggil sebuah promise jadi harus di return
    // lalu result dibuatkan dan dipindah ke then
    return BlogPost.findByIdAndRemove(postId)
  })
  // membuat promise baru dengan then
  .then(result => {
    res.status(200).json({
      message: "Hapus Berhasil",
      data: result
    })
  })
  .catch(err => {
    next(err)
  })
}

const removeImage = (filePath) => {
  console.log('filepath: ', filePath)
  console.log('dir name: ', __dirname)

  filePath = path.join(__dirname, '../..', filePath)
  console.log(filePath)
  fs.unlink(filePath, err => console.log(err))
}