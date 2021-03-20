import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import About from './components/About';
import Dyskusja from './components/Dyskusja';
import Kontakt from './components/Kontakt';
import Muzyka from './components/Muzyka';
import MuzykaItem from './components/MuzykaItem';
import DyskusjaItem from './components/DyskusjaItem';
import './App.css';
import { songsSelector, postsSelector } from './store/selectors';
import {
  getSongs,
  postSong,
  putSong,
  deleteSong,
  getPosts,
  postPost,
  putPost,
  deletePost,
  postComment,
  putComment,
  deleteComment,
} from './store/actions';

const linkStyle = {
  color: 'white',
  padding: '10px 10px',
};

const routerStyle = {
  display: 'flex',
  flexDirection: 'row',
  background: 'black',
  fontFamily: 'Helvetica',
  justifyContent: 'space-around',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  // letterSpacing: '4px',
  fontSize: 'large',
  textDecoration: 'none',
  borderSpacing: '15px,15px',
  boxShadow: '0 0 10px #000000',

};

function App(props) {
  return (
    <div className="App">
      <Router>
        <AppBar style={routerStyle}>
          <Link to="/about" style={linkStyle}>
            O mnie
          </Link>
          <Link to="/music" style={linkStyle}>
            Muzyka
          </Link>
          <Link to="/discussion" style={linkStyle}>
            Dyskusja
          </Link>
          <Link to="/contact" style={linkStyle}>
            Kontakt
          </Link>
        </AppBar>
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/discussion">
            <Dyskusja
              posts={props.posts}
              postPost={props.postPost}
              putPost={props.putPost}
              getPosts={props.getPosts}
              deletePost={props.deletePost}
            />
          </Route>
          <Route exact path="/contact">
            <Kontakt />
          </Route>
          <Route exact path="/music">
            <Muzyka
              songs={props.songs}
              postSong={props.postSong}
              putSong={props.putSong}
              getSongs={props.getSongs}
              deleteSong={props.deleteSong}
            />
          </Route>
          <Route exact path="/music/:id">
            <MuzykaItem songs={props.songs} />
          </Route>
          <Route exact path="/discussion/:id">
            <DyskusjaItem
              posts={props.posts}
              getPosts={props.getPosts}
              postComment={props.postComment}
              putComment={props.putComment}
              deleteComment={props.deleteComment}
            />
          </Route>
          <Redirect to="/about" />
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    songs: songsSelector(state),
    posts: postsSelector(state),
  };
};

const mapDispatchToProps = {
  getSongs,
  postSong,
  putSong,
  deleteSong,
  getPosts,
  postPost,
  putPost,
  deletePost,
  postComment,
  putComment,
  deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
