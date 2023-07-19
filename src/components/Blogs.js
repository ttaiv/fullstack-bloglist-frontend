const Blog = ({ blog }) => (
  <div>
    {blog.title}
    {' '}
    {blog.author}
  </div>
);

const Blogs = ({ blogs }) => (
  <div>
    <h2> Blogs </h2>
    {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
  </div>
);

export default Blogs;
