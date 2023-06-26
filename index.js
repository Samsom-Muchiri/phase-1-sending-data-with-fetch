document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userDataForm');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;

    submitData(name, email)
      .then(data => {
        const userId = data.id;
        appendUserId(userId);
      })
      .catch(error => {
        const errorMessage = error.message;
        displayErrorMessage(errorMessage);
      });
  });
});

function submitData(name, email) {
  const userData = {
    name: name,
    email: email
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(userData)
  };

  return fetch('http://localhost:3000/users', requestOptions)
    .then(response => response.json());
}

function appendUserId(userId) {
  const userIdElement = document.createElement('p');
  userIdElement.textContent = `User ID: ${userId}`;
  document.body.appendChild(userIdElement);
}

function displayErrorMessage(message) {
  const errorElement = document.createElement('p');
  errorElement.textContent = `Error: ${message}`;
  document.body.appendChild(errorElement);
}
