import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Register from '../Register/Register';
import Login from '../Login/Login';
import { CreatePost } from '../CreatePost/CreatePost';
import { UserContext } from '../../user-context';
import { UserService } from '../../services/user-service';
import Menu from '../Menu/Menu';
import Feed from '../Feed/Feed';
import AppLoader from '../AppLoader/AppLoader';
import MenuMobileTop from '../Menu/MenuMobileTop/MenuMobileTop';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import PostPage from '../PostPage/PostPage';
import ProfileEdit from '../Profile/ProfileEdit/ProfileEdit';
import './App.scss';

const initBackground = '#00b7d6';

function App() {
  const [user, setUser] = useState({});
  const [lastEdited, setLastEdited] = useState(undefined);
  const [isLoading, setLoading] = useState(true);
  const [background, setBackground] = useState(initBackground);
  const history = useHistory();

  useEffect(() => {
    async function getUser() {
      const user = await UserService.get();
      setUser(user);
      setLoading(false);
      if (!user) {
        history.push('/login');
      }
    }
    getUser();

  }, []);



  return (
    <UserContext.Provider value={{ user, setUser, setBackground, lastEdited, setLastEdited }}>
      {isLoading && <AppLoader />}


      <div style={{ backgroundColor: background }} className="App d-flex flex-column flex-lg-column-reverse justify-content-between vh-100">
        {user && < MenuMobileTop />}
        <div className="App-scroller flex-grow-1">
          <div className="App-wraper d-flex align-items-center flex-grow-1">
            <div className="container-fluid">

              <Switch>

                <Route path="/register">
                  <Register />
                </Route>

                <Route path="/login">
                  <Login />
                </Route>

                <Route path="/post/create">
                  <CreatePost />
                </Route>

                <Route path="/search">
                  <Search />
                </Route>

                <Route path="/profile/:id" >
                  <Profile />
                </Route>

                <Route path="/posts/:id" >
                  <PostPage />
                </Route>

                <Route path="/">
                  <Feed />
                </Route>


              </Switch>

            </div>
          </div>

        </div>

        {user && < Menu />}



      </div>

    </UserContext.Provider>
  );
}

export default App;
