document.addEventListener("DOMContentLoaded", function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const dropdownTrigger = dropdown.querySelector('a');

    // Função para mostrar o dropdown e ajustar a posição
    function showDropdown() {
        // Mostrar o dropdown
        dropdownContent.style.display = 'block';

        // Obter a posição do item do menu
        const rect = dropdown.getBoundingClientRect();

        // Ajustar a posição do dropdown
        dropdownContent.style.left = `${rect.left}px`;
        dropdownContent.style.top = `${rect.bottom}px`;
    }

    // Função para esconder o dropdown
    function hideDropdown() {
        dropdownContent.style.display = 'none';
    }

    // Adicionar eventos para mostrar e esconder o dropdown
    dropdown.addEventListener('mouseenter', showDropdown);
    dropdown.addEventListener('mouseleave', hideDropdown);
});

// Salva a URL da página atual (antes de acessar login ou outras páginas)
if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
    console.log("Página anterior salva:", window.location.pathname); // Verificação
    localStorage.setItem('previousPage', window.location.pathname);
}

// Ao carregar a página de login ou cadastro, não deve salvar a página anterior novamente
window.onload = function() {
    const currentPath = window.location.pathname;

    // Evita salvar a página de login ou cadastro como 'previousPage'
    if (currentPath !== '/login' && currentPath !== '/register') {
        const previousPage = localStorage.getItem('previousPage') || '/';  // Página de fallback (home)
        console.log("Página anterior no localStorage:", previousPage); // Verificação

        // Verifica se a página salva é diferente da atual
        if (previousPage !== currentPath) {
            console.log("Redirecionando para:", previousPage); // Verificação
            window.location.href = previousPage;  // Redireciona para a página anterior
        }
    } else {
        console.log("Página de login ou cadastro detectada, não redirecionando.");
    }
};

// Código para quando o usuário envia o formulário de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Simulação de validação de login
    const isLoginValid = true;  // Substitua com lógica real de autenticação
    if (isLoginValid) {
        // Após a validação do login, redireciona para a página anterior
        const previousPage = localStorage.getItem('previousPage') || '/';
        console.log("Redirecionando após login para:", previousPage); // Verificação
        window.location.href = previousPage;  // Redireciona para a página anterior
    } else {
        alert('Usuário ou senha inválidos.');
    }
});
