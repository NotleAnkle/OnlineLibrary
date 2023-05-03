import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookView = () => {
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({});
    const params = useParams();
    const bookcode = params.bookcode;

    useEffect(() => {
        fetch(`http://localhost:8080/book/${bookcode}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            })
            .catch((err) => console.log(err))
    }, []);

    useEffect(() => {
      fetch(`http://localhost:8080/comment/${bookcode}`)
            .then(response => response.json())
            .then(data => {
              setComments(data);
            })
            .catch(err => console.log(err))
    }, []);

    //Header
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const logOut = () => {
        const emptyUser = {
          id: '',
          username: '',
          password: '',
          role: '',
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
    
      const onCommentClick = () => {
        const updatedComment = {
          ...newComment,
          user: user,
          book: book,
        };
        setNewComment(updatedComment);
        console.log(JSON.stringify(updatedComment))
        fetch(`http://localhost:8080/comment`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(updatedComment), // body data type must match "Content-type" header
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
          .then(response => response.text())
          .then(data => {
            console.log(data)
            if (data === "true") {
              window.location.reload()
            }
            else alert("Lỗi")
          })
          .catch(err => console.log(err))
      }

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
            <div className="centerbox">
                <div className="centerbox_item" id="userview">
                  <div id="userview_box">
                      <div id="userview_picture">
                        <img id="preview" src={book.cover || "#"} alt="Preview" />
                      </div>
                      <div id="userview_info">
                        <div><h1> {book.title}</h1></div>
                        <div>Tác giả: {book.author}</div>
                        <div>Thể loại: {book.category} </div>
                        <div>Số trang: {book.page}</div>
                        <div>Ngày phát hành: {book.releaseDate}</div>
                        <div>Mô tả: {book.des}</div>
                        <br />
                        <br />
                        <div>
                            <input type="number" min="0" />
                            <button>Đặt mua</button>
                        </div>
                      </div>
                  </div>

                  <div id="userview_comment">
                      {comments.map(comment => (
                        <div key={comment.id} id="comment">
                            <div>{comment.user.name}</div>
                            <div>Comment: {comment.content}</div>
                            <div>Rate: {comment.rate}/5</div>
                        </div>
                      ))}
                      <div id="comment">
                        Viết comment tại đây:
                        <input type="text" onChange={(e) => setNewComment({...newComment, content: e.target.value})}/>
                        <br />
                        Rate:
                        <input type="number" min="0" max="5" onChange={(e) => setNewComment({...newComment, rate: e.target.value})}/>/5
                        <br />
                        <button onClick={(e) => onCommentClick()}>Comment</button>
                      </div>
                  </div>
              </div>
            </div>
        </div>

    )
}
export default BookView