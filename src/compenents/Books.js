import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Books(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [books, setBooks] = useState([]);
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const navigate = useNavigate()

    const onViewClick = (bookcode) => {
        navigate(`/book/${bookcode}`)
        // có thể dùng thẻ link
    }

    const onDeleteClick = (bookcode) => {
        const confirmation = window.confirm("Are you sure you want to delete this book?");
        if(confirmation){
            fetch(`http://localhost:8080/book/${bookcode}`, {
            method: "DELETE",
            mode: "cors",
        })
        .then( response => response.text())
        .then(data => {
            console.log(data)
            alert(data)
        })
        .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
		setBooks(data);
	}, [data]);

    useEffect(() => {
		setBooks(
			data.filter(
				(book) =>
					book.title.toLowerCase().includes(text.toLowerCase()) ||
					book.author.toLowerCase().includes(text.toLowerCase())
			)
		);
	}, [text,data]);

    const logOut = () => {
        const emptyUser = {
          id: '',
          username: '',
          password: '',
          role: '',
          email: ''
        };
        localStorage.setItem('user', JSON.stringify(emptyUser));
        navigate("/")
        window.location.reload()
        
      }

    const authNav = user.id ? (
        <div className="nav">
          <li> <Link> {user.name} {user.role}</Link></li>
          <li> <Link onClick={(e) => logOut()}>Logout</Link> </li>
        </div>
      ) : (
        <div className="nav">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </div>
      );
    return(
        
        <div className="bg2">
            <header className="header">
                <nav className="nav">
                <li id="logo">Online Library</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">List</Link></li>
                </nav>
                {authNav}
            </header>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
            <div>
                <h1>List Books</h1>
            </div>
            <div >
                <input type="text" 					
                    onChange={(e) => {
						setText(e.target.value);
					}}/>
                <button>Search By Name</button>
                <br />
            </div>
            <br/>
            <table className="table table-striped table-bordered container">
                <thead className="table-dark">
                    <tr>
                    <th>Cover</th>
                    <th>BookCode</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Page</th>
                    <th>ReleaseDate</th>
                    <th>Action</th>
                    </tr>
                </thead>
                
                <tbody>
                    {books.map(book => (
                        <tr key={book.bookcode}>
                            <td><img id="preview2" src={book.cover || '#'} alt="Preview" /></td>
                            <td>{book.bookcode}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>{book.page}</td>
                            <td>{book.releaseDate}</td>
                            {user.role === "admin" &&
                                <>
                                    <button className="btn btn-primary" onClick={() => onViewClick(book.bookcode)}>View</button>
                                    <button className="btn btn-danger" onClick={() => onDeleteClick(book.bookcode)}>Delete</button>
                                </>
                            }
                        </tr>
                    ))}
                </tbody> 
            </table>
            {user.role === "admin" &&
                <>
                    <Link to = "/book/-1">
                        <button className="btn btn-primary" >Add</button>
                    </Link>
                </>
            }
	    </div>
    )
}
export default Books;