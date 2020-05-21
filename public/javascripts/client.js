window.onload = function() {
    let elem = document.querySelector('.sidenav');
    let instance = new M.Sidenav(elem);
    // ===========================================

    const toCurrency = price => {
        return new Intl.NumberFormat('us-US', {
            currency: 'USD',
            style: 'currency'
        }).format(price);
    }
    document.querySelectorAll('.price').forEach(node => {
        node.textContent = toCurrency(node.textContent);
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
                        // console.log(card);
                        if (card.courses.length) {
                            // оновляємо таблицю
                            const html = card.courses.map(c => {
                                return `
                                <tr>
                                    <td>${c.title}</td>
                                    <td>${c.count}</td>
                                    <td>
                                        <button type="button" class="btn btn-small js-remove" data-id="${c.id}">Удалить</button>
                                    </td>
                                </tr>
                                `
                            }).join('');
                            $card.querySelector('tbody').innerHTML = html;
                            $card.querySelector('.price').textContent = toCurrency(card.price);
                        } else {
                            $card.innerHTML = `<p>Корзина пуста.</p>`;
                        }
                    })
                    .catch(err => alert(err))
            }
        })
    }
}