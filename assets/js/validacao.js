document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.querySelector("textarea");

    // Função para exibir mensagens de erro
    function showError(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("div");
            error.classList.add("error-message");
            error.style.color = "red";
            error.style.fontSize = "14px";
            input.parentNode.appendChild(error);
        }
        error.textContent = message;
        input.style.borderColor = "red";
    }

    // Função para remover erro ao corrigir
    function clearError(input) {
        let error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.textContent = "";
        }
        input.style.borderColor = "green";
    }

    // Função para exibir alerta ao sair do campo
    function addBlurValidation(input, regex, message) {
        input.addEventListener("blur", function () {
            if (!regex.test(input.value.trim())) {
                alert(message); // Exibir alerta para o usuário
                showError(input, message);
            } else {
                clearError(input);
            }
        });
    }

    // Aplicar validação com mensagens de alerta
    addBlurValidation(name, /^[A-Za-zÀ-ÿ\s]{3,}$/, "Nome deve ter pelo menos 3 caracteres e conter apenas letras.");
    addBlurValidation(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Por favor, insira um e-mail válido.");
    addBlurValidation(subject, /^.{5,}$/, "O assunto deve ter pelo menos 5 caracteres.");
    addBlurValidation(message, /^.{10,}$/, "A mensagem deve ter pelo menos 10 caracteres.");

    // Validação final no envio do formulário
    form.addEventListener("submit", function (event) {
        let isValid = true;

        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(name.value.trim())) {
            showError(name, "Nome deve ter pelo menos 3 caracteres e conter apenas letras.");
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, "Por favor, insira um e-mail válido.");
            isValid = false;
        }

        if (subject.value.trim().length < 5) {
            showError(subject, "O assunto deve ter pelo menos 5 caracteres.");
            isValid = false;
        }

        if (message.value.trim().length < 10) {
            showError(message, "A mensagem deve ter pelo menos 10 caracteres.");
            isValid = false;
        }

        // Se houver erro, impedir envio do formulário
        if (!isValid) {
            event.preventDefault();
        }
    });
});
