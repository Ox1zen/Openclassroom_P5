const urlcourante = document.location.href;
const url = new URL(urlcourante);
const id = url.searchParams.get("_id");
console.log(id);

let cart = [];

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(data) {
        // console.log(afficherProductItems)
        afficherProductItems(data)
        // console.log(productCart)
        productCart(data)
    })
    .catch(function(err) {
        // Une erreur est survenue
    });


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
        // let button = document.createElement("button");
        // button.id="addToCart";
        // button.className="addToCart";
        // document.querySelector(".item__content__addButton").appendChild(button);
        // document.querySelector("#addToCart").innerHTML="Ajouter au panier";
        // AddToCartButton.id=item._id;
    };
   
    let cartButton = document.getElementById("addToCart");
    cartButton.addEventListener("click", (e) => {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        console.log("click")
        let quantities = document.getElementById("quantity").value
        let colorselected = document.getElementById("colors").value
        let prodTrouve = false;
        let position = 0;   
 
        let newProduct = {
            productId:id,
            productColors: colorselected,
            productQuantity: quantities,
        };

        let verif = quantities > 0 && quantities < 100;
        if(!verif || colorselected==""){
            alert("veuillez choisir une quantite ou une couleur")
        }

        if (localCart) {
            
            
            for (let i=0 ;i<localCart.length;i++){

                console.log(localCart[i],"panier")


                if( newProduct.productId===  localCart[i].productId &&
                    newProduct.productColors === localCart[i].productColors ) {
                    prodTrouve = true;
                    position = i;
                    break;
                }

                // console.log(parseInt(newProduct.productId) ===  parseInt(localCart[i].productId), parseInt(newProduct.productColors) === parseInt(localCart[i].productColors))
           
    }
    console.log(prodTrouve)
    if( prodTrouve === true){
        console.log("fessdq")
        localCart[position].productQuantity = parseInt(localCart[position].productQuantity) + parseInt(newProduct.productQuantity);
        localStorage.setItem("cart", JSON.stringify(localCart));
        console.log(localCart)
    }else{
        localCart.push(newProduct)
        localStorage.setItem("cart", JSON.stringify(localCart));
    }

        

    }  
     else{
        localCart=[]
        localCart.push(newProduct)
        localStorage.setItem("cart", JSON.stringify(localCart));

    }
})