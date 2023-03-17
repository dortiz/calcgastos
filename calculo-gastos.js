const nombreInput = document.getElementById('nombreInput');
const gastoInput = document.getElementById('gastoInput');
const agregarAmigoBoton = document.getElementById('agregarAmigo');
const resultadosDiv = document.getElementById('resultadosDiv');

const amigos = [];

function agregarAmigoLista() {
  const nombre = nombreInput.value;
  const gasto = parseFloat(gastoInput.value);

  if (nombre !== '' && !isNaN(gasto)) {
    amigos.push({nombre, gasto});
    nombreInput.value = '';
    gastoInput.value = '';
    mostrarResultados();
  }
}

function mostrarResultados() {
  let totalGastos = 0;
  let cantidadAmigos = amigos.length;

  amigos.forEach(amigo => {
    totalGastos += amigo.gasto;
  });

  const promedioGastos = totalGastos / cantidadAmigos;

  resultadosDiv.innerHTML = '';

  const resultadosHTML = `
    <h2>Resultados</h2>
    <ul>
      ${amigos.map(amigo => `<li>${amigo.nombre}: $${amigo.gasto.toFixed(2)}</li>`).join('')}
    </ul>
    <p>Total de gastos: $${totalGastos.toFixed(2)}</p>
    <p>Promedio de gastos: $${promedioGastos.toFixed(2)}</p>
  `;

  resultadosDiv.innerHTML = resultadosHTML;

  amigos.forEach(amigo => {
    const cantidadAdeudada = promedioGastos - amigo.gasto;
    if (cantidadAdeudada > 0) {
      resultadosDiv.innerHTML += `<p>${amigo.nombre} debe pagar $${cantidadAdeudada.toFixed(2)}</p>`;
    } else if (cantidadAdeudada < 0) {
      resultadosDiv.innerHTML += `<p>${amigo.nombre} debe recibir $${Math.abs(cantidadAdeudada).toFixed(2)}</p>`;
    }
  });
}

agregarAmigoBoton.addEventListener('click', agregarAmigoLista);
