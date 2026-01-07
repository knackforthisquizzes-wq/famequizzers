
    const GA_ID = 'G-L9PLC0WEHQ';

    function loadGA() {
      if (window.__gaLoaded) return;
      window.__gaLoaded = true;

      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ window.dataLayer.push(arguments); }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', GA_ID);
    }

    const consent = localStorage.getItem('knackConsent');
    if (!consent) {
      document.getElementById('consent-banner').style.display = 'flex';
    } else if (consent === 'true') {
      loadGA();
    }

    document.getElementById('agree-btn').addEventListener('click', function() {
      localStorage.setItem('knackConsent', 'true');
      document.getElementById('consent-banner').style.display = 'none';
      loadGA();
    });

    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.nextElementSibling.classList.toggle('open');
      });
    });
