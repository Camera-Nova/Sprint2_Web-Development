/* ============================================
   JOVI Scan — Dashboard
   Slideshow, eventos DOM, manipulação dinâmica
   ============================================ */

// ---------- Verificar autenticação ----------
const sessaoSalva = localStorage.getItem('jovi_sessao') || sessionStorage.getItem('jovi_sessao');
if (!sessaoSalva) {
  // Sem sessão: volta pro login
  window.location.href = '../../index.html';
}
const sessao = sessaoSalva ? JSON.parse(sessaoSalva) : null;

// ---------- Dados do slideshow ----------
// Cada slide é uma feature do app de câmera do Projeto Câmera JOVI
const slides = [
  {
    titulo: 'Remoção automática de sombras',
    descricao: 'Detecta e elimina sombras causadas por mãos ou objetos sobre o documento.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="papel" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#f5f5f5"/>
          <stop offset="100%" stop-color="#ddd"/>
        </linearGradient>
      </defs>
      <rect x="60" y="30" width="120" height="160" fill="url(#papel)" stroke="#999"/>
      <rect x="80" y="60" width="80" height="4" fill="#666"/>
      <rect x="80" y="75" width="60" height="4" fill="#666"/>
      <rect x="80" y="90" width="70" height="4" fill="#666"/>
      <ellipse cx="140" cy="130" rx="40" ry="55" fill="rgba(0,0,0,0.4)"/>
      <text x="120" y="210" fill="#fff" font-size="11" text-anchor="middle">Antes</text>
      <rect x="220" y="30" width="120" height="160" fill="#fff" stroke="#999"/>
      <rect x="240" y="60" width="80" height="4" fill="#666"/>
      <rect x="240" y="75" width="60" height="4" fill="#666"/>
      <rect x="240" y="90" width="70" height="4" fill="#666"/>
      <rect x="240" y="105" width="75" height="4" fill="#666"/>
      <text x="280" y="210" fill="#fff" font-size="11" text-anchor="middle">Depois</text>
    </svg>`,
  },
  {
    titulo: 'Correção de perspectiva em tempo real',
    descricao: 'Endireita documentos fotografados em ângulo, antes mesmo de capturar.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <polygon points="80,50 180,40 175,180 70,170" fill="#f5f5f5" stroke="#4f7cff" stroke-width="2"/>
      <line x1="90" y1="70" x2="170" y2="62" stroke="#666" stroke-width="2"/>
      <line x1="90" y1="85" x2="160" y2="78" stroke="#666" stroke-width="2"/>
      <line x1="90" y1="100" x2="165" y2="92" stroke="#666" stroke-width="2"/>
      <path d="M 195 110 L 215 110" stroke="#4f7cff" stroke-width="3" marker-end="url(#seta)"/>
      <defs>
        <marker id="seta" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#4f7cff"/>
        </marker>
      </defs>
      <rect x="225" y="40" width="105" height="140" fill="#fff" stroke="#4ade80" stroke-width="2"/>
      <line x1="240" y1="65" x2="315" y2="65" stroke="#666" stroke-width="2"/>
      <line x1="240" y1="80" x2="305" y2="80" stroke="#666" stroke-width="2"/>
      <line x1="240" y1="95" x2="310" y2="95" stroke="#666" stroke-width="2"/>
    </svg>`,
  },
  {
    titulo: 'Captura em baixa luminosidade',
    descricao: 'Otimiza imagens em ambientes escuros sem precisar acionar o flash.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="220" fill="#0a0a14"/>
      <rect x="60" y="50" width="80" height="120" fill="#1a1a25" stroke="#333"/>
      <rect x="70" y="70" width="60" height="3" fill="#222"/>
      <rect x="70" y="80" width="50" height="3" fill="#222"/>
      <text x="100" y="200" fill="#666" font-size="11" text-anchor="middle">Foto comum</text>
      <rect x="200" y="0" width="200" height="220" fill="#2a2a35"/>
      <rect x="260" y="50" width="80" height="120" fill="#f0f0e8" stroke="#999"/>
      <rect x="270" y="70" width="60" height="3" fill="#444"/>
      <rect x="270" y="80" width="50" height="3" fill="#444"/>
      <rect x="270" y="90" width="55" height="3" fill="#444"/>
      <text x="300" y="200" fill="#fbbf24" font-size="11" text-anchor="middle">Modo noturno</text>
    </svg>`,
  },
  {
    titulo: 'OCR de escrita à mão',
    descricao: 'Converte anotações manuscritas em texto digital editável.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="30" width="140" height="160" fill="#f5f5f5" stroke="#999"/>
      <text x="55" y="70" font-family="cursive" font-size="20" fill="#1a2580" font-style="italic">Reunião</text>
      <text x="55" y="100" font-family="cursive" font-size="16" fill="#1a2580" font-style="italic">15h - sala 3</text>
      <text x="55" y="130" font-family="cursive" font-size="16" fill="#1a2580" font-style="italic">Levar laptop</text>
      <path d="M 195 110 L 220 110" stroke="#4f7cff" stroke-width="3" marker-end="url(#seta2)"/>
      <defs>
        <marker id="seta2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#4f7cff"/>
        </marker>
      </defs>
      <rect x="230" y="30" width="140" height="160" fill="#1d2230" stroke="#4f7cff"/>
      <text x="245" y="60" font-family="monospace" font-size="14" fill="#4ade80">Reunião</text>
      <text x="245" y="90" font-family="monospace" font-size="12" fill="#e8ecf4">15h - sala 3</text>
      <text x="245" y="115" font-family="monospace" font-size="12" fill="#e8ecf4">Levar laptop</text>
      <text x="245" y="170" font-family="monospace" font-size="9" fill="#a0a8bd">[texto digital]</text>
    </svg>`,
  },
  {
    titulo: 'Tradução sobreposta na imagem',
    descricao: 'Detecta texto em qualquer idioma e mostra a tradução em tempo real.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="100" y="30" width="200" height="160" fill="#f5f5f5" stroke="#999"/>
      <text x="120" y="70" font-size="18" fill="#999" font-weight="bold">Welcome</text>
      <rect x="115" y="55" width="90" height="22" fill="rgba(79,124,255,0.15)" stroke="#4f7cff" stroke-dasharray="3"/>
      <text x="120" y="95" font-size="14" fill="#4f7cff" font-weight="bold">Bem-vindo</text>
      <text x="120" y="130" font-size="14" fill="#999">Please wait</text>
      <rect x="115" y="118" width="90" height="18" fill="rgba(79,124,255,0.15)" stroke="#4f7cff" stroke-dasharray="3"/>
      <text x="120" y="150" font-size="11" fill="#4f7cff" font-weight="bold">Por favor aguarde</text>
      <text x="200" y="180" font-size="10" fill="#666" text-anchor="middle">EN → PT</text>
    </svg>`,
  },
  {
    titulo: 'RG/CNH frente e verso na mesma página',
    descricao: 'Combina automaticamente os dois lados do documento em uma única imagem.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="60" width="100" height="60" fill="#f5f5f5" stroke="#999" rx="4"/>
      <circle cx="50" cy="90" r="10" fill="#ccc"/>
      <rect x="65" y="80" width="55" height="3" fill="#999"/>
      <rect x="65" y="88" width="40" height="3" fill="#999"/>
      <text x="80" y="135" font-size="9" fill="#fff" text-anchor="middle">Frente</text>
      <rect x="30" y="145" width="100" height="60" fill="#f5f5f5" stroke="#999" rx="4"/>
      <rect x="40" y="160" width="80" height="3" fill="#999"/>
      <rect x="40" y="170" width="70" height="3" fill="#999"/>
      <rect x="40" y="180" width="75" height="3" fill="#999"/>
      <text x="80" y="220" font-size="9" fill="#fff" text-anchor="middle">Verso</text>
      <path d="M 150 130 L 175 130" stroke="#4f7cff" stroke-width="3" marker-end="url(#seta3)"/>
      <defs>
        <marker id="seta3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#4f7cff"/>
        </marker>
      </defs>
      <rect x="190" y="30" width="180" height="160" fill="#fff" stroke="#4ade80" stroke-width="2"/>
      <rect x="205" y="50" width="150" height="55" fill="#f5f5f5" stroke="#999" rx="4"/>
      <circle cx="225" cy="80" r="10" fill="#ccc"/>
      <rect x="240" y="70" width="100" height="3" fill="#999"/>
      <rect x="240" y="78" width="85" height="3" fill="#999"/>
      <rect x="205" y="115" width="150" height="55" fill="#f5f5f5" stroke="#999" rx="4"/>
      <rect x="215" y="130" width="130" height="3" fill="#999"/>
      <rect x="215" y="140" width="120" height="3" fill="#999"/>
      <rect x="215" y="150" width="125" height="3" fill="#999"/>
    </svg>`,
  },
  {
    titulo: 'Censura automática de dados sensíveis',
    descricao: 'Identifica e oculta CPF, número de cartão e outros dados pessoais.',
    svg: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="40" y="30" width="320" height="160" fill="#f5f5f5" stroke="#999"/>
      <text x="60" y="60" font-size="13" fill="#333">Nome: João Silva</text>
      <text x="60" y="90" font-size="13" fill="#333">CPF:</text>
      <rect x="100" y="78" width="120" height="16" fill="#1d2230"/>
      <text x="160" y="91" font-size="11" fill="#4ade80" text-anchor="middle">●●●.●●●.●●●-●●</text>
      <text x="60" y="120" font-size="13" fill="#333">Endereço: Rua das Flores, 123</text>
      <text x="60" y="150" font-size="13" fill="#333">Cartão:</text>
      <rect x="115" y="138" width="180" height="16" fill="#1d2230"/>
      <text x="205" y="151" font-size="11" fill="#4ade80" text-anchor="middle">●●●● ●●●● ●●●● ●●●●</text>
      <text x="60" y="180" font-size="11" fill="#4f7cff">🔒 Dados sensíveis ocultados</text>
    </svg>`,
  },
];

// ---------- Slideshow ----------
const slideTrack = document.getElementById('slide-track');
const slideTitulo = document.getElementById('slide-titulo');
const slideDesc = document.getElementById('slide-desc');
const slideDots = document.getElementById('slide-dots');
const slideContador = document.getElementById('slide-contador');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const btnAutoplay = document.getElementById('btn-autoplay');

let slideAtual = 0;
let autoplayAtivo = true;
let autoplayId = null;

// Cria os slides dinamicamente no DOM
function montarSlides() {
  slides.forEach((slide) => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.innerHTML = slide.svg;
    slideTrack.appendChild(div);
  });

  // Cria os dots
  slides.forEach((_, indice) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Slide ${indice + 1}`);
    dot.addEventListener('click', () => irParaSlide(indice));
    slideDots.appendChild(dot);
  });
}

function atualizarSlide() {
  const offset = -slideAtual * 100;
  slideTrack.style.transform = `translateX(${offset}%)`;

  slideTitulo.textContent = slides[slideAtual].titulo;
  slideDesc.textContent = slides[slideAtual].descricao;
  slideContador.textContent = `${slideAtual + 1} / ${slides.length}`;

  // Atualiza dots
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('ativo', i === slideAtual);
  });
}

function proximoSlide() {
  slideAtual = (slideAtual + 1) % slides.length;
  atualizarSlide();
}

function slideAnterior() {
  slideAtual = (slideAtual - 1 + slides.length) % slides.length;
  atualizarSlide();
}

function irParaSlide(indice) {
  slideAtual = indice;
  atualizarSlide();
}

function iniciarAutoplay() {
  pararAutoplay();
  autoplayId = setInterval(proximoSlide, 4000);
}

function pararAutoplay() {
  if (autoplayId) {
    clearInterval(autoplayId);
    autoplayId = null;
  }
}

// Eventos do slideshow
btnPrev.addEventListener('click', () => {
  slideAnterior();
  if (autoplayAtivo) iniciarAutoplay(); // reinicia o timer
});
btnNext.addEventListener('click', () => {
  proximoSlide();
  if (autoplayAtivo) iniciarAutoplay();
});

btnAutoplay.addEventListener('click', () => {
  autoplayAtivo = !autoplayAtivo;
  if (autoplayAtivo) {
    iniciarAutoplay();
    btnAutoplay.textContent = '⏸ Pausar';
  } else {
    pararAutoplay();
    btnAutoplay.textContent = '▶ Reproduzir';
  }
});

// Navegação por teclado
document.addEventListener('keydown', (e) => {
  // Ignora se estiver digitando em algum input
  if (document.activeElement.tagName === 'INPUT') return;
  if (e.key === 'ArrowLeft') slideAnterior();
  if (e.key === 'ArrowRight') proximoSlide();
});

// Pausa autoplay ao passar o mouse
const slideshow = document.getElementById('slideshow');
slideshow.addEventListener('mouseenter', () => {
  if (autoplayAtivo) pararAutoplay();
});
slideshow.addEventListener('mouseleave', () => {
  if (autoplayAtivo) iniciarAutoplay();
});

// ---------- Modal customizado (substituto melhor para confirm/prompt) ----------
const modalOverlay = document.getElementById('modal-overlay');
const modalTitulo = document.getElementById('modal-titulo');
const modalMensagem = document.getElementById('modal-mensagem');
const modalInput = document.getElementById('modal-input');
const modalInputWrapper = document.getElementById('modal-input-wrapper');
const modalConfirmar = document.getElementById('modal-confirmar');
const modalCancelar = document.getElementById('modal-cancelar');

function abrirModal({ titulo, mensagem, comInput = false, valorPadrao = '' }) {
  return new Promise((resolve) => {
    modalTitulo.textContent = titulo;
    modalMensagem.textContent = mensagem;

    if (comInput) {
      modalInputWrapper.classList.remove('oculto');
      modalInput.value = valorPadrao;
      setTimeout(() => modalInput.focus(), 50);
    } else {
      modalInputWrapper.classList.add('oculto');
    }

    modalOverlay.classList.remove('oculto');

    const aoConfirmar = () => {
      fecharModal();
      resolve(comInput ? modalInput.value : true);
    };
    const aoCancelar = () => {
      fecharModal();
      resolve(comInput ? null : false);
    };
    const aoTeclar = (e) => {
      if (e.key === 'Enter' && comInput) aoConfirmar();
      if (e.key === 'Escape') aoCancelar();
    };

    function fecharModal() {
      modalOverlay.classList.add('oculto');
      modalConfirmar.removeEventListener('click', aoConfirmar);
      modalCancelar.removeEventListener('click', aoCancelar);
      document.removeEventListener('keydown', aoTeclar);
    }

    modalConfirmar.addEventListener('click', aoConfirmar);
    modalCancelar.addEventListener('click', aoCancelar);
    document.addEventListener('keydown', aoTeclar);
  });
}

// ---------- Toasts ----------
function mostrarToast(titulo, mensagem, tipo = 'info', duracao = 3000) {
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

// ---------- Histórico dinâmico ----------
const listaHistorico = document.getElementById('lista-historico');
const histVazio = document.getElementById('hist-vazio');
const btnLimparHist = document.getElementById('btn-limpar-hist');

let historico = JSON.parse(localStorage.getItem('jovi_historico') || '[]');

function salvarHistorico() {
  localStorage.setItem('jovi_historico', JSON.stringify(historico));
}

function atualizarVisibilidadeHistorico() {
  if (historico.length === 0) {
    histVazio.style.display = 'block';
    listaHistorico.style.display = 'none';
  } else {
    histVazio.style.display = 'none';
    listaHistorico.style.display = 'block';
  }
}

function formatarData(iso) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function renderizarItem(item) {
  const li = document.createElement('li');
  li.className = 'item-historico';
  li.dataset.id = item.id;

  li.innerHTML = `
    <div class="item-info">
      <span class="item-titulo">${item.nome}</span>
      <span class="item-data">${formatarData(item.data)} · ${item.tipo}</span>
    </div>
    <div class="item-acoes">
      <button class="btn-icone btn-renomear" title="Renomear">✏️</button>
      <button class="btn-icone perigo btn-excluir" title="Excluir">🗑️</button>
    </div>
  `;

  // Eventos dos botões do item
  li.querySelector('.btn-renomear').addEventListener('click', async () => {
    const novoNome = await abrirModal({
      titulo: 'Renomear digitalização',
      mensagem: 'Digite o novo nome:',
      comInput: true,
      valorPadrao: item.nome,
    });
    if (novoNome !== null && novoNome.trim() !== '') {
      item.nome = novoNome.trim();
      salvarHistorico();
      li.querySelector('.item-titulo').textContent = item.nome;
      mostrarToast('Renomeado', 'Item atualizado com sucesso.', 'sucesso');
    }
  });

  li.querySelector('.btn-excluir').addEventListener('click', async () => {
    const confirmar = await abrirModal({
      titulo: 'Excluir digitalização',
      mensagem: `Deseja realmente excluir "${item.nome}"? Esta ação não pode ser desfeita.`,
    });
    if (confirmar) {
      historico = historico.filter((h) => h.id !== item.id);
      salvarHistorico();
      // Animação de saída
      li.style.transition = 'opacity 0.2s, transform 0.2s';
      li.style.opacity = '0';
      li.style.transform = 'translateX(20px)';
      setTimeout(() => {
        li.remove();
        atualizarVisibilidadeHistorico();
      }, 200);
      mostrarToast('Excluído', 'Item removido do histórico.', 'sucesso');
    }
  });

  return li;
}

function renderizarHistorico() {
  listaHistorico.innerHTML = '';
  historico.forEach((item) => {
    listaHistorico.appendChild(renderizarItem(item));
  });
  atualizarVisibilidadeHistorico();
}

function adicionarAoHistorico(tipo, nome) {
  const item = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    tipo,
    nome,
    data: new Date().toISOString(),
  };
  historico.unshift(item); // adiciona no topo
  salvarHistorico();
  listaHistorico.prepend(renderizarItem(item));
  atualizarVisibilidadeHistorico();
}

btnLimparHist.addEventListener('click', async () => {
  if (historico.length === 0) {
    mostrarToast('Histórico vazio', 'Não há nada para limpar.', 'aviso');
    return;
  }
  const confirmar = await abrirModal({
    titulo: 'Limpar histórico',
    mensagem: `Deseja apagar todas as ${historico.length} digitalizações? Esta ação não pode ser desfeita.`,
  });
  if (confirmar) {
    historico = [];
    salvarHistorico();
    listaHistorico.innerHTML = '';
    atualizarVisibilidadeHistorico();
    mostrarToast('Histórico limpo', 'Todos os itens foram removidos.', 'sucesso');
  }
});

// ---------- Cards de ação (botões para digitalizar) ----------
const tiposLegiveis = {
  documento: 'Documento',
  rg: 'RG/CNH',
  manuscrito: 'Manuscrito (OCR)',
  traduzir: 'Tradução',
};

document.querySelectorAll('.card-acao').forEach((card) => {
  card.addEventListener('click', async () => {
    const tipo = card.dataset.tipo;
    const tipoLegivel = tiposLegiveis[tipo];

    const nome = await abrirModal({
      titulo: `Digitalizar ${tipoLegivel}`,
      mensagem: 'Dê um nome para essa digitalização:',
      comInput: true,
      valorPadrao: `${tipoLegivel} ${historico.length + 1}`,
    });

    if (nome === null) return; // cancelou
    if (!nome.trim()) {
      mostrarToast('Nome inválido', 'O nome não pode estar vazio.', 'erro');
      return;
    }

    // Simulação: efeito visual no card
    card.style.transform = 'scale(0.95)';
    card.disabled = true;
    setTimeout(() => {
      card.style.transform = '';
      card.disabled = false;
      adicionarAoHistorico(tipoLegivel, nome.trim());
      mostrarToast(
        'Digitalização concluída',
        `"${nome.trim()}" foi adicionado ao histórico.`,
        'sucesso'
      );
    }, 600);
  });
});

// ---------- Logout ----------
const btnSair = document.getElementById('btn-sair');
btnSair.addEventListener('click', async () => {
  const confirmar = await abrirModal({
    titulo: 'Sair da conta',
    mensagem: 'Deseja realmente sair?',
  });
  if (confirmar) {
    localStorage.removeItem('jovi_sessao');
    sessionStorage.removeItem('jovi_sessao');
    window.location.href = '../../index.html';
  }
});

// ---------- Inicialização ----------
window.addEventListener('DOMContentLoaded', () => {
  // Saudação personalizada
  if (sessao) {
    document.getElementById('saudacao').textContent = `Olá, ${sessao.nome}!`;
  }

  montarSlides();
  atualizarSlide();
  iniciarAutoplay();
  renderizarHistorico();

  mostrarToast('Bem-vindo de volta!', 'Sessão iniciada com sucesso.', 'sucesso', 2500);
});
