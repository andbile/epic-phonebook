import FilterElements from './Filter_elements.js'

document.addEventListener("DOMContentLoaded", () => {


    /**
     * Фільтрація "Довідника телефонних номерів та електронної пошти"
     * Фільтруємо по коду відділу, який беремо із data-атрібута
     * ------------------------------------------------------------- */
    const isParentElementFound = FilterElements.isParentElementFound('#js-phone-book')
       if(isParentElementFound){
           new FilterElements({
               parentElement: '#js-phone-book',
               btns:{
                   itemSelector: '.btn-item',
               },
               elements:{
                   itemSelector: '.filter-item'
               },
               dataAttribute: 'filter',
               // TODO придумати кращу назву
               resetFilter: 'all'
           })
       }




});



