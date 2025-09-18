import React, { useState } from "react";

const initialBooks = [
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
];

export default function LibraryManagement() {
    const [books, setBooks] = useState(initialBooks);
    const [search, setSearch] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");

    const handleAddBook = () => {
        if (newTitle.trim() && newAuthor.trim()) {
            setBooks([...books, { title: newTitle, author: newAuthor }]);
            setNewTitle("");
            setNewAuthor("");
        }
    };

    const handleRemoveBook = (index) => {
        setBooks(books.filter((_, i) => i !== index));
    };

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ border: "2px solid #222", padding: 16, margin: 8 }}>
            <h1 style={{ marginBottom: 8 }}>Library Management</h1>
            <input
                type="text"
                placeholder="Search by title or author"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", marginBottom: 12, padding: 6, fontSize: 16 }}
            />
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <input
                    type="text"
                    placeholder="New book title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{ flex: 1, padding: 6, fontSize: 16 }}
                />
                <input
                    type="text"
                    placeholder="New book author"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    style={{ flex: 1, padding: 6, fontSize: 16 }}
                />
                <button onClick={handleAddBook} style={{ padding: "6px 16px" }}>
                    Add Book
                </button>
            </div>
            <div>
                {filteredBooks.map((book, idx) => (
                    <div
                        key={idx}
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: 6,
                            padding: 12,
                            marginBottom: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            background: "#fafafa",
                        }}
                    >
                        <span>
                            <b style={{ fontWeight: "bold" }}>
                                {book.title}
                            </b>{" "}
                            by {book.author}
                        </span>
                        <button onClick={() => handleRemoveBook(books.indexOf(book))}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}