import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";
import PropType from "prop-types";
import ErrorBoundry from "../ErrorBoundry";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <ErrorBoundry>
        <section className="NoteListMain">
          <ul>
            {notesForFolder.map((note) => (
              <li key={note.id}>
                <Note
                  id={note.id}
                  name={note.name}
                  modified={note.modified}
                  content={note.content}
                  folder_id={note.folderId}
                />
              </li>
            ))}
          </ul>
          <div className="NoteListMain__button-container">
            <CircleButton
              tag={Link}
              to="/add-note"
              type="button"
              className="NoteListMain__add-note-button"
            >
              <FontAwesomeIcon icon="plus" />
              <br />
              Note
            </CircleButton>
          </div>
        </section>
      </ErrorBoundry>
    );
  }
}

NoteListMain.propType = {
  match: PropType.shape({
    params: PropType.shape({
      folderId: PropType.string,
    }),
  }),
};
