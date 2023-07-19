import { useState } from 'react';

const blogStyle = {
  paddingTop: '10px',
  paddingLeft: '2px',
  border: '1px solid #ccc',
  marginBottom: '5px',
  backgroundColor: '#f9f9f9',
  borderRadius: '5px',
};

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  const handleLike = (title) => {
    console.log('like for', title);
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
      <button type="button" onClick={() => handleLike(blog.title)}>
        like
      </button>
      <br />
      {blog.user.name}
    </div>
  );
};

const Blogs = ({ blogs }) => (
  <div>
    <h2> Blogs </h2>
    {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
  </div>
);

export default Blogs;
