window.addEventListener('DOMContentLoaded', () => {  

const modalTrigger = document.querySelector('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('[data-close]');
    
    
    
modalTrigger.addEventListener('click',() =>{
   modal.classList.add('show');
   modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
});

modalClose.addEventListener('click', ()=>{
    modal.classList.remove('show');
   modal.classList.add('hide');
});









});