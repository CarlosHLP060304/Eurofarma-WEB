export class Search{

    constructor({placeholder,name,id}){
        this.placeholder = placeholder 
        this.name = name
        this.id = id
    }

    returnSearch(){
        return `
        <div class="d-flex justify-content-center align-items-center div-search-funcionario mb-3">
            <input type="search" name="${this.name}" id="${this.id}" class="search-funcionario p-2" placeholder="${this.placeholder}" style="width: 100%;">
            <button type="button" class="btn" id="btn_pesquisar">🔎</button>
        </div>
        ` 
    }

    exibirSearch(){
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "../js/components/Search/index.css"
        document.head.appendChild(link)
        document.querySelector("#div-search").innerHTML = this.returnSearch()
    }
}



