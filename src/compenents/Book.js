import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams } from "react-router-dom";

function Book(props){
    const user = JSON.parse(localStorage.getItem('user'));
    const params = useParams();
    const [book, setBook] = useState({});
    const bookcode = params.bookcode;
    const method = bookcode < 0 ? "POST": "PUT"
    const navigate = useNavigate()

    useEffect(() => {
    fetch(`http://localhost:8080/book/${bookcode}`)
        .then((response) => response.json())
        .then((data) => setBook(data))
        .catch((err) => console.log(err))
    }, []);

    //Button
    const onSaveClick = () => {
        // send Data to backend via Post
        console.log(JSON.stringify(book));
        fetch(`http://localhost:8080/book/save/${bookcode}`, {
            method: method,
            mode: "cors",
            body: JSON.stringify(book), // body data type must match "Content-type" header
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        .then( response => response.text())
        .then(data => {
            console.log(data)
            alert(data)
        })
        .catch(err => console.log(err))
        window.location.reload()
    };

    const [isEditing, setIsEditing] = useState(false);
    const onEditClick = () => {
        setIsEditing(true)
    }

    //Header
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
    
    //Image
    const [previewImg, setPreviewImg] = useState("");
    function handleUploadClick() {
        document.getElementById('fileInput').click();
    }

    function handleFileSelected(event){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(event) {
          const base64Img = event.target.result;
          setPreviewImg(base64Img);
          setBook({...book, cover: base64Img})
          console.log(book.cover)
        };
        reader.readAsDataURL(file);
      }

    return(
        
        <div className="bg1">
            <header className="header">
                <nav className="nav">
                <li id="logo">Online Library</li>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">List</Link></li>
                </nav>
                {authNav}
            </header>
            <br />
             <h1>{bookcode < 0 ? "New Book" : `Book ${bookcode}`}</h1>
            <div className="centerbox">
                <div className="centerbox_item">

                    <div className="inputbox">
                        <div className="editbox">
                            <div>Tiêu đề: {" "}</div>
                            <input type="text" value={book.title} required = "required" disabled = {!isEditing}
                            onChange={(e) => setBook({...book, title: e.target.value})}/>
                        </div>
                        <div className="editbox">
                            <div>Tác giả: {" "}</div>
                            <input type="text" value={book.author} required = "required" disabled = {!isEditing}
                            onChange={(e) => setBook({...book, author: e.target.value})}/>
                        </div>
                    </div>
                    <div className="editbox">
                        <div>Mô tả về sách: {" "}</div>
                        <input type="text" id="textfield" disabled = {!isEditing} 
                            onChange={(e) => setBook({...book, des: e.target.value})}/>
                    </div>
                    <div className="editbox">
                        <div > Thể loại: {" "}</div>
                        <select value={book.category} required = "required" disabled = {!isEditing}
                        onChange={(e) => setBook({...book, category: e.target.value})}>
                                <option value="Tiểu thuyết">Tiểu thuyết</option>
                                <option value="Khoa học">Khoa học</option>
                                <option value="Kinh tế">Kinh tế</option>
                                <option value="Lịch sử">Lịch sử</option>
                        </select>
                    </div>
                    <div className="editbox">
                        <div>ReleaseDate: {" "}</div>
                        <input type="date" value={book.releaseDate} required = "required" disabled = {!isEditing}
                        onChange={(e) => setBook({...book, releaseDate: e.target.value})}/>
                    </div>
                    
                </div>
               
                <div className="centerbox_item"  >
                    <button onClick={handleUploadClick} disabled = {!isEditing}>Upload</button>
                    <input type="file" id="fileInput" onChange={handleFileSelected} style={{display: 'none'}} disabled = {!isEditing}/>
                    <div id="picture">
                        <img id="preview" src={previewImg || book.cover} alt="Preview" />
                    </div>
                </div>
               
            </div>
            <div id="footer">
                {book.bookcode < 0 ? (
                    <button onClick={onSaveClick}>Add</button>
                ) : (
                    <button onClick={!isEditing ? onEditClick : onSaveClick}>
                        {!isEditing ? "Edit" : "Save"}
                    </button>
                )}
            </div>

            
        </div>
    );
}
export default Book;