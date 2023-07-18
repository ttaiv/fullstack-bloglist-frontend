/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

const Blog = ({ blog }) => (
  <div>
    {blog.title}
    {' '}
    {blog.author}
  </div>
);

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

const Blogs = ({ user, blogs }) => {
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2> Blogs </h2>
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default Blogs;
