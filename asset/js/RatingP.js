const stars = document.querySelectorAll('.stella');
const ratingValue = document.getElementById('rating-value');


stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    const isSelected = star.classList.contains('selected');

    if (isSelected) {
      stars.forEach(s => s.classList.remove('selected'));
      ratingValue.textContent = 0; 
    } else {
      stars.forEach(s => s.classList.remove('selected'));
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('selected');
      }
      ratingValue.textContent = index + 1;
    }
  });
});