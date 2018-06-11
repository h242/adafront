
$('document').ready(function () {
    //var jugador = prompt("¡Hola! ¿Cuál es tu nombre?");
    //document.getElementById('player').innerHTML = jugador;
    let jugador = sessionStorage.getItem("jugador");
    let dificultad = sessionStorage.getItem("dificultad");
    document.getElementById('jugador').innerHTML = jugador;
    document.getElementById('dificultad').innerHTML = dificultad;
    $('#clics').on('p', function(e) {
        $('#contadorClics').text( $(e.target).val() )
      });
    $('#turnos').on('p', function(e) {
        $('#contadorTurnos').text( $(e.target).val() )
      });
    $('#pares').on('p', function(e) {
        $('#contadorPares').text( $(e.target).val() )
      });
/**
 * Show progress of game depending on difficulty selected
 *
 * @param {number} dificultad Maximum of turns permitted
 * @param {number} turnos Number of turns played so far 

    function progress(dificultad, turnos) {
        let progressbar = $('#progressbar');
        let progressLabel = $('.progress-label');
        progressbar.progressbar({
            value: false,
            change: function() {
                progressLabel.text( progressbar.progressbar( "value" ) + "%" );
            },
        complete: function() {
            progressLabel.text( "Complete!" );
            }
        });
    }
*/
    /**
     * Shuffle an array using Fisher--Yates shuffling
     *
     * @param {Array} array  Array to shuffle
     * @returns {Array}
     */
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    /**
     * Builds an array mapping the numbers from 0 to wanted - 1 to a random
     * number from 0 to available - 1 (two copies of each so board is complete)
     *
     * @param {number} available  Number of available .PNGs
     * @param {number} wanted     Number of tiles wanted (must be even)
     * @returns {Array.number}
     */
    function buildMapping(available, wanted) {
        var all = [], half;
        for (var i = 0; i < available; i++) {
            all.push(i);
        }
        half = shuffle(all).slice(0, wanted / 2);
        return shuffle($.merge(half, half));
    }

    /** @type {Array.number} */
    var tablero = [];
    /** @type {Array.number} */
    var matchedIds = [];
    /** @type {Array.number} */
    var descubiertasIds = [];
    /** @type {number} */
    var contadorClics = 0;

    /**
     * Add the "jugar" click-handler to every tile
     *
     */
    function setListenersActive() {
        $('.tile').click(function () { jugar(parseInt($(this).attr('data-id'))); });
        
    }

    /**
     * Remove the click-handlers from every tile
     *
     */
    function setListenersPassive() {
        $('.tile').unbind();
    }

    function restart() {
        tablero = buildMapping(36, $('.tile').length);
        matchedIds = [];
        descubiertasIds = [];
        matchedIds = []; 
        $('.tile').attr('src', `img/zorros/dorso.png`);
        setListenersActive();
        contadorClics = 0;
        $('#pares').val((matchedIds.length)/2);
        $('#pares').trigger('p');
        $('#clics').val(contadorClics);
        $('#clics').trigger('p');
        $('#turnos').val(contadorClics/2);
        $('#turnos').trigger('p');

    }

    function bounce (descubiertasIds) {
        $(descubiertasIds).effect( "bounce", "slow", 200 );
    } // se mueve todo el tablero en vez de la tile clickeada

    /**
     * Main click handler
     *
     * @param {number} tileId  Contents of the "data-id" attribute for the element the handler was fired upon
     */
    function jugar(tileId) {
        contadorClics++;
        if (matchedIds.includes(tileId)) {
            //alert("Zorrito matcheado");
            bounce ('.tile');
        } else if (descubiertasIds.includes(tileId)) {
            //alert("¡Buscá a su compañera!");
            bounce ('.tile');
        } else {
            $('#clics').val(contadorClics);
            $('#clics').trigger('p');
            $('#turnos').val(contadorClics/2);
            $('#turnos').trigger('p');
            descubiertasIds.push(tileId);
            $('.tile:nth-child(' + (tileId + 1) + ')').attr('src', `img/zorros/${tablero[tileId]}.png`);
            if (2 === descubiertasIds.length) {
                if (tablero[descubiertasIds[0]] === tablero[descubiertasIds[1]]) {
                    matchedIds.push(descubiertasIds[0]);
                    matchedIds.push(descubiertasIds[1]);
                    $('#pares').val((matchedIds.length)/2);
                    $('#pares').trigger('p');
                    descubiertasIds = [];
                    if (matchedIds.length === tablero.length) {
                        setListenersPassive();
                        setTimeout(function () {
                            //Guardar puntaje para mostrarlo en el ranking:
                            //localStorage.setItem (jugador, puntaje);

                            if (confirm("¡Ganaste! ¿Jugar de nuevo?")) {
                                restart();
                            } //else {mostrar ranking}
                        }, 500);
                    }
                } else {
                    setListenersPassive();
                    setTimeout(function () {
                      $('.tile:nth-child(' + (descubiertasIds[0] + 1) + ')').attr('src', `img/zorros/dorso.png`);
                      $('.tile:nth-child(' + (descubiertasIds[1] + 1) + ')').attr('src', `img/zorros/dorso.png`);
                      descubiertasIds = [];
                      setListenersActive();
                    }, 1500);
                }
            }
        }
    }

    restart();
    
    $('#restart').click(function () {
            setListenersPassive();
            restart();
            console.log("restart");
        }); 



}); //doc ready

function allEqual(array) {
    for (var i = 1; i < array.length; i++) {
        if (array[i - 1] !== array[i]) {
            return false;
        }
    }
    return true;
}

 


