import { Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export function ListTasks() {

  const [tasks, setTasks] = useState([])

  const navigate = useNavigate()

  const loadTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    setTasks(data)
  }

  const handleEdit = async (id) => {
    navigate(`/task/${id}/edit`)
  }

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE"
    })
    
    toast.promise(res.json(), {
      loading: 'Deleting...',
      success: (data) => {
        return `${data.message}`
      },
      error: (data) => {
        return `${data.message}`
      }
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <>
      <h1>ListTask</h1>
      {
        tasks.map(task => (
          <Card key={task.id} style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e"
          }}>
            <CardContent style={{
              display: "flex",
              justifyContent: "space-between"
            }}>
              <div style={{color: "white"}}>
                <Typography>
                  {task.title}
                </Typography>
                <Typography>
                  {task.description}
                </Typography>
              </div>
              <div>
                <Button variant="contained" color="inherit" onClick={() => handleEdit(task.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(task.id)} style={{marginLeft: ".7rem"}}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      }
    </>
  )
}