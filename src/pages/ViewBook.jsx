import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Button} from 'react-bootstrap';
import axios from 'axios';  // For API requests
import './ViewBook.css'; // Import your custom styles

const ViewBook = () => {
  const [book, setBook] = useState(null);  // State to store the book data
  const [loading, setLoading] = useState(true);  // State to track loading state
  const [error, setError] = useState(null);  // State to store any errors

  const {bookId} = useParams(); // Extract the book ID from the URL
  const navigate = useNavigate();  // For handling navigation

  // Fetch the book details from the Flask API
  useEffect(() => {
    axios.get(`https://book-review-app-e019.onrender.com/api/books/${bookId}`)  // API endpoint to get a single book
      .then((response) => {
        setBook(response.data);  // Set the fetched data to state
        setLoading(false);  // Stop the loading state
      })
      .catch((error) => {
        setError('Error fetching book data');
        setLoading(false);  // Stop the loading state even in case of error
        console.error('Error fetching book:', error);
      });
  }, [bookId]);  // Re-run when the bookId changes (when the route changes)

  const handleEdit = () => {
	navigate(`/edit/${bookId}`)
  }

  const handleDelete = () => {
	  if(confirm("Are you sure you want to delete this book?")) {
	  	axios.delete(`https://book-review-app-e019.onrender.com/api/books/${bookId}`)
	  	 .then((response) => {
	  		alert(response.data.message)
	  		navigate('/');
	  	 })
	  	 .catch((error) => {
	  		console.error('Error deleting book:', error);
	  		alert("An error occurred while deleting the book")
	  	 });
	  }
  }

  const handleClick = (query) => {
    navigate(`/search/${query}`)
  }

  if (loading) {
    return <div>Loading...</div>;  // Show a loading message until data is fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show an error message if there's an issue fetching the data
  }

  return (
    <div>
      <br />
      <h1>{book.title}</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="col-md-10">
            <img
              src={book.image}
              className="img-fluid"
              alt={`Book cover of ${book.title}`}
            />
            <h3>
              By{" "}
              <span className="clickable" onClick={() => handleClick(book.author)}>
                {book.author}
              </span>
            </h3>
            <div>Published in {book.year}</div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row">
            <div className="bold">Description:</div>
            <div>{book.summary}</div>
          </div>
          <br />
          <br />
          <div className="row">
            <h4 className="bold rating">Rating: {book.rating}/5</h4>
            <div>Price: {book.price}</div>
          </div>
          <br />
          <div>
            <div className="bold">Genres:</div>
            <ul>
              {book.genres.map((genre, index) => (
                <li key={index} className="clickable" onClick={() => handleClick(genre)}>
                  {genre}
                </li>
              ))}
            </ul>
          </div>
          <Button
            variant="primary"
            id="edit-button"
            onClick={handleEdit}
			      className="me-2"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            id="delete-button"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
