const registerButton = document.getElementById('register-button');
registerButton.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Registreerimine: Kasutajanimi - ' + username + ', E-post - ' + email + ', Salasõna - ' + password);

    const response = await fetch('/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        // Registreerimine õnnestus, tee vajalikud toimingud, nt. kuvage teade
        alert('Registreerimine õnnestus!');
        // Võite ka suunata kasutaja sisselogimise lehele
        window.location.href = '/login';
    } else {
        // Registreerimine ebaõnnestus, kuvage viga
        const errorMessage = await response.text();
        alert(errorMessage);
    }
});
