import React from 'react'
import { useParams} from 'react-router-dom';
import './EditBook.css';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const {bookId} = useParams()
  return (
	<div>
		<br/>
		<BookForm bookId = {bookId} />
	</div>
	
  );
};

export default EditBook;
