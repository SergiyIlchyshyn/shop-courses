window.onload = function() {
    let elem = document.querySelector('.sidenav');
    let instance = new M.Sidenav(elem);
    // ===========================================
    document.querySelectorAll('.price').forEach(node => {
        node.textContent = new Intl.NumberFormat('us-US', {
            currency: 'USD',
            style: 'currency'
        }).format(node.textContent);
    });

    // Delete from card
    const $card = document.querySelector('#card');
    if ($card) {
        $card.addEventListener('click', event => {
            if (event.target.classList.contains('js-remove')) {
                const id = event.target.dataset.id;

                fetch('/card/remove/' + id, {
                        method: 'delete',
                        cache: 'no-cache',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(card => {
                        console.log(card);
                    })
                    .catch(err => alert(err))
            }
        })
    }
}