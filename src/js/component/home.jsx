import React, { useEffect } from "react";
import { useState } from "react";

// PARA USAR: POST EMPTY ARRAY [] (BODY/RAW/JSON) DESDE POSTMAN A RUTA https://assets.breatheco.de/apis/fake/todos/user/todolistapi 

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
		<div className="container">
			<h1>To do list</h1>
			<input value={nuevaTarea} onChange={e => setNuevaTarea(e.target.value)} type="text" placeholder="Tareas por hacer" />
			<button onClick={() => AdicionarTarea()}>Adicionar</button>
			<button onClick={() => BorrarTodo()}>Borrar Todo</button>
			<ul className="ulclass">
				{tareas?.map((objeto, indice) =>
					<li className="liclass" key={indice}>
						{objeto.label}
						<span className="spanclass"><i onClick={() => BorrarTarea(indice)} className="fa-solid fa-xmark"></i></span>
					</li>)}
			</ul>
			<span className="spanfinal"> Tareas restantes: {tareas.length}</span>
		</div>
	);

	// FUNCION UTILIZADA POR BOTON PARA INCOPORAR TAREA A ARRAY TAREAS
	function AdicionarTarea() {
		let auxiliar = [...tareas, { label: nuevaTarea, done: false }] // auxiliar incorpora nueva tarea a array tareas
		setTareas(auxiliar); //actualiza array tareas con nueva tarea incorporado
		setNuevaTarea(""); //Deja el input blanco
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