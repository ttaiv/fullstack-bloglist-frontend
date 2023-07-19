import { useState } from 'react';
import _ from 'lodash';

const blogStyle = {
  paddingTop: '10px',
  paddingLeft: '2px',
  border: '1px solid #ccc',
  marginBottom: '5px',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
};

const Blog = ({ blog, like }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  const handleLike = () => {
    like(blog);
  };

  const titleAuthorButton = (
    <div>
      {`${blog.title} `}
      {`${blog.author} `}
      <button type="button" onClick={toggleShowAll}>
        {showAll ? 'hide' : 'view'}
      </button>
    </div>
  );

  if (!showAll) {
    return (
      <div style={blogStyle}>
        {titleAuthorButton}
      </div>
    );
  }
  return (
    <div style={blogStyle}>
      {titleAuthorButton}
      {blog.url}
      <br />
      {`${blog.likes} `}
      <button type="button" onClick={handleLike}>
        like
      </button>
      <br />
      {blog.user.name}
    </div>
  );
};

const Blogs = ({ blogs, like }) => {
  const sortedBlogs = _.sortBy(blogs, (blog) => -blog.likes);
  return (
    <div>
      <h2> Blogs </h2>
      {sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} like={like} />)}
    </div>
  );
};

export default Blogs;
