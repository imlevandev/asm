
fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
const container = document.getElementById('product-container'); // Thay 'product-container' bằng ID của phần tử chứa danh sách sản phẩm

    products.forEach((product, index) => {
        if (index >= 8 ) {
            return false
        }
        const productCard = document.createElement('div');
        productCard.classList.add('product__item')
     
       
  
        productCard.innerHTML = `       
      
   
        `;
  
        container.appendChild(productCard);
  
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

 



