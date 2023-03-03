
// === API REQUIREMENT === //

const productList = document.querySelector('.products-list');
const loadMoreButton = document.querySelector('.load-more');
 // Starts a search for pages.
let page = 1;

// Function to search for API data and update HTML.
function loadProducts(page) {
    const url = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${page}`;
     // Make the request to the API using fetch.
    fetch(url)
      .then(response => response.json())
      .then(data => {
         // Search the products and creates the elements according to the content obtained.
        data.products.forEach(product => {
          const li = document.createElement('div');
          const details = document.createElement('div');
          details.classList.add('product-details');
          details.innerHTML = `
            <img src="${product.image}" width="auto" height="auto" alt="${product.name}">
            <div>
            <h1 class="paragraph-1">${product.name}</h1>
            <p class="paragraph-3">${product.description}</p>
            <p class="paragraph-2">De: R$:${product.oldPrice}</p>
            <h3 class="heading-2">R$:${product.price}</h3>
            <button>Comprar</button>
            <div>
          `;
          li.appendChild(details);
          li.addEventListener('click', () => {
            details.style.display = 'block';
          });
          productList.appendChild(li);
        });
        // Check if there are more pages to load. 
        if (data.nextPage) {
          loadMoreButton.disabled = false;
          loadMoreButton.textContent = 'Ainda mais produtos aqui!';
        } else {
          loadMoreButton.disabled = true;
          loadMoreButton.textContent = 'Não há mais produtos';
        }
      })
      .catch(error => console.error(error));
  }

  loadProducts(page);
  // Button for more items.
  loadMoreButton.addEventListener('click', () => {
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Carregando...';
    page++;
    loadProducts(page);
  });

  
// === Email Validation === //

function validarFormulario() {
  // Get the values of the names and email fields.
  const nome = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Checks if the fields are empty.
  if (nome === '' || email === '') {
    alert('Por favor, preencha todos os campos.');
    return false;
  }

  // Check if the email field contains a valid email.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, insira um email válido.');
    return false;
  }

  // If everything is ok, return True to send the form.
  return true;
}
