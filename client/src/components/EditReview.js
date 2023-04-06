import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const EditReview = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  // useEffect(() => {
  //   axios.get(`/api/posts/${id}`)
  //     .then(response => {
  //       setTitle(response.data.title);
  //       setContent(response.data.content);
  //     })
  //     .catch(error => {
  //       setError('Unable to fetch post.');
  //     });
  // }, [id]);

  const handleSubmit = event => {
    // event.preventDefault();
    // axios.patch(`/api/posts/${id}`, { title, content })
    //   .then(response => {
    //     history.push(`/posts/${id}`);
    //   })
    //   .catch(error => {
    //     setError('Unable to update post.');
    //   });
  };

  return (
    <div>
      <h1>Edit Review</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={event => setContent(event.target.value)}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditReview;
