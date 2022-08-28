import React, { useState } from "react";

const Home = () => {
	const [task, setTask] = useState("")
	const [tasklist, setTaskList] = useState([]);


	/*Evento para Eliminar tareas de la lista*/
	const handleChange = (e) => {
		setTask(e.target.value);
	}

	/*Evento para definir si la tarea fue Completada o NO */
	const handleSubmit = (event) => {
    event.preventDefault()
	const data=new FormData(event.target)
	setTaskList([...tasklist, {
		name:data.get("name"),
		done:data.get("done")
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

/*funcion ELIMINAR tarea */
const deletetask = (e, id) => {
	e.preventDefault();
	setTaskList(tasklist.filter(t => t.id != id));
}

	return (

		<div className="Todo" >

	<form onSubmit={handleSubmit}>

			<div class="form-check">
        <label class="form-check-label" htmlFor="done"></label>
        <input class="form-check-input" type="checkbox" name="done"></input>
            </div>

           <div class="form-check">
        <label class="form-check-label" htmlFor="name"></label>
        <input class="form-check-input" type="checkbox" name="name"></input>
            </div>
	</form>

		         <div className="title">Eli's todos</div> 
					<input type="text" name="text" id="text" 
					onChange={(e) => handleChange(e)} 
					placeholder="Add task here..." />
					<button className="add-btn" onClick={AddTask}>Add</button>


		{tasklist !== [] ?

			<ul>

			{tasklist.map(t =>
			      <li className="list-item">{t.value}
			         <button className="delete" onClick={(e) => deletetask(e, t.id)}>Delete</button>
			      </li>	
			)}

			</ul>

		: null}

		</div>

	);
};

export default Home;


/**	<p className="flex-fill">{t.name}</p> 
			 <span className="badgerounded-pill " + t.done?"bg-success":"bg-danger" >{t.done?"Done":"Pending"}</span> */