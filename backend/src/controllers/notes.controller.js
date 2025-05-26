import Note from "../models/notes.model.js";

export async function getAllNotes(_, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); //New Ffirst
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};

export async function getNoteById(req, res) {
    try {
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found!' });
        }
        res.status(200).json(note);

    } catch (error) {
        console.error("Error fetching note by ID:", error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};

export async function createNote(req, res) {
    try {
        const { title, content } = req.body; // Assuming the note data is sent in the request body
        // console.log(title, content);
        const newNote = new Note({ title, content });

        await newNote.save();
        res.status(201).json({ message: 'Note created successfully!' });

    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: 'Internal Server Error!' });

    }
};

export async function updateNote(req, res) {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        const updatedNote = await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found!' });
        }

        res.status(200).json({ message: 'Note updated successfully!' });

    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};

export async function deleteNote(req, res) {
    try {
        const noteId = req.params.id;

        const deletedNote = await Note.findByIdAndDelete(noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found!' });
        }

        res.status(200).json({ message: 'Note deleted successfully!' });

    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
};