// Panel functionality
const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  // Close all other panels
  panels.forEach(panel => {
    if (panel !== this) {
      panel.classList.remove('open', 'open-active');
    }
  });
  
  // Toggle current panel
  this.classList.toggle('open');
}

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

// Add event listeners for panels
panels.forEach(panel => {
  panel.addEventListener('click', toggleOpen);
  panel.addEventListener('transitionend', toggleActive);
  
  // Add keyboard support
  panel.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleOpen.call(panel);
    }
  });
});

// Add smooth hover effects
panels.forEach(panel => {
  panel.addEventListener('mouseenter', function() {
    if (!this.classList.contains('open')) {
      this.style.transform = 'scale(1.02)';
    }
  });
  
  panel.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

// Initialize functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add click to copy email functionality
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      navigator.clipboard.writeText('afsar_optimistic@yahoo.com').then(() => {
        // Show a brief notification
        const notification = document.createElement('div');
        notification.textContent = 'Email copied to clipboard!';
        notification.className = 'notification';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
      });
    });
  }

  // Add experience section interactivity
  const experienceToggles = document.querySelectorAll('.experience-toggle');
  experienceToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      const experienceItem = this.closest('li');
      const isExpanded = experienceItem.classList.contains('expanded');
      
      // Toggle current item (allow multiple to be expanded)
      if (isExpanded) {
        experienceItem.classList.remove('expanded');
      } else {
        experienceItem.classList.add('expanded');
      }
    });
  });
});
