window.addEventListener('DOMContentLoaded', () => {  

    const modalTrigger = document.querySelector('[data-modal]'),
      modal = document.querySelector('.modal');
    
    
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = 'hidden';
    }
    modalTrigger.addEventListener('click',openModal);

    modal.addEventListener('click', (e) => {  
        if(e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {  
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
            /// Forms

    const forms = document.querySelectorAll('form');
    
    const message = {
        loading:'img/spinner.svg',   
        success:'Спасибо! Мы с вами свяжемся',
        failure:'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    });

    const postData = async(url,data) => {
        const res = await fetch(url, {
            method:"POST",
            headers:{
            'Content-type':'application/json'
        },
        body: data
        });

        return await res.json();
    };

    function bindpostData(form) {
        form.addEventListener('submit',(e) => {
            e.preventDefault();
     
    const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display:block;
            margin:0 auto;
        `;
    form.append(statusMessage);
    
    const formData = new FormData(form);
   
    const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
    postData('server.php',json)
        .then(data => { 
            console.log(data);
            showThanksModal(message.success);
            statusMessage.remove();
        }).catch(() => {
            showThanksModal(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();    

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class = "modal__content">
        <button data-close class="modal__close" type="button">
            <svg data-close  class="modal__close-icon">
                <use xlink:href="#close"></use>
            </svg>
        </button>
            <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout( () => {  
            thanksModal.remove(); 
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        },4000);
    }
});





