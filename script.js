document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 50) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const form = document.getElementById('contact-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name) {
            errorMessage.textContent = 'Name is required.';
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            errorMessage.textContent = 'Invalid email format.';
            return;
        }

        if (message.length < 10) {
            errorMessage.textContent = 'Message must be at least 10 characters long.';
            return;
        }

        errorMessage.textContent = 'Form submitted successfully!';
    });

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    document.body.appendChild(gridContainer);

    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerText = 'Loading...';
    gridContainer.appendChild(loadingIndicator);

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            gridContainer.removeChild(loadingIndicator);
            data.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                gridContainer.appendChild(card);
            });
        })
        .catch(error => {
            gridContainer.removeChild(loadingIndicator);
            console.error('Error fetching data:', error);
            const errorMessage = document.createElement('div');
            errorMessage.innerText = 'Failed to load data.';
            gridContainer.appendChild(errorMessage);
        });
});
