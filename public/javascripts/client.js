window.onload = function() {
    let elem = document.querySelector('.sidenav');
    let instance = new M.Sidenav(elem);
    // ===========================================
    document.querySelectorAll('.price').forEach(node => {
        node.textContent = new Intl.NumberFormat('us-US', {
            currency: 'USD',
            style: 'currency'
        }).format(node.textContent);
    })
}