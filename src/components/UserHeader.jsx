import React from 'react';
import UserImage from './UserImage'
import UserText from './UserText'
import '../css/UserHeader.css'

class UserHeader extends React.Component {
  constructor(props){
    super(props);
    this.fileInput = React.createRef(); // Access file input values
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleFileChange(event) {
    event.preventDefault();
    let file = this.fileInput.current.files[0]

    if(this.reasonableFileSize(file.size)) {
      var fr = new FileReader();
      fr.onload = () => { this.props.handler('user_image', fr.result) }
      fr.readAsDataURL(file);
    }
  }

  handleInputChange(event) {
    event.preventDefault();
    this.props.handler(event.target.name, event.target.value);
  }

  reasonableFileSize(bytes) {
    let kbs = Math.round(bytes/1024);
    if (kbs < 3000){ return true; };

    alert(
      "\nMax File Size: 3000 KB" +
      "\nYour File: " + kbs + " KB" +
      "\n\nPlease select a smaller image!"
    );
    return false;
  }

  render() {
    return (
      <section id='user-header'>
        <UserImage
          image={this.props.data.user_image}
          fileHandler={this.handleFileChange}
          fileRef={this.fileInput} />
        <UserText
          name={this.props.data.user_name}
          tagline={this.props.data.user_tagline}
          inputHandler={this.handleInputChange} />
      </section>
      )
    }

  }

  export default UserHeader;
