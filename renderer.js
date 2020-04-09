// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const bonjour = require('bonjour')();
let services = [];

window.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('search-button')
    .addEventListener('click', findService);

  function showResult() {
    const result = document.getElementById('result');
    let html = '';
    services.forEach((service, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${JSON.stringify(service)}</td>
        </tr>
      `;
    });
    if (result) {
      result.innerHTML = html;
    }
  }

  function findService() {
    services = [];
    // Find all koov services
    const options = document.getElementById('search-input').value;
    if (options.trim().length === 0) {
      console.log('Please input search options');
      return;
    }
    bonjour.find(JSON.parse(options), function (service) {
      services.push(service);
      showResult();
      console.log('Found service:', service);
    });
  }
});
