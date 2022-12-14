// let localCart = localStorage.getItem("cart");
// localCart = JSON.parse(localCart);
let localCart = JSON.parse(localStorage.getItem("cart"));
// console.log(localCart);
// let recapProduct = document.getElementById("cart_items");
// let cartArray = [];
let totalPrice = 0;
let totalQuantity = 0;

if (!localCart) {
    const quantityTotal = document.getElementById("totalQuantity");
    quantityTotal.innerHTML = "0";
    const priceTotal = document.getElementById("totalPrice");
    priceTotal.innerHTML = "0";
    alert("Votre panier est vide");
} else {
    for (let product of localCart){
        //Requeter l'API pour recuperer le reste des info necessaire a la construction de notre panier
        const productUrl = "http://localhost:3000/api/products/" + product.productId;
        fetch(productUrl)
        // récupérer le résultat de la requête au format json
        .then(function(res) {
            if (res.ok) {
            return res.json();
          }
          
        })
      
        // ce qui est été traiter en json sera appelé item
        .then(function(items) {
            afficherProductPanier(items);
            suppression();
            totalProduit(items);
            RecupFormulaire();
            firstNameVerif();
        })
      
        // En cas d'erreur h1 au contenu de erreur 404 et renvoit en console l'erreur.
        .catch((err) => {
          // document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
          console.log("erreur 404, sur ressource api:" + err);
        });

        function afficherProductPanier(items){
             console.log(items.imageUrl,"test")
    
             // alert("panier contient le produit")
    
             let cartArticle = document.createElement("article");
             document.querySelector("#cart__items").appendChild(cartArticle);
             cartArticle.className = "cart__item";
             cartArticle.setAttribute("data-id", product.productId);
         
             let cartDivImg = document.createElement("div");
             cartArticle.appendChild(cartDivImg);
             cartDivImg.className = "cart__item__img";
         
             let cartImg = document.createElement("img");
             cartDivImg.appendChild(cartImg);
             cartImg.src = items.imageUrl;
             cartImg.alt = items.altTxt;
         
             // préparation des variables de creation des différents éléments
             let cartItemContent = document.createElement("div");
             let cartItemContentDescription = document.createElement("div");
             let cartItemContentDescriptionName = document.createElement("h2");
             let cartItemContentDescriptionColor = document.createElement("p");
             let cartItemContentDescriptionPrice = document.createElement("p");
             let cartItemContentSettings = document.createElement("div");
             let cartItemContentSettingsQuantityText = document.createElement("p");
    
             //Création d'une div d'après cartArticle pour creer cart_item_content
             cartArticle.appendChild(cartItemContent);
             cartItemContent.className = "cart__item__content";
    
             cartItemContent.appendChild(cartItemContentDescription);
             cartItemContentDescription.className = "cart__item__content__description";
    
             cartItemContentDescription.appendChild(cartItemContentDescriptionName);
             cartItemContentDescriptionName.innerHTML = items.name;
    
             cartItemContentDescription.appendChild(cartItemContentDescriptionColor);
             cartItemContentDescriptionColor.innerHTML = product.productColors;

            // Prix total de l'article dans le panier multiplié avec le nombre de cet article choisi
            let TotalProductPrice = items.price;
            // *product.productQuantity;
             cartItemContentDescription.appendChild(cartItemContentDescriptionPrice);
             cartItemContentDescriptionPrice.innerHTML = TotalProductPrice+" €";
    
             cartItemContent.appendChild(cartItemContentSettings);
             cartItemContentSettings.className = "cart__item__content__settings";
    
             //création de la div De la quantité a l'interieur de cart item content settings
             let cartItemContentSettingsQuantity = document.createElement("div");
             cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
             cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
             // création du text quantité en enfant de la div
             cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityText);
             cartItemContentSettingsQuantityText.innerHTML = "Qté : ";
    
             // création de l'input afin de choisir la quantité du produit
             let cartItemContentSettingsQuantityInput = document.createElement("input")
             cartItemContentSettingsQuantity.appendChild(cartItemContentSettingsQuantityInput);
             // cartItemContentSettingsQuantityInput.className = "itemQuantity";
             cartItemContentSettingsQuantityInput.setAttribute("name","itemQuantity");
             cartItemContentSettingsQuantityInput.setAttribute("type","number")
             cartItemContentSettingsQuantityInput.setAttribute("min","1")
             cartItemContentSettingsQuantityInput.setAttribute("max","100")
             cartItemContentSettingsQuantityInput.setAttribute("value", product.productQuantity);

             cartItemContentSettingsQuantityInput.addEventListener("change", Quantitymodify)

             function Quantitymodify(){
              for(let j=0; j<localCart.length;j++){

                if(product.productId ==localCart[j].productId && product.productColors ===localCart[j].productColors){
                  totalPrice = totalPrice - (parseInt(localCart[j].productQuantity)*(parseInt(items.price)));
                  localCart[j].productQuantity = (parseInt(cartItemContentSettingsQuantityInput.value,10))
                  totalPrice = totalPrice + (parseInt(localCart[j].productQuantity)*(parseInt(items.price)));
                  totalPriceText.innerHTML = totalPrice;
                  
                }
              }
              localStorage.setItem("cart",JSON.stringify(localCart))
            }
             // cartItemContentSettingsQuantityInput.value = "0";
    
             //Création du bouton supprimer le produit 
             let cartItemContentSettingsDelete = document.createElement("div");
             cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
             cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
             //Création du text de la div de suppression de produit
             let cartItemContentSettingsDeleteText = document.createElement("p");
             cartItemContentSettingsDelete.appendChild(cartItemContentSettingsDeleteText);
             cartItemContentSettingsDeleteText.className = "deleteItem";
             cartItemContentSettingsDeleteText.innerHTML = "Supprimer";
            
            cartItemContentSettingsDeleteText.addEventListener(

              "click",()=>{
                console.log("click");
                for(let j=0; j<localCart.length;j++){

                  if(product.productId ==localCart[j].productId && product.productColors ===localCart[j].productColors){
                    localCart.splice(j,1);
                    window.location.reload()
                  }
                }
                localStorage.setItem("cart",JSON.stringify(localCart))
              }
            ) 
            //  cartItemContentSettingsDeleteText.setAttribute("data-id", product.productId);
    
             // Création du calcul pour le total du panier
              const ItemSelect = document.querySelectorAll(".cart_item");
              let totalQuantity = document.getElementById("totalQuantity");
              let totalPriceText = document.getElementById("totalPrice");
              totalQuantity.innerHTML = localCart.length;
              totalPrice = totalPrice + (parseInt(items.price)*product.productQuantity);
              totalPriceText.innerHTML = totalPrice;
         }
    }
  }
  
  // ------------------------- Formulaire ------------- //

  //Ecoute de l'evenement du bouton au click
  
  const BtnOrder = document.getElementById("order");
  console.log(BtnOrder);
  BtnOrder.addEventListener("click", (event) => {
    console.log("click")
    event.preventDefault();
      //Creation de la constante du formulaire, en imcrémentant les valeurs de chaque clés dans les éléments sélectionnés du DOM
      const ContactForm = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
      //Création de l'objet orderData, pour regrouper les données de la commande
      const OrderData = {
        ContactForm: {
          firstName: ContactForm.firstName,
          lastName: ContactForm.lastName,
          address: ContactForm.address,
          city: ContactForm.city,
          email: ContactForm.email,
        }
      };
//---------------------------------------------------------------------------Validation du formulaire RegExp--------------------------------------------------------------
      //Déclaration d'une constante de vérification de saisie adresse
      const regExpAddress = (value) => {
        return /^[a-zA-Z0-9,-_ ']{2,50}[ ]{0,2}$/.test(value);
      };

      //Déclaration d'un constante de vérification de saisie prenom/Nom/Ville
      const regExpFirstLastName = (value) => {
        return /^[A-Za-z\é\è\ê\-]{2,30}$/.test(value);
      };

      //Déclaration d'une constante de vérification de saisie adresse e-mail
      const regExpEmail = (value) => {
        return /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,20}$/.test(
          value
        );
      };

      //message erreur en cas de mauvaise saisie prenom/nom/ville
      const textAlertName = (value) => {
        return `${value} :  Nb caractères : 2 - 30 / Les chiffres et symboles ne sont pas autorisés `;
      };

      //message erreur en cas de mauvaise saisie d'adresse
      const textAlertAdress = (value) => {
        return `${value} : Veuillez de saisir une adresse valide`;
      };

      //message erreur en cas de mauvaise saisie de la ville
      const textAlertCity = (value) => {
        return `${value} : Veuillez saisir une ville ou un code postal valide`;
      };
      //message erreur en cas de mauvaise saisie d'adresse e-mail
      const textAlertemail = (value) => {
        return `${value} : Veuillez saisir une adresse e-mail valide`;
      };

      //Fonction de control de la saisie du prénom
      function firstNameControl() {
        const firstName = ContactForm.firstName;
        console.log(firstName)
        if (regExpFirstLastName(firstName)) {
          firstNameErrorMsg.textContent = "Saisie valide ";
          firstNameErrorMsg.style.color = "white";
          return true;
        } else {
          firstNameErrorMsg.textContent = textAlertName("Prénom");
          return false;
        }
      }

      //Fonction de control de la saisie du nom
      function lastNameControl() {
        const lastName = ContactForm.lastName;

        if (regExpFirstLastName(lastName)) {
          lastNameErrorMsg.textContent = "Saisie valide ";
          lastNameErrorMsg.style.color = "white";
          return true;
        } else {
          lastNameErrorMsg.textContent = textAlertName("Nom");
          return false;
        }
      }

      //Fonction de control de la saisie de l'adresse
      function addressControl() {
        const address = ContactForm.address;

        if (regExpAddress(address)) {
          addressErrorMsg.textContent = "Saisie valide ";
          addressErrorMsg.style.color = "white";
          return true;
        } else {
          addressErrorMsg.textContent = textAlertAdress("Adresse");
          return false;
        }
      }

      //Fonction de control de la saisie de la Ville
      function cityControl() {
        const city = ContactForm.city;

        if (regExpAddress(city)) {
          cityErrorMsg.textContent = "Saisie valide ";
          cityErrorMsg.style.color = "white";
          return true;
        } else {
          cityErrorMsg.textContent = textAlertCity("Ville");
          return false;
        }
      }

      //Fonction de control de la saisie de l'adresse
      function emailControl() {
        const email = ContactForm.email;

        if (regExpEmail(email)) {
          emailErrorMsg.textContent = "Saisie valide ";
          emailErrorMsg.style.color = "white";
          return true;
        } else {
          emailErrorMsg.textContent = textAlertemail("Email");
          return false;
        }
      }
      //ajouter le bouton commander ici
      if (
        firstNameControl() &&
        lastNameControl() &&
        addressControl() &&
        cityControl() &&
        emailControl()
      ) {
        postOrder()
        // localStorage.setItem("order", JSON.stringify(OrderData));
      } else {
        alert("Une saisie est érroné, Veuillez bien remplir le formulaire");
        return false;
      }
       //---------------------------------------------------------------------------Fin du control du formulaire---------------------------------------------------------------------------
      //envoyer les données de la commande vers le serveur via une requête POST
      function postOrder() {
        let localStorageProducts = JSON.parse(localStorage.getItem("cart"));
        let products = [];
        // ajout de chaque id par produit dans un tableau produit
        for (let k = 0; k < localStorageProducts.length; k++) {
            products.push(localStorageProducts[k].productId);
        }
      
        // Je mets en place la variable data avec les éléments nécessaires concernant les produits et le formulaire
        let data = {
           contact: ContactForm,
            products,
        };      
        // Fetch POST
        
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status == 201) {
                    alert("Votre commande a bien été validée");
                    return res.json();
                } else if (res.status !== 201) {
                    alert(
                        "une erreur est survenue lors de l'envoi du formulaire, veuillez réessayer"
                    );
                }
            })
            .then((res) => {
                // Vide le localStorage
                localStorage.clear();
                // Ouvre la page de confirmation avec le numéro de commande dans l'URL
                window.location.href = `../html/confirmation.html?order_id=${res.orderId}`;
            })
            .catch((error) => console.log("Erreur : " + error));
      }
    })

