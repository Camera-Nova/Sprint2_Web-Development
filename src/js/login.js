/* ============================================
   JOVI Scan — Login
   Validação de formulário em JavaScript puro
   ============================================ */

// ---------- Seletores de elementos do DOM ----------
const formLogin = document.getElementById('form-login');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const erroEmail = document.getElementById('erro-email');
const erroSenha = document.getElementById('erro-senha');
const btnToggleSenha = document.getElementById('btn-toggle-senha');
const btnEsqueci = document.getElementById('btn-esqueci');
const btnCadastrar = document.getElementById('btn-cadastrar');
const checkLembrar = document.getElementById('lembrar');

// ---------- Sistema de Toast (alerta customizado) ----------
function mostrarToast(titulo, mensagem, tipo = 'info', duracao = 3500) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${tipo}`;
  toast.innerHTML = `<strong>${titulo}</strong><span>${mensagem}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('saindo');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duracao);
}

// ---------- Validações ----------
function validarEmail(valor) {
  // Regex razoável para e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!valor.trim()) return 'E-mail é obrigatório.';
  if (!regex.test(valor)) return 'Formato de e-mail inválido.';
  return '';
}

function validarSenha(valor) {
  if (!valor) return 'Senha é obrigatória.';
  if (valor.length < 8) return 'A senha deve ter no mínimo 8 caracteres.';
  if (!/[A-Z]/.test(valor)) return 'A senha deve conter ao menos 1 letra maiúscula.';
  if (!/[0-9]/.test(valor)) return 'A senha deve conter ao menos 1 número.';
  return '';
}

function exibirErroCampo(input, spanErro, mensagem) {
  spanErro.textContent = mensagem;
  if (mensagem) {
    input.classList.add('invalido');
  } else {
    input.classList.remove('invalido');
  }
}

// ---------- Validação em tempo real (blur) ----------
inputEmail.addEventListener('blur', () => {
  const erro = validarEmail(inputEmail.value);
  exibirErroCampo(inputEmail, erroEmail, erro);
});

inputSenha.addEventListener('blur', () => {
  const erro = validarSenha(inputSenha.value);
  exibirErroCampo(inputSenha, erroSenha, erro);
});

// Limpa erros conforme o usuário corrige
inputEmail.addEventListener('input', () => {
  if (inputEmail.classList.contains('invalido')) {
    exibirErroCampo(inputEmail, erroEmail, '');
  }
});
inputSenha.addEventListener('input', () => {
  if (inputSenha.classList.contains('invalido')) {
    exibirErroCampo(inputSenha, erroSenha, '');
  }
});

// ---------- Mostrar/ocultar senha ----------
btnToggleSenha.addEventListener('click', () => {
  if (inputSenha.type === 'password') {
    inputSenha.type = 'text';
    btnToggleSenha.textContent = 'Ocultar';
  } else {
    inputSenha.type = 'password';
    btnToggleSenha.textContent = 'Mostrar';
  }
});

// ---------- Submit do formulário ----------
formLogin.addEventListener('submit', (evento) => {
  evento.preventDefault(); // bloqueia envio nativo

  const erroE = validarEmail(inputEmail.value);
  const erroS = validarSenha(inputSenha.value);

  exibirErroCampo(inputEmail, erroEmail, erroE);
  exibirErroCampo(inputSenha, erroSenha, erroS);

  if (erroE || erroS) {
    mostrarToast('Erro', 'Por favor, corrija os campos destacados.', 'erro');
    return;
  }

  // "Autenticação" simulada — credenciais hard-coded
  // Em produção, isso iria para o backend.
  const usuariosValidos = [
    { email: 'admin@jovi.com', senha: 'Admin123' },
    { email: 'gian@jovi.com', senha: 'Senha123' },
  ];

  const usuario = usuariosValidos.find(
    (u) => u.email === inputEmail.value.trim().toLowerCase() && u.senha === inputSenha.value
  );

  if (!usuario) {
    mostrarToast(
      'Credenciais inválidas',
      'Tente admin@jovi.com / Admin123',
      'erro',
      5000
    );
    return;
  }

  // Salvar sessão
  const dadosSessao = {
    email: usuario.email,
    nome: usuario.email.split('@')[0],
    lembrar: checkLembrar.checked,
    entrouEm: new Date().toISOString(),
  };

  // Usa sessionStorage por padrão; localStorage se "lembrar"
  const armazenamento = checkLembrar.checked ? localStorage : sessionStorage;
  armazenamento.setItem('jovi_sessao', JSON.stringify(dadosSessao));

  mostrarToast('Bem-vindo!', 'Login realizado com sucesso.', 'sucesso', 1500);

  // Redireciona após pequeno delay para o toast aparecer
  setTimeout(() => {
    window.location.href = 'src/pages/dashboard.html';
  }, 1000);
});

// ---------- Botões secundários (prompts/alerts) ----------
btnEsqueci.addEventListener('click', () => {
  const email = prompt('Digite seu e-mail para recuperar a senha:');
  if (email === null) return; // usuário cancelou
  if (validarEmail(email)) {
    alert('E-mail inválido. Tente novamente.');
    return;
  }
  mostrarToast(
    'Verifique seu e-mail',
    `Enviamos instruções para ${email}.`,
    'sucesso',
    4000
  );
});

btnCadastrar.addEventListener('click', () => {
  const confirmar = confirm('Deseja ir para a tela de cadastro?');
  if (confirmar) {
    mostrarToast('Em breve', 'Cadastro estará disponível na próxima versão.', 'aviso');
  }
});

// ---------- Auto-login se sessão salva ----------
window.addEventListener('DOMContentLoaded', () => {
  const sessaoSalva = localStorage.getItem('jovi_sessao') || sessionStorage.getItem('jovi_sessao');
  if (sessaoSalva) {
    // Já autenticado: vai direto para dashboard
    window.location.href = 'src/pages/dashboard.html';
  }
});
