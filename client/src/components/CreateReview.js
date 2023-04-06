import React, { useState } from 'react';

const CreateReview = ({ currentUser }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  console.log(title)
  console.log(content)


  const handleSubmit = (e) => {
    e.preventDefault();
    const review = {
      title: title,
      content: content,
      user_id: currentUser.id
    };
    fetch('/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    // Clear input fields
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>Make a Review!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Review</button>
      </form>
    </div>
  );
};

export default CreateReview;
