import React from "react";
import Note from "../Note/Note";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";
import ErrorBoundry from "../ErrorBoundry";
import PropType from "prop-types";

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = ApiContext;
  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, `${noteId}`) || { content: "" };

    return (
      <ErrorBoundry>
        <section className="NotePageMain">
          <Note
            id={note.id}
            name={note.name}
            modified={note.modified}
            onDelete={() => this.props.history.push('/')}
          />
          <div className="NotePageMain__content">
            {note.content.split(/\n \r|\n/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      </ErrorBoundry>
    );
  }
}
NotePageMain.propType = {
  match: PropType.shape({
    params: PropType.shape({
      noteId: PropType.string,
    }),
  }),
};