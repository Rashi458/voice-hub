import React,{Component} from 'react'
import '../style/comments.css'
class CommentBox extends Component {
  constructor() {
    super();
    
    this.state = {
      showComments: false,
      comments: [
         {id: 1, author: "etherious_aman", body: "soothing"},
        // {id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow..."},
        // {id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
      ]
    };
  }
  addComment(author, body) {
    const comment = {
      author,
      body
    };
    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }
  
  handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }
  
  getComments() {    
    return this.state.comments.map((comment) => { 
      return (
        
        <Comment 
          author={comment.author} 
          body={comment.body} 
         />
      ); 
    });
  }

  render () {
    const comments = this.getComments();
    let commentNodes;
    let buttonText = 'show more';
    
    if (this.state.showComments) {
      buttonText = 'show less';
      commentNodes = <div >{comments}</div>;
    }
    
    return(
      <div  style={{
        width:"100%"
      }}>
        <CommentForm addComment={this.addComment.bind(this)}/>
        <button id="toggle" onClick={this.handleClick.bind(this)}>
          {buttonText}
        </button>
        {commentNodes}
      </div>  
    );
  } 
  
 
  
  
  
} 

class CommentForm extends React.Component {
  render() {
    return (
      <form class="commentform" onSubmit={this.handleSubmit.bind(this)}>
        <div class="commentformfields">
          <input id="name" placeholder="Name" required ref={(input) => this.author = input}></input><br />
          <textarea id="comment" placeholder="Comment" rows="1" required ref={(textarea) => this.body = textarea}></textarea>
        </div>
      
          <button id="postComment" type="submit">Post Comment</button>
      
      </form>
    );
  } // end render
  
  handleSubmit(event) { 
    event.preventDefault();   // prevents page from reloading on submit
    let author = this.author;
    let body = this.body;
    this.props.addComment(author.value, body.value);
  }
} // end CommentForm component

class Comment extends React.Component {
  render () {
    return(
      <div class="comment">
        <p class="commentheader">@{this.props.author}: </p>
        <p class="commentbody">{this.props.body}</p>
      </div>
    );
  }
 
}


export default CommentBox;