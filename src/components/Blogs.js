import { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const DeleteButton = ({ blog, user, deleteBlog }) => {
  const blogIsAddedByUser = user.username === blog.user.username;
  const visibility = { display: blogIsAddedByUser ? '' : 'none' };

  return (
    <button type="button" onClick={() => deleteBlog(blog)} style={visibility}>
      remove
    </button>
  );
};

const blogStyle = {
  paddingTop: '10px',
  paddingLeft: '2px',
  border: '1px solid #ccc',
  marginBottom: '5px',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
};

const Blog = ({
  blog, like, deleteBlog, user,
}) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  const titleAuthorButton = (
    <>
      {`${blog.title} `}
      {`${blog.author} `}
      <button type="button" onClick={toggleShowAll}>
        {showAll ? 'hide' : 'view'}
      </button>
    </>
  );

  if (!showAll) {
    return (
      <div id="blog-container" className="blog" style={blogStyle}>
        {titleAuthorButton}
      </div>
    );
  }
  return (
    <div id="blog-container" className="blog" style={blogStyle}>
      {titleAuthorButton}
      <br />
      {blog.url}
      <br />
      {`${blog.likes} `}
      <button type="button" onClick={() => like(blog)}>
        like
      </button>
      <br />
      {`Added by ${blog.user.name} `}
      <DeleteButton blog={blog} deleteBlog={deleteBlog} user={user} />
    </div>
  );
};

const Blogs = ({
  blogs, like, deleteBlog, user,
}) => {
  const sortedBlogs = _.sortBy(blogs, (blog) => -blog.likes);
  return (
    <div>
      <h2> Blogs </h2>
      {sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} like={like} deleteBlog={deleteBlog} user={user} />)}
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  like: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blogs;
export { Blog };
