
// Get the value of the "id" parameter


fetch('http://localhost:3000/products')
    .then(response => response.json())
    .then(products => {
        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id');
        result = products.find(product => product.id == id)
        var productNameElement = document.getElementById("product_name");
        var priceElement = document.getElementById("price");

        productNameElement.innerHTML = result.name;


        priceElement.innerHTML = '$' +result.price;
// Lấy phần tử có id "product_image"
var productImageElement = document.getElementById("product_image");

// Thay đổi đường dẫn của hình ảnh
var newImageSrc = "./assets/products/"+ result.image;
productImageElement.src = newImageSrc;



    });

    function addToCart() {
      fetch('http://localhost:3000/carts')
        .then(response => response.json())
        .then(carts => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');
          const existingCart = carts.find(cart => cart.product_id == id);
          
          if (existingCart) {
            existingCart.quantity += 1;
            fetch(`http://localhost:3000/carts/${existingCart.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(existingCart)
            })
              .then(response => response.json())
              .then(updatedCart => {
                // Handle the updated cart
              })
              .catch(error => {
                // Handle the error
              });
          } else {
            const newCart = { product_id: id, quantity: 1 };
            fetch('http://localhost:3000/carts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newCart)
            })
              .then(response => response.json())
              .then(createdCart => {
                // Handle the created cart
              })
              .catch(error => {
                // Handle the error
              });
          }
        })
        .catch(error => {
          // Handle the error
        });
    }