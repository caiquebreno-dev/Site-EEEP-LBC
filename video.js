// ================= VIDEO =================
document.querySelectorAll(".video-wrapper").forEach(wrapper => {
  wrapper.addEventListener("click", function () {

    // garante que só funcione no wrapper correto (que tem a thumb)
    if (!this.querySelector(".thumb")) return;

    this.innerHTML =
      '<iframe width="100%" height="500" ' +
      'src="https://www.youtube.com/embed/4iyLBo7LJaw?autoplay=1&mute=1" ' +
      'frameborder="0" ' +
      'allow="autoplay; encrypted-media" allowfullscreen></iframe>';
  });
});


// ================= ANIMAÇÃO NÚMEROS =================
function animarNumeros() {
  const itens = document.querySelectorAll('.numero');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        const meta = parseInt(el.getAttribute('data-meta'));
        const prefixo = el.getAttribute('data-prefixo') || '';
        const sufixo = el.getAttribute('data-sufixo') || '';

        const duracao = 2000;
        const intervalo = 20;
        const passos = duracao / intervalo;
        const incremento = meta / passos;

        let atual = 0;

        const timer = setInterval(() => {
          atual += incremento;

          if (atual >= meta) {
            el.textContent = prefixo + meta + sufixo;
            clearInterval(timer);
          } else {
            el.textContent = prefixo + Math.floor(atual) + sufixo;
          }
        }, intervalo);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  itens.forEach(item => observer.observe(item));
}

animarNumeros();


// ================= MODAIS =================
function abrirModal(id) {
  document.getElementById(id).classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function fecharModal(id) {
  document.getElementById(id).classList.remove('ativo');
  document.body.style.overflow = '';
}

// fechar ao clicar fora
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) {
      this.classList.remove('ativo');
      document.body.style.overflow = '';
    }
  });
});


// ================= MODAL SOBRE (PAGINAÇÃO) =================
let paginaAtual = 1;
const totalPaginas = 4;

function abrirModalSobre() {
  paginaAtual = 1;
  atualizarPagina();
  document.getElementById('modal-sobre').classList.add('ativo');
  document.body.style.overflow = 'hidden';
}

function mudarPagina(direcao) {
  paginaAtual += direcao;
  atualizarPagina();
}

function atualizarPagina() {
  document.querySelectorAll('.modal-pagina').forEach(p => p.classList.remove('ativa'));
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('ativo'));

  document.querySelector(`.modal-pagina[data-pagina="${paginaAtual}"]`).classList.add('ativa');
  document.querySelector(`.dot[data-dot="${paginaAtual}"]`).classList.add('ativo');

  document.getElementById('pag-info').textContent = `${paginaAtual} / ${totalPaginas}`;
  document.getElementById('btn-anterior').disabled = paginaAtual === 1;
  document.getElementById('btn-proximo').disabled = paginaAtual === totalPaginas;
}

// clique nos dots
document.querySelectorAll('.dot').forEach(dot => {
  dot.addEventListener('click', function () {
    paginaAtual = parseInt(this.getAttribute('data-dot'));
    atualizarPagina();
  });
});
