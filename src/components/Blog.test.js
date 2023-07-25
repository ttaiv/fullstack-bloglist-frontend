/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Blog } from './Blogs';
import BlogForm from './BlogForm';

describe('Testing blog rendering', () => {
  const user = {
    name: 'Test_user',
    username: 'test_username',
  };
  const blog = {
    title: 'Nice blogpost',
    author: 'Me',
    url: 'https://niceplace.com',
    likes: 11,
    user,
  };

  test('By default renders title but not url', () => {
    render(<Blog blog={blog} />);
    screen.getByText('Nice blogpost', { exact: false });

    const urlRegex = /https:\/\/niceplace\.com/;
    const element = screen.queryByText(urlRegex);
    expect(element).toBeNull();
  });

  test('Renders all blog information after button click', async () => {
    render(<Blog blog={blog} user={user} />);
    const testUser = userEvent.setup();
    const button = screen.getByText('view');
    await testUser.click(button);
    // Test that more information is shown.
    screen.getByText('https://niceplace.com', { exact: false });
    screen.getByText('11', { exact: false });
    screen.getByText('Test_user', { exact: false });
  });
  test('Pressing like twice leads to exactly two event handler calls', async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} user={user} like={mockHandler} />);
    const testUser = userEvent.setup();
    const viewButton = screen.getByText('view');
    await testUser.click(viewButton);
    const likeButton = screen.getByText('like');
    await testUser.click(likeButton);
    await testUser.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe('Testing new blog form', () => {
  test('Event handler is called with right blog information', async () => {
    const mockAddBlog = jest.fn();
    const { container } = render(<BlogForm addNewBlog={mockAddBlog} />);

    const titleInput = container.querySelector('#title-input');
    const authorInput = container.querySelector('#author-input');
    const urlInput = container.querySelector('#url-input');
    const createButton = screen.getByText('create');

    const user = userEvent.setup();
    await user.type(titleInput, 'test title');
    await user.type(authorInput, 'great author');
    await user.type(urlInput, 'nice url');
    await user.click(createButton);

    expect(mockAddBlog.mock.calls).toHaveLength(1);
    const newBlogInfo = mockAddBlog.mock.calls[0][0];
    expect(newBlogInfo.title).toBe('test title');
    expect(newBlogInfo.author).toBe('great author');
    expect(newBlogInfo.url).toBe('nice url');
  });
});
