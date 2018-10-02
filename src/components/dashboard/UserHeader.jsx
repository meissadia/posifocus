import React     from 'react';
import UserImage from './UserImage'
import UserText  from './UserText'
import '../../styles/css/UserHeader.css'

class UserHeader extends React.Component {
  constructor(props){
    super(props);
    this.fileInput = React.createRef();
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  /**
  /* Validates size of, and loads, user avatar.
  **/
  handleFileChange(event) {
    event.preventDefault();
    let file = this.fileInput.current.files[0]
    if(this.fileSizeOk(file.size)) {
      var fr = new FileReader();
      fr.onload = () => { this.props.updateUserHeader('user_image', fr.result) }
      fr.readAsDataURL(file);
    }
  }

  /**
  /* Hoist userHeader state to App component.
  **/
  handleInputChange(event) {
    event.preventDefault();
    this.props.updateUserHeader(event.target.name, event.target.value);
  }

  /**
  /* Validates file size is under a size, given in Kilobytes.
  /* @param {Number} bytes Filesize in bytes
  /* @param {Number} limit Max Filesize allowed in bytes
  **/
  fileSizeOk(bytes, limit=3000) {
    let kbs = Math.round(bytes/1024);
    if (kbs < limit){ return true; };

    window.alert(
      "\nMax File Size: 3000 KB" +
      "\nYour File: " + kbs + " KB" +
      "\n\nPlease select a smaller image!"
    );
    return false;
  }

  render() {
    let data = this.props.data;
    return (
      <section id='user-header'>
        <UserImage
          image={data.user_image}
          fileHandler={this.handleFileChange}
          fileRef={this.fileInput} />
        <UserText
          name={data.user_name}
          tagline={data.user_tagline}
          inputHandler={this.handleInputChange} />
      </section>
      )
    }
  }

  export default UserHeader;
