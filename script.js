document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
    const menu = document.querySelector(".menu");

    mobileMenuIcon.addEventListener("click", function () {
        menu.classList.toggle("mobile-menu-open");
    });
});

// Filtro de produtos //


document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelectorAll(".products-code-start");

    section.forEach(section => {
        const menuItems = section.querySelectorAll(".product-filter-brands ul li");
        const productCards = section.querySelectorAll(".card-new-products");

        const state = {
            activeBrand: "todos",
            activeType: "todos"
        }

        function upateCards() {
            productCards.forEach(card => {
                const brand = card.getAttribute("data-brand");
                const type = card.getAttribute("data-product-type");

                if (state.activeBrand === "todos" || state.activeBrand === brand && (state.activeType === "todos" || state.activeType === type)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        }

        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                menuItems.forEach(menuItem => {
                    menuItem.classList.remove("product-brand-active");
                })

                item.classList.add("product-brand-active");

                state.activeBrand = item.getAttribute("data-brand");
                state.activeType = item.getAttribute("data-product-type");

                upateCards();
            })
        });

        upateCards();
    });
});

// Slider de patrocinadores


window.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider-sponsors");
    if (slider) {
        const images = slider.querySelectorAll("img");

        images.forEach(image => {
            const clone = image.cloneNode(true);
            slider.appendChild(clone);
        });

        const totalWidth = images.length * (images[0].offsetWidth + getComputedStyle(images[0]).marginRight);

        slider.style.width = `${totalWidth}px`;

        let currentPosition = 0;

        const moveSlider = () => {
            currentPosition -= 1;
            if (currentPosition <= -totalWidth / 2) {
                currentPosition = 0;
            }

            slider.style.transform = `translateX(${currentPosition}px)`;
            requestAnimationFrame(moveSlider);
        }

        requestAnimationFrame(moveSlider);
    }
});

// Slider Depoimentos


window.addEventListener("DOMContentLoaded", () => {
    const containerTestimonials = document.querySelector(".content-testimonial");
    if (containerTestimonials) {
        const testimonials = containerTestimonials.querySelectorAll(".testimonial");
        const controlsTestimonials = containerTestimonials.querySelector(".controls-testimonial");
        const spanControls = containerTestimonials.querySelectorAll("span");

        let activedSlide = "1";

        function updateTestimonial() {
            testimonials.forEach(testimonial => {
                if (testimonial.getAttribute("data-slide") === activedSlide) {
                    testimonial.style.display = "block";
                } else {
                    testimonial.style.display = "none";
                }
            });
        }

        spanControls.forEach(controls => {
            controls.addEventListener("click", () => {
                spanControls.forEach(span => {
                    span.classList.remove("active-testimonial");
                })

                controls.classList.add("active-testimonial");
                activedSlide = controls.getAttribute("data-slide");

                updateTestimonial();
            });
        });

        updateTestimonial();
    }
});


// Manipulação do carrinho de produtos

const productsArray = [];
const neighborhoodShipment = [
    {
        neighborhood: "Centro",
        shipment: 100
    },
    {
        neighborhood: "Savassi",
        shipment: 180
    },
    {
        neighborhood: "Lourdes",
        shipment: 150
    }
]

let dataCartIsEmpty = true;

function increaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector(".number-quantity");
    const quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
}

function decreaseQuantity(event) {
    const quantityElement = event.target.parentElement.querySelector(".number-quantity");
    const quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantityElement.textContent = quantity - 1;
    }
}

function updateCart(quantityProduct) {
    const cart = document.querySelector(".items-cart");
    cart.textContent = productsArray.length;
    if (productsArray.length > 0) {
        cart.style.display = "flex";
    } else {
        cart.style.display = "none";
    }
}

function addProductToCart(event) {
    const productCard = event.target.closest(".card-new-products");
    const productName = productCard.querySelector(".info-product h3").textContent;
    const priceText = productCard.querySelector(".new-price").textContent;
    const price = parseFloat(priceText.replace("R$", ""));
    const productImg = productCard.querySelector(".img-product");
    const srcProduct = productImg.getAttribute("src");

    const quantityElement = productCard.querySelector(".actions-cart .number-quantity").textContent;

    let quantity = parseInt(quantityElement);

    const existingProductIndex = productsArray.findIndex(product => product.productName === productName);

    if (quantity > 0) {
        if (existingProductIndex !== -1) {
            productsArray[existingProductIndex].quantity = quantity;
        } else {
            productsArray.push({
                productName: productName,
                price: price,
                quantity: quantity,
                productImg: srcProduct
            });
        }
    } else {
        if (existingProductIndex !== 1) {
            productsArray.splice(existingProductIndex, 1);
        }
    }

    localStorage.setItem("productsArray", JSON.stringify(productsArray));

    updateCart();
}

const buttonIncrease = document.querySelectorAll(".actions-cart .increase-quantity");
buttonIncrease.forEach(increase => {
    increase.addEventListener("click", increaseQuantity);
});

const buttonDecrease = document.querySelectorAll(".actions-cart .decrease-quantity");
buttonDecrease.forEach(decrease => {
    decrease.addEventListener("click", decreaseQuantity);
});

const addCartButton = document.querySelectorAll(".confirm-add-cart");
addCartButton.forEach(button => {
    button.addEventListener("click", addProductToCart);
});

window.addEventListener("DOMContentLoaded", () => {
    const cart = document.querySelector(".items-cart");
    const savedProductsArray = JSON.parse(localStorage.getItem("productsArray")) || [];
    if (savedProductsArray.length > 0) {
        productsArray.push(...savedProductsArray);
    }
    updateCart();
});


// Manipulação do botão de busca

const searchButton = document.querySelector(".action-icons .search");
const inputSearch = document.querySelector(".action-icons input");

searchButton.addEventListener("click", () => {
    if (inputSearch.style.display === "block") {
        console.log(inputSearch.value);
        inputSearch.style.display = "none";
        inputSearch.value = "";
    } else {
        inputSearch.style.display = "block";
        inputSearch.focus();
    }

});

// Carrinho 

const inputCep = document.querySelector("#cep");
const inputCity = document.querySelector("#city");
const inputState = document.querySelector("#state");
const inputNeighborhood = document.querySelector("#neighborhood");
const inputStreet = document.querySelector("#street");
const inputNumber = document.querySelector("#number");
const savedProductsArray = JSON.parse(localStorage.getItem("productsArray"));
const totalOrder = savedProductsArray ? savedProductsArray.reduce((acumulador, product) => acumulador += (product.price * product.quantity), 0) : 0;

const subTotal = document.querySelector("#subtotal-value");
const shipmentInput = document.querySelector("#shipment-value");
const totalOrderField = document.querySelector("#total-order-value");

function searchCep() {
    const typerCep = inputCep.value.trim().replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${typerCep}/json/`).then((response) => {
        if (!response.ok) {
            console.error("Não foi possível obter os dados do CEP");
        }

        return response.json();
    }).then((data) => {
        inputCity.value = data.localidade;
        inputState.value = data.uf;
        if (data.bairro) {
            inputNeighborhood.value = data.bairro;
            let changeEvent = new Event("change", { bubbles: true });
            inputNeighborhood.dispatchEvent(changeEvent);
        }
        inputStreet.value = data.logradouro;
    }).catch(error => {
        console.error("Erro:", error);
    });
}


window.addEventListener("DOMContentLoaded", function () {
    const tbody = document.querySelector(".info-products-order tbody");

    if (tbody && savedProductsArray) {
        for (const product of savedProductsArray) {
            const row = document.createElement("tr");
            const nameCell = document.createElement("td");
            nameCell.innerHTML = `<div class="product-cart">
            <img src="${product.productImg}" alt="${product.productName}" width="100px"/>
            ${product.productName}
        </div>`;

            const priceCell = document.createElement("td");
            priceCell.textContent = `R$ ${product.price.toFixed(2)}`;

            const quantityCell = document.createElement("td");
            quantityCell.textContent = product.quantity;

            const subTotalCell = document.createElement("td");
            const subTotal = product.price * product.quantity;
            subTotalCell.textContent = `R$ ${subTotal.toFixed(2)}`;

            row.appendChild(nameCell);
            row.appendChild(priceCell);
            row.appendChild(quantityCell);
            row.appendChild(subTotalCell);
            tbody.appendChild(row);
        }
    }
    const sectionProductsMobile = document.querySelector(".info-products-order-mobile");

    if(sectionProductsMobile && savedProductsArray){
        for(const product of savedProductsArray){
            const ul = document.createElement("ul");
            const nameProduct = document.createElement("li");
            nameProduct.innerHTML = `Item: <span>${product.productName} <img src="${product.productImg}" alt="${product.productName}"></span>`;

            const priceProduct = document.createElement("li");
            priceProduct.innerHTML = `Preço: <span>R$ ${product.price.toFixed(2)}</span>`;

            const quantityProduct = document.createElement("li");
            quantityProduct.innerHTML = `Qtde: <span>${product.quantityProduct}</span>`;

            const subTotalProduct = document.createElement("li");
            const subtotalP = product.price * product.quantity;
            subTotalProduct.innerHTML = `SubTotal: <span>R$ ${subtotalP.toFixed(2)}</span>`;

            ul.appendChild(nameProduct);
            ul.appendChild(priceProduct);
            ul.appendChild(quantityProduct);
            ul.appendChild(subTotalProduct);

            sectionProductsMobile.appendChild(ul);
        }
    }
});


function finishOrder() {
    const fullName = document.querySelector("#fullName").value;
    const rg = document.querySelector("#rg").value;
    const cpf = document.querySelector("#cpf").value;

    const cep = inputCep.value;
    const street = inputStreet.value;
    const city = inputCity.value;
    const state = inputState.value;
    const neighborhood = inputNeighborhood.value;
    const number = inputNumber.value;

    let textFormated = `Olá, gostaria de fazer um pedido para a loja.
    Meus dados são:
    Nome: ${fullName}
    RG: ${rg}
    CPF: ${cpf}
    Endereço: Rua: ${street}, Cidade: ${city}, Estado: ${state}, Bairro: ${neighborhood}, Número/complemento: ${number}, CEP: ${cep}
    Os produtos que eu escolhi são:`;

    savedProductsArray.forEach(product => {
        textFormated += `
        Nome do Produto: ${product.productName},
        Preço: R$ ${product.price},
        Quantidade: ${product.quantity}`
    });

    textFormated += `
    Total do pedido: R$ ${totalOrder}`;

    const textEncoded = encodeURIComponent(textFormated);

    window.open(`https://wa.me/5531999999999?text=${textEncoded}`);
}

function clearCart() {
    localStorage.removeItem("productsArray");
    inputCep.value = "";
    inputStreet.value = "";
    inputCity.value = "";
    inputNeighborhood.value = "";
    inputState.value = "";
    inputNumber.value = "";
    dataCartIsEmpty = true;
    location.reload();
}

function updateInfosOrder(discount) {
    if (subTotal) {
        subTotal.textContent = totalOrder - discount;
    }

    if (shipmentInput && totalOrderField && savedProductsArray.length > 0 && inputNeighborhood.value !== "") {
        const foundedNeighborhood = neighborhoodShipment.find(info => info.neighborhood === inputNeighborhood.value);
        const shipmentValue = foundedNeighborhood ? foundedNeighborhood.shipment : 150;
        shipmentInput.textContent = shipmentValue;
        totalOrderField.textContent = Number(subTotal.textContent) + Number(shipmentValue);
    }
}


if (inputNeighborhood) {
    inputNeighborhood.addEventListener("change", function () {
        dataCartIsEmpty = false;
        updateInfosOrder(0);
        updateButtonSendOrder();
    });
}

const availableCoupons = [
    {
        value: "FREE10",
        discount: 10
    },
    {
        value: "FREE20",
        discount: 20
    }
]

function addCoupon() {
    const inputCoupon = document.querySelector("#discount");
    if (inputCoupon) {
        const validCoupon = availableCoupons.find(coupon => coupon.value === inputCoupon.value.toUpperCase().trim());
        const textCoupon = document.querySelector(".coupon-added span");
        const errorCoupon = document.querySelector(".coupon-error");
        errorCoupon.style.display = "none";

        if (validCoupon) {
            textCoupon.textContent = validCoupon.value;
            updateInfosOrder(validCoupon.discount);
        } else {
            errorCoupon.style.display = "block";
        }
    }
}

function updateButtonSendOrder() {
    const input = document.querySelector("#send-order");
    if (input && !dataCartIsEmpty) {
        input.classList.remove("disabled-send-order");
    } else {
        input.classList.add("disabled-send-order");
    }
}


function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);

    if (section) {
        let scrollOffSet = 0;

        scrollOffSet = section.offsetTop - (window.innerHeight - section.clientHeight) / 2;

        window.scrollTo({
            top: scrollOffSet,
            behavior: "smooth"
        })
    }
}

window.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");
    links.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const sectionId = link.getAttribute("href");
            scrollToSection(sectionId);
        });
    });
});


// Contato do site


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const successMessage = document.querySelector("#success-message");
    const loading = document.querySelector("#loading");
    const errorMessage = document.querySelector("#error-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const cellphone = document.getElementById("cellphone").value;
        const message = document.getElementById("message").value;

        form.style.display = "none";
        successMessage.style.display = "none";
        errorMessage.style.display = "none";
        loading.style.display = "block";

        const data = {
            to: "lucasfreitasdecarvalhofull@gmail.com",
            subject: "Contato do site",
            text: "Contato do site",
            html: `<p>Nome: ${name}</p><br><p>Email: ${email}</p><br><p>Celular: ${cellphone}</p><br><p>Assunto: ${subject}</p><br><p>Mensagem: ${message}</p>`
        };

        fetch("https://api-mail-gun-orq3.onrender.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            if (res.ok) {
                loading.style.display = "none";
                successMessage.style.display = "block";
            } else {
                loading.style.display = "none";
                errorMessage.style.display = "block";
                console.error("Erro na resposta da API");
            }
        }).catch(error => {
            loading.style.display = "none";
            errorMessage.style.display = "block";
            console.error(`Erro na resposta da API: ${error}`);
        })
    });
});