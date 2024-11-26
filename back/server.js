const express = require('express');
const path = require('path');
const session = require('express-session');  // Importando o express-session
const app = express();
const bodyParser = require('body-parser');

// Configuração da sessão
app.use(session({
    secret: 'segredo',  // Você pode mudar o segredo
    resave: false,
    saveUninitialized: true,
}));

// Serve arquivos estáticos da pasta 'front'
app.use(express.static(path.join(__dirname, '..', 'front')));

// Configuração do bodyParser para lidar com formulários POST
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página inicial (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front', 'index.html'));
});

// Rota para o login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front', 'login.html'));
});

// Rota para o cadastro
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'front', 'cadastro.html'));
});

// Rota de POST para o cadastro
app.post('/register', (req, res) => {
    const { name, email, phone, cpf, password, address } = req.body;
    
    // Aqui você pode salvar os dados do usuário no banco de dados
    // Se o cadastro for bem-sucedido, redireciona para a página de login
    console.log('Cadastro realizado:', name, email);
    res.redirect('/login');  // Redireciona para a página de login após cadastro
});

// Rota de login - simulando o login de um usuário
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    // Aqui você deve validar o usuário (ex: verificando no banco de dados)
    // Vamos supor que a validação foi bem-sucedida
    
    // Se o login for bem-sucedido, redireciona para a página que o usuário estava
    const previousPage = req.session.previousPage || '/'; // Página anterior ou home
    res.redirect(previousPage);  // Redireciona para a página anterior
});

// Salva a página anterior na sessão para redirecionamento pós-login
app.use((req, res, next) => {
    if (req.originalUrl !== '/login' && req.originalUrl !== '/register') {
        req.session.previousPage = req.originalUrl;  // Salva a página anterior
    }
    next();
});

// Configuração do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
