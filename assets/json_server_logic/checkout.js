fetch('http://localhost:3000/carts')
    .then(response => response.json())
    .then(carts => {
        console.log(carts);
        let total_amount = 0;

        // Mảng chứa tất cả các promise từ các lời gọi fetch
        const fetchPromises = carts.map(cart => {
            return fetch(`http://localhost:3000/products/${cart.product_id}`)
                .then(response => response.json())
                .then(product => {
                    total_amount += product.price * cart.quantity;
                });
        });

        // Đợi cho tất cả các promise hoàn thành
        Promise.all(fetchPromises)
            .then(() => {
                document.getElementById('subtotal').innerText = '$' + Math.round(total_amount)
                document.getElementById('total_amount').innerText = '$' + Math.round(total_amount)
                console.log(total_amount);
            });


        carts.forEach((cart, index) => {
            fetch(`http://localhost:3000/products/${cart.product_id}`)
                .then(response => response.json())
                .then(products => {
                    const container = document.getElementById('cart_list')
                    console.log(container)
                    const tr = document.createElement('tr');
                    tr.classList.add('cart_item');
                    tr.innerHTML = `
            
         
          
          <td class="product-name">
          ${products.name}
            <strong class="product-quantity"> × ${cart.quantity}</strong>
          </td>
          <td class="product-total">
            <span class="amount">$${Math.round(cart.quantity * products.price)}</span>
          </td>
            `;

                    // Chèn tr vào container
                    container.appendChild(tr);
                });
        });
    });

const checkout = async (event) => {
    event.preventDefault();
   await Swal.fire({
      title: 'Success!',
      text: 'Thanh toán thành công',
      icon: 'success',
      confirmButtonText: 'Tiếp tục'
    }, 4000)
    let firstname = document.getElementById('first-name').value
    let lastname = document.getElementById('last-name').value
    let address = document.getElementById('street-address').value
    let email = document.getElementById('email').value
    let phone_num = document.getElementById('phone').value
    let total_amout = document.getElementById('total_amount').innerText
        total_amout = total_amout.replace('$', '');

    fetch(`http://localhost:3000/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            address,
            email,
            phone_num,
            total_amout
        })

    })
        .then(response => response.json())
        .then(orders => {
     
            console.log(orders)
        })

     // Lấy danh sách tất cả giỏ hàng
fetch('http://localhost:3000/carts')
.then(response => response.json())
.then(carts => {
  // Duyệt qua từng giỏ hàng và gửi yêu cầu xóa
  carts.forEach(cart => {
    const cartId = cart.id;

    fetch(`http://localhost:3000/carts/${cartId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log(`Cart with ID ${cartId} deleted successfully`);
        } else {
          console.log(`Failed to delete cart with ID ${cartId}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
})
.catch(error => {
  console.error('Error:', error);
});

}