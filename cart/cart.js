const STORAGE_KEY = "cart";

const state = {
    products: [
        { id: 1, name: "Mandazi (pack of 6)", price: 100, image: "mandazi.png" },
        { id: 2, name: "Chapati (pack of 5)", price: 150, image: "chapati.png" },
        { id: 3, name: "Tea leaves 250g", price: 120, image: "tea.png" },
    ],
    cart: [],
};

function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
}

state.cart = loadCart();

function addToCart(productId) {
    const existing = state.cart.find((item) => item.productId === productId);
    if (existing) {
        state.cart = state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
    } else {
        state.cart = [...state.cart, { productId, quantity: 1 }];
    }
    commit();
}

function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    state.cart = state.cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
    );
    commit();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter((item) => item.productId !== productId);
    commit();
}

function clearCart() {
    state.cart = [];
    commit();
}

function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find((p) => p.id === item.productId);
        return total + product.price * item.quantity;
    }, 0);
}

function getCartCount() {
    return state.cart.reduce((count, item) => count + item.quantity, 0);
}

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

function renderProducts() {
    productList.replaceChildren();
    state.products.forEach((product) => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - KSh ${product.price} `;
        const btn = document.createElement("button");
        btn.textContent = "Add to Cart";
        btn.addEventListener("click", () => addToCart(product.id));
        li.appendChild(btn);
        productList.appendChild(li);
    });
}

function renderCart() {
    cartList.replaceChildren();
    state.cart.forEach((item) => {
        const product = state.products.find((p) => p.id === item.productId);
        const li = document.createElement("li");
        li.textContent = `${product.name} x ${item.quantity} `;

        const minus = document.createElement("button");
        minus.textContent = "-";
        minus.addEventListener("click", () => updateQuantity(item.productId, item.quantity - 1));

        const plus = document.createElement("button");
        plus.textContent = "+";
        plus.addEventListener("click", () => updateQuantity(item.productId, item.quantity + 1));

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.addEventListener("click", () => removeFromCart(item.productId));

        li.append(minus, plus, remove);
        cartList.appendChild(li);
    });
    cartTotal.textContent = `KSh ${getCartTotal()}`;
    cartCount.textContent = `(${getCartCount()})`;
}

function commit() {
    saveCart();
    renderCart();
}

document.getElementById("clear-cart").addEventListener("click", clearCart);

renderProducts();
renderCart();
