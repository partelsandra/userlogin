// routes/notes.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    // GET all notes
    router.get('/notes', async (req, res) => {
        try {
            const [notes] = await pool.query('SELECT * FROM notes');
            res.json(notes);
        } catch (error) {
            console.error('Error retrieving notes:', error);
            res.status(500).send('Error retrieving notes');
        }
    });

    // POST a new note
    router.post('/notes', async (req, res) => {
        try {
            const { title, content } = req.body;
            await pool.query('INSERT INTO notes (title, content) VALUES (?, ?)', [title, content]);
            res.status(201).send('Note created successfully');
        } catch (error) {
            console.error('Error creating note:', error);
            res.status(500).send('Error creating note');
        }
    });

    // GET a specific note by ID
    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const [note] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);

            if (note.length === 0) {
                res.status(404).send('Note not found');
            } else {
                res.json(note[0]);
            }
        } catch (error) {
            console.error('Error retrieving note:', error);
            res.status(500).send('Error retrieving note');
        }
    });

    // PUT (update) a note by ID
    router.put('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;

            await pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
            res.send('Note updated successfully');
        } catch (error) {
            console.error('Error updating note:', error);
            res.status(500).send('Error updating note');
        }
    });

    // DELETE a note by ID
    router.delete('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await pool.query('DELETE FROM notes WHERE id = ?', [id]);
            res.send('Note deleted successfully');
        } catch (error) {
            console.error('Error deleting note:', error);
            res.status(500).send('Error deleting note');
        }
    });

    return router;
};
