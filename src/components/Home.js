import React, { useContext, useState, useRef, useEffect } from 'react';
import noteContext from "../context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNotes from "./AddNotes";

const Home = (props) => {
  const context = useContext(noteContext);
  const { notes, updateNotes, fetchNotes } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });


  fetchNotes()
  const updateNote = (currentNote) => {
    ref.current.click(); // Open modal
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
    
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateNotes(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    
    props.showAlert("notes updated sucessfully", "primary");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showAlert={props.showAlert} />

      {/* Modal Trigger Button (hidden, for controlling modal) */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal for Editing Note */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Displaying Notes */}
      <div className="container my-4">
        <h2 className="mb-4">Your Notes</h2>
        {notes.length > 0 ? (
          <div className="row">
            {notes.map((note) => (
              <div className="col-md-4" key={note._id}>
                <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} />
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            No notes added yet. Start by adding a new note above!
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
