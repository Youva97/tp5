




<script setup>
/* const login = ref('');
const password = ref('');

async function signin() {
    let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value,
        })
    })).json();
    if (json.error) {
        alert(json.error);
        return;
    }
    if (json.data.token) {
        localStorage.setItem('token', json.data.token);
        router.push('/');
    }
} */
</script>