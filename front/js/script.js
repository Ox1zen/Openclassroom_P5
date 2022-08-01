// Récupération des informations sur l'url de l'api
//
fetch('http://localhost:3000/api/products')
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        console.log(data);
        afficherItems(data)


    })
    .catch(function(err) {
        // Une erreur est survenue
    })
    function afficherItems (products){
        let zoneItems = document.querySelector("#items");
          
        for (let product of products){
            zoneItems.innerHTML += `<a href="./product.html?_id=${product._id}">
             <article>
             <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
               <p class="productDescription">${product.description}</p>
            </article>
           </a>`;
        }}