import React, { useState, useEffect } from 'react';
import axios from 'axios';  // For API requests
import { useNavigate } from 'react-router-dom';  // For navigation (React Router)

const HomePage = () => {
	const navigate = useNavigate();  // For handling navigation
    const [popularBooks, setPopularBooks] = useState([]);

    // Fetch popular books from the Flask API
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/home')  // API endpoint to get popular books
            .then((response) => {
                setPopularBooks(response.data);  // Set the fetched data to state
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    }, []);  // Empty dependency array ensures this runs only once after initial render

	const handleBookClick = (bookId) => {
		navigate(`/view/${bookId}`)
	}

    return (
        <div className="equal-height-columns">
            <br />
            <div className="row">
                <h1>Discover the Latest NYT Bestselling Books</h1>
                <h6 className="test">
                    From thrilling fiction to compelling non-fiction, explore captivating
                    reads that promise to spark your imagination and stir your soul. Find your next page-turner today!
                </h6>
            </div>
            <br />
            <div className="row">
                {popularBooks.length > 0 ? (
                    popularBooks.map((book) => (
                        <div key={book.id} className="col-md-3 book-entry" data-id={book.id} onClick={() => handleBookClick(book.id)}>
                            <h5>{book.title}</h5>
                            <img
                                src={book.image}
                                className="img-fluid book-img-top"
                                alt={`Book cover of ${book.title}`}
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>  
                )}
            </div>
        </div>
    );
};

export default HomePage;
