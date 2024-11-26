// Elementos DOM
const priceRange = document.getElementById('price-range');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');
const rentalPeriod = document.getElementById('rental-period');
const periodQuantity = document.getElementById('rental-quantity');
const priceDisplay = document.getElementById('price-display');
const carList = document.getElementById('car-list');
const yearList = document.getElementById('year-list');
const searchInput = document.getElementById('search-input');

// Lista de carros (exemplo)
const cars = [
    { id: 1, name: 'Ford Mustang', year: 1967, price: 1500, image: 'carro1.jpg' },
    { id: 2, name: 'Chevrolet Camaro', year: 2020, price: 2500, image: 'carro2.jpg' },
    // Adicione mais carros aqui
];

// Valores predefinidos para cada período
const periodBasePrices = {
    diaria: 50,
    semanal: 300,
    mensal: 1200,
    trimestral: 3800,
    semestral: 7600,
    anual: 15200
};

// Atualiza o intervalo de preços no slider com base no período selecionado
function updatePriceRange() {
    const selectedPeriod = rentalPeriod.value;
    const minBase = periodBasePrices[selectedPeriod];
    const maxBase = minBase * 1000; // Multiplica por 1000 para obter o valor máximo

    // Atualiza os atributos do trilho
    priceRange.min = minBase;
    priceRange.max = maxBase;

    // Reajusta o valor atual do trilho ao mínimo
    priceRange.value = minBase;

    // Atualiza a exibição de valores mínimo e máximo
    minPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(minBase);
    maxPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(maxBase);

    // Atualiza o display do preço ao mover o slider
    priceRange.addEventListener('input', (e) => {
        const value = e.target.value;
        maxPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    });

    // Atualiza os carros exibidos conforme o novo intervalo
    filterCars();
}

// Calcula o preço total com base no número de períodos
function calculateRentalPrice(basePrice, period, quantity) {
    const multiplier = periodBasePrices[period] / periodBasePrices['diaria']; // Calcula o fator do período
    return basePrice * multiplier * quantity;
}

// Função para filtrar os carros
function filterCars() {
    const query = searchInput.value.toLowerCase();
    const priceLimit = parseFloat(priceRange.value); // Valor selecionado no trilho
    const selectedPeriod = rentalPeriod.value;
    const quantity = parseInt(periodQuantity.value, 10) || 1; // Número de períodos

    carList.innerHTML = ''; // Limpar a lista antes de adicionar os novos itens

    cars.forEach(car => {
        const name = car.name.toLowerCase();
        const basePrice = car.price;
        const totalRentalPrice = calculateRentalPrice(basePrice, selectedPeriod, quantity);

        // Exibe apenas carros que respeitam o limite de preço e correspondem à busca
        if (name.includes(query) && totalRentalPrice <= priceLimit * quantity) {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>Ano: ${car.year}</p>
                <p>Preço para ${quantity} ${selectedPeriod}(s): ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRentalPrice)}</p>
            `;
            carList.appendChild(carCard);
        }
    });

    // Atualiza o display do preço total
    const totalPrice = priceLimit * quantity;
    priceDisplay.textContent = `Preço total para ${quantity} ${selectedPeriod}(s): ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}`;
}

// Eventos para atualizar a interface
rentalPeriod.addEventListener('change', updatePriceRange);
periodQuantity.addEventListener('input', filterCars);
priceRange.addEventListener('input', () => {
    // Atualiza o preço total e o filtro de preços a cada movimentação do trilho
    const selectedPeriod = rentalPeriod.value;
    const minBase = periodBasePrices[selectedPeriod];
    const priceLimit = parseFloat(priceRange.value); // Valor selecionado no trilho

    // Atualiza o preço máximo na tela
    maxPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceRange.max);

    // Atualiza a exibição do preço total
    const totalPrice = priceLimit * periodQuantity.value;
    priceDisplay.textContent = `Preço total: R$ ${totalPrice.toFixed(2)}`;

    filterCars();
});
searchInput.addEventListener('input', filterCars);

// Geração dinâmica dos anos no filtro
for (let year = 1960; year <= new Date().getFullYear(); year++) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="year${year}" value="${year}"> 
                    <label for="year${year}">${year}</label>`;
    yearList.appendChild(li);
}

// Inicializa o filtro ao carregar a página
updatePriceRange();
filterCars();
