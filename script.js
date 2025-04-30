function showText(id) {
  // Hide all cheat text sections
  const allCheats = document.querySelectorAll('.cheat-text');
  allCheats.forEach(section => section.style.display = 'none');

  // Show the selected cheat section
  const selected = document.getElementById(id);
  if (selected) {
    selected.style.display = 'block';
  }
}
