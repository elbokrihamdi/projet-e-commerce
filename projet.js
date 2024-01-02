const wrapper = document.querySelector(".sliderwrapper");
const menuItems = document.querySelectorAll(".menuItem");


    const products = [
        {
          id: 1,
          title: "omega swatch",
          price: 250,
          colors: [
            {
              code: "black",
              img: "assets/single_card_variation_2_jupiter_1080x1080.avif",
            },
            {
              code: "darkblue",
              img: "assets/OMEGA-x-swatch-750x410.jpg",
            },
          ],
        },
        {
          id: 2,
          title: "BIOCERAMIC MOONSWATCH",
          price: 149,
          colors: [
            {
              code: "lightgray",
              img: "assets/single_card_variation_2_moon_1080x1080.avif",
            },
            {
              code: "green",
              img: "assets/lot.jfif",
            },
          ],
        },
        {
          id: 3,
          title: "petit poussoir",
          price: 109,
          colors: [
            {
              code: "lightgray",
              img: "assets/single_card_variation_2_saturne_1080x1080.avif",
            },
            {
              code: "green",
              img: "assets/afif.avif",
            },
          ],
        },
        {
          id: 4,
          title: "moon swatch",
          price: 129,
          colors: [
            {
              code: "black",
              img: "assets/single_card_variation_2_sun_1080x1080.avif",
            },
            {
              code: "lightgray",
              img: "assets/prew.jpg",
            },
          ],
        },
        {
          id: 5,
          title: "speeder",
          price: 99,
          colors: [
            {
              code: "gray",
              img: "assets/sw.avif",
            },
            {
              code: "black",
              img: "assets/omg1.jpg",
            },
          ],
        },
      ];
      let choosenProduct = products[0];
      const currentProductImg = document.querySelector(".productImg");
      const currentProductTitle = document.querySelector(".productTitle");
      const currentProductPrice = document.querySelector(".productPrice");
      const currentProductColors = document.querySelectorAll(".color");
      const currentProductSizes = document.querySelectorAll(".size");
      menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            // change the current slide
            wrapper.style.transform = `translateX(${-100 * index}vw)`;
            // change the choosen product
            choosenProduct = products[index]
            //change texts of cuurentProduct
            currentProductTitle.textContent = choosenProduct.title;
            currentProductPrice.textContent = "$" + choosenProduct.price;
            currentProductImg.src = choosenProduct.colors[0].img;
        
            //assing new colors
            currentProductColors.forEach((color, index) => {
              color.style.backgroundColor = choosenProduct.colors[index].code;
            });
        });
        });
        currentProductColors.forEach((color, index) => {
            color.addEventListener("click", () => {
              currentProductImg.src = choosenProduct.colors[index].img;
            });
          });
          
          currentProductSizes.forEach((size, index) => {
            size.addEventListener("click", () => {
              currentProductSizes.forEach((size) => {
                size.style.backgroundColor = "white";
                size.style.color = "black";
              });
              size.style.backgroundColor = "black";
              size.style.color = "white";
            });
          });
          
          const productButton = document.querySelector(".productButton");
          const payment = document.querySelector(".payment");
          const close = document.querySelector(".close");
          
          productButton.addEventListener("click", () => {
            shoppingcart.style.display = "flex";
          });
          
          close.addEventListener("click", () => {
            payment.style.display = "none";
          });
        //variables
        
        const cartBtn=document.querySelector('.cart-btn');
        const closeCartBtn=document.querySelector('.close-cart');
        const clearCartBtn=document.querySelector('.clear-cart');
        const cartDOM=document.querySelector('.cart');
        const cartBag=document.querySelector('.cart-bag');
        const cartItems=document.querySelector('.cart-items');
        const cartTotal=document.querySelector('.cart-total');
        const cartContent=document.querySelector('.cart-content');
        const productsDOM=document.querySelector('.slider');
        const shoppingcart = document.querySelector(".shopping-cart")
        //cart
        let cart=[];
        //buttons
        let buttonsDOM=[];
        
        //getting the products
        class Products{
            async getProducts(){
                try{
        
                   let contentful=await client.getEntries({
                    content_type: "comfyHouseProducts"
                   });
                
                   //console.log(contentful);
        
                    // let result=await fetch('products.json');
                    // let data=await result.json();
                    
                    //let products=data.items;
                    let products=contentful.items;
                    products=products.map(item=>{
                        const {title,price}=item.fields;
                        const {id}=item.sys;
                        const image=item.fields.image.fields.file.url;
                        return {title,price,id,image};
                    })
                    return products;
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        
        //display products
        class UI {
            displayProducts(products){
                let result='';
                products.forEach(product=> {
                    result+=`
                    <!-- single product-->
                    <article class="product">
                        <div class="img-container">
                            <img 
                            src=${product.image} 
                            alt="product" class="product-img">
                            <button class="bag-btn" data-id=${product.id}>
             <i class="fas fa-shopping-cart">
              add to bag
             </i>
            </button>
                        </div>
                        <h3>${product.title}</h3>
                        <h4>$${product.price}</h4>
                    </article>
                    <!-- end of single product-->
                    `;
                });
                productsDOM.innerHTML=result;
            }
            getBagButtons(){
                const buttons=[...document.querySelectorAll(".bag-btn")];
                buttonsDOM=buttons;
                buttons.forEach(button=>{
                    let id=button.dataset.id;
                    let inCart=cart.find(item=>item.id===id);
                    if(inCart){
                        button.innerText="In Cart";
                        button.disabled=true;
                    }
                        button.addEventListener('click',(event)=>{
                            event.target.innerText="In Cart";
                            event.target.disabled=true;
        
                            // get product from products
                            let cartItem={...Storage.getProduct(id),amount:1};
        
                            // add product to the cart
                            cart=[...cart,cartItem];
        
                            // save cart in local storage
                            Storage.saveCart(cart);
        
                            // set cart values
                            this.setCartValues(cart);
        
                            // display cart item
                            this.addCartItem(cartItem);
        
                            // show the cart
                            //this.showCart();
        
                        });
                });
            }
            setCartValues(cart){
                let tempTotal=0;
                let itemsTotal=0;
                cart.map(item=>{
                    tempTotal+=item.price * item.amount;
                    itemsTotal+=item.amount;
                });
                cartTotal.innerText=parseFloat(tempTotal.toFixed(2));
                cartItems.innerText=itemsTotal;
            }
        
            addCartItem(item){
                const div=document.createElement('div');
                div.classList.add('cart-item');
                div.innerHTML=`<img src=${item.image}>
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item" data-id=${item.id}>remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id=${item.id}></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id=${item.id}></i>
                </div>`;
                cartContent.appendChild(div);
        
            }
            showCart(){
                cartOverlay.classList.add('transparentBcg');
                cartDOM.classList.add('showCart');
            }
            setupAPP(){
                cart=Storage.getCart();
                this.setCartValues(cart);
                this.populateCart(cart);
                cartBtn.addEventListener('click',this.showCart);
                closeCartBtn.addEventListener('click',this.hideCart);
            }
        
            populateCart(cart){
                cart.forEach(item=>this.addCartItem(item));
            }
        
            hideCart(){
                cartOverlay.classList.remove('transparentBcg');
                cartDOM.classList.remove('showCart');
            }
            
            cartLogic(){
                //clear cart button
                clearCartBtn.addEventListener('click',()=>{
                    this.clearCart();
                });
        
                //cart functionality
                cartContent.addEventListener('click',event=>{
                    if(event.target.classList.contains('remove-item')){
                        let removeItem=event.target;
                        let id=removeItem.dataset.id;
                        cartContent.removeChild(removeItem.parentElement.parentElement);
                        this.removeItem(id);
                    }
                    else if(event.target.classList.contains('fa-chevron-up')){
                        let addAmount=event.target;
                        let id=addAmount.dataset.id;
                        let tempItem=cart.find(item=>item.id===id);
                        tempItem.amount=tempItem.amount+1;
                        Storage.saveCart(cart);
                        this.setCartValues(cart);
                        addAmount.nextElementSibling.innerText=tempItem.amount;
                    }
                    else if(event.target.classList.contains('fa-chevron-down')){
                        let lowerAmount=event.target;
                        let id=lowerAmount.dataset.id;
                        let tempItem=cart.find(item=>item.id===id);
                        tempItem.amount=tempItem.amount-1;
                        if(tempItem.amount>0){
                            Storage.saveCart(cart);
                            this.setCartValues(cart);
                            lowerAmount.previousElementSibling.innerText=tempItem.amount;
                        }
                        else{
                            cartContent.removeChild(lowerAmount.parentElement.parentElement);
                            this.removeItem(id);
                        }
                    }
                });
            }
        
            clearCart(){
                let cartItems=cart.map(item=>item.id);
                cartItems.forEach(id=>this.removeItem(id));
                while(cartContent.children.length>0){
                    cartContent.removeChild(cartContent.children[0]);
                }
                this.hideCart();
            }
        
            removeItem(id){
                cart=cart.filter(item=>item.id!==id);
                this.setCartValues(cart);
                Storage.saveCart(cart);
                let button=this.getSingleButton(id);
                button.disabled=false;
                button.innerHTML=`<i class="fas fa-shopping-cart">add to cart</i>`;
            }
            
            getSingleButton(id){
                return buttonsDOM.find(button=>button.dataset.id===id);
            }
        }
        
        //local storage
        class Storage{
            static saveProducts(products){
                localStorage.setItem("products",JSON.stringify(products));
            }
        
            static getProduct(id){
                let products=JSON.parse(localStorage.getItem('products'));
                return products.find(product=>product.id===id);
            }
        
            static saveCart(cart){
                localStorage.setItem('cart',JSON.stringify(cart));
            }
        
            static getCart(){
                return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
            }
        }
        
        document.addEventListener("DOMContentLoaded",()=>{
            const ui=new UI();
            const products=new Products();
        
            //setup app
            ui.setupAPP();
        
            //get all products
            products.getProducts().then(products=>{
                ui.displayProducts(products)
                Storage.saveProducts(products);
            }).then(()=>{
                ui.getBagButtons();
                ui.cartLogic();
            });
        });
      


