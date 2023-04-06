import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Review = ({ reviews }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [comment, setComment] = useState('');


  console.log(comment)

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch('/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      // Reset the comment form after successful submission
      setComment('');
    })
    .catch(error => {
      console.error(error);
    });
    setComment('');
    setShowCommentForm(false);
  }


  return (
    <div>
        <button>
              <Link to="/create">Create Review</Link>
        </button>
      <div>
        <h2>{reviews.title}</h2>
        <p>{reviews.body}</p>
        <small>Review made by {reviews.user}</small>
        <button onClick={() => setShowCommentForm(!showCommentForm)}>
          {showCommentForm ? 'Cancel' : 'Add Comment'}
        </button>
        {showCommentForm && (
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Review;
