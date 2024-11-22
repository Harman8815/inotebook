import React, { useContext, useState } from "react";
import noteContext from "../context/Notes/NoteContext";

const AddNotes = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "default" }); // Reset form after adding
    };

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Note Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        onChange={onChange}
                        placeholder="Enter note title"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Note Content
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="4"
                        value={note.description}
                        onChange={onChange}
                        placeholder="Write your note here"
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Note Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={onChange}
                        placeholder="Enter a tag"
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>
                    Add Note
                </button>
            </form>
        </div>
    );
};

export default AddNotes;
