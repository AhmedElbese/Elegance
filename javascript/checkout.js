document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', function() {
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('selected');
        });
        this.classList.add('selected');
        
        if (this.querySelector('h3').textContent.includes('COD') || 
            this.querySelector('h3').textContent.includes('Arrival')) {
            document.querySelector('.btn-outline').style.display = 'block';
            document.querySelector('.btn:not(.btn-outline)').style.display = 'none';
        } else {
            document.querySelector('.btn-outline').style.display = 'none';
            document.querySelector('.btn:not(.btn-outline)').style.display = 'block';
        }
    });
});

document.querySelector('.btn-outline').style.display = 'none';
