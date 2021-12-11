const fs = require('fs');
const util = require('util');

const readNote = util.promisify(fs.readFile)
const writeNote = util.promisify(fs.writeFile)

class Save {
    write(notes) {
        return writeNote('db/db.json', JSON.stringify(notes));
    }

    read() {
        return readNote('db/db.json', 'utf8');
    }

    retrieveNotes() {
        return this.read().then(notes => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(notes) {
        const { title, text } = notes;
        if (!title || !text) {
            throw new Error('Title and text cant both be blank');
        }
        const newNote = { title, text };
        return this.retrieveNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }
}

module.exports = new Save();