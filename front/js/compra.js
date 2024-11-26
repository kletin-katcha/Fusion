// Elementos DOM
const priceRange = document.getElementById('price-range');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');
const carList = document.getElementById('car-list');
const searchInput = document.getElementById('search-input');

// Lista de carros (exemplo)
const cars = [
    { id: 1, name: 'Ford Mustang', year: 1967, price: 490000, image: 'image/ford.jpg' },
    { id: 2, name: 'Chevrolet Camaro', year: 2020, price: 432000, image: 'image/camaro.jpg' },
    { id: 3, name: 'Dodge Challenger', year: 2015, price: 839000, image: 'image/dodge.jpg' },
    { id: 4, name: 'Bugatti Chyron', year: 2021, price: 21000000, image: 'image/bugatti.jpg' },
    // Adicione mais carros aqui
];

// Atualiza o display do preço ao mover o slider
priceRange.addEventListener('input', (e) => {
    const value = e.target.value;
    maxPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    // Chama a função para filtrar os carros após movimentação do trilho
    filterCars();
});

// Função para filtrar os carros com base no preço
function filterCars() {
    const priceLimit = parseFloat(priceRange.value); // Valor selecionado no trilho
    const query = searchInput.value.toLowerCase(); // Texto de busca
    carList.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens

    // Filtrando os carros com base no preço e nome/modelo
    cars.forEach(car => {
        const name = car.name.toLowerCase();
        const price = car.price;

        // Exibe o carro se o nome inclui a busca e o preço está dentro do limite
        if (name.includes(query) && price <= priceLimit) {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>Ano: ${car.year}</p>
                <p>Preço: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}</p>
            `;
            carList.appendChild(carCard);
        }
    });
}

// Busca por nome ou modelo
searchInput.addEventListener('input', filterCars);

// Geração dinâmica dos anos no filtro
const yearList = document.getElementById('year-list');

for (let year = 1960; year <= new Date().getFullYear(); year++) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="year${year}" value="${year}"> 
                    <label for="year${year}">${year}</label>`;
    yearList.appendChild(li);
}

// Inicializa a filtragem ao carregar a página
filterCars();


