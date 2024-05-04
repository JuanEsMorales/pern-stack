import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function TaskForm() {
 
  const [task, setTask] =  useState({
    title: '',
    description: ''
  })

  const [pending, setPending] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault()
    //useEffect()
    setPending(true)

    if (editing) {
      await fetch(`http://localhost:3000/tasks/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(task),
        headers: {"Content-Type": "application/json"}
      })
      toast.success('Task updated')
    } else {
      await fetch('http://localhost:3000/tasks', {
        method: "POST",
        body: JSON.stringify(task),
        headers: {"Content-Type": "application/json"}
      })
    }

    
    setPending(false)
    navigate('/')
  }

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()
    setTask({title: data.title, description: data.description})
    setEditing(true)
  }

  const handleChange = (e) => {
    setTask({...task, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if (params.id) {
     loadTask(params.id)
    }
  }, [params.id])

  return (
    <Grid container direction={'column'} alignItems={'center'} justifyContent={'center'}>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant="h5" textAlign={'center'} color={'white'}>
            {editing ? 'Update task' : 'Create task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField variant="filled" placeholder="testing" label="Write your title" sx={{display: 'block', margin: '.5rem 0'}} inputProps={{style: {color: 'white'}}} InputLabelProps={{style: {color: 'white'}}} name="title" onChange={handleChange} value={task.title} />
              <TextField variant="filled" placeholder="this is for testing" label="Write your description" multiline rows={4} sx={{display: 'block', margin: '.5rem 0'}} inputProps={{style: {color: 'white'}}} InputLabelProps={{style: {color: 'white'}}} name="description" onChange={handleChange} value={task.description} />
              <Button variant="contained" color="warning" type="submit" disabled={pending || !task.title || !task.description}>
                {pending ? <CircularProgress color="inherit" size={24} /> : "save"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}