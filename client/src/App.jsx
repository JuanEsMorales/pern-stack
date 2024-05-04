import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListTasks } from "./components/ListTasks"
import { TaskForm } from "./components/TaskForm"
import { NavBar } from './components/Navbar';
import { Container } from "@mui/material";
import { Toaster } from 'sonner'
import "./App.css"
function App() {

  return (
    <BrowserRouter>
      <Toaster richColors/>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<ListTasks />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/task/:id/edit" element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
