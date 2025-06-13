import Note from "../models/Note.js";

export const getAllNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error from notes controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            res.status(404).json({ message: "Note Note Found" });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error("Error fetching note:", req.params.id, ":", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = await Note.create({ title, content });
        res.status(201).json(note);
    } catch (error) {
        console.error("Error from notes controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new:true});
        if (!updatedNote) {
            res.status(404).json({ message: "Note Not Found" })
        }
        res.status(200).json({ message: "Note updated successfully" });
    } catch (error) {
        console.error("Error from notes controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            res.status(404).json({ message: "Note Not Found" });
        }
        res.status(200).json({message: "Note deleted successfully"});
    } catch (error) {
        console.error("Error from notes controller: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}