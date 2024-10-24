let cursos = [
    { nombre: "Diseño UX/UI", vacantesDisponibles: 3, inscritos: [] },
    { nombre: "Desarrollo Web", vacantesDisponibles: 4, inscritos: [] },
    { nombre: "Data Analytics", vacantesDisponibles: 2, inscritos: [] },
    { nombre: "Product Manager", vacantesDisponibles: 5, inscritos: [] },
    { nombre: "Ciberseguridad", vacantesDisponibles: 3, inscritos: [] },
];

function inscribirse() {
    let nombreAlumno = document.getElementById("nombre").value.trim();
    let cursoSeleccionado = document.getElementById("curso").value.trim();

    if (!nombreAlumno && !cursoSeleccionado) {
        alert("Ingresa los datos requeridos.");
        return;
    }
    if (!nombreAlumno) {
        alert("Debes ingresar tu nombre primero.");
        return;
    }
    if (!cursoSeleccionado) {
        alert("Debes ingresar un curso para continuar.");
        return;
    }

    let curso = cursos.find(c => c.nombre === cursoSeleccionado);

    if (curso) {
        if (curso.vacantesDisponibles > curso.inscritos.length) {
            curso.inscritos.push(nombreAlumno);
            alert(`${nombreAlumno} se inscribió en ${cursoSeleccionado}!`);
        } else {
            alert(`No quedan vacantes disponibles para el curso de ${cursoSeleccionado}.`);
        }
    } else {
        alert("El curso no existe.");
    }
    console.log(cursos);
}

function buscarAlumno(nombre) {
    let nombreAlumno = nombre.trim();

    if (!nombreAlumno) {
        alert("Ingresa nombre del alumno.");
        return;
    }

    let resultado = cursos.filter(curso => 
        curso.inscritos.includes(nombreAlumno)
    );

    if (resultado.length > 0) {
        alert(`${nombreAlumno} está inscrito en: ${resultado.map(c => c.nombre).join(", ")}.`);
    } else {
        alert(`${nombreAlumno} no está inscrito en ningún curso.`);
    }
}