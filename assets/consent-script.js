
    const consent = localStorage.getItem('fameconsent');
    if (!consent) {
      document.getElementById('consent-banner').style.display = 'flex';
    } 

    document.getElementById('agree-btn').addEventListener('click', function() {
      localStorage.setItem('fameconsent', 'true');
      document.getElementById('consent-banner').style.display = 'none';
    });


    