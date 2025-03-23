document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll animation
    const smoothScroll = target => {
        const element = document.querySelector(target);
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    };

    // Product image zoom effect
    const product = document.querySelectorAll('.product');
    product.forEach(product => {
        product.addEventListener('mousemove', (e) => {
            const img = product.querySelector('img');
            const boundingRect = product.getBoundingClientRect();
            const x = e.clientX - boundingRect.left;
            const y = e.clientY - boundingRect.top;
            
            img.style.transform = `scale(1.1) translate(${x/20}px, ${y/20}px)`;
        });

        product.addEventListener('mouseleave', () => {
            const img = product.querySelector('img');
            img.style.transform = 'scale(1) translate(0, 0)';
        });
    });

    // Cart functionality
    const shoppingCart = {
        items: [],
        total: 0
    };

    const cartIcon = document.querySelector('.cart');
    const cartModal = document.createElement('div');
    cartModal.className = 'cart-modal';
    document.body.appendChild(cartModal);

    cartIcon.addEventListener('click', () => {
        cartModal.classList.toggle('active');
        updateCartDisplay();
    });

    function updateCartDisplay() {
        // Update the cart display logic here
    }

    // Product filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const produc= document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.textContent.toLowerCase();
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter products
            product.forEach(product => {
                const productCategory = product.dataset.category;
                if (category === 'all' || productCategory === category) {
                    product.style.display = 'block';
                    product.classList.add('animate__fadeIn');
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.getElementById('searchOverlay');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample product database
    const products = [
        { name: 'Royal Chronograph', category: 'Watches', price: 12500, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49' },
        { name: 'Signature Tote', category: 'Bags', price: 3800, image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93' },
        { name: 'Eternity Ring', category: 'Jewelry', price: 8900, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105' }
    ];

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(query) || 
                product.category.toLowerCase().includes(query)
            );
            displaySearchResults(filteredProducts);
        } else {
            searchResults.innerHTML = '';
        }
    });

    function displaySearchResults(results) {
        searchResults.innerHTML = results.map(product => `
            <div class="search-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="search-item-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <span class="price">$${product.price}</span>
                </div>
            </div>
        `).join('');
    }

    // Cart functionality
    const cartCount = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartCount() {
        cartCount.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const product = e.target.closest('.product');
            const productInfo = {
                name: product.querySelector('h3').textContent,
                price: product.querySelector('.price').textContent,
                image: product.querySelector('img').src
            };
            
            cart.push(productInfo);
            updateCartCount();
            
            // Animation
            cartCount.classList.add('animate__bounce');
            setTimeout(() => cartCount.classList.remove('animate__bounce'), 1000);
            
            // Show success message
            const toast = document.createElement('div');
            toast.className = 'toast animate__animated animate__fadeInUp';
            toast.innerHTML = `
                <i class="fas fa-check-circle"></i>
                Added to cart: ${productInfo.name}
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        });
    });

    updateCartCount(); // Initialize cart count
});