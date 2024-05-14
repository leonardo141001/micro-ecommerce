// Define o contador de itens no carrinho
let cartItemCount = 0;

// Define a função que controla o comportamento da barra de navegação ao rolar a página
window.onscroll = scrollFunction;

// Função para controlar o comportamento da barra de navegação ao rolar a página
function scrollFunction() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = Math.max(window.scrollY, document.documentElement.scrollTop);
    navbar.classList.toggle("fixed-top", scrollPosition > window.innerHeight / 2);
    navbar.classList.toggle("scrolled", scrollPosition > window.innerHeight / 2);
}

// Adiciona um evento de clique a cada item do menu suspenso
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', () => {
        const filter = item.getAttribute('data-filter');
        filterItems(filter);
    });
});

// Função para filtrar os itens com base na categoria
function filterItems(filter) {
    const items = document.querySelectorAll('.col');
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        item.style.display = (filter === 'all' || category === filter) ? 'block' : 'none';
    });
}

// Mapeamento de cores em inglês para português
const colorMap = {
    "green": "verde",
    "white": "branco",
    "yellow": "amarelo",
    "black": "preto",
    "gray": "cinza",
    "blue": "azul",
    "purple": "purple",
    "red": "vermelho"
};






// Adiciona um evento de clique a cada botão 'Comprar'
document.querySelectorAll('#buy-btn').forEach((buyButton, index) => {
    buyButton.classList.add('buy-btn'); // Adiciona a classe 'buy-btn'
    buyButton.addEventListener('click', function (event) {
        let cartValue = parseInt(document.getElementById('cart-badge').textContent);
        cartValue++;
        document.getElementById('cart-badge').textContent = cartValue;
        event.preventDefault();
        cartItemCount++;

        // Verifica se há pelo menos 1 item no carrinho
        if (cartValue >= 1) {
            // Exibe os detalhes do carrinho
            document.getElementById('cart-details').style.display = 'block';

            // Captura das informações do produto dentro do bloco correspondente
            const productBlock = document.querySelector('.row.gx-4.gx-lg-5.align-items-center');
            const productName = productBlock.querySelector('h1.display-6.fw-bolder').textContent;
            const productPrice = productBlock.querySelector('.price-item').textContent;
            const quantity = productBlock.querySelector('#quantity').value;
            let selectedColor;
            // Captura da cor selecionada
            productBlock.querySelectorAll('.btn-color').forEach(button => {
                if (button.classList.contains('active')) {
                    selectedColor = button.style.backgroundColor;
                }
            });

            // Captura a forma de pagamento selecionada
            const paymentMethod = document.getElementById('payment-method').value;
            const paymentMethodText = document.getElementById('payment-method').options[document.getElementById('payment-method').selectedIndex].text;

            // Adiciona os detalhes do produto e a forma de pagamento à aba lateral do carrinho
            const cartList = document.getElementById('cart-list');
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span class="details">&#x1F4F1; ${productName}</span><br>
                        <span class="details">&#x1F7E0; Quantidade: ${quantity}</span><br>
                        <span class="details">&#x1F3A8; Cor: ${selectedColor}</span><br>
                        <span class="details">&#x1F4B0; Preço: ${productPrice}</span><br>
                        <span class="details">&#128179; Forma de Pagamento: ${paymentMethodText}</span>`;
            cartList.appendChild(listItem);
            cartList.appendChild(document.createElement('hr'));

            // Atualiza o distintivo do carrinho
            document.getElementById('cart-badge').textContent = cartItemCount;
        } else {
            // Se não houver itens no carrinho, exibe uma mensagem
            alert('Não há itens no carrinho.');
        }
    });
});




document.getElementById('finish-btn').addEventListener('click', function () {
    // Solicita o nome e o endereço da pessoa
    const name = prompt("Por favor, insira seu nome:");
    const address = prompt("Por favor, insira seu endereço com rua, bairro, cidade e estado:");

    // Verifica se o nome e o endereço foram fornecidos
    if (name && address) {
        // Captura a forma de pagamento selecionada
        const paymentMethod = document.getElementById('payment-method').value;
        const paymentMethodText = document.getElementById('payment-method').options[document.getElementById('payment-method').selectedIndex].text;

        // Mensagem inicial
        let message = '';

        // Monta a mensagem com os detalhes do carrinho
        const cartList = document.getElementById('cart-list').getElementsByTagName('li');
        for (let i = 0; i < cartList.length; i++) {
            const details = cartList[i].querySelectorAll('.details');
            details.forEach(detail => {
                message += `${detail.textContent}\n`;
            });
            message += '\n';
        }

        // Adiciona o nome, endereço e forma de pagamento à mensagem
        message = `Nome: ${name}\nEndereço: ${address}\nForma de Pagamento: ${paymentMethodText}\n\n${message}`;

        // Abre o WhatsApp Web com a mensagem montada
        const url = 'https://web.whatsapp.com/send?phone=+5562998002926&text=' + encodeURIComponent(message);
        window.open(url, '_blank');
    } else {
        alert("Por favor, insira seu nome e endereço para continuar.");
    }
});




// Adiciona um evento de clique ao botão do carrinho
document.getElementById('cart-btn').addEventListener('click', function () {
    // Obtém o valor atual do distintivo do carrinho
    const cartValue = parseInt(document.getElementById('cart-badge').textContent);

    // Verifica se há pelo menos 1 item no carrinho
    if (cartValue >= 1) {
        // Exibe os detalhes do carrinho
        document.getElementById('cart-details').style.display = 'block';

        // Atualiza o distintivo do carrinho
        document.getElementById('cart-badge').textContent = cartItemCount;
    } else {
        // Se não houver itens no carrinho, exibe uma mensagem
        alert('Não há itens no carrinho.');
    }
});


// Adiciona um evento de clique ao botão do carrinho
document.getElementById('cart-btn').addEventListener('click', function () {
    // Atualiza o contador de itens no carrinho




});


// Captura da cor selecionada ao clicar em um botão de cor
document.querySelectorAll('.btn-color').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.btn-color').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});

// Captura do método de pagamento selecionado ao clicar em um item do menu suspenso de pagamento
document.querySelectorAll('.dropdown-pagamento').forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault();
        const container = item.closest('.col.mb-5'); // Encontra o container pai
        const paymentDropdown = container.querySelector('.dropdown-toggle'); // Encontra o botão do dropdown de pagamento no container
        const selectedPayment = item.textContent.trim(); // Obtém o texto do item selecionado

        // Remove a classe 'active' de todos os itens do menu suspenso dentro do container
        container.querySelectorAll('.dropdown-pagamento').forEach(i => {
            i.classList.remove('active');
        });

        // Adiciona a classe 'active' ao item clicado
        item.classList.add('active');

        // Atualiza o texto do botão do dropdown de pagamento com o item selecionado
        paymentDropdown.innerText = selectedPayment;
    });
});


// Fecha o carrinho ao clicar fora dele
document.addEventListener('click', function (event) {
    const cartDetails = document.getElementById('cart-details');
    if (!event.target.matches('#cart-btn') && !event.target.closest('#cart-details')) {
        cartDetails.style.display = 'none';
    }
});



