import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(user)
        fetch(`http://localhost:8080/register`, {
            method: "post",
            mode: "cors",
            body: JSON.stringify(user), // body data type must match "Content-type" header
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.text())
        .then(data => {
            console.log(data)
            alert(data)
            if(data === "Đăng ký thành công") {
                fetch(`http://localhost:8080/login`, {
                    method: "post",
                    mode: "cors",
                    body: JSON.stringify(user), // body data type must match "Content-type" header
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.role) {
                        // set user info to localStorage
                        localStorage.setItem('user', JSON.stringify(data));
                        // redirect to home page
                        navigate(`/`);
                    }
                })
            }
        })
        .catch(err => console.log(err))
    }

    return(
    <div className='bg1'>
        <header className="header">
                <nav className="nav">
                <li id="logo">Online Library</li>
                <li><Link to="/">Home</Link></li>
                </nav>
                <div className="nav">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                </div>
        </header>
        <div className='centerbox'>
        <form onSubmit={handleSubmit} className='centerbox_item'>
            <div className='inputbox'>
                <div className='inputbox_item'>Tên đăng nhập:</div>
                <label>
                    <input type="text" value={user.username} required="required"
                        onChange={(e) => setUser({...user, username: e.target.value})} />
                </label>
            </div>
            <div className='inputbox'>
                <div className='inputbox_item'>Mật khẩu:</div>
                <label>
                    
                    <input type="password" value={user.password} required="required"
                        onChange={(e) => setUser({...user, password: e.target.value})}/>
                </label>
            </div>
            <div className='inputbox'>
                <div className='inputbox_item'>Tên người dùng:</div>
                <label>
                    
                    <input type="text" value={user.name} required="required"
                        onChange={(e) => setUser({...user, name: e.target.value})}/>
                </label>
            </div>
            <div className='inputbox'>
                <div className='inputbox_item'>Email:</div>
                <label>
                    
                    <input type="email" value={user.email} required="required"
                        onChange={(e) => setUser({...user, email: e.target.value})}/>
                </label>
            </div>

        <br />
        <button type="submit">Đăng Ký</button>
        </form>
        </div>
    </div>
    )
}
export default Register;