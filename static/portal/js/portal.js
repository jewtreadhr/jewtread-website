// Jewtread HR — Employer Portal JS
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.getElementById('portal-sidebar');
    const overlay = document.getElementById('portal-sidebar-overlay');
    const toggle = document.getElementById('portal-mobile-toggle');

    if (toggle) {
        toggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }

    // Auto-dismiss alerts after 5 seconds
    document.querySelectorAll('.portal-alert').forEach(function(alert) {
        setTimeout(function() {
            alert.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-8px)';
            setTimeout(function() { alert.remove(); }, 300);
        }, 5000);
    });

    // Confirm destructive actions
    document.querySelectorAll('[data-confirm]').forEach(function(el) {
        el.addEventListener('click', function(e) {
            if (!confirm(el.getAttribute('data-confirm'))) {
                e.preventDefault();
            }
        });
    });
});
