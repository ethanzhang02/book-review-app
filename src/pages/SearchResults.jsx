import './SearchResults.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import axios from 'axios'

const SearchResults = () => {
	const {query} = useParams()
	const [bookResults, setBookResults] = useState([])
	const [authorResults, setAuthorResults] = useState([])
	const [genreResults, setGenreResults] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`http://127.0.0.1:5000/api/search_results/${query}`)
		.then((response) => {
			const {book_results, author_results, genre_results} = response.data
			setBookResults(book_results)
			setAuthorResults(author_results)
			setGenreResults(genre_results)
			setLoading(false)
		})
		.catch((error) => {
			console.error('Error fetching search results', error)
			setError('Failed to fetch search results')
			setLoading(false)
		});
	}, [query]);

	const handleBookClick = (bookId) => {
		navigate(`/view/${bookId}`)
	}

	if (loading) {
		return <div> Loading... </div>;
	}
	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<br/>
			<h1>Showing results for "{query}":</h1>
			{bookResults.length + authorResults.length + genreResults.length > 0 ? (
				<div>{bookResults.length + authorResults.length + genreResults.length} results found.</div>
			) : <div>No results found.</div>}
			<br/>
			<h4>Search Results for Book Title:</h4>
			{bookResults.length > 0 ? (
				<>
					<div>{bookResults.length} results found. </div>
					<br/>
					<div className="line"></div>
					<br/>
					{bookResults.map((book) => (
						<div key={book.id}>
							<div className="row book-entry" data-id={book.id} onClick={() => handleBookClick(book.id)}>
								<div className="col-md-6">
									<div>
										Title: <span className="highlight">{book.title}</span>
									</div>
									<div className="col-md-3">
										<img src={book.image} className="img-fluid book-img-top"/>
									</div>

									<div>Author: {book.author}</div>
									<div>Genres: {book.genres.join(', ')}</div>
								</div>
							</div>
							<br/>
							<div className="line"></div>
							<br/>
						</div>
					))}
				</>
			) : <p>No results found.</p>}

			<h4>Search Results for Book Author:</h4>
			{authorResults.length > 0 ? (
				<>
					<div>{authorResults.length} results found. </div>
					<br/>
					<div className="line"></div>
					<br/>
					{authorResults.map((book) => (
						<div key={book.id}>
							<div className="row book-entry" data-id={book.id} onClick={() => handleBookClick(book.id)}>
							<div className="col-md-6">
								<div>
									Title: <span>{book.title}</span>
								</div>
								<div className="col-md-3">
									<img src={book.image} className="img-fluid book-img-top"/>
								</div>
								<div>
									Author: <span className="highlight">{book.author}</span>
								</div>
								<div>Genres: {book.genres.join(', ')}</div>
							</div>
							</div>
							<br/>
							<div className="line"></div>
							<br/>
						</div>
					))}
				</>
			) : <p>No results found.</p>}

			<h4>Search Results for Book Genre:</h4>
			{genreResults.length > 0 ? (
				<>
					<div>{genreResults.length} results found. </div>
					<br/>
					<div className="line"></div>
					<br/>
					{genreResults.map((book) => (
						<div key={book.id}>
							<div className="row book-entry" data-id={book.id} onClick={() => handleBookClick(book.id)}>
							<div className="col-md-6">
								<div>
									Title: <span>{book.title}</span>
								</div>
								<div className="col-md-3">
									<img src={book.image} className="img-fluid book-img-top"/>
								</div>
								<div>Author: {book.author}</div>
								<div>Genres: <span className="highlight">{book.genres.join(', ')}</span></div>
							</div>
							</div>
							<br/>
							<div className="line"></div>
							<br/>
						</div>
					))}
				</>
			) : <p>No results found.</p>}
		</div>

	)
}

export default SearchResults