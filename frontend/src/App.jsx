import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { NotesProvider } from './context/NotesContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import AllNotes from './pages/AllNotes';
import AddNote from './pages/AddNote';

function App() {
  return (
    <ThemeProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="notes" element={<AllNotes />} />
              <Route path="add" element={<AddNote />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            className: 'dark:!bg-slate-800 dark:!text-white',
            style: {
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#6366f1', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </NotesProvider>
    </ThemeProvider>
  );
}

export default App;
