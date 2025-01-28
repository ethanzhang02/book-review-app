from . import db
from app.models import Book

def populate_db():
    if not Book.query.first():
        books = {
            "1": {
                "id": 1,
                "title": "The Night She Disappeared",
                "image": "https://m.media-amazon.com/images/I/81r5OJ+ZZHL._AC_UF1000,1000_QL80_.jpg",
                "year": "2022",
                "summary": "The Night She Disappeared is a 2022 novel by Lisa Jewell. The book follows the story of a woman who disappears from a dinner party, leaving behind a baby and a bloody knife. As the investigation unfolds, secrets come to light, revealing unexpected connections. An NYT bestseller.",
                "author": "Lisa Jewell",
                "price": "16.49",
                "rating": "4.4",
                "genres": ["Mystery", "Thriller", "Suspense"]
            },
            "2": {
                "id": 2,
                "title": "The Love Hypothesis",
                "image": "https://m.media-amazon.com/images/I/71QDhHvv7wL._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Love Hypothesis is a 2021 romance novel by Ali Hazelwood. The story follows Olive Smith, a grad student who pretends to date a fellow scientist to help him win back his ex-girlfriend. As they navigate their fake relationship, real feelings develop. An NYT bestseller.",
                "author": "Ali Hazelwood",
                "price": "9.99",
                "rating": "4.7",
                "genres": ["Romance", "Contemporary", "Chick Lit"]
            },
            "3": {
                "id": 3,
                "title": "The Last Thing He Told Me",
                "image": "https://m.media-amazon.com/images/I/81kxm-KTJnL._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Last Thing He Told Me is a 2021 thriller novel by Laura Dave. The book follows Hannah Hall, whose husband disappears after leaving a note that reads 'Protect her'. As Hannah searches for answers, she uncovers secrets about her husband's past. An NYT bestseller.",
                "author": "Laura Dave",
                "price": "12.99",
                "rating": "4.3",
                "genres": ["Mystery", "Thriller", "Suspense"]
            },
            "4": {
                "id": 4,
                "title": "The Push",
                "image": "https://m.media-amazon.com/images/I/81JsHvuvlSS._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Push is a 2021 psychological thriller novel by Ashley Audrain. The story follows a woman named Blythe who becomes convinced that something is wrong with her daughter, but her concerns are dismissed by her husband and others. As events unfold, Blythe's grip on reality becomes increasingly tenuous. An NYT bestseller.",
                "author": "Ashley Audrain",
                "price": "12.99",
                "rating": "4.0",
                "genres": ["Psychological Thriller", "Domestic Fiction"]
            },
            "5": {
                "id": 5,
                "title": "Project Hail Mary",
                "image": "https://m.media-amazon.com/images/I/81zD9kaVW9L._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "Project Hail Mary is a 2021 science fiction novel by Andy Weir. \
                            The book follows Ryland Grace, a scientist who wakes up alone \
                            on a spaceship with no memory of who he is or how he got there. \
                            As he pieces together his past, he must save humanity from extinction. An NYT bestseller.",
                "author": "Andy Weir",
                "price": "16.79",
                "rating": "4.6",
                "genres": ["Science Fiction", "Thriller"]
            },
            "6": {
                "id": 6,
                "title": "The Paper Palace",
                "image": "https://m.media-amazon.com/images/I/81XWWgotqvL._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Paper Palace is a 2021 novel by Miranda Cowley Heller. \
                            The story unfolds over 24 hours at a summerhouse in Cape Cod, \
                            exploring the lives of the Gordon family and the secrets they keep. \
                            As tensions rise, long-buried truths come to light. An NYT bestseller.",
                "author": "Miranda Cowley Heller",
                "price": "13.99",
                "rating": "4.0",
                "genres": ["Fiction", "Literary Fiction"]
            },
            "7": {
                "id": 7,
                "title": "The Four Winds",
                "image": "https://m.media-amazon.com/images/I/91+CnxqOEQS._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Four Winds is a 2021 historical fiction novel by Kristin Hannah. \
                            Set during the Great Depression, the book follows Elsa Martinelli \
                            as she leaves Texas with her children in search of a better life in California. \
                            Along the way, they face hardship and resilience. An NYT bestseller.",
                "author": "Kristin Hannah",
                "price": "16.80",
                "rating": "4.7",
                "genres": ["Historical Fiction", "Literary Fiction"]
            },
            "8": {
                "id": 8,
                "title": "The Last Thing He Wanted",
                "image": "https://m.media-amazon.com/images/I/71ef0gOA4LL._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Last Thing He Wanted is a 2021 crime novel by Joan Didion. \
                            The book follows a journalist named Elena McMahon who becomes embroiled \
                            in a dangerous arms deal orchestrated by her father. As she navigates \
                            the world of international intrigue, Elena's loyalty and morality are tested. An NYT bestseller.",
                "author": "Joan Didion",
                "price": "13.99",
                "rating": "3.6",
                "genres": ["Crime Fiction", "Thriller", "Mystery"]
            },
            "9": {
                "id": 9,
                "title": "The Midnight Library",
                "image": "https://m.media-amazon.com/images/I/71ls-I6A5KL._AC_UF1000,1000_QL80_.jpg",
                "year": "2020",
                "summary": "The Midnight Library is a 2020 fantasy novel by Matt Haig. \
                            The story follows Nora Seed, who finds herself in a library between \
                            life and death. She has the chance to undo regrets by trying \
                            different versions of her life through books. An NYT bestseller.",
                "author": "Matt Haig",
                "price": "11.49",
                "rating": "4.4",
                "genres": ["Fantasy", "Fiction", "Philosophical Fiction"]
            },
            "10": {
                "id": 10,
                "title": "The Sanatorium",
                "image": "https://m.media-amazon.com/images/I/81FYi3mhzSL._AC_UF1000,1000_QL80_.jpg",
                "year": "2021",
                "summary": "The Sanatorium is a 2021 thriller novel by Sarah Pearse. \
                            The story follows detective Elin Warner as she investigates a series \
                            of murders at a remote Swiss hotel that was once a sanatorium. \
                            As Elin delves into the dark history of the hotel, she uncovers \
                            chilling secrets. An NYT bestseller.",
                "author": "Sarah Pearse",
                "price": "13.99",
                "rating": "4.1",
                "genres": ["Mystery", "Thriller", "Suspense"]
            }
        }
        for book in books.values():
            new_book = Book(
                id=book["id"],  # Use the ID from the dictionary
                title=book["title"],
                image=book["image"],
                year=book["year"],
                summary=book["summary"],
                author=book["author"],
                price=book["price"],
                genres=book["genres"],  # Store the list of genres directly in the genre column
                rating=book["rating"],
            )

            # Add the new book entry to the session
            db.session.add(new_book)
        db.session.commit()
        print("Database populated")