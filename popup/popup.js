function initPopup(doc = document) {
  const autoScanToggle = doc.getElementById('autoScanToggle');
  const statusDot = doc.querySelector('.status-dot');

  if (!autoScanToggle || !statusDot) {
    return { autoScanToggle, statusDot };
  }

  autoScanToggle.addEventListener('change', () => {
    if (autoScanToggle.checked) {
      statusDot.style.background = '#C9C9C9';
    } else {
      statusDot.style.background = '#27a065';
    }
  });

  return { autoScanToggle, statusDot };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initPopup };
} else {
  console.log('Popup');
  initPopup(document);
}