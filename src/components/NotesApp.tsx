import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { Note } from '@/types/note';
import { Sidebar } from './Sidebar';
import { NotesList } from './NotesList';
import { NoteEditor } from './NoteEditor';
import { Header } from './Header';

export const NotesApp = () => {
  const {
    notes,
    categories,
    selectedCategory,
    searchQuery,
    setSelectedCategory,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();
  
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateNote = () => {
    const newNote = createNote('', '', selectedCategory === 'all' ? 'personal' : selectedCategory);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const handleSelectNote = (note: Note) => {
    if (selectedNote?.id === note.id && isEditing) return;
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleSaveNote = (title: string, content: string, category: string) => {
    if (selectedNote) {
      updateNote(selectedNote.id, { title, content, category });
      setSelectedNote(prev => prev ? { ...prev, title, content, category } : null);
    }
    setIsEditing(false);
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        onCreateNote={handleCreateNote}
      />
      
      <div className="flex-1 flex flex-col">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <div className="flex-1 flex">
          <NotesList
            notes={notes}
            selectedNote={selectedNote}
            onSelectNote={handleSelectNote}
            onDeleteNote={handleDeleteNote}
          />
          
          <NoteEditor
            note={selectedNote}
            categories={categories}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSaveNote}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    </div>
  );
};