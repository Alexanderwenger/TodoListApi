import React, { useEffect } from "react";
import { useState } from "react";

const Home = () => {

	const [tareas, setTareas] = useState([]);
	const [nuevaTarea, setNuevaTarea] = useState("");
	const [load, setLoad] = useState(false);

	useEffect(() => {

		let requestOptions = {
			method: 'GET',
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/todolistapi", requestOptions)
			.then(response => response.json())
			.then(result => setTareas(result))
			.catch(error => console.log('error', error));
	}, [load])

	return (
		<div className="text-center">
			<h1>To do list</h1>
			<input value={nuevaTarea} onChange={e => setNuevaTarea(e.target.value)} type="text" placeholder="Tareas nueva?" />
			<button onClick={() => AdicionarTarea()}>Adicionar</button>
			<button onClick={() => BorrarTodo()}>Borrar Todo</button>
			<ul>
				{tareas?.map((objeto, indice) =>
					<li key={indice}>
						{objeto.label}
						<i onClick={() => BorrarTarea(indice)} className="fa-solid fa-trash-can"></i>
					</li>)}
			</ul>
			{tareas.length} cantidad de tareas
		</div>
	);

	// FUNCION UTILIZADA POR BOTON PARA INCOPORAR TAREA A ARRAY TAREAS
	function AdicionarTarea() {
		let auxiliar = [...tareas, { label: nuevaTarea, done: false }]
		setTareas(auxiliar);
		setNuevaTarea("");
		console.log(tareas)

		//* DESDE POSTMAN
		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify(auxiliar);

		let requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/todolistapi", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));

		//*********** */
	}

	function BorrarTarea(indice) {
		let arraytemporal = [...tareas]; // ... SIGNIFICA TODO LO QUE CONTIENE "TAREAS"
		arraytemporal.splice(indice, 1); //BORRA "1" ELEMENTO DE LA POSICION "INDICE" DEL ARRAY
		setTareas(arraytemporal); //

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify(arraytemporal);

		let requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/todolistapi", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
	}

	function BorrarTodo() {

		let requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/todolistapi", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));


		//*********POST!! */

		let myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		let raw = JSON.stringify([]);

		let requestOptions2 = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow'
		};

		fetch("https://assets.breatheco.de/apis/fake/todos/user/todolistapi", requestOptions2)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('error', error));
		
		setLoad(!load)
	}
};

export default Home;