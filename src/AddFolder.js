import React, { Component } from "react";
import ApiContext from "./ApiContext";
import config from "./config";
import PropType from "prop-types";

export default class AddFolder extends Component {
  constructor() {
    super();
    this.state = {
      folderName: "",
    };
  }
  static contextType = ApiContext;
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ folderName: event.currentTarget.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.folderName,
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return this.context.refresh();
      })
      .catch((error) => {
        console.error({ error });
      });
    this.props.history.push("/");
  };
  render() {
    return (
      <ApiContext.Consumer>
        {() => {
          return (
            <form onSubmit={this.handleSubmit} className="addFolder">
              <input
                onChange={this.handleChange}
                type="text"
                placeholder="Folder Name"
                required
              />
              <button>Submit</button>
            </form>
          );
        }}
      </ApiContext.Consumer>
    );
  }
}
AddFolder.propTypes = {
    history: PropType.shape({
      push: PropType.func.isRequired
    })
  }
