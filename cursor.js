document.addEventListener('DOMContentLoaded', () => {
  const cursorIcon = document.querySelector('.cursor-tech-icon');
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  const smoothness = 0.15;

  // Define tech icons
  const icons = [
    { class: 'python', icon: 'fab fa-python', color: '#3776AB' },
    { class: 'react', icon: 'fab fa-react', color: '#61DAFB' },
    { class: 'node', icon: 'fab fa-node-js', color: '#339933' },
    { class: 'java', icon: 'fab fa-java', color: '#007396' },
    { class: 'js', icon: 'fab fa-js', color: '#F7DF1E' },
    { class: 'html5', icon: 'fab fa-html5', color: '#E34F26' },
    { class: 'css3', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { class: 'docker', icon: 'fab fa-docker', color: '#2496ED' },
    { class: 'aws', icon: 'fab fa-aws', color: '#FF9900' },
    { class: 'database', icon: 'fas fa-database', color: '#336791' },
    { class: 'git', icon: 'fab fa-git-alt', color: '#F05032' },
    { class: 'angular', icon: 'fab fa-angular', color: '#DD0031' },
    { class: 'vue', icon: 'fab fa-vuejs', color: '#4FC08D' },
    { class: 'sass', icon: 'fab fa-sass', color: '#CC6699' },
    { class: 'github', icon: 'fab fa-github', color: '#181717' }
  ];

  let currentIconIndex = 0;

  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation function
  function animate() {
    // Smooth movement
    currentX += (mouseX - currentX) * smoothness;
    currentY += (mouseY - currentY) * smoothness;
    
    cursorIcon.style.left = `${currentX}px`;
    cursorIcon.style.top = `${currentY}px`;
    
    requestAnimationFrame(animate);
  }

  // Change icon function
  function changeIcon() {
    currentIconIndex = (currentIconIndex + 1) % icons.length;
    const newIcon = icons[currentIconIndex];
    
    cursorIcon.innerHTML = `<i class="${newIcon.icon}"></i>`;
    cursorIcon.style.color = newIcon.color;
    
    // Add pop animation
    cursorIcon.style.animation = 'none';
    cursorIcon.offsetHeight; // Trigger reflow
    cursorIcon.style.animation = 'iconPop 0.5s ease forwards';
  }

  // Initialize
  animate();
  changeIcon(); // Set initial icon
  setInterval(changeIcon, 6000); // Change icon every 6 seconds

  // Interactive elements effect
  document.querySelectorAll('a, button, .interactive').forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursorIcon.style.fontSize = '9px';
      cursorIcon.style.opacity = '1';
    });

    element.addEventListener('mouseleave', () => {
      cursorIcon.style.fontSize = '20px';
      cursorIcon.style.opacity = '0.9';
    });
  });
}); 