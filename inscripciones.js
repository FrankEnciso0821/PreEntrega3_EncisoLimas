document.addEventListener("DOMContentLoaded", function () {
    cargarCursos();
    let formBuscar = document.getElementById("formBuscar");
    formBuscar.addEventListener("submit", function(event) {
        event.preventDefault();
        buscarAlumno(document.getElementById("buscarAlumno").value);
    });
    let inscribirButton = document.querySelector("button");
    inscribirButton.addEventListener("click", inscribirse);
});
let cursos = [];
function obtenerCursosDesdeServidor() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { nombre: "Diseño UX/UI", vacantesDisponibles: 3, inscritos: [] },
                { nombre: "Desarrollo Web", vacantesDisponibles: 4, inscritos: [] },
                { nombre: "Data Analytics", vacantesDisponibles: 2, inscritos: [] },
                { nombre: "Product Manager", vacantesDisponibles: 5, inscritos: [] },
                { nombre: "Ciberseguridad", vacantesDisponibles: 12, inscritos: [] }
            ]);
        }, 2000);
    });
}
async function cargarCursos() {
    try {
        cursos = await obtenerCursosDesdeServidor();
        mostrarCursos();
    } catch (error) {
        mostrarNotificacion("Hubo un error al cargar los cursos.", "error");
    }
}
function mostrarCursos() {
    const listaCursos = document.getElementById("listaCursos");
    listaCursos.innerHTML = "";
    cursos.forEach((curso, index) => {
        const li = document.createElement("li");
        li.textContent = `${curso.nombre} - Vacantes disponibles: ${curso.vacantesDisponibles - curso.inscritos.length}`;
        listaCursos.appendChild(li);
        gsap.from(li, { opacity: 0, y: -20, delay: index * 0.1, duration: 1 });
    });
}
async function inscribirse() {
    const nombreAlumno = document.getElementById("nombre").value.trim();
    const cursoSeleccionado = document.getElementById("curso").value;
    if (!nombreAlumno || !cursoSeleccionado) {
        mostrarNotificacion("Debes ingresar tu nombre y seleccionar un curso.");
        return;
}
    const curso = cursos.find(c => c.nombre === cursoSeleccionado);
    if (curso && curso.vacantesDisponibles > curso.inscritos.length) {
        curso.inscritos.push(nombreAlumno);
        const mensaje = await enviarInscripcionAlServidor(nombreAlumno, cursoSeleccionado);
        mostrarNotificacion(mensaje, "success");
        mostrarCursos();
    } else {
        mostrarNotificacion(`No quedan vacantes disponibles para el curso de ${cursoSeleccionado}.`, "error");
    }
}
function enviarInscripcionAlServidor(nombreAlumno, cursoSeleccionado) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Inscripción de ${nombreAlumno} al curso de ${cursoSeleccionado} realizada con éxito.`);
        }, 1000);
    });
}
function mostrarNotificacion(mensaje, tipo = "error") {
    const notificacion = document.getElementById("notificacion");
    if (!notificacion) return;
    notificacion.textContent = mensaje;
    notificacion.style.backgroundColor = tipo === "success" ? "#d4edda" : "#f8d7da";
    notificacion.style.color = tipo === "success" ? "#155724" : "#721c24";
    notificacion.style.borderColor = tipo === "success" ? "#c3e6cb" : "#f5c6cb";
    notificacion.style.display = "block";
    gsap.fromTo(notificacion, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 });
    setTimeout(() => {
        gsap.to(notificacion, { opacity: 0, y: 20, duration: 0.5, onComplete: () => notificacion.style.display = "none" });
    }, 3000);
}
async function buscarAlumno(nombreAlumno) {
    if (!nombreAlumno) {
        mostrarNotificacion("Ingresa nombre del alumno para buscar.", "error");
        return;
    }
    const resultado = cursos.filter(curso => curso.inscritos.includes(nombreAlumno));
    const mensaje = resultado.length > 0 
        ? `${nombreAlumno} está inscrito en: ${resultado.map(c => c.nombre).join(", ")}.` 
        : `${nombreAlumno} no está inscrito en ningún curso.`;
    document.getElementById("resultadoBusqueda").textContent = mensaje;
}