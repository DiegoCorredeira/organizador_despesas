let despesas = []
let salario = 0.0
let poupanca = 0.0

function adicionarDespesa(){
    let despesaInput = document.getElementById('nomeDespesa')
    let valorDespesaInput = document.getElementById('valorDespesa')
    let nomeDespesa = valorDespesaInput.value.trim()
    let valorDespesa = parseFloat(valorDespesaInput.value)


    if (nomeDespesa === "" || isNaN(valorDespesa) || valorDespesa <= 0) {
        alert('Informe um nome e um valor válidos para a despesa')
        return
    }
    despesas.push({
        nome: nomeDespesa,
        valor: valorDespesa
    })
    
    despesaInput.value = ""
    valorDespesaInput.value = ""

}



function atualizarValorTotal(){
    let totalDespesas = despesas.reduce((total, despesas => total + despesas.value, 0))
    document.getElementById("totalDespesas").textContent = "Total de despesas: R$" + totalDespesas.toFixed(2)

    let necessidades = salario * 0.5
    document.getElementById("necessidades").textContent = "Necessidades (50%): R$" + necessidades.toFixed(2)

    let desejos = salario * 0.3
    document.getElementById("desejos").textContent = "desejos (30%): R$" + desejos.toFixed(2)
}

