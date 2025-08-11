// Lista de cursos (solo muestro un ejemplo reducido aquí, pero lo llenaremos con todos los tuyos)
let cursos = [
    // Ciclo 1
    { codigo: "HU625", nombre: "Comprensión y producción de lenguaje I", creditos: 4, nivel: 1, prerequisitos: [] },
    { codigo: "HU612", nombre: "Creatividad y Liderazgo", creditos: 3, nivel: 1, prerequisitos: [] },
    { codigo: "MA420", nombre: "Matemática Básica", creditos: 6, nivel: 1, prerequisitos: [] },
    { codigo: "IN142", nombre: "Fundamentos de Ingeniería Industrial", creditos: 3, nivel: 1, prerequisitos: [] },
    { codigo: "MA465", nombre: "Química", creditos: 4, nivel: 1, prerequisitos: [] },

    // Ciclo 2
    { codigo: "MA262", nombre: "Cálculo I", creditos: 6, nivel: 2, prerequisitos: ["MA420"] },
    { codigo: "HU626", nombre: "Comprensión y producción de lenguaje II", creditos: 4, nivel: 2, prerequisitos: ["HU625"] },
    { codigo: "HU548", nombre: "Ética y ciudadanía", creditos: 2, nivel: 2, prerequisitos: [] },
    { codigo: "HU159", nombre: "Seminario de investigación académica I", creditos: 2, nivel: 2, prerequisitos: ["HU625"] },
    { codigo: "IN219", nombre: "Administración para Ingenieros", creditos: 3, nivel: 2, prerequisitos: [] },
    { codigo: "IN315", nombre: "Dibujo Asistido por Computador", creditos: 4, nivel: 2, prerequisitos: ["IN142"] },

    // Curso especial de prácticas
    { codigo: "PRACT", nombre: "Prácticas Preprofesionales", creditos: 0, nivel: 0, prerequisitos: [], reqCreditos: 100 }
];

let seleccionados = [];
let creditosTotales = 0;

function generarSelectNivel() {
    let select = document.getElementById("nivelActual");
    for (let i = 1; i <= 10; i++) {
        let opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `Ciclo ${i}`;
        select.appendChild(opt);
    }
    select.value = 1;
    select.addEventListener("change", renderMalla);
}

function renderMalla() {
    let malla = document.getElementById("malla");
    malla.innerHTML = "";
    let nivelActual = parseInt(document.getElementById("nivelActual").value);

    for (let ciclo = 1; ciclo <= 10; ciclo++) {
        let col = document.createElement("div");
        col.classList.add("columna");
        col.innerHTML = `<h2>Ciclo ${ciclo}</h2>`;

        cursos.filter(c => c.nivel === ciclo).forEach(curso => {
            let bloqueado = !cumpleRequisitos(curso, nivelActual);
            let div = document.createElement("div");
            div.classList.add("curso");
            if (bloqueado) div.classList.add("bloqueado");

            div.innerHTML = `
                <span>${curso.codigo} - ${curso.nombre} (${curso.creditos} cr) ${bloqueado ? "🔒" : ""}</span>
                <input type="checkbox" data-codigo="${curso.codigo}" ${bloqueado ? "disabled" : ""}>
            `;

            col.appendChild(div);
        });

        malla.appendChild(col);
    }

    agregarEventos();
}

function cumpleRequisitos(curso, nivelActual) {
    // Verificar avance de niveles
    if (curso.nivel !== 0 && (curso.nivel < nivelActual || curso.nivel > nivelActual + 2)) return false;

    // Verificar prerequisitos por curso
    for (let pre of curso.prerequisitos) {
        if (!seleccionados.includes(pre)) return false;
    }

    // Verificar prerequisitos por créditos
    if (curso.reqCreditos && creditosTotales < curso.reqCreditos) return false;

    return true;
}

function agregarEventos() {
    document.querySelectorAll('input[type="checkbox"]').forEach(chk => {
        chk.addEventListener("change", e => {
            let curso = cursos.find(c => c.codigo === e.target.dataset.codigo);
            if (e.target.checked) {
                let creditosCiclo = seleccionados
                    .map(cod => cursos.find(c => c.codigo === cod))
                    .filter(c => c.nivel === curso.nivel)
                    .reduce((sum, c) => sum + c.creditos, 0);

                if (creditosCiclo + curso.creditos > 27) {
                    alert("Máximo 27 créditos por ciclo.");
                    e.target.checked = false;
                    return;
                }

                seleccionados.push(curso.codigo);
                creditosTotales += curso.creditos;

                if (creditosTotales >= 100 && !cursos.some(c => c.codigo === "PRACT")) {
                    alert("¡Ya puedes iniciar tus Prácticas Preprofesionales!");
                }

            } else {
                seleccionados = seleccionados.filter(cod => cod !== curso.codigo);
                creditosTotales -= curso.creditos;
            }
            actualizarContadores();
            renderMalla();
        });
    });
}

function actualizarContadores() {
    document.getElementById("creditosCiclo").textContent = seleccionados
        .map(cod => cursos.find(c => c.codigo === cod))
        .reduce((sum, c) => sum + c.creditos, 0);

    document.getElementById("creditosTotales").textContent = creditosTotales;
}

generarSelectNivel();
renderMalla();
actualizarContadores();
