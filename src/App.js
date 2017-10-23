import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import styles
import './App.css';

// Import Views
import Category from './Views/Category';
import CreatePost from './Views/CreatePost';
import Home from './Views/Home';
import PostDetail from './Views/PostDetail';

class App extends Component {
  render() {
    return (
      // router magic
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/create-post' component={ CreatePost } />
          <Route exact path='/:category' component={ Category } />
          <Route path='/:category/:post_id' component={ PostDetail } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
