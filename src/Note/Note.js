import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiContext from "../ApiContext";
import config from "../config";
import "./Note.css";
import PropType from "prop-types";
import ErrorBoundry from "../ErrorBoundry";

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        // allow parent to perform extra behaviour
        this.props.onDelete();
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <ErrorBoundry>
        <div className="Note">
          <h2 className="Note__title">
            <Link to={`/note/${id}`}>{name}</Link>
          </h2>
          <button
            className="Note__delete"
            type="button"
            onClick={this.handleClickDelete}
          >
            <FontAwesomeIcon icon="trash-alt" /> remove
          </button>
          <div className="Note__dates">
            <div className="Note__dates-modified">
              Modified{" "}
              <span className="Date">{format(modified, "Do MMM YYYY")}</span>
            </div>
          </div>
        </div>
      </ErrorBoundry>
    );
  }
}
Note.defaultProps = { onDelete: () => {} }
Note.propTypes = {
  id: PropType.string.isRequired,
  name: PropType.string.isRequired,
  modified: PropType.instanceOf(Date).isRequired,
  onDelete: PropType.func,
};
