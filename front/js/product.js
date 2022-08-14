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
        // console.log(data);
        afficherProductItems(data)
    })
    .catch(function(err) {
        // Une erreur est survenue
    })


    function afficherProductItems(item){
        console.log(item)
        // Créer un élément <img> et ajouter-le au document :
        let Img = document.createElement("img");
        // ajouter l'image du produit
        Img.src=item.imageUrl;
         // ajouter Img en tant que enfant de l'élément avec la class="item__img":
        document.querySelector(".item__img").appendChild(Img);
        
        //Ajouter le nom du produit
        document.querySelector("#title").innerHTML= item.name;
        //Ajouter le prix du produit
        document.querySelector("#price").innerHTML= item.price;
        //Ajouter la description du produit
        document.querySelector("#description").innerHTML= item.description;
        //Remplir les options du composant select
        for(let color of item.colors){
            let option = document.createElement("option");
            option.innerHTML= color;
            document.querySelector("#colors").appendChild(option);
        }
    }