document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.createElement('div');
  const cursorFollower = document.createElement('div');
  
  cursor.classList.add('cursor');
  cursorFollower.classList.add('cursor-follower');
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Position main cursor immediately
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  // Interactive elements
  const clickables = document.querySelectorAll('a, button, .clickable, input, textarea');
  clickables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
  
  // Special effect for code blocks
  const codeElements = document.querySelectorAll('pre, code');
  codeElements.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('code-active');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('code-active');
    });
  });
  
  // Input fields - typing cursor
  const inputFields = document.querySelectorAll('input, textarea');
  inputFields.forEach(field => {
    field.addEventListener('focus', () => {
      cursor.classList.add('typing');
    });
    field.addEventListener('blur', () => {
      cursor.classList.remove('typing');
    });
  });
  
  // Animation loop for smoother follower
  function animateFollower() {
    // Calculate movement with easing
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
});
