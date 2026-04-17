// ====== GESTIÓN DE IDIOMA ======
function changeLang(lang) {
    const enElements = document.querySelectorAll('.lang-en');
    const esElements = document.querySelectorAll('.lang-es');
    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');

    if (lang === 'es') {
        enElements.forEach(el => el.classList.add('hidden'));
        esElements.forEach(el => el.classList.remove('hidden'));

        btnEs.classList.remove('opacity-50', 'grayscale');
        btnEs.classList.add('opacity-100', 'grayscale-0');
        btnEn.classList.remove('opacity-100', 'grayscale-0');
        btnEn.classList.add('opacity-50', 'grayscale');

        document.documentElement.lang = 'es';

    } else {
        esElements.forEach(el => el.classList.add('hidden'));
        enElements.forEach(el => el.classList.remove('hidden'));

        btnEn.classList.remove('opacity-50', 'grayscale');
        btnEn.classList.add('opacity-100', 'grayscale-0');
        btnEs.classList.remove('opacity-100', 'grayscale-0');
        btnEs.classList.add('opacity-50', 'grayscale');

        document.documentElement.lang = 'en';
    }
}


// ====== INICIALIZACIÓN ======
// Por defecto, la web se muestra en español (coincide con el HTML inicial:
// la clase 'hidden' está en los .lang-en). No se hace nada al cargar,
// pero si se quisiera forzar un idioma, se haría aquí.


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


// ====== FEEDBACK VISUAL ======
function showCopied(button) {

    const originalHTML = button.innerHTML;

    const isEs = document.documentElement.lang === 'es';
    const copiedText = isEs ? 'Copiado' : 'Copied';

    button.innerHTML = `<i class="fa-solid fa-check mr-2"></i> ${copiedText}`;

    setTimeout(() => {
        button.innerHTML = originalHTML;
    }, 1500);
}
