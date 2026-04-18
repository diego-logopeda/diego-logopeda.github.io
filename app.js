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


// ====== SECCIÓN VIDEOS ======
function toggleVideos(event) {
    event.preventDefault();
    const section = document.getElementById('videos-section');
    section.classList.toggle('hidden');
    if (!section.classList.contains('hidden')) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


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
