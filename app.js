let despesas = []
let salario = 0.0
let poupanca = 0.0

function atualizarTabelaDespesas(){
    let totalDespesas = despesas.reduce((total, despesas => total + despesas.value, 0))
    document.getElementById("totalDespesas").textContent = "Total de despesas: R$" + totalDespesas.toFixed(2)

    let necessidades = salario * 0.5
    document.getElementById("necessidades").textContent = "Necessidades (50%): R$" + necessidades.toFixed(2)

    let desejos = salario * 0.3
    document.getElementById("desejos").textContent = "desejos (30%): R$" + desejos.toFixed(2)
}

