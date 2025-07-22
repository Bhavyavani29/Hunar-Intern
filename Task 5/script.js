document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    const tooltip = card.querySelector('.tooltip');
    tooltip.textContent = card.getAttribute('data-message');
  });
});

document.querySelector('.contact-us-btn').addEventListener('click', () => {
  document.getElementById('popupForm').style.display = 'flex';
});

document.getElementById('closeForm').addEventListener('click', () => {
  document.getElementById('popupForm').style.display = 'none';
});

window.addEventListener('click', (e) => {
  const popup = document.getElementById('popupForm');
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});

document.querySelector('.form-box form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Your issue is submitted!");
  document.getElementById('popupForm').style.display = 'none';
});
