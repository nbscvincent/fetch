function addCategory() {
  var categoryName = document.getElementById("categoryName").value;

  fetch("http://localhost:5003/add-category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: categoryName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to add category (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      alert(data);
      fetchCategories();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to add category. Please try again.");
    });
}

function fetchCategories() {
  fetch("http://localhost:5003/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch categories (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      const categoryTableBody = document.getElementById("categoryTableBody");
      categoryTableBody.innerHTML = "";

      data.forEach((category) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${category.category_id}</td>
        <td>${category.name}</td>
        <td>
          <button onclick="editCategory(${category.category_id},'${category.name}')" class="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            <i class="fas fa-edit"></i> Edit
          </button>
          <button onclick="deleteCategory(${category.category_id})"class="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </td>
      `;
        categoryTableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to fetch categories. Please try again.");
    });
}

function editCategory(categoryId, categoryName) {
  console.log("Editing category:", categoryId);

  document.getElementById("newCategoryName").textContent = categoryName;
  document.getElementById("newCategoryName").placeholder = categoryName;
  document.getElementById("categoryId").innerHTML = categoryId;
  document.getElementById("editModal").classList.remove("hidden");
}

function updateCategory() {
  closeModal();
  let categoryId = document.getElementById("categoryId").innerHTML;
  let newName = document.getElementById("newCategoryName").value ?? "";

  console.log(`${currentCategoryId} ${currentCategoryName}`);

  fetch(`http://localhost:5003/update-category/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category_id: categoryId, name: newName }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to update category (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      alert(data);
      fetchCategories();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to update category. Please try again.");
    });
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}

function deleteCategory(categoryId) {
  if (confirm("Are you sure you want to delete this category?")) {
    fetch("http://localhost:5003/delete-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: categoryId }),
    })
      .then((response) => {
        if (!response.ok) {
          return `Failed to delete category (${response.status})`;
        }
        console.log(response.json());
        return response.json();
      })
      .then((data) => {
        alert(data);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to delete category. Please try again.");
      });
  }
}
