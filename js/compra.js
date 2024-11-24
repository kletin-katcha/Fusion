const priceRange = document.getElementById('price-range');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');

// Atualiza o display do preço ao mover o slider
priceRange.addEventListener('input', (e) => {
    const value = e.target.value;
    maxPrice.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
});

// Busca por nome ou modelo
document.getElementById('search-input').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const cars = document.querySelectorAll('.car-card');
    cars.forEach(car => {
        const name = car.querySelector('h4').textContent.toLowerCase();
        car.style.display = name.includes(query) ? 'block' : 'none';
    });
});

// Geração dinâmica dos anos no filtro
const yearList = document.getElementById('year-list');

for (let year = 1967; year <= 2018; year++) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="year${year}" value="${year}"> <label for="year${year}">${year}</label>`;
    yearList.appendChild(li);
}
