
// === Requisiçao de API === //

const productList = document.querySelector('.products-list');
const loadMoreButton = document.querySelector('.load-more');
 // Inicia uma busca por paginas.
let page = 1;

// função para buscar dados da API e atualizar o HTML.
function loadProducts(page) {
    const url = `https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=${page}`;
     // faz a requisição à API usando fetch.
    fetch(url)
      .then(response => response.json())
      .then(data => {
         // faz uma busca dos produtos e cria os elementos de acordo com o conteudo obtido.
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

        // verifica se há mais páginas para carregar
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
  // Botão para pcarregar mais itens
  loadMoreButton.addEventListener('click', () => {
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = 'Carregando...';
    page++;
    loadProducts(page);
  });

  