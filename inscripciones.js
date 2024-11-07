let cursos = [
    { nombre: "Diseño UX/UI", vacantesDisponibles: 3, inscritos: [] },
    { nombre: "Desarrollo Web", vacantesDisponibles: 4, inscritos: [] },
    { nombre: "Data Analytics", vacantesDisponibles: 2, inscritos: [] },
    { nombre: "Product Manager", vacantesDisponibles: 5, inscritos: [] },
    { nombre: "Ciberseguridad", vacantesDisponibles: 12, inscritos: [] },
];

function cargarCursosDesdeStorage() {
    let datosGuardados = localStorage.getItem("cursos");
    if (datosGuardados) {
    cursos = JSON.parse(datosGuardados);}
}

function guardarCursosEnStorage() {
    localStorage.setItem("cursos", JSON.stringify(cursos)); 
}

cargarCursosDesdeStorage();

function mostrarCursos() {
    let listaCursos = document.getElementById("listaCursos");
    if (!listaCursos) return; 
    listaCursos.innerHTML = ""; 
    cursos.forEach(curso => {
    let li = document.createElement("li");
    li.textContent = `${curso.nombre} - Vacantes disponibles: ${curso.vacantesDisponibles - curso.inscritos.length}`;
    listaCursos.appendChild(li);
    });
}

mostrarCursos(); 

function inscribirse() {
    let nombreAlumno = document.getElementById("nombre").value.trim();
    let cursoSeleccionado = document.getElementById("curso").value;
    if (!nombreAlumno || !cursoSeleccionado) {
    mostrarNotificacion("Debes ingresar tu nombre y seleccionar un curso.");
    return;}
    let curso = cursos.find(c => c.nombre === cursoSeleccionado);
    if (curso) {
    if (curso.vacantesDisponibles > curso.inscritos.length) {
        curso.inscritos.push(nombreAlumno);
        mostrarNotificacion(`${nombreAlumno} se inscribió en ${cursoSeleccionado}!`, "success");
        mostrarCursos();
        guardarCursosEnStorage(); }
        else {
        mostrarNotificacion(`No quedan vacantes disponibles para el curso de ${cursoSeleccionado}.`, "error");
        }} 
        else {
        mostrarNotificacion("El curso no existe.", "error");
}}

function mostrarNotificacion(mensaje, tipo = "error") {
    let notificacion = document.getElementById("notificacion");
    if (!notificacion) return;
    notificacion.textContent = mensaje;
    if (tipo === "success") {
        notificacion.style.backgroundColor = "#d4edda";
        notificacion.style.color = "#155724";
        notificacion.style.borderColor = "#c3e6cb";}
        else {
        notificacion.style.backgroundColor = "#f8d7da";
        notificacion.style.color = "#721c24";
        notificacion.style.borderColor = "#f5c6cb";}
    notificacion.style.display = "block"; 
}

function buscarAlumno(event) {
    event.preventDefault();
    let nombreAlumno = document.getElementById("buscarAlumno").value.trim();
    if (!nombreAlumno) {
        mostrarNotificacion("Ingresa nombre del alumno para buscar.", "error");
        return;}
    let resultado = cursos.filter(curso => curso.inscritos.includes(nombreAlumno));
    if (resultado.length > 0) {
        mostrarNotificacion(`${nombreAlumno} está inscrito en: ${resultado.map(c => c.nombre).join(", ")}.`, "success");} 
        else {
        mostrarNotificacion(`${nombreAlumno} no está inscrito en ningún curso.`, "error");}
}

let formBuscar = document.getElementById("formBuscar");
if (formBuscar) {
    formBuscar.addEventListener("submit", buscarAlumno);
}
