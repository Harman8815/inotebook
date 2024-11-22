import React, { useState } from "react";
import NoteContext from "./NoteContext";

const host = "http://localhost:8080/api/notes/";
// const localStorage.getItem("authtoken"); = localStorage.getItem("localStorage.getItem("authtoken");");;

const addNotes = (data) => {
    console.log(localStorage.getItem("authtoken"));
    fetch(`${host}addnote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken"),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log("Added note:", data);
        })
        .catch((error) => {
            console.error("Add error:", error);
        });
};

const deleteNotes = (id, title, description) => {
    fetch(`${host}deletenote/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({ id, title, description }), // Include id in the body
    })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log("Deleted note:", data);
        })
        .catch((error) => {
            console.error("Delete error:", error);
        });
};
const editNotes = (id, title, description) => {
    fetch(`${host}updatenotes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({ id, title, description }), // Include id in the body
    })
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            console.log("Deleted note:", data);
        })
        .catch((error) => {
            console.error("Delete error:", error);
        });
};

const NoteState = (props) => {
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    const fetchNotes = async () => {
        try {
            const response = await fetch(`${host}fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("authtoken"),
                },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setNotes(data); // Update the state with fetched notes
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    React.useEffect(() => {
        fetchNotes();

    }, []);
    const addNote = (title, description, tag) => {
        const newNote = {
            _id: Date.now().toString(),
            user: "6735b56e33a696ec153e6077",
            title,
            description,
            tag,
            date: new Date().toISOString(),
            __v: 0,
        };
        addNotes(newNote);
        setNotes([...notes, newNote]);
        
    };

    const deleteNote = (id) => {
        const noteToDelete = notes.find((note) => note._id === id);
        if (noteToDelete) {
            const { title, description } = noteToDelete;

            deleteNotes(id, title, description);
            setNotes(notes.filter((note) => note._id !== id));
            
        }
    };

    const updateNotes = (id, title, description, tag) => {
        const noteedit = notes.find((note) => note._id === id);
        if (noteedit) {
            editNotes(id, title, description, tag);
            const updatedNotes = notes.map((note) =>
                note._id === id
                    ? { ...note, title, description, tag }
                    : note
            );
            setNotes(updatedNotes);
            
        }
    };


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNotes, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
