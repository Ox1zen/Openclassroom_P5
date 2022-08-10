const urlcourante = document.location.href;
const url = new URL(urlcourante);
const id = url.searchParams.get("_id");
console.log(id);

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        console.log(data);
        AfficherItemsImage(data)
        AfficherItemsProduct(data)
        AfficherItemsColors(data)
    })
    .catch(function(err) {
        // Une erreur est survenue
    })


    function AfficherItemsImage(product){
        let ItemsImage = document.querySelector(".item__img")
        console.log(product)

        ItemsImage.innerHTML = `<img src="${product.imageUrl}">`;
    }

    function AfficherItemsProduct (product){
    let zoneItems = document.querySelector(".item__content")
    console.log(product)

    zoneItems.innerHTML = `<div class="item__content__titlePrice">
    <h1 id="title">${product.name}</h1>
    <p>Prix : <span id="price">${product.price}</span>€</p>
  </div>

  <div class="item__content__description">
  <p class="item__content__description__title">Description :</p>
  <p id="description">${product.description}</p>
</div>

<div class="item__content__settings">
    <div class="item__content__settings__color">
        <label for="color-select">Choisir une couleur :</label>`
}

function AfficherItemsColors(product){
    let ItemsColors = document.querySelector(".item__content__settings")
    console.log(product)
    ItemsColors.innerHTML = `<div class="item__content__settings__color">
    <label for="color-select">Choisir une couleur :</label>
    <select name="color-select" id="colors">
        <option value="">--SVP, choisissez une couleur --</option>
        <option value="${product.colors}">${product.colors}</option>
        <option value="${product.colors}">${product.colors}</option>
    </select>
</div>`;

    // for (let product of product){

    // }
}
