import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';  // Import React Bootstrap components
import axios from 'axios';

const BookForm = ({ bookId, onBookAdded }) => { // Access bookId from props
  const navigate = useNavigate();

  // State to store the book data
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to store form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    year: '',
    summary: '',
    rating: '',
    price: '',
    genres: ''
  });

  // State for validation errors
  const [formErrors, setFormErrors] = useState({});

  // Fetch book details if bookId is provided
  useEffect(() => {
    if (bookId) {
      axios.get(`http://127.0.0.1:5000/api/books/${bookId}`)
        .then((response) => {
          setBook(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching book data');
          setLoading(false);
          console.error('Error fetching book:', error);
        });
    } else {
      setLoading(false); // No loading for a new book
    }
  }, [bookId]);

  // Update form data once book data has been fetched
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        image: book.image,
        year: book.year,
        summary: book.summary,
        rating: book.rating,
        price: book.price,
        genres: book.genres.join(', ')  // Join genres array with commas
      });
    }
  }, [book]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validation function
  const validateForm = () => {
    let errors = {};
    let hasError = false;

    if (!formData.title.trim()) {
      errors.title = 'Title is required.';
      hasError = true;
    }
    if (!formData.author.trim()) {
      errors.author = 'Author is required.';
      hasError = true;
    }
    if (!formData.image.trim()) {
      errors.image = 'Image URL is required.';
      hasError = true;
    }
    if (!formData.year) {
      errors.year = 'Publication Year is required.';
      hasError = true;
    } else if (isNaN(formData.year) || !Number.isInteger(Number(formData.year))) {
      errors.year = 'Publication Year must be a number.';
      hasError = true;
    }
    if (!formData.summary.trim()) {
      errors.summary = 'Summary is required.';
      hasError = true;
    }
    if (!formData.rating) {
      errors.rating = 'Rating is required.';
      hasError = true;
    } else if (isNaN(formData.rating) || Number(formData.rating) < 0 || Number(formData.rating) > 5) {
      errors.rating = 'Rating must be a number between 0 and 5.';
      hasError = true;
    }
    if (!formData.price) {
      errors.price = 'Price is required.';
      hasError = true;
    } else if (isNaN(formData.price) || Number(formData.price) < 0) {
      errors.price = 'Price must be a positive number.';
      hasError = true;
    }
    if (!formData.genres.trim()) {
      errors.genres = 'Genres are required.';
      hasError = true;
    }

    setFormErrors(errors);  // Update the form errors state
    return hasError;
  };

  // Handle form submission
  const handleSave = () => {
    if (validateForm()) return;  // Stop submission if validation fails

    const updatedBook = {
      ...formData,
      genres: formData.genres.split(',').map((genre) => genre.trim()),  // Convert genres back to array
    };

    const request = bookId
      ? axios.put(`http://127.0.0.1:5000/api/books/${bookId}`, updatedBook)
      : axios.post('http://127.0.0.1:5000/api/books', updatedBook); // POST for new book

    request
      .then((response) => {
        alert(bookId ? 'Book updated successfully!' : 'Book added successfully!');
		if (bookId) {
			navigate(`/view/${bookId}`);  // Navigate to home or list page
		} else {
			console.log(response.data)
			console.log(response.data.newBookId)
			onBookAdded(response.data.newBookId)
			resetForm()
		}
        
      })
      .catch((error) => {
        console.error('Error saving book:', error);
        alert('Error saving book.');
      });
  };

  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard your changes?")) {
      if (bookId) {
		navigate(`/view/${bookId}`); // Navigate to the home page
	  } else {
		navigate(`/`);
	  }

    }
  };

  // Function to reset the form
  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      image: '',
      year: '',
      summary: '',
      rating: '',
      price: '',
      genres: ''
    });
    setFormErrors({
      title: '',
      author: '',
      image: '',
      year: '',
      summary: '',
      rating: '',
      price: '',
      genres: ''
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
	  <div>
		<h1>{bookId ? 'Edit Book:' : 'Add New Book:'}</h1>
		<Form>
		  <Form.Group controlId="formTitle">
			<Form.Label>Title:</Form.Label>
			<Form.Control
			  type="text"
			  name="title"
			  value={formData.title}
			  onChange={handleChange}
			  isInvalid={formErrors.title}  // Show error if validation fails
			/>
			{formErrors.title && <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formAuthor">
			<Form.Label>Author:</Form.Label>
			<Form.Control
			  type="text"
			  name="author"
			  value={formData.author}
			  onChange={handleChange}
			  isInvalid={formErrors.author}
			/>
			{formErrors.author && <Form.Control.Feedback type="invalid">{formErrors.author}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formImage">
			<Form.Label>Image URL:</Form.Label>
			<Form.Control
			  type="text"
			  name="image"
			  value={formData.image}
			  onChange={handleChange}
			  isInvalid={formErrors.image}
			/>
			{formErrors.image && <Form.Control.Feedback type="invalid">{formErrors.image}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formYear">
			<Form.Label>Publication Year:</Form.Label>
			<Form.Control
			  type="text"
			  name="year"
			  value={formData.year}
			  onChange={handleChange}
			  isInvalid={formErrors.year}
			/>
			{formErrors.year && <Form.Control.Feedback type="invalid">{formErrors.year}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formSummary">
			<Form.Label>Summary:</Form.Label>
			<Form.Control
			  as="textarea"
			  rows={3}
			  name="summary"
			  value={formData.summary}
			  onChange={handleChange}
			  isInvalid={formErrors.summary}
			/>
			{formErrors.summary && <Form.Control.Feedback type="invalid">{formErrors.summary}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formRating">
			<Form.Label>Rating:</Form.Label>
			<Form.Control
			  type="text"
			  name="rating"
			  value={formData.rating}
			  onChange={handleChange}
			  isInvalid={formErrors.rating}
			/>
			{formErrors.rating && <Form.Control.Feedback type="invalid">{formErrors.rating}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formPrice">
			<Form.Label>Price:</Form.Label>
			<Form.Control
			  type="text"
			  name="price"
			  value={formData.price}
			  onChange={handleChange}
			  isInvalid={formErrors.price}
			/>
			{formErrors.price && <Form.Control.Feedback type="invalid">{formErrors.price}</Form.Control.Feedback>}
		  </Form.Group>
  
		  <Form.Group controlId="formGenres">
			<Form.Label>Genres (comma-separated):</Form.Label>
			<Form.Control
			  type="text"
			  name="genres"
			  value={formData.genres}
			  onChange={handleChange}
			  isInvalid={formErrors.genres}
			/>
			{formErrors.genres && <Form.Control.Feedback type="invalid">{formErrors.genres}</Form.Control.Feedback>}
		  </Form.Group>
		<br/>
		  <div className="button-group">
			<Button onClick={handleSave} className="btn btn-primary me-2">
			  Submit
			</Button>
			<Button onClick={handleDiscard} className="btn btn-danger">
			  Discard Changes
			</Button>
		  </div>
		</Form>
	  </div>
	);
};

export default BookForm;
