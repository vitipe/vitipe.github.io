let jugadaUsuario = []; //ver de mandarlo adentro de alguna function, es la unica variable global que me quedó
let jugadaComputadora = crearJugadaComputadora();
bloquearClickUsuario("Bienvenido al simon dice!");


function obtenerNumeroRandom() {
    let numeroRandom = Math.ceil(Math.random() * 4);
    return numeroRandom;
}

function prenderLuzBoton() {
    
}

function colorearBotones(jugadaComputadora) {
    let DELAY_COLOR_JUGADA = 500;
    let DELAY_COLOR_NORMAL = 1000;

    bloquearClickUsuario("Juega la computadora");

    for (let i = 0; i < jugadaComputadora.length; i++) {

        let $botonEnJuego = document.querySelector(`#cuadro-${jugadaComputadora[i]}`);

        setTimeout(function() {
            $botonEnJuego.style.opacity = '100%';
            $botonEnJuego.style.transition = 'opacity 250ms';
        }, DELAY_COLOR_JUGADA);

        setTimeout(function() {
            $botonEnJuego.style.opacity = '40%';
            $botonEnJuego.style.transition = 'opacity 250ms';
        }, DELAY_COLOR_NORMAL);

        DELAY_COLOR_JUGADA += 1000;
        DELAY_COLOR_NORMAL += 1000;
    }

    setTimeout(function() {
        desbloquearClickUsuario();
    }, DELAY_COLOR_NORMAL - 1000);
}

function crearJugadaComputadora() {
    let turnoUsuario = 1;
    let jugadaComputadora = [];

    for (let i = 0; i < turnoUsuario; i++) { //probar usar ForEach?
        jugadaComputadora.push(obtenerNumeroRandom());
    }

    return jugadaComputadora;
}

function juegaComputadora() {
    colorearBotones(jugadaComputadora);
}

function resetearJugadaUsuario(jugadaUsuario) {

    for (let i = 1; i <= jugadaUsuario.length;) {
        jugadaUsuario.pop(jugadaUsuario);
    }
}

function sumadorTurnoUsuario() {
    let turnoUsuario = 0;
    for (let i = 0; i < jugadaComputadora.length; i++) {
        turnoUsuario++
    }
    document.querySelector('#turno-usuario').textContent = "Turno #" + turnoUsuario;
}

function contadorPuntosUsuario() { //esto y lo de arriba no los puedo hacer en un solo calculo?
    let puntosUsuario = 0;
    for (let i = 0; i < jugadaComputadora.length; i++) {
        puntosUsuario++
    }

    return puntosUsuario - 1;
}

function mostrarErrorJugada() {
    document.querySelector('#error-jugada').className = '';
    document.querySelector('#boton-continuar-juego').className = '';
    document.querySelector('#boton-reinicio-juego').className = '';
    
    if (contadorPuntosUsuario() === 1) {
        document.querySelector('#error-jugada').textContent = `No era esa jugada! lograste ${contadorPuntosUsuario()} punto.`;
    } else {
        document.querySelector('#error-jugada').textContent = `No era esa jugada! lograste ${contadorPuntosUsuario()} puntos.`;
    }
}

function ocultarErrorJugada() {
    document.querySelector('#error-jugada').className = 'oculto';
    document.querySelector('#boton-continuar-juego').className = 'oculto';
    document.querySelector('#boton-reinicio-juego').className = 'oculto';
}

function ocultarBotonJugar() {
    document.querySelector('#boton-jugar').className = 'oculto';
}

function bloquearClickUsuario(titulo) {
    document.querySelector('#cuadro-1').style.pointerEvents = "none";
    document.querySelector('#cuadro-2').style.pointerEvents = "none";
    document.querySelector('#cuadro-3').style.pointerEvents = "none";
    document.querySelector('#cuadro-4').style.pointerEvents = "none";

    document.querySelector('#cartel-bienvenida').textContent = titulo;

}

function desbloquearClickUsuario() {
    document.querySelector('#cuadro-1').style.pointerEvents = "auto";
    document.querySelector('#cuadro-2').style.pointerEvents = "auto";
    document.querySelector('#cuadro-3').style.pointerEvents = "auto";
    document.querySelector('#cuadro-4').style.pointerEvents = "auto";

    document.querySelector('#cartel-bienvenida').textContent = "Jugás vos";
}

function colorearClicksUsuario(cuadroClickeado) {
    setTimeout(function() {
        document.querySelector(cuadroClickeado).style.opacity = '100%';
    }, 0);

    setTimeout(function() {
        document.querySelector(cuadroClickeado).style.opacity = '40%';
    }, 75);
}

function chequearResultadoJugada(jugadaUsuario, jugadaComputadora) { //Subcuadroidir en functions?
    let cantidadAciertos = 0;

    for (let i = 0; i < jugadaUsuario.length; i++) {

        if (jugadaUsuario[i] === jugadaComputadora[i]) {
            cantidadAciertos++;
        } else {
            mostrarErrorJugada();
        }
    }

    if (cantidadAciertos === jugadaComputadora.length) {
        resetearJugadaUsuario(jugadaUsuario);
        sumadorTurnoUsuario();
        contadorPuntosUsuario();
        jugadaComputadora.push(obtenerNumeroRandom());
        juegaComputadora();
    }
}

document.querySelector("#boton-jugar").onclick = function() {
    juegaComputadora();
    ocultarBotonJugar();
}

document.querySelector('#cuadro-1').onclick = function() {
    colorearClicksUsuario('#cuadro-1');
    jugadaUsuario.push(1);
    chequearResultadoJugada(jugadaUsuario, jugadaComputadora);
}

document.querySelector('#cuadro-2').onclick = function() {
    colorearClicksUsuario('#cuadro-2');
    jugadaUsuario.push(2)
    chequearResultadoJugada(jugadaUsuario, jugadaComputadora);
}

document.querySelector('#cuadro-3').onclick = function() {
    colorearClicksUsuario('#cuadro-3');
    jugadaUsuario.push(3)
    chequearResultadoJugada(jugadaUsuario, jugadaComputadora);
}

document.querySelector('#cuadro-4').onclick = function() {
    colorearClicksUsuario('#cuadro-4');
    jugadaUsuario.push(4)
    chequearResultadoJugada(jugadaUsuario, jugadaComputadora);
}

document.querySelector('#boton-continuar-juego').onclick = function() {
    ocultarErrorJugada();
    resetearJugadaUsuario(jugadaUsuario);
    juegaComputadora();

    return false;
}

document.querySelector('#boton-reinicio-juego').onclick = function() { // todavía no funciona, solo resetea el form
    
}
