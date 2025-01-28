import React, { useState } from 'react';
import BookForm from '../components/BookForm'; // The BookForm component
import {Button} from 'react-bootstrap';  // Import React Bootstrap components
import { useNavigate } from 'react-router-dom';


const AddBook = () => {
  // State to store the ID of the newly created book
  const [newBookId, setNewBookId] = useState(null);
  const navigate = useNavigate();  // For handling navigation

  // Handler when book is added successfully
  const handleBookAdded = (bookId) => {
    setNewBookId(bookId);  // Store the new book's ID
  };

  const handleSeeBook = () => {
	navigate(`/view/${newBookId}`);
  };

  return (
    <div>
      {/* Pass the handler to BookForm */}
	  <br/>
      <BookForm onBookAdded={handleBookAdded} />

      {/* Conditional rendering based on whether a book was added */}
      {newBookId && (
        <div>
		  <br/>
          <p>Book added successfully! Click the link below to view the book:</p>
          <Button onClick={handleSeeBook}>See it here!</Button>
        </div>
      )}
    </div>
  );
};

export default AddBook;
