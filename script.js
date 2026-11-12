// Товары магазина. Замените названия файлов на свои картинки в папке images/
const products = [
  {
    id: 1,
    title: 'Сувенир «Байкальская нерпа»',
    desc: 'Керамическая статуэтка нерпы ручной работы',
    price: 1200,
    img: 'baykal-1.jpg'
  },
  {
    id: 2,
    title: 'Кулон из байкальского камня',
    desc: 'Натуральный камень, серебряная фурнитура',
    price: 2400,
    img: 'baykal-2.jpg'
  },
  {
    id: 3,
    title: 'Разделочная доска «Байкал»',
    desc: 'Дерево кедра с гравировкой',
    price: 1800,
    img: 'baykal-3.jpg'
  },
  {
    id: 4,
    title: 'Магнит «Озеро Байкал»',
    desc: 'Набор из 3 магнитов с видами озера',
    price: 450,
    img: 'baykal-4.jpg'
  }
];

// Если картинки не загрузились — подставим заглушку
const FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#cfe3ee"/><text x="50%" y="50%" font-size="20" text-anchor="middle" fill="#0b3d5c">Байкал Стори</text></svg>'
);

const grid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

// Рендер карточек товаров
function renderProducts() {
  grid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" onerror="this.onerror=null;this.src='${FALLBACK}'">
      <div class="card-body">
        <div class="card-title">${p.title}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-footer">
          <span class="price">${p.price} ₽</span>
          <button class="add-btn" data-id="${p.id}">В корзину</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Добавление в корзину
grid.addEventListener('click', e => {
  if (e.target.classList.contains('add-btn')) {
    const id = Number(e.target.dataset.id);
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    updateCart();
  }
});

// Обновление счётчика и корзины
function updateCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span>${item.title} × ${item.qty}</span>
      <span>${item.price * item.qty} ₽</span>
    </div>
  `).join('') || '<p>Корзина пуста</p>';

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = total;
}

// Открытие / закрытие корзины
cartBtn.addEventListener('click', () => cartModal.classList.add('open'));
closeCart.addEventListener('click', () => cartModal.classList.remove('open'));
cartModal.addEventListener('click', e => {
  if (e.target === cartModal) cartModal.classList.remove('open');
});

// Оформление заказа
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  alert(`Заказ оформлен! Сумма: ${total} ₽. Спасибо за покупку в «Байкал Стори»!`);
  cart = [];
  updateCart();
  cartModal.classList.remove('open');
});

// Инициализация
renderProducts();
updateCart();
