from . import db

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(250), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    summary = db.Column(db.String(500), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    genres = db.Column(db.JSON, nullable=False)

    # Convert the model instance to a dictionary
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "image": self.image,
            "year": self.year,
            "summary": self.summary,
            "author": self.author,
            "price": self.price,
            "rating": self.rating,
            "genres": self.genres,
        }
