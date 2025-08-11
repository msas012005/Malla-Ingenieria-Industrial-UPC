// Datos de ejemplo — aquí se podrían incluir todos los cursos y sus prerequisitos
const cursos = [
    { codigo: "HU625", nombre: "Comprensión y producción de lenguaje I", creditos: 4, ciclo: 1 },
    { codigo: "HU612", nombre: "Creatividad y Liderazgo", creditos: 3, ciclo: 1 },
    { codigo: "MA420", nombre: "Matemática Básica", creditos: 6, ciclo: 1 },
    { codigo: "IN142", nombre: "Fundamentos de Ingeniería Industrial", creditos: 3, ciclo: 1 },
    { codigo: "MA465", nombre: "Química", creditos: 4, ciclo: 1 },

    { codigo: "MA262", nombre: "Cálculo I", creditos: 6, ciclo: 2 },
    { codigo: "HU626", nombre: "Comprensión y producción de lenguaje II", creditos: 4, ciclo: 2 },
    { codigo: "HU548", nombre: "Ética y ciudadanía", creditos: 2, ciclo: 2 },
    { codigo: "HU159", nombre: "Seminario de investigación académica I", creditos: 2, ciclo: 2 },
    { codigo: "IN219", nombre: "Administración para Ingenieros", creditos: 3, ciclo: 2 },
    { codigo: "IN315", nombre: "Dibujo Asistido por Computador", creditos: 4, ciclo: 2 }
];

// Ciclos
const maxCiclos = 10;
const maxCreditos = 27;

// Elementos del DOM
const malla = document.getElementById("malla");
const cicloSelect = document.getElementById("cicloSelect");
const creditosActuales = document.getElementById("creditosActuales");
const creditosMaximos = document.getElementById("creditosMaximos");
creditosMaximos.textContent = maxCreditos;

// Llenar selector de ciclos
for (let i = 1; i <= maxCiclos; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `Ciclo ${i}`;
    cicloSelect.appendChild(option);
}

// Generar columnas de ciclos
function generarMalla() {
    malla.innerHTML = "";
    for (let ciclo = 1; ciclo <= maxCiclos; ciclo++) {
        const columna = document.createElement("div");
        columna.className = "columna";
        const titulo = document.createElement("h2");
        titulo.textContent = `Ciclo ${ciclo}`;
        columna.appendChild(titulo);

        const cursosCiclo = cursos.filter(c => c.ciclo === ciclo);
        cursosCiclo.forEach(curso => {
            const label = document.createElement("label");
            label.innerHTML = `<input type="checkbox" data-creditos="${curso.creditos}"> ${curso.codigo} - ${curso.nombre} (${curso.creditos} cr)`;
            columna.appendChild(label);
        });

        malla.appendChild(columna);
    }
}

// Calcular créditos seleccionados
function actualizarCreditos() {
    let total = 0;
    document.querySelectorAll("input[type='checkbox']:checked").forEach(chk => {
        total += parseInt(chk.dataset.creditos);
    });
    creditosActuales.textContent = total;

    // Verificar límite
    if (total > maxCreditos) {
        creditosActuales.style.color = "red";
    } else {
        creditosActuales.style.color = "black";
    }
}

// Eventos
document.addEventListener("change", e => {
    if (e.target.type === "checkbox") {
        actualizarCreditos();
    }
});

// Inicializar
generarMalla();

