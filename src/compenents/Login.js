import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [user, setUserCredentials] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${user.username}, Password: ${user.password}`);
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
            window.location.reload()
        } else {
            alert('Invalid username or password');
        }
    })
    .catch(err => console.log(err))
  };

  return (
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
                    
                    <input type="text" value={user.username} 
                        onChange={(e) => setUserCredentials({...user, username: e.target.value})} />
                </label>
            </div>
        
        <br />
            <div className='inputbox'>
                <div className='inputbox_item'>Mật khẩu:</div>
                <label>
                    
                    <input type="password" value={user.password} 
                        onChange={(e) => setUserCredentials({...user, password: e.target.value})}/>
                </label>
            </div>

        <br />
        <button type="submit">Đăng nhập</button>
        </form>
        </div>
    </div>
    
  );
}

export default Login;
