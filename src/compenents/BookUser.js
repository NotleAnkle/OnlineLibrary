import React, { useEffect, useState } from "react";

const BookUser = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((response) => response.json())
            .then((data) => {
                setBooks(data)
                console.log(data)
            })
            .catch((err) => console.log(err))
            
    }, []);

    return (
        <div className="bookconteiner">
            {books.map((book) => (
            <a key={book.bookcode} className="content" href={`/bookview/${book.bookcode}`}>
                <img id="preview2" src={book.cover || "#"} alt="Preview" />
                <div>
                Tên sách: {book.title} <br />
                Tác giả: {book.author}
                </div>
            </a>
            ))}
        </div>

    )
}
export default BookUser