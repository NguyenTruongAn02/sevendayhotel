// assets/js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Language change simulation
    document.getElementById('languageSelect')?.addEventListener('change', (e) => {
        alert(`Changed to ${e.target.value}`); // In real, load translations
    });

    // Sticky bars (already using Bootstrap sticky-top, but for custom)
    window.addEventListener('scroll', () => {
        // If needed for custom sticky
    });

    // Register Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                phone: e.target[1].value,
                email: e.target[2].value,
                username: e.target[3].value,
                password: e.target[4].value,
                realname: e.target[6].value,
                level: 'Silver',
                points: 0,
                coupons: [{value: 400000, expiry: new Date().getTime() + 365*24*60*60*1000}] // 1 year
            };
            localStorage.setItem('user', JSON.stringify(data));
            alert('Registered! You get 400k coupon.');
            window.location.href = 'my-7club.html';
        });
    }

    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = e.target[0].value;
            const pass = e.target[1].value;
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && (input === user.realname || input === user.email || input === user.username || input === user.phone) && pass === user.password) {
                localStorage.setItem('loggedIn', 'true');
                window.location.href = 'my-7club.html';
            } else {
                alert('Invalid credentials');
            }
        });
    }

    // My 7Club
    if (document.getElementById('userInfo')) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('userInfo').innerHTML = `<p>Welcome, ${user.realname}! Level: ${user.level}</p>`;
            document.getElementById('points').textContent = user.points;
            const couponsList = document.getElementById('couponsList');
            user.coupons.forEach(c => {
                const li = document.createElement('li');
                li.textContent = `Coupon: ${c.value} VND (Expires: ${new Date(c.expiry).toDateString()})`;
                couponsList.appendChild(li);
            });
        } else {
            window.location.href = 'login.html';
        }
    }

    // Member levels array (for reference)
    const memberLevels = [
        {level: 'Silver', discount: 2, lateCheckout: '12:30pm', coupon: 400000, breakfast: 0, pointsPerK: 1},
        // Add others
    ];

    // Simulate points addition, coupons expiry check, etc.
    // For demo, basic only
});