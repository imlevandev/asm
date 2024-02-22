
fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(products => {
    const productsListElement = document.getElementById('productsList');

    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      let src =''
      
     

      if (typeof product?.image === 'string' && (product?.image.includes('cloudinary') || false)) {
        src = product.image;
    } else {
        src = './assets/products/' + product?.image;
    }


      productElement.innerHTML = `
        <img style="width: 100%" src="${src}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <button class="deleteButton">Delete</button>
        <button class="editButton">Edit</button>
      `;

      // Add event listeners for delete and edit buttons
      const deleteButton = productElement.querySelector('.deleteButton');
      deleteButton.addEventListener('click', () => {
        deleteProduct(product.id);
      });

      const editButton = productElement.querySelector('.editButton');
      editButton.addEventListener('click', () => {
        editProduct(product.id,product.name, product.price, product.image );
      });

      productsListElement.appendChild(productElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  function editProduct(id,name, price, image ) {
    editImage = image
    openEditModal(id,name, price, image)
  // Logic to edit the product with the given productId
  // Redirect to an edit page or perform any other necessary operations
}
  function deleteProduct(productId) {
    fetch(`http://localhost:3000/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log('Product deleted successfully');
      // Thực hiện các thao tác cần thiết sau khi xóa sản phẩm thành công
    })
    .catch(error => {
      console.error('Error deleting product:', error);
      // Xử lý lỗi nếu có
    });
  }


// modal
const createButton = document.getElementById('createButton');
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];
const productForm = document.getElementById('productForm');
const categorySelect = document.getElementById('category');
const productImageInput = document.getElementById('productImage');
let editImage = ''
createButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
let fileUrl = '';

productForm.addEventListener('submit', event => {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('productImage').files[0];
    const category = categorySelect.value;
  
    let data = {
      name: productName,
      price: productPrice,
      image: fileUrl,
      category_id: category
    };
  
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error creating product');
        }
        console.log(response.json()) ;
      })
     
      .catch(error => {
        console.error('Error:', error.message);
        // Handle the error appropriately
      });
  });
// Fetch categories from JSON file
fetch('http://localhost:3000/categories')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching categories');
    }
    return response.json();
  })
  .then(data => {
    // Create options for category select
    data.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
  });
  productImageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'nte7vuwr');
      formData.append('cloud_name', 'derz9qdf3');
      formData.append('folder', 'Cloudinary-React');
  
      try {
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/derz9qdf3/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          // Xử lý dữ liệu trả về từ Cloudinary
          console.log('Upload successful:', data.url);
          fileUrl =  data.url
        } else {
          console.log('Upload failed:', response.status);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  });

//   edit 
let editedId =  '';
let editedName = document.getElementById('editName');
let editedPrice = document.getElementById('editPrice');
let editImagePreview = document.getElementById('editImagePreview');
let editedImage = '';


// Get the modal element
const editModal = document.getElementById('editModal');

// Get the close button element
const closeEditButton = document.querySelector('.closeEdit');
 
// Get the form element
const editForm = document.getElementById('editForm');

// Function to open the edit modal

function openEditModal(id,name, price, image ) {
    editModal.style.display = 'block';
    console.log(id,
        name,
        price,
        image)

        editedId =id
        editedName.value  = name
        editedPrice.value  = price
        editedImage = image
        if ( image.includes('cloudinary')) {
           
        }else{
          image = './assets/products/' +  image
        }
        editImagePreview.src = image
       
  
}

// Function to close the edit modal
 
closeEditButton.addEventListener('click', () => {
    editModal.style.display = 'none';
  });
// Add event listener to close button
// closeButton.addEventListener('click', closeEditModal);

// Add event listener to form submit
editForm.addEventListener('submit', event => {
  event.preventDefault();
  const editedName = document.getElementById('editName').value;
  const editedPrice = document.getElementById('editPrice').value;
  const editedImage = document.getElementById('editImage')?.files[0];
  
  // Call the editProduct function with the updated values
  editProductSubmit(editedId, editedName, editedPrice )
  // Close the modal
  editModal.style.display = 'none';

});

function editProductSubmit(id, name, price, image) {
    // Logic to update the product with the given productId
    // You can perform an API request, update the database, or perform any other necessary operations here
    
    // Example API request using fetch:
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        price: price,
        image: editImage
      }),
    })
      .then(response => {
        console.log(response.json())
      })
     
      .catch(error => {
        console.error('Error:', error);
        // Handle any errors that occur during the update process
      });
  }