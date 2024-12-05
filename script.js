document.addEventListener('DOMContentLoaded', () => {
    const charCount = document.getElementById('charCount');
    const passwordLength = document.getElementById('password-length');
    const languageSelector = document.getElementById('language');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');
    const generateBtn = document.getElementById('generate');
    const passwordField = document.getElementById('password');
    const copyBtn = document.getElementById('copy');
    const strengthBar = document.getElementById('strength-bar');
    const developerText = document.getElementById('developer-text');

    const translations = {
        en: {
            title: "Password Generator",
            translate: "Translate:",
            passwordLength: "Password Length:",
            uppercase: "Uppercase",
            lowercase: "Lowercase",
            numbers: "Numbers",
            symbols: "Symbols",
            generate: "Generate Password",
            copy: "Copy",
            strength: "Security Level:",
            copiedToClipboard: "Password copied to clipboard!",
            copyFailed: "Failed to copy the password.",
            selectOption: "Please select at least one option.",
            passwordGenerated: "Password generated successfully!",
            developerText: "Developed by José Alfonzo",
        },
        es: {
            title: "Generador de Contraseñas",
            translate: "Traducir:",
            passwordLength: "Longitud de la Contraseña:",
            uppercase: "Mayúsculas",
            lowercase: "Minúsculas",
            numbers: "Números",
            symbols: "Símbolos",
            generate: "Generar Contraseña",
            copy: "Copiar",
            strength: "Nivel de Seguridad:",
            copiedToClipboard: "¡Contraseña copiada al portapapeles!",
            copyFailed: "Error al copiar la contraseña.",
            selectOption: "Seleccione al menos una opción.",
            passwordGenerated: "¡Contraseña generada con éxito!",
            developerText: "Desarrollado por José Alfonzo", 
        }
    };

    function detectSystemLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('es') ? 'es' : 'en';
    }

    function translatePage(lang) {
        const texts = translations[lang];
        document.getElementById('title').textContent = texts.title;
        document.querySelector('label[for="language"]').textContent = texts.translate;
        document.querySelector('label[for="password-length"]').childNodes[0].textContent = texts.passwordLength;
        uppercaseCheckbox.nextSibling.textContent = texts.uppercase;
        lowercaseCheckbox.nextSibling.textContent = texts.lowercase;
        numbersCheckbox.nextSibling.textContent = texts.numbers;
        symbolsCheckbox.nextSibling.textContent = texts.symbols;
        generateBtn.textContent = texts.generate;
        copyBtn.textContent = texts.copy;
        document.querySelector('label[for="strength-bar"]').textContent = texts.strength;
        developerText.textContent = texts.developerText; // Update developer text
    }

    const systemLanguage = detectSystemLanguage();
    languageSelector.value = systemLanguage;
    translatePage(systemLanguage);

    languageSelector.addEventListener('change', () => {
        translatePage(languageSelector.value);
    });

    passwordLength.addEventListener('input', () => {
        charCount.textContent = passwordLength.value;
    });

    function generatePassword() {
        const length = parseInt(passwordLength.value);
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

        let allowedChars = '';
        if (uppercaseCheckbox.checked) allowedChars += uppercase;
        if (lowercaseCheckbox.checked) allowedChars += lowercase;
        if (numbersCheckbox.checked) allowedChars += numbers;
        if (symbolsCheckbox.checked) allowedChars += symbols;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }

        passwordField.value = password;
        ratePasswordStrength(password);
    }

    function ratePasswordStrength(password) {
        let score = 0;
        if (password.length >= 8) score += 20;
        if (/[A-Z]/.test(password)) score += 20;
        if (/[a-z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[!@#$%^&*()_+]/.test(password)) score += 20;
    
        strengthBar.value = score;
    
        // Update the progress bar color based on the score
        let color;
        if (score <= 20) {
            color = "red"; // Weak
        } else if (score <= 40) {
            color = "orange"; // Moderate
        } else if (score <= 60) {
            color = "yellow"; // Good
        } else if (score <= 80) {
            color = "green"; // Strong
        } else {
            color = "blue"; // Very strong
        }
    
        // Apply the color to the progress bar
        document.documentElement.style.setProperty('--progress-fill', color);
    }
    

    generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', async () => {
    if (generateBtn.disabled) {
        showToast("selectOption"); 
        // Show warning if no options are selected
        return;
    }
    try {
        await navigator.clipboard.writeText(passwordField.value);
        showToast("copiedToClipboard"); 
        // Show success message
    } catch (err) {
        console.error("Failed to copy: ", err);
        showToast("copyFailed"); 
        // Show failure message
    }
});

    
    
    // Function to show the toast message
    function showToast(messageKey) {
        const toast = document.getElementById('toast');
        const currentLang = languageSelector.value;
        // Get the message from translations
        toast.textContent = translations[currentLang][messageKey];  
        // Add the 'show' class to make it visible
        toast.className = 'toast show';  
    
        // Hide the toast after 3 seconds
        setTimeout(() => {
            // Remove the 'show' class
            toast.className = toast.className.replace('show', '');  
        }, 3000);
    }
    

    
    
});




// For the translate label 
const languageSelector = document.getElementById('language');

const languageOptions = {
    en: { en: 'English', es: 'Spanish' },
    es: { en: 'Inglés', es: 'Español' }
};

function updateLanguageOptions(lang) {
    const options = languageOptions[lang];
    languageSelector.options[0].textContent = options.en;
    languageSelector.options[1].textContent = options.es;
}

// Update language options on change
languageSelector.addEventListener('change', () => {
    const selectedLang = languageSelector.value;
    updateLanguageOptions(selectedLang);
});

// Set the initial language options based on system or default to English
document.addEventListener('DOMContentLoaded', () => {
    const systemLang = navigator.language.startsWith('es') ? 'es' : 'en';
    languageSelector.value = systemLang;
    updateLanguageOptions(systemLang);
});





/* function to disable buttons on default */
const checkboxes = document.querySelectorAll('.options input[type="checkbox"]');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const passwordLength = document.getElementById('password-length');
const charCount = document.getElementById('charCount');

// Function to enable/disable buttons based on checkboxes
function updateButtonState() {
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    generateBtn.disabled = !isChecked;
    copyBtn.disabled = !isChecked;
}

// Function to update password length display
passwordLength.addEventListener('input', () => {
    charCount.textContent = passwordLength.value;
});

// Event listeners for checkboxes
checkboxes.forEach(checkbox => {
    // Uncheck all by default
    checkbox.checked = false;  
    checkbox.addEventListener('change', updateButtonState);
});

// Initial button state
updateButtonState();




