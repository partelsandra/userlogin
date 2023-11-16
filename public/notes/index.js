// public/notes/index.js
document.addEventListener('DOMContentLoaded', async () => {
    const noteForm = document.getElementById('note-form');

    // Function to fetch and display notes
    const fetchAndDisplayNotes = async () => {
        try {
            const response = await fetch('/notes/notes');
            const notes = await response.json();

            // Update the DOM to display the notes
            // Modify this based on your HTML structure
            const notesContainer = document.getElementById('notes-container');
            notesContainer.innerHTML = '';

            notes.forEach((note) => {
                const noteElement = document.createElement('div');
                noteElement.innerHTML = `
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>
                    <hr>
                `;
                notesContainer.appendChild(noteElement);
            });
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    // Fetch and display notes on page load
    await fetchAndDisplayNotes();

    // Add event listener for submitting a new note
    noteForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('note-title').value;
        const content = document.getElementById('note-content').value;

        try {
            const response = await fetch('/notes/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                alert('Note added successfully');
                // Fetch and display notes again after adding a new note
                await fetchAndDisplayNotes();
            } else {
                const errorMessage = await response.text();
                alert(`Error adding note: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error adding note:', error);
            alert('Error adding note. Please try again.');
        }
    });
});
