import React from 'react';
import { Link} from 'react-router-dom';
import './style.css';
import BookUser from './BookUser';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: JSON.parse(localStorage.getItem('user')) || {}
        };
      }
    
    
  render() {
    const user = this.state.user;
    const logOut = () => {
        const emptyUser = {
          id: '',
          username: '',
          password: '',
          role: '',
          email: ''
        };
        localStorage.setItem('user', JSON.stringify(emptyUser));
        window.location.reload()
      }
    const authNav = this.state.user.id ? (
        <div className="nav">
          <li> <Link> Welcome, {this.state.user.name}!</Link></li>
          <li> <Link onClick={(e) => logOut()}>Logout</Link> </li>
        </div>
      ) : (
        <div className="nav">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </div>
      );
    return (
        <div id="main">
            <header className="header">
                <nav className="nav">
                <li id="logo">Online Library</li>
                <li><Link to="/">Home</Link></li>
                {user.role === "admin" ? (
                  <li><Link to="/books">List</Link></li>
                ):<></>}
                <li><a href="/#footer">Contact</a></li>
                </nav>
                {authNav}
            </header>
            <div className="container">
                <BookUser/>
            </div>
            <div id='footer'>
                <br/>
                <p id='logo'>Phạm Đăc Anh-B20DCCN070</p>
            </div>
        </div>
    );
  }
}

export default Home;