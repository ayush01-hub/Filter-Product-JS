const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const categoryBtns = document.querySelectorAll(".category-btn");
const clearBtn = document.getElementById("clear-btn"); // Reference the Clear button

function filterProduct() {
    const searchValue = searchInput.value.toLowerCase();
    const productItems = document.querySelectorAll(".product-item");
    const activeCategory = document.querySelector(".category-btn.active")?.dataset.category || "all";

    productItems.forEach(item => {
        const title = item.querySelector("h3").innerText.toLowerCase();
        const category = item.dataset.category;

        if ((title.includes(searchValue) || searchValue === "") &&
            (category === activeCategory || activeCategory === "all")) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function setCategory(e) {
    // Remove the active class from all buttons
    categoryBtns.forEach(btn => {
        btn.classList.remove("active");
    });

    // Add the active class to the clicked button
    e.target.classList.add("active");

    // Filter the products based on the new active category
    filterProduct();
}

function clearSearch() {
    // Clear the input field
    searchInput.value = "";

    // Reset category filter to "all"
    categoryBtns.forEach(btn => btn.classList.remove("active"));
    categoryBtns[0].classList.add("active"); // Set "All products" as active

    // Re-filter the products with the default settings
    filterProduct();
}

// Update the event listener to pass the function reference
searchBtn.addEventListener("click", filterProduct);
clearBtn.addEventListener("click", clearSearch); // Add event listener for the Clear button
searchInput.addEventListener("keyup", filterProduct);

// Attach the click event to each category button
categoryBtns.forEach(btn => {
    btn.addEventListener("click", setCategory);
});

// Initial filter call to display products correctly
filterProduct();
