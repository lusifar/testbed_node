const grpc = require('grpc');

const proto = require('../../build/src/proto/blog_pb');
const service = require('../../build/src/proto/blog_grpc_pb');

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyaWNreWNoYW8iLCJlbWFpbCI6InJpY2t5Y2hhb0BnbWFpbC5jb20iLCJpYXQiOjE2MjIzNTY3NDgsImV4cCI6MTYyMjQ0MzE0OH0.ep-KCESPCYb6NWkXDrNjcU3S8gQ74exFviO8qpp83_s';

/*
    Call the listBlog RPC method
*/
const callListBlog = () => {
  const client = new service.BlogServiceClient('localhost:50051', grpc.credentials.createInsecure());

  const req = new proto.ListBlogRequest();
  const metadata = new grpc.Metadata();
  metadata.add('authorization', `bearer ${token}`);

  const call = client.listBlog(req, metadata, () => {});

  call.on('data', (res) => {
    const blog = res.getBlog();

    console.log(
      `(id: ${blog.getId()}, author: ${blog.getAuthor()}, title: ${blog.getTitle()}, content: ${blog.getContent()})`
    );
  });

  call.on('status', (status) => {
    console.log(`The status is ${status.details}`);
  });

  call.on('error', (err) => {
    console.log(`The error is ${err.details}`);
  });

  call.on('end', () => {
    console.log('The streaming is end');
  });
};

/*
    Call the createBlog RPC method
*/
const callCreateBlog = () => {
  const client = new service.BlogServiceClient('localhost:50051', grpc.credentials.createInsecure());

  const blog = new proto.Blog();
  blog.setAuthor('ricky');
  blog.setTitle('Ricky Blog');
  blog.setContent('The first blog');

  const req = new proto.CreateBlogRequest();
  req.setBlog(blog);

  const metadata = new grpc.Metadata();
  metadata.add('authorization', `bearer ${token}`);

  client.createBlog(req, metadata, (err, res) => {
    if (!err) {
      const addedBlog = res.getBlog();

      console.log(
        `(id: ${addedBlog.getId()}, author: ${addedBlog.getAuthor()}, title: ${addedBlog.getTitle()}, content: ${addedBlog.getContent()})`
      );
    } else {
      console.error(err);
    }
  });
};

/*
    Call the readBlog RPC method
*/
const callReadBlog = () => {
  const client = new service.BlogServiceClient('localhost:50051', grpc.credentials.createInsecure());

  const req = new proto.ReadBlogRequest();
  req.setId('3');

  const metadata = new grpc.Metadata();
  metadata.add('authorization', `bearer ${token}`);

  client.readBlog(req, metadata, (err, res) => {
    if (!err) {
      const readBlog = res.getBlog();

      console.log(
        `(id: ${readBlog.getId()}, author: ${readBlog.getAuthor()}, title: ${readBlog.getTitle()}, content: ${readBlog.getContent()})`
      );
    } else {
      console.error(err);
    }
  });
};

/*
    Call the updateBlog RPC method
*/
const callUpdateBlog = () => {
  const client = new service.BlogServiceClient('localhost:50051', grpc.credentials.createInsecure());

  const blog = new proto.Blog();
  blog.setId('10');
  blog.setAuthor('ray');
  blog.setTitle('Ray Blog');
  blog.setContent('The first blog');

  const req = new proto.UpdateBlogRequest();
  req.setBlog(blog);

  const metadata = new grpc.Metadata();
  metadata.add('authorization', `bearer ${token}`);

  client.updateBlog(req, metadata, (err, res) => {
    if (!err) {
      const updatedBlog = res.getBlog();

      console.log(
        `(id: ${updatedBlog.getId()}, author: ${updatedBlog.getAuthor()}, title: ${updatedBlog.getTitle()}, content: ${updatedBlog.getContent()})`
      );
    } else {
      console.error(err);
    }
  });
};
/*
    Call the deleteBlog RPC method
*/
const callDeleteBlog = () => {
  const client = new service.BlogServiceClient('localhost:50051', grpc.credentials.createInsecure());

  const req = new proto.DeleteBlogRequest();
  req.setId('10');

  const metadata = new grpc.Metadata();
  metadata.add('authorization', `bearer ${token}`);

  client.deleteBlog(req, metadata, (err, res) => {
    if (!err) {
      const id = res.getId();

      console.log(`Blog with id: ${id} is deleted`);
    } else {
      console.error(err);
    }
  });
};

const main = () => {
  //callListBlog();
  //callCreateBlog();
  callReadBlog();
  //callUpdateBlog();
  //callDeleteBlog();
};

main();
