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
            payment.style.display = "flex";
          });
          
          close.addEventListener("click", () => {
            payment.style.display = "none";
          });

         