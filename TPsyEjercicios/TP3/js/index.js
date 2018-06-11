
$('#start').click(function () {
    let jugador = $('#jugador').val();
    window.sessionStorage.setItem("jugador", jugador);
    let dificultad = $('input:radio.dificultad:checked').val(); 
    window.sessionStorage.setItem("dificultad", dificultad);
}); //doc ready


 


