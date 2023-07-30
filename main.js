import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    showLoading();
    const data = new FormData(form);
    const response = await fetch('http://localhost:3000/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });
    const { image } = await response.json();

    const result = document.getElementById('result');
    result.innerHTML = `<img src="${image}" width="256">`;
    hideLoading();
  } catch (err) {
    alert(err.message);
  }
});

function showLoading() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Loading... <span><img class="loading" src="/loading.png" alt="loading"></span>';
}

function hideLoading() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Send';
}
