import React from 'react'

const NoteItem = ({note}) => {
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
        </tr>)
}

const NotesList = ({notes}) => {
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
            {notes.map((note) => <NoteItem note={note}/>)}
        </table>
    )
}
export default NotesList;