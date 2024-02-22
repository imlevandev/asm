fetch('http://localhost:3000/carts')
  .then(response => response.json())
  .then(carts => {
    console.log(carts)
    carts.forEach((cart, index) => {
        fetch(`http://localhost:3000/products/${cart.product_id}`)
        .then(response => response.json())
        .then(products => { 
          const urlParams = new URLSearchParams(window.location.search);
  const p_id = urlParams.get('id');
      const container = document.getElementById('cart_lists');
      const tr = document.createElement('tr');
      tr.classList.add('position-relative');
      tr.innerHTML = `
       

        <tr>
        <td class="product-thumbnail">
          <a href="product-detail.html"
            ><img
              src="./assets/products/${products.image}"
              alt=""
          /></a>
        </td>
        <td class="product-name">
          <a href="product-detail.html">${products.name}</a>
        </td>
        <td class="product-price">
          <span class="amount">$${products.price}</span>
        </td>
        <td class="product-quantity">
          <div class="cart-plus-minus">
            <input type="text" value="${cart.quantity}" />
          </div>
        </td>
        <td class="product-subtotal">
          <span class="amount">$${ Math.round(cart.quantity * products.price)}</span>
        </td>
        <td class="product-remove">
          <a href="${window.location.pathname}${window.location.search}${p_id ?'&' : '?'}del_id=${cart.id}"><i class="fa fa-times"></i></a>
        </td>
      </tr>
     
        `;
      console.log(tr)
      container.appendChild(tr);
        })
    });
  });
  document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const del_id = urlParams.get('del_id');
    if (del_id) {
      fetch(`http://localhost:3000/carts/${del_id}`,  {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(products => {
          const urlParams = new URLSearchParams(window.location.search);
          const id = urlParams.get('id');
          result = products.find(product => product.id == id)
          var productNameElement = document.getElementById("product_name");
          var priceElement = document.getElementById("price");
          productNameElement.textContent = result.name;
          priceElement.textContent = '$' + result.price;
          var productImageElement = document.getElementById("product_image");
          var newImageSrc = "./assets/products/" + result.image;
          productImageElement.src = newImageSrc;
          window.location.href = 'cart.html';
      });
    }
  });