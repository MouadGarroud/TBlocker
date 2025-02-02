// Mouad Garroud
const addButton = document.getElementById('addUrl');
const urlInput = document.getElementById('urlInput');
const urlList = document.getElementById('blockedList');
function getBaseUrl(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.origin;
  } catch (error) {
    alert('Invalid URL');
    return null;
  }
}
function saveUrl(url) {
  let blockedUrls = JSON.parse(localStorage.getItem('blockedUrls')) || [];
  blockedUrls.push(url);
  localStorage.setItem('blockedUrls', JSON.stringify(blockedUrls));
}
function removeUrl(index) {
  let blockedUrls = JSON.parse(localStorage.getItem('blockedUrls')) || [];
  blockedUrls.splice(index, 1); 
  localStorage.setItem('blockedUrls', JSON.stringify(blockedUrls));
  displayUrls();
}
function displayUrls() {
  const blockedUrls = JSON.parse(localStorage.getItem('blockedUrls')) || [];
  urlList.innerHTML = ''; 
  blockedUrls.forEach((url, index) => {
    const li = document.createElement('li');
    li.className = 'urlItem';
    const urlText = document.createTextNode(url + ' ');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      removeUrl(index);
    });
    li.appendChild(urlText);
    li.appendChild(removeBtn);
    urlList.appendChild(li);
  });
}
addButton.addEventListener('click', () => {
  const baseUrl = getBaseUrl(urlInput.value);
  if (baseUrl) {
    saveUrl(baseUrl);
    urlInput.value = '';
    displayUrls();
  }
});
displayUrls();
