document.getElementById('login-button').addEventListener('click', async function() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;


    const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        // Sisselogimine õnnestus, tee vajalikud toimingud, nt. kuvage teade
        alert('Sisselogimine õnnestus!');
        // Võite ka suunata kasutaja avalehele või mujale vastavalt vajadusele
        window.location.href = '/';
    } else {
        // Sisselogimine ebaõnnestus, kuvage viga
        const errorMessage = await response.text();
        alert(errorMessage);
    }
});
