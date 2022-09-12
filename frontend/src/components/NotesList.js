import React from 'react'
import Button from 'react-bootstrap/Button';

const NoteItem = ({note, deleteNote}) => {
    return (
        <tr>
            <td>
                {note.noteHeader}
            </td>
            <td>
                {note.noteText}
            </td>
            <td>
                {note.noteProject.projectName}
            </td>
            <td>
                {note.noteUser.username}
            </td>
            <td>
                <Button variant="danger" onClick={() => deleteNote(note.id)} >Delete</Button>
            </td>
        </tr>)
}

const NotesList = ({notes, deleteNote}) => {
    return (
        <table>
            <th>
                Header
            </th>
            <th>
                Text
            </th>
            <th>
                Project
            </th>
            <th>
                Note User
            </th>
            <th>
                Delete
            </th>
            {notes.map((note) => <NoteItem note={note} deleteNote={deleteNote}/>)}
        </table>
    )
}

export default NotesList;