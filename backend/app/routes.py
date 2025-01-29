from flask import Blueprint, jsonify, request
from .models import Book
from . import db
from . import cache

main = Blueprint('main', __name__)

# ROUTES 
@main.route('/api/home', methods=['GET'])
@cache.cached(timeout=5)
def home_page():
    popular_books = Book.query.order_by(Book.rating.desc()).limit(3).all()
    print(popular_books)
    return jsonify([book.to_dict() for book in popular_books])

@main.route('/api/books/<id>', methods=['GET'])
@cache.cached(timeout=5)
def view_book(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

@main.route('/api/search_results/<query>', methods=['GET'])
def search_results(query):
    book_results = Book.query.filter(Book.title.ilike(f'%{query}%')).all()
    author_results = Book.query.filter(Book.author.ilike(f'%{query}%')).all()
    genre_results = Book.query.filter(Book.genres.cast(db.String).ilike(f'%{query}%')).all()
    return jsonify({
    	'book_results': [book.to_dict() for book in book_results], 
        'author_results': [book.to_dict() for book in author_results],
        'genre_results': [book.to_dict() for book in genre_results],
        'query': query,
    })


@main.route('/api/books', methods=['POST'])
def add_book():
    json_data = request.get_json()
    title = json_data["title"]
    image = json_data["image"]
    year = json_data["year"]
    summary = json_data["summary"]
    author = json_data["author"]
    price = json_data["price"]
    rating = json_data["rating"]
    genres = json_data["genres"]

    new_book_entry = Book(
        title = title,
        image = image,
        year = year,
        summary = summary,
        author = author,
        price = price,
        rating = rating,
        genres = genres
    )
    db.session.add(new_book_entry)
    db.session.commit()
    
    return jsonify(newBookId = new_book_entry.id)

@main.route('/api/books/<id>', methods=['DELETE'] )
def delete(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    cache.delete(f"flask_cache_view//api/books/{id}")
    cache.delete(f"flask_cache_view//api/home")
    return jsonify({"message": "Book deleted successfully", "book_id": id})

@main.route('/api/books/<id>', methods=['PUT'])
def edit_book(id):
    json_data = request.get_json()
    title = json_data["title"]
    image = json_data["image"]
    year = json_data["year"]
    summary = json_data["summary"]
    author = json_data["author"]
    price = json_data["price"]
    rating = json_data["rating"]
    genres = json_data["genres"]

    book = Book.query.get_or_404(id)

    book.title = title
    book.image = image
    book.year = year
    book.summary = summary
    book.author = author
    book.price = price
    book.rating = rating
    book.genres = genres

    db.session.commit()
    print(f"flask_cache_view//api/books/{id}")
    cache.delete(f"flask_cache_view//api/books/{id}")
    cache.delete(f"/api/books/{id}")
    cache.delete(f"flask_cache_view//api/home")
    
    return jsonify(book.to_dict())