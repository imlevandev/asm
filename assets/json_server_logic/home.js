
fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
const container = document.getElementById('product-container'); // Thay 'product-container' bằng ID của phần tử chứa danh sách sản phẩm

    products.forEach((product, index) => {
        if (index >= 14 ) {
            return false
        }
        const productCard = document.createElement('div');
        productCard.classList.add('product__item')
     
       
  
        productCard.innerHTML = `       
        <div class="product__wrapper mb-60">
          <div class="product__thumb">
            <a href="product-detail.html?id=${product.id}" class="w-img">
              <img
                src="${product.image}"
                alt="product-img"
              />
              <img
                class="product__thumb-2"
                src="assets/img/shop/product/product-10.jpg"
                alt="product-img"
              />
            </a>
            <div class="product__action transition-3">
              <a
                href="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Add to Wishlist"
              >
                <i class="fal fa-heart"></i>
              </a>
              <a
                href="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Compare"
              >
                <i class="fal fa-sliders-h"></i>
              </a>
              <!-- Button trigger modal -->
              <a
                href="#"
                data-toggle="modal"
                data-target="#productModalId"
              >
                <i class="fal fa-search"></i>
              </a>
            </div>
          </div>
          <div class="product__content p-relative">
            <div class="product__content-inner">
              <h4>
                <a href="product-detail.html"
                  >   ${product.name}</a
                >
              </h4>
              <div class="product__price transition-3">
                <span>$   ${product.price}</span>
             
              </div>
            </div>
            <div class="add-cart p-absolute transition-3">
              <a href="#">+ Add to Cart</a>
            </div>
          </div>
        </div>
       




   
        `;
  
        container.appendChild(productCard);
  
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

 



