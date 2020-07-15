import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import CreatePost from './components/CreatePost/CreatePost';
import { UserContext } from './user-context';
import { UserService } from './services/user-service';
import Menu from './components/Menu/Menu';
import Feed from './components/Feed/Feed';
import Loader from './components/Loader/Loader';
import MenuMobileTop from './components/Menu/MenuMobileTop/MenuMobileTop';
import CropCreate from './components/CreatePost/CropCreate/CropCreate';
import './App.scss';
import Profile from './components/Profile/Profile';

const initBackground = '#00b7d6';

function App() {
  const [user, setUser] = useState({});
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
    <UserContext.Provider value={{ user, setUser, setBackground }}>
      <Loader isLoading={isLoading} />

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

                <Route path="/profile">
                  <Profile />
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
