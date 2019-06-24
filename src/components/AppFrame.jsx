import React from "react";
import { withRouter } from "react-router-dom";
import fieldRows from "../images/bgimage_small.jpg";

class AppFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: this.newBackground(window.location.pathname),
      level: 0
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.background !== this.state.background) {
      document.getElementById("App").scrollIntoView();
    }
  }

  newBackground = pathname => {
    if (pathname.includes("today")) return "today";
    if (pathname.includes("tasks")) return "tasks";
    let bg = pathname.split("/").slice(-1)[0];
    return bg || "base";
  };

  componentDidMount() {
    offlineBackground(fieldRows);
  }

  // Change background on Navigation
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({
        background: this.newBackground(nextProps.location.pathname)
      });
    }
  }

  render() {
    return (
      <div id="App" className={this.state.background}>
        {this.props.children}
      </div>
    );
  }
}

// Fallback for app background
let offlineBackground = image => {
  let html = document.documentElement;
  if (html) {
    html.style.background = `linear-gradient(rgba(0, 150, 255, 0.8), rgba(62, 187, 154, 0.8)), url(${image})`;
    html.style.backgroundPosition = "top";
    html.style.backgroundSize = "cover";
    html.style.backgroundAttachment = "fixed";
  }
};

export default withRouter(AppFrame);
