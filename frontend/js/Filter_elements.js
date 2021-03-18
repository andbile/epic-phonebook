/**
 * Фільтрація елементів
 * Фільтрація виконується натисканням на кнопки
 * ------------------------------------------------------------- */

export default class FilterElements {

    /**
     * @type {object} options - налаштування фільтру
     * @property {string} options.parentElement - css селектор батьківського елемента
     * @property {string} options.btns - css селектор
     * @property {string} options.elements - css селектор
     * @property {string} options.dataAttribute - data-атрибут для пошуку і фільтрації елементів
     * @property {string} options.resetFilter - data-атрибут для скидання фільтру
     */
    constructor(options) {
        this.options = options

        this.parentElement = document.querySelector(options.parentElement)
        // Елементи для фільтрування
        this.filterElements = this.parentElement.querySelectorAll(this.options.elements.itemSelector)

        // Встановлення обробників на кнопки
        this.clickHandler = this.clickHandler.bind(this)
        this.setHandlers()

    }


    /**
     * Перевіряємо наявність батьківського елемента для фільтрації
     * @param {string} selector - css селектор
     * @returns {boolean}
     */
    static isParentElementFound (selector){
        try{
            return !!document.querySelector(selector);
        }catch{
            return false;
        }
    }

    // Встановлення обробників на кнопки
    setHandlers(){
        const btns = this.parentElement.querySelectorAll(this.options.btns.itemSelector)

        btns.forEach(item => {
            item.addEventListener('click', this.clickHandler)
        })
    }


    clickHandler(evt){
        const target = evt.target

        /** @type {string} currentFilter - фільтр */
        const currentFilter = target.dataset[this.options.dataAttribute]

        this.filter(currentFilter)
    }

    /** @param {string} currentFilter - фільтр з data-атрибуту кнопки */
    filter(currentFilter){

        // скидаємо фільтри і відображаємо всю інформацію
        if(currentFilter === this.options.resetFilter) {
            this.filterElements.forEach(item =>{
                item.hidden = false
            })
            return
        }

        // фільтруємо, приховуючи все, що не дорівнює currentFilter
        this.filterElements.forEach( item => {
            item.hidden = item.dataset.filter !== currentFilter
        })
    }
}