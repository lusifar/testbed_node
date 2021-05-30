const grpc = require('grpc');
const interceptors = require('@nanhuazhang/grpc-interceptors');

const proto = require('../../build/src/proto/blog_pb');
const service = require('../../build/src/proto/blog_grpc_pb');

const environment = process.env.ENVIRONMENT || 'development';
const config = require('./knexfile')[environment];
const knex = require('knex')(config);

const auth = require('../middleware/auth');

/*
    Implement the ListBlog RPC method
*/
const listBlog = (call, callback) => {
  console.log('list blog');

  knex('blogs')
    .returning(['id', 'author', 'title', 'content'])
    .then((data) => {
      for (let element of data) {
        const blog = new proto.Blog();
        blog.setId(`${element.id}`);
        blog.setAuthor(element.author);
        blog.setTitle(element.title);
        blog.setContent(element.content);

        const res = new proto.ListBlogResponse();
        res.setBlog(blog);

        call.write(res);
      }
      call.end();
    });
};

/*
    Implement the ReadBlog RPC method
*/
const readBlog = (call, callback) => {
  console.log('read blog');

  console.log(call.metadata.get('user')[0]);

  const id = call.request.getId();

  knex('blogs')
    .where({ id: +id })
    .then((data) => {
      if (data.length) {
        console.log(`find the blog with id ${id}`);

        const blog = new proto.Blog();

        blog.setId(id);
        blog.setAuthor(data[0].author);
        blog.setTitle(data[0].title);
        blog.setContent(data[0].content);

        const res = new proto.ReadBlogResponse();
        res.setBlog(blog);

        callback(null, res);
      } else {
        console.log('blog is not found');
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Blog is not found',
        });
      }
    });
};

/*
    Implement the CreateBlog RPC method
*/
const createBlog = (call, callback) => {
  console.log('create blog');

  console.log(call.metadata.get('user')[0]);

  const req = call.request;

  const blog = req.getBlog();
  knex('blogs')
    .insert({
      author: blog.getAuthor(),
      title: blog.getTitle(),
      content: blog.getContent(),
    })
    .returning(['id', 'author', 'title', 'content'])
    .then((data) => {
      const addedBlog = new proto.Blog();
      addedBlog.setId(`${data[0].id}`);
      addedBlog.setAuthor(data[0].author);
      addedBlog.setTitle(data[0].title);
      addedBlog.setContent(data[0].content);

      const res = new proto.CreateBlogResponse();
      res.setBlog(addedBlog);

      callback(null, res);
    });
};

/*
    Implement the UpdateBlog RPC method
*/
const updateBlog = (call, callback) => {
  console.log('update blog');

  console.log(call.metadata.get('user')[0]);

  const req = call.request;

  const blog = req.getBlog();
  const id = blog.getId();

  knex('blogs')
    .where({ id: +id })
    .update({
      author: blog.getAuthor(),
      title: blog.getTitle(),
      content: blog.getContent(),
    })
    .returning(['id', 'author', 'title', 'content'])
    .then((data) => {
      if (data.length) {
        const updatedBlog = new proto.Blog();
        updatedBlog.setId(data[0].id);
        updatedBlog.setAuthor(data[0].author);
        updatedBlog.setTitle(data[0].title);
        updatedBlog.setContent(data[0].content);

        const res = new proto.UpdateBlogResponse();
        res.setBlog(updatedBlog);

        callback(null, res);
      } else {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'Blod with the corresponding id is not found',
        });
      }
    });
};

/*
    Implement the DeleteBlog RPC method
*/
const deleteBlog = (call, callback) => {
  console.log('delete blog');

  console.log(call.metadata.get('user')[0]);

  const req = call.request;
  const id = req.getId();

  knex('blogs')
    .where({ id: +id })
    .delete()
    .returning(['id'])
    .then((data) => {
      if (data.length) {
        const res = new proto.DeleteBlogResponse();
        res.setId(`${id}`);

        callback(null, res);
      } else {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: 'the blog with the corresponding id is not found',
        });
      }
    });
};

module.exports = () => {
  const server = interceptors.serverProxy(new grpc.Server());
  server.addService(service.BlogServiceService, {
    listBlog,
    readBlog,
    createBlog,
    updateBlog,
    deleteBlog,
  });

  server.use(auth.verifyAuthentication);

  server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
  server.start();

  console.log('Blog server running on localhost:50051');
};
