import React, { useState, useEffect } from "react";

const Home = (props) => {
	const [tasklist, setTaskList] = useState([]);
	const urlPostman="http://assets.breatheco.de/apis/fake/todos/user/"

useEffect(()=>{
//component did mount
fetch(urlPostman + props.username)
.then(response=>{
	if(response.ok){
		return response.json()
	}
	console.log(response.statusText)
})
.then(data=>setTaskList(data))
.catch(error=>console.error({error}))
   
},[])

useEffect(() => {
	//component did update
	fetch(urlPostman+props.username,{
		method: "PUT",
		body: JSON.stringify(tasklist),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(resp=>{
		if(resp.ok){
			console.log("List Updated")
		}else{
			console.error(resp.statusText)
		}

	}).catch(error=>console.error({error}))
}, [tasklist])

//////////////////////////////////////


	/*Aca actualizo los datos */
	const handleSubmit = (event) => {
    event.preventDefault()
	const data=new FormData(event.target)
	setTaskList([...tasklist, {
		label:data.get("name"),
		done:data.get("done")=="on"?true:false
	}])
}


/*funcion ELIMINAR tarea especifica*/
const deletetask = (e, id) => {
	e.preventDefault();
	setTaskList(tasklist.filter(t => t.id != id));}

/*const check=(index)=>{
	let newTask=[...tasklist]
	newTask[index].done=!newTask[index].done
	setTaskList(newTask)
	}*/

	return (
		<div className="Todo" >

	<form onSubmit={handleSubmit}>

	<div>
	<label htmlFor="name">Eli's to-dos</label>	
	<input type="text" className="form-control" name="name" placeholder="Add task here..." />
	</div>

    <div class="form-check">
                <input type="checkbox" className="form-check-input" name="done"/>
    </div>

	<button className="add-btn" type="submit">Add</button>

             </form>
			 {tasklist !== [] ?
			<ul>
			{tasklist.map(t =>
	<li className="list-item">
		<p className="flex-fill">{t.label}</p>
		<span  className={`badge rounded-pill ${t.done?"bg-success":"bg-danger"}`}>{t.done?"Done":"Pending"}</span>
        <button onClick={(e) => deletetask(e, t.id)}  className="delete" >Delete</button>
    </li>	
			)}
			</ul>
		: null}

		</div>
	);
};

export default Home;

/*{t.value}*/