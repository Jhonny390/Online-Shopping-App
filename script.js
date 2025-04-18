//Element References
const productsContainer = document.getElementById("productscontainer")
const cartcontainer = document.getElementById("cartcontainer")
const feedbackElement= document.getElementById("feedback")
const clearCartBtn= document.getElementById("ClearCart")
const sortBypriceBtn= document.getElementById("sortByPrice")
//default Products
const products=[
    {
        id:1,
        name:"Laptop",
        price:50000,
    },
    {
        id:2,
        name:"Phone",
        price:20000,   
    },
    {
        id:3,
        name:"Tablet",
        price:5000,
    },
    {
        id:4,
        name:"Smart watch",
        price:1000,
    },
    {
        id:5,
        name:"Headphones",
        price:500,
    },
];

//empty cart
const cart=[]

//used to reset the timer(user feedback)
let timerid
clearCartBtn.addEventListener('click',ClearCart)

sortBypriceBtn.addEventListener('click',sortByPrice)

 function ClearCart(){
    cart.length=0
    renderCartDetails()
    upadateUserFeedback('Cart is cleared','success')
}
function sortByPrice(){
    cart.sort(function(Item,Item2){
        return Item.price-Item2.price
    })
    renderCartDetails()

  }
 
 
function renderProductDerails(){
products.forEach(function(product){
   
const {id,name,price}=product
 const divElement= document.createElement('div')
     divElement.className="product-row";
     divElement.innerHTML=`
                            <p>${product.name} - Rs. ${product.price}</p>
                            <button onclick="addtocart(${id})">Add to cart</button>
                               </div>`;
            
   productsContainer.appendChild(divElement)
});
}

//add to cart
function addtocart(id){
    console.log("add to cart",id)
const producttoadd=products.find(function(product){
       return product.id === id;
    })
    const isproductAvailable=cart.some((product) =>  product.id===id)
    if(isproductAvailable) {
        // feedbackElement.textContent=` Item already added to the cart`
        upadateUserFeedback(` Item already added to the cart`,"error")
        return
    }
    // console.log(producttoadd)
    cart.push(producttoadd)
    console.log(cart)
    renderCartDetails()

  
    upadateUserFeedback(`${producttoadd.name} is added to the cart`,"sucess")
}

function renderCartDetails(){
     cartcontainer.innerHTML= ""
    cart.forEach(function(product){
    const {id,name,price} =product
   
    const cartItemRow = `
        <div class="product-row">
        <p>${name} - Rs. ${price}</p>
        <button onclick ="removeFromcart(${id})">Remove</button>
        </div> `
    cartcontainer.insertAdjacentHTML("beforeend",cartItemRow)
    })

  
     console.log("cart",cart)
   
    const totalprice=cart.reduce(function(acc,curproduct){
        return acc+curproduct.price
    },0)
    document.getElementById("totalprice").textContent =`Rs.${totalprice}`
}
  function removeFromcart(id){
    console.log(id)
    const product = cart.find((product)=> product.id===id)
    // const upadatedcart =cart.filter(function(product){
    //     return product.id!==id
    // })

    const productIndex= cart.findIndex((product)=>product.id===id)
     cart.splice(productIndex,1)
   
    upadateUserFeedback(`${product.name} is removed from the cart`,"error")
    renderCartDetails()
  }



 function upadateUserFeedback(msg,type){
    clearTimeout(timerid)
    feedbackElement.style.display="block"
     if(type==="sucess"){
        feedbackElement.style.backgroundColor="green"
     }
     if(type==="error"){
        feedbackElement.style.backgroundColor="red"
     }
    feedbackElement.textContent=msg
      

     timerid=setTimeout(function(){
        feedbackElement.style.display="none"
    },3000)
 }
 
 
 //rendering products
 renderProductDerails();
