import {Note} from "../models/Note";

interface INoteRepo {
    save(note: Note): Promise<void>;
    getAll(): Promise<Note[]>;
}

export class NoteRepo implements INoteRepo {
    async getAll(): Promise<Note[]> {
        try {
            return await Note.findAll();
        } catch (e) {
            throw new Error("Failed to getting all note!");
        }
    }

    async save(note: Note): Promise<void> {
        try {
            await Note.create({
                name: note.name,
                description: note.description,
                imageUrl: note.imageUrl
            });
        } catch (e) {
            throw new Error("Failed to save note!");
        }
    }
}
