document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Previne o envio tradicional do formulário

  // Obtendo os valores dos campos
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const cpf = document.getElementById('cpf').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const address = document.getElementById('address').value;

  // Validando se as senhas coincidem
  if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
  }

  // Criando o objeto com os dados
  const data = {
      name: name,
      email: email,
      phone: phone,
      cpf: cpf,
      password: password,
      address: address
  };

  // Enviando os dados para o backend com AJAX
  fetch('/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Sucesso:', data);
      // Redireciona o usuário para a página de login após o cadastro
      window.location.href = '/login';
  })
  .catch(error => {
      console.error('Erro:', error);
  });
});
