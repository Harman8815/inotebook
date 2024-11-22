import React, { useContext } from "react";
import noteContext from "../context/Notes/NoteContext";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const { _id, title, description, tag, date } = note;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  const handleDelete = () => {
    deleteNote(_id);
    showAlert("Note deleted successfully", "danger");
  };

  return (
    <div className="card bg-light mb-3">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>{title}</span>
      </div>
      <div className="card-body">
        <p className="card-text">Description: {description}</p>
        <p className="card-text">Tag: {tag}</p>
        <p className="card-text">Date: {new Date(date).toLocaleString()}</p>
        <div className="d-flex justify-content-end">
          <i
            className="fa-solid fa-trash mx-2 text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleDelete}  
          ></i>
          <i
            className="fa-solid fa-pen-to-square mx-2 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() =>
              updateNote({
                _id,
                title,
                description,
                tag,
                date,
              })
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
