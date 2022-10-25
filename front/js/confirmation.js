//RECUPERATION DU NUMERO DE COMMANDE DANS L'URL POUR AFFICHAGE

let params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
document.getElementById("orderId").innerHTML += `${orderId}`;