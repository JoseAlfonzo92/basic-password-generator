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
    translate: "Translate",
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
    developerText: `Developed by <a href="https://github.com/JoseAlfonzo92" target="_blank" rel="noopener noreferrer">
      José Alfonzo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`,
  },
  es: {
    title: "Generador de Contraseñas",
    translate: "Traducir",
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
    developerText: `Desarrollado por <a href="https://github.com/JoseAlfonzo92" target="_blank" rel="noopener noreferrer">
      José Alfonzo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`,
  }
};


      function detectSystemLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        return userLang.startsWith('es') ? 'es' : 'en';
      }

      function translatePage(lang) {
        const t = translations[lang];
        document.getElementById('title').textContent = t.title;
        document.querySelector('label[for="language"]').textContent = t.translate;
        document.querySelector('label[for="password-length"]').childNodes[0].textContent = t.passwordLength;
        uppercaseCheckbox.parentNode.childNodes[1].textContent = ' ' + t.uppercase;
        lowercaseCheckbox.parentNode.childNodes[1].textContent = ' ' + t.lowercase;
        numbersCheckbox.parentNode.childNodes[1].textContent = ' ' + t.numbers;
        symbolsCheckbox.parentNode.childNodes[1].textContent = ' ' + t.symbols;
        generateBtn.innerHTML = `${t.generate} <i class="fa-solid fa-plus"></i>`;
        copyBtn.innerHTML = `${t.copy} <i class="fa-solid fa-copy"></i>`;
        document.querySelector('label[for="strength-bar"]').textContent = t.strength;
        developerText.innerHTML = t.developerText; // Use innerHTML to keep <a> tag clickable
      }

      // Set system language
      const systemLang = detectSystemLanguage();
      languageSelector.value = systemLang;
      translatePage(systemLang);

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

        if (!allowedChars) {
          showToast('selectOption');
          return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
          password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
        }

        passwordField.value = password;
        ratePasswordStrength(password);
        showToast('passwordGenerated');
      }

    function ratePasswordStrength(password) {
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');

  let score = 0;
  if (password.length >= 8) score += 20;
  if (/[A-Z]/.test(password)) score += 20;
  if (/[a-z]/.test(password)) score += 20;
  if (/[0-9]/.test(password)) score += 20;
  if (/[!@#$%^&*()_+]/.test(password)) score += 20;

  // Update bar width
  strengthBar.style.width = `${score}%`;

  // Determine color and label text
  let color = "red";
  let label = "Very Weak";

  if (score <= 20) {
    color = "#e74c3c"; // red
    label = "Very Weak";
  } else if (score <= 40) {
    color = "#e67e22"; // orange
    label = "Weak";
  } else if (score <= 60) {
    color = "#f1c40f"; // yellow
    label = "Moderate";
  } else if (score <= 80) {
    color = "#2ecc71"; // green
    label = "Strong";
  } else {
    color = "#3498db"; // blue
    label = "Very Strong";
  }

  // Apply color and label
  strengthBar.style.background = color;
  strengthLabel.textContent = label;
}


      generateBtn.addEventListener('click', generatePassword);

      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(passwordField.value);
          showToast('copiedToClipboard');
        } catch {
          showToast('copyFailed');
        }
      });

      function showToast(messageKey) {
        const toast = document.getElementById('toast');
        const currentLang = languageSelector.value;
        toast.textContent = translations[currentLang][messageKey];
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
      }
    });



    document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const userPref = localStorage.getItem("theme");
  const systemPrefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme based on user or system
  if (userPref) {
    document.documentElement.setAttribute("data-theme", userPref);
  } else if (systemPrefDark) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }

  // Update icon on load
  updateThemeIcon();

  // Toggle theme on click
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const icon = themeToggle.querySelector("i");

    if (currentTheme === "dark") {
      icon.classList.replace("fa-moon", "fa-sun");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
    }
  }
});
