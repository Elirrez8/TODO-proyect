import React, { useState, useEffect } from "react";

const Home = (prop) => {
	const [task, setTask] = useState("")
	const [tasklist, setTaskList] = useState([]);
	const urlPostman="http://assets.breatheco.de/apis/fake/todos/user/"


useEffect(()=>{
//component did mount
fetch(urlPostman + prop.username)
.then(response=>{
	if(response.ok){
		return response.json()
	}
	console.log(response.statusText)
})
.then(data=>setTaskList(data))
.catch(error=>console.error(error))
   
},[])

useEffect(() => {

	fetch(urlPostman+prop.username,{
		method: "PUT",
		body: JSON.stringify(tasklist),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(resp=>{
		if(resp.ok){
			console.log("List Updated")
		}else{
			console.log(resp.statusText)
		}

	}).catch(error=>console.error({error}))

}, [tasklist])

	/*Evento para Eliminar tareas de la lista*/
	const handleChange = (e) => {
		setTask(e.target.value);
	}

	/*Aca actualizo los datos */
	const handleSubmit = (event) => {
    event.preventDefault()
	const data=new FormData(event.target)
	setTaskList([...tasklist, {
		label:data.get("name"),
		done:data.get("done")=="on"?true:false
	}])

	
    }

/* funcion AGREGAR tarea */
const AddTask = () => {
	if(task !== ""){
		const taskDetails = {
			id: Math.floor(Math.random()*1000),
			value: task,
			isCompleted: false,
		};

		setTaskList([...tasklist, taskDetails]);
	}
}

/*funcion ELIMINAR tarea especifica*/
const deletetask = (e, id) => {
	e.preventDefault();
	setTaskList(tasklist.filter(t => t.id != id));
}

const check=(index)=>{
	let newTask=[...tasklist]
	newTask[index].done=!newTask[index].done
	setTaskList(newTask)
		
	}

	return (

		<div className="Todo" >
	<div className="title">Eli's todos</div> 
	
	       <form onSubmit={handleSubmit}>
 
	<input type="text" className="form-control" name="name" onChange={(e) => handleChange(e)} placeholder="Add task here..." />

     <div class="form-check">
    <input classNmae="form-check-input" type="checkbox" name="done"></input>
    <label className="form-check-label" htmlFor="done"></label>
    </div>

	<button className="add-btn" onClick={AddTask}>Add</button>

             </form>

		{tasklist !== [] ?

			<ul>
			{tasklist.map(t =>
	<li className="list-item" >{t.value}
		<p className="flex-fill">{t.label}</p>
        <span  onClick={()=>check(e, t.id)} className={`badge rounded-pill ${t.done?"bg-success":"bg-danger"}`}>{t.done?"Done":"Pending"}</span>
        <button onClick={(e) => deletetask(e, t.id)}  className="delete" >Delete</button>
    </li>	
			)}
			</ul>

		: null}

		</div>
	);
};

export default Home;
