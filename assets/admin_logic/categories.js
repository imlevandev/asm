fetch('http://localhost:3000/categories')
  .then(response => response.json())
  .then(categories => {

    const categoriesListElement = document.getElementById('categoriesList');

    categories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('category');
      let src;
      if (typeof category?.image === 'string' && (category?.image.includes('cloudinary') || false)) {
          src = category.image;
      } else {
          src = './assets/category/' + category?.image;
      }
      categoryElement.innerHTML = `
        <img style="width: 100%" src="${src}" alt="${category.name}">
        <h3>${category.name}</h3>
        <button class="deleteButton">Delete</button>
        <button class="editButton">Edit</button>
      `;

      // Add event listeners for delete and edit buttons
      const deleteButton = categoryElement.querySelector('.deleteButton');
      deleteButton.addEventListener('click', () => {
        deleteCategory(category.id);
      });
      const editButton = categoryElement.querySelector('.editButton');
      editButton.addEventListener('click', () => {
        openEditCategoryModal(category.id, category.name, category.image);
      });
      categoriesListElement.appendChild(categoryElement);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

function deleteCategory(categoryId) {
  // Logic to delete the category with the given categoryId
  // Send a DELETE request to the server or perform any other necessary operations
  fetch(`http://localhost:3000/categories/${categoryId}`, {
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
 



// create

// Get the modal element
const createCategoryModal = document.getElementById('createCategoryModal');
const createButton = document.getElementById('createButton');
const cateImageInput = document.getElementById('categoryImage');
createButton.addEventListener('click', openCreateCategoryModal);
let fileUrl =''

// Get the close button element
const closeCategoryModalButton = createCategoryModal.querySelector('.close');

// Get the form element
const createCategoryForm = document.getElementById('createCategoryForm');

// Function to open the create category modal
function openCreateCategoryModal() {
    console.log('fawef')
  createCategoryModal.style.display = 'block';
}

// Function to close the create category modal
function closeCreateCategoryModal() {
  createCategoryModal.style.display = 'none';
}

// Add event listener to close button
closeCategoryModalButton.addEventListener('click', closeCreateCategoryModal);

// Add event listener to form submit
createCategoryForm.addEventListener('submit', event => {
  event.preventDefault();
  const categoryName = document.getElementById('categoryName').value;
  const categoryImage = document.getElementById('categoryImage').files[0];
  let data = {
    name: categoryName,
    image: fileUrl
  } 
  // Call the createCategory function with the entered values
  fetch('http://localhost:3000/categories', {
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
  
  // Close the modal
  closeCreateCategoryModal();
});

cateImageInput.addEventListener('change', async (event) => {
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
    })













    // edit category
    let editedId =  '';
let editedName = document.getElementById('editCategoryName');
let editImagePreview = document.getElementById('editImagePreview');
let editedImage = '';


    // Get the modal element
    function editCategory(categoryId, name) {
        // Logic to edit the category with the given categoryId
        // Redirect to an edit page or perform any other necessary operations
        // openEditCategoryModal()
        editedName.value  = name
        // if ( image?.includes('cloudinary')) {
           
        // }else{
        //   image = './assets/category/' +  image
        // }
        // editImagePreview.src = image


        fetch(`http://localhost:3000/categories/${categoryId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            image: editedImage
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
      
const editCategoryModal = document.getElementById('editCategoryModal');

// Get the close button element
const closeEditCategoryModalButton = editCategoryModal.querySelector('.close');

// Get the form element
const editCategoryForm = document.getElementById('editCategoryForm');

// Function to open the edit category modal
function openEditCategoryModal(id, name, image) {
  editedId = id
  console.log(editedId)
  
  editedName.value  = name
  editedImage = image
  console.log(editedImage)

  if ( typeof  image === 'string' && image?.includes('cloudinary')) {
     
  }else{
    image = './assets/category/' +  image
  }
  editImagePreview.src = image
  editCategoryModal.style.display = 'block';
}

// Function to close the edit category modal
function closeEditCategoryModal() {
  editCategoryModal.style.display = 'none';
}
// Add event listener to close button
closeEditCategoryModalButton.addEventListener('click', closeEditCategoryModal);

// Add event listener to form submit
editCategoryForm.addEventListener('submit', event => {
  event.preventDefault();
  const editedCategoryName = document.getElementById('editCategoryName').value;
  
  // Call the editCategory function with the edited values
  editCategory( editedId, editedCategoryName);
  
  // Close the modal
  closeEditCategoryModal();
});