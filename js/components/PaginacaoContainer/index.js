export class PaginacaoContainer{

    constructor(){
        this.page = null
        this.pageDown = null
        this.pageUp = null
    }

    init(func){
        this.page = document.querySelector("#page")
        this.pageDown = document.querySelector("#page-down")
        this.pageUp = document.querySelector("#page-up")
        this.page.value =  0
        this.aumentarValorPaginaListener(func)
        this.diminuirValorPaginaListener(func)
    }

    diminuirValorPaginaListener(func){
        this.pageDown.addEventListener("click",()=>func(this.page.value != 0 ? --this.page.value : 0))
    }

    aumentarValorPaginaListener(func){
        this.pageUp.addEventListener("click",()=>func(++this.page.value))
    }
    
    getNumeroPagina(func){
        this.page.addEventListener("blur",()=>func(this.page.value))    
    }
    
    returnComponente(){
        return `
        <div class="d-flex justify-content-center align-items-center p-2" id="paginacao-container">
            <span class="mr-2" id="page-down">⬅️</span>
            <input type="text" id="page" class="text-center" style="width: 30px;">
            <span class="ml-2" id="page-up">➡️</span>
        </div>
        `
    }

}
