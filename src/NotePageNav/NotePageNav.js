import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { findNote, findFolder } from "../notes-helpers";
import "./NotePageNav.css";
import ErrorBoundry from "../ErrorBoundry";
import PropType from "prop-types";


export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <ErrorBoundry>
        <div className="NotePageNav">
          <CircleButton
            tag="button"
            role="link"
            onClick={() => this.props.history.goBack()}
            className="NotePageNav__back-button"
          >
            <FontAwesomeIcon icon="chevron-left" />
            <br />
            Back
          </CircleButton>
          {folder && (
            <h3 className="NotePageNav__folder-name">{folder.name}</h3>
          )}
        </div>
      </ErrorBoundry>
    );
  }
}
NotePageNav.propType = {
  match: PropType.shape({
    params: PropType.shape({
      noteId: PropType.string,
    }),
  }),
};