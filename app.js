// ====== GESTIÓN DE IDIOMA ======
function changeLang(lang) {
    const glElements = document.querySelectorAll('.lang-gl');
    const esElements = document.querySelectorAll('.lang-es');
    const enElements = document.querySelectorAll('.lang-en');
    const btnGl = document.getElementById('btn-gl');
    const btnEs = document.getElementById('btn-es');
    const btnEn = document.getElementById('btn-en');

    // Ocultar todos
    glElements.forEach(el => el.classList.add('hidden'));
    esElements.forEach(el => el.classList.add('hidden'));
    enElements.forEach(el => el.classList.add('hidden'));

    // Desactivar todos los botones
    [btnGl, btnEs, btnEn].forEach(btn => {
        btn.classList.remove('opacity-100', 'grayscale-0');
        btn.classList.add('opacity-50', 'grayscale');
    });

    // Mostrar idioma seleccionado y activar su botón
    if (lang === 'gl') {
        glElements.forEach(el => el.classList.remove('hidden'));
        btnGl.classList.remove('opacity-50', 'grayscale');
        btnGl.classList.add('opacity-100', 'grayscale-0');
    } else if (lang === 'es') {
        esElements.forEach(el => el.classList.remove('hidden'));
        btnEs.classList.remove('opacity-50', 'grayscale');
        btnEs.classList.add('opacity-100', 'grayscale-0');
    } else {
        enElements.forEach(el => el.classList.remove('hidden'));
        btnEn.classList.remove('opacity-50', 'grayscale');
        btnEn.classList.add('opacity-100', 'grayscale-0');
    }

    document.documentElement.lang = lang;
}


// ====== COPIAR EMAIL / TELÉFONO ======
function copyObfuscatedData(part1, part2, button) {

    let text;

    // detectar si es email
    if (part2.includes('.')) {
        text = part1 + '@' + part2;
    } else {
        text = part1 + ' ' + part2;
    }

    copyToClipboard(text, button);
}


// ====== FUNCIÓN GENERAL DE COPIADO ======
function copyToClipboard(text, button) {

    if (navigator.clipboard) {

        navigator.clipboard.writeText(text).then(() => {
            showCopied(button);
        });

    } else {

        // fallback navegadores antiguos
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        showCopied(button);
    }
}


// ====== MENÚ MÓVIL ======
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    menu.classList.toggle('hidden');
    const icon = btn.querySelector('i');
    if (menu.classList.contains('hidden')) {
        icon.className = 'fa-solid fa-bars text-xl';
    } else {
        icon.className = 'fa-solid fa-xmark text-xl';
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const btn = document.getElementById('mobile-menu-btn');
    menu.classList.add('hidden');
    btn.querySelector('i').className = 'fa-solid fa-bars text-xl';
}


// ====== SECCIÓN VIDEOS ======
function toggleVideos(event) {
    event.preventDefault();
    const section = document.getElementById('videos-section');
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function loadVideo(container, videoId) {
    const iframe = document.createElement('iframe');
    iframe.className = 'w-full h-full absolute inset-0';
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0&vq=hd1080';
    iframe.title = 'YouTube video';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    container.innerHTML = '';
    container.style.cursor = 'default';
    container.onclick = null;
    container.appendChild(iframe);
}

function extraerIdVideo(enlace) {
    var match = enlace.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|watch\?v=|embed\/))([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
}

function generarVideos() {
    var grid = document.getElementById('videos-grid');
    var canalDiv = document.getElementById('canal-link');
    if (!grid || typeof MIS_VIDEOS === 'undefined') return;

    MIS_VIDEOS.forEach(function(v) {
        var id = extraerIdVideo(v.enlace);
        if (!id) return;

        var isShort = v.tipo === 'short';
        var label = isShort ? 'Short' : 'Video';
        var aspectClass = isShort ? 'aspect-[9/16] max-w-[280px] mx-auto' : 'aspect-video';

        var wrapper = document.createElement('div');
        wrapper.innerHTML =
            '<span class="inline-block px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white mb-3">' + label + '</span>' +
            '<div class="' + aspectClass + ' rounded-lg overflow-hidden border border-slate-700 shadow-lg relative cursor-pointer group" onclick="loadVideo(this, \'' + id + '\')">' +
                '<img src="https://img.youtube.com/vi/' + id + '/maxresdefault.jpg" alt="' + label + '" class="w-full h-full object-cover">' +
                '<div class="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">' +
                    '<div class="w-16 h-11 bg-red-600 rounded-xl flex items-center justify-center group-hover:bg-red-700 transition-colors">' +
                        '<i class="fa-solid fa-play text-white text-lg ml-1"></i>' +
                    '</div>' +
                '</div>' +
            '</div>';
        grid.appendChild(wrapper);
    });

    if (typeof MI_CANAL !== 'undefined' && MI_CANAL) {
        var lang = document.documentElement.lang;
        var texto = lang === 'en' ? 'View full channel' : 'Ver canle completa';
        if (lang === 'es') texto = 'Ver canal completo';
        canalDiv.innerHTML =
            '<a href="' + MI_CANAL + '" target="_blank" rel="noopener" class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors">' +
                '<i class="fa-brands fa-youtube"></i> ' + texto +
            '</a>';
    }
}

document.addEventListener('DOMContentLoaded', generarVideos);


// ====== BOTÓN PARA ABRIR CERTIFICADO PDF ======
// Cualquier tarjeta con atributo data-pdf="static/archivo.pdf" mostrará
// automáticamente un botoncito que abre el PDF en otra pestaña.
function injectPdfButtons() {
    document.querySelectorAll('[data-pdf]').forEach(function(card) {
        var pdfPath = card.getAttribute('data-pdf');
        if (!pdfPath || card.querySelector('.pdf-cert-btn')) return;

        var a = document.createElement('a');
        a.href = pdfPath;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'pdf-cert-btn mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors';
        a.innerHTML =
            '<i class="fa-solid fa-file-pdf text-red-500"></i>' +
            '<span class="lang-gl">Ver certificado</span>' +
            '<span class="lang-es hidden">Ver certificado</span>' +
            '<span class="lang-en hidden">View certificate</span>';

        // En tarxetas con layout flex (obradoiros), engadir dentro do bloque de contido,
        // non como flex item ao lado do logo.
        var target = card.classList.contains('flex') ? card.lastElementChild : card;
        target.appendChild(a);
    });
}

document.addEventListener('DOMContentLoaded', injectPdfButtons);


// ====== FEEDBACK VISUAL ======
function showCopied(button) {

    const originalHTML = button.innerHTML;

    const lang = document.documentElement.lang;
    let copiedText = 'Copiado';
    if (lang === 'en') copiedText = 'Copied';

    button.innerHTML = `<i class="fa-solid fa-check mr-2"></i> ${copiedText}`;

    setTimeout(() => {
        button.innerHTML = originalHTML;
    }, 1500);
}
