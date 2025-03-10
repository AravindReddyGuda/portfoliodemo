// Simple scroll animation
const fadeInElements = document.querySelectorAll('.fade-in');

const handleScroll = () => {
  fadeInElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', handleScroll);
handleScroll();

// Add this to your existing script.js
document.querySelector('.resume-btn').addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('Aravind_Resume.pdf');
    if (!response.ok) throw new Error('Resume not found');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aravind_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading resume:', error);
    alert('Sorry, there was an error downloading the resume. Please try again later.');
  }
});

// Add this to your existing script
document.querySelector('.highlight-link').addEventListener('mousemove', (e) => {
  const link = e.currentTarget;
  const rect = link.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const liquid = link.querySelector('.liquid');
  
  // Update liquid position based on vertical mouse movement
  liquid.style.transform = `scaleY(1) translateY(${-y/10}px)`;
});

document.querySelector('.highlight-link').addEventListener('mouseleave', (e) => {
  const liquid = e.currentTarget.querySelector('.liquid');
  liquid.style.transform = 'scaleY(0)';
}); 