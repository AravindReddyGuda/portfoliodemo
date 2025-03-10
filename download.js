// Add a flag to prevent multiple downloads
let isDownloading = false;

document.getElementById('downloadResume').addEventListener('click', async (e) => {
  e.preventDefault();
  
  // Prevent multiple clicks while downloading
  if (isDownloading) return;
  
  try {
    isDownloading = true;
    showStatus('Downloading resume...', 'info');

    const response = await fetch('Aravind_Resume.pdf');
    if (!response.ok) throw new Error('Resume not found');
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aravind_Resume.pdf';
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    showStatus('Resume downloaded successfully!', 'success');
  } catch (error) {
    console.error('Error downloading resume:', error);
    showStatus('Failed to download resume. Please try again.', 'error');
  } finally {
    isDownloading = false;
  }
});

function showStatus(message, type) {
  const statusElement = document.getElementById('downloadStatus');
  statusElement.textContent = message;
  statusElement.style.display = 'block';
  
  // Set color based on type
  switch(type) {
    case 'success':
      statusElement.style.backgroundColor = 'rgba(0, 255, 0, 0.9)';
      break;
    case 'error':
      statusElement.style.backgroundColor = 'rgba(255, 0, 0, 0.9)';
      break;
    default:
      statusElement.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  }

  // Hide status after 3 seconds
  setTimeout(() => {
    statusElement.style.display = 'none';
  }, 3000);
} 