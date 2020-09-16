import React from "react";
import config from "./config";
import PropType from "prop-types";
import ApiContext from './ApiContext'

export default class AddNote extends React.Component {
  constructor() {
    super();
    this.state = {
      folderId: null,
      noteName: "",
      content: "",
      modified: new Date()

    };
  }
  static contextType = ApiContext;
  async componentDidMount() {
    try {
      const folders = await fetch(`${config.API_ENDPOINT}/folders`);
      const data = await folders.json();
      this.setState((prevState) => (prevState.foldersList = data));
    } catch (error) {
      console.log(error);
    }
  }
  updateFolderId = (event) => {
    event.preventDefault();
    const folderOptionIndex = event.currentTarget.selectedIndex;
 
    const folderOption = this.state.foldersList[folderOptionIndex - 1].id;
    this.setState({ folderId: folderOption });
  };
  updateName = (event) => {
    event.preventDefault();
    this.setState({ noteName: event.currentTarget.value });
  };
  updateContent = (event) => {
    event.preventDefault();
    this.setState({ content: event.currentTarget.value });
  };
  handelSubmit = (event) => {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.noteName,
        folderId: this.state.folderId,
        content: this.state.content,
        modified: this.state.modified
      }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return this.context.refresh();
      })
      .catch((error) => {
        console.error({ error });
      });
      this.props.history.push('/')
  };

  render() {
    const { folders=[] } = this.context
    return (
      <form className="addNote" onSubmit={this.handelSubmit}>
        <select onChange={this.updateFolderId} required>
          <option value="">-- Choose a folder --</option>
          {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                  </option>)}
        </select>
        <br />
        <input
          onChange={this.updateName}
          type="text"
          placeholder="Add note name"
          required
        />
        <br />
        <textarea onChange={this.updateContent} placeholder="Add description" />
        <br />
        <button>Submit</button>
      </form>
    );
  }
}
AddNote.propTypes = {
  note: PropType.objectOf(
    PropType.shape({
      id: PropType.string.isRequired,
      name: PropType.string.isRequired,
      folderId: PropType.string.isRequired,
      content: PropType.string.isRequired,
    })
  ),
};
