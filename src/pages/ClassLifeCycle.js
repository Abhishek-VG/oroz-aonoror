import React from "react";

export class ClassLifeCycle extends React.Component {
  constructor(props) {
    super(props);
    console.log("CONSTRUCTOR : props:", props);
    this.state = {
      m:1000,
      bool: true,
      name: "Jyo"
    }
    this.updateM = this.updateM.bind(this);
  }

  componentDidMount() {
    console.log("I am component did mount")
  }

  componentDidUpdate() {
    console.log("I am component Did update")
  }

  componentWillUnmount() {
    console.log("I am component will unmount")
  }

  updateM() {
    console.log(this)
    this.setState({
      ...this.state,
      m: this.state.m + 1,
    })
  }

  render() {
    console.log("RENDER");
    return <span onClick={this.updateM}>Hello, i am class Component, {this.props.count} {this.state.m}</span>;
  }
}
