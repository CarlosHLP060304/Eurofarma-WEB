export function Questao({titulo,pergunta,alternativas,resposta}) {
    let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return `<div class="question mb-4">
                <h5>${titulo}</h5>
                <p>${pergunta}</p>
                <div class="alternatives">
                    ${alternativas.map(
                        (alternativa,index) => {
                            return `
                                <p class="${alternativa===resposta ? "correct" : ""}"><strong>${letras[index]}</strong>${alternativa}</p>
                            `
                        }
                    ).join("")}
                </div>
            </div>`
}