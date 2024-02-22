fetch('http://localhost:3000/orders')
  .then(response => response.json())
  .then(orders => {
    const ordersListElement = document.getElementById('ordersList');

    orders.forEach(order => {
      const orderElement = document.createElement('div');
      orderElement.classList.add('order');
      if (order.status == 'đang chờ xác nhận') {
        orderElement.innerHTML = `
          <h3>Order ID: ${order.id}</h3>
          <p>Customer Name: ${order.firstname} ${order.lastname}</p>
          <p>Address: ${order.address}</p>
          <p>Email: ${order.email}</p>
          <p>Phone Number: ${order.phone_num}</p>
          <p>Total Amount: $${order.total_amout}</p>
          <p>Status: ${order.status}</p>
          <button class="detailButton">Detail</button>
          <button class="handleAccept">Xác nhận</button>
        `;
      } else {
        orderElement.innerHTML = `
          <h3>Order ID: ${order.id}</h3>
          <p>Customer Name: ${order.firstname} ${order.lastname}</p>
          <p>Address: ${order.address}</p>
          <p>Email: ${order.email}</p>
          <p>Phone Number: ${order.phone_num}</p>
          <p>Total Amount: $${order.total_amout}</p>
          <p>Status: ${order.status}</p>
          <button class="detailButton">Detail</button>
        `;
      }

      const handleAcceptButtons = orderElement.querySelectorAll('.handleAccept');
      handleAcceptButtons.forEach(button => {
        button.addEventListener('click', () => {
          editOrder(order);
        });
      });

      const detailButton = orderElement.querySelector('.detailButton');
      detailButton.addEventListener('click', () => {
        showOrderDetails(order);
      });

      ordersListElement.appendChild(orderElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function showOrderDetails(order) {
  // Logic to show the detailed information of the order
  // Redirect to a detail page or perform any other necessary operations
}
function editOrder(order) {
  console.log(order)
  let orderData = {...order , status: 'đã giao'}
  // Logic to show the detailed information of the order
  // Redirect to a detail page or perform any other necessary operations
  fetch(`http://localhost:3000/orders/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => {
      console.log(response.json())
    })
   
    .catch(error => {
      console.error('Error:', error);
      // Handle any errors that occur during the update process
    });
}