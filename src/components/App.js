import React, { Component } from 'react';
import axios from 'axios'; 
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
        // {                          this right here are the properties going into posts[]; 
        //   "id": 0,                 we can then pass down to children components. 
        //   "text": "Hello world!",  the Post.js is the child component here. we can render
        //   "date": "11 Jan 2018"    them in Post.Js (child) using this.props!
        // }
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
axios.get('https://practiceapi.devmountain.com/api/posts').then(results => {
// console.log(results);
this.setState({posts: results.data})}); 
}

  updatePost(id , text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, {text})
    .then(results => this.setState({posts: results.data})); 
  }

  deletePost(id ) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`)
    .then(results => this.setState({posts: results.data}))
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(results => this.setState({posts: results.data }))

  }

  render() {

    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose
          createPostFn={this.createPost} />
          
          { 
            posts.map( post => (
            <Post key={post.id}
                  text={post.text}
                  date={post.date}
                  id={ post.id }
                  updatePostFn={ this.updatePost } 
                  deletePostFn={this.deletePost}/> 
          ))
          }
        </section>
      </div>
    );
  }
}

export default App;
