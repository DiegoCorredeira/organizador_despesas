let despesas = []
let salario = 0.0
let poupanca = 0.0


/*
- Adicionar sistema de login com PHP para cada usuário ter seus gastos separados e salvos
*/
function adicionarDespesa(){
    let despesaInput = document.getElementById('nomeDespesa')
    let valorDespesaInput = document.getElementById('valorDespesa')
    let nomeDespesa = despesaInput.value.trim()
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
    atualizarValorTotal()
    atualizarTabelaDespesas()
    atualizarPoupanca()

}



function atualizarValorTotal(){
    let totalDespesas = despesas.reduce((total, despesas) => total + despesas.valor, 0)
    document.getElementById("totalDespesas").textContent = "Total de despesas: R$" + totalDespesas.toFixed(2)

    let necessidades = salario * 0.5
    document.getElementById("necessidades").textContent = "Necessidades (50%): R$" + necessidades.toFixed(2)

    let desejos = salario * 0.3
    document.getElementById("desejos").textContent = "desejos (30%): R$" + desejos.toFixed(2)
}

function definirSalario(){
    let salarioInput = document.getElementById("salario")
    let valorSalario = parseFloat(salarioInput.value)

    if (isNaN(valorSalario) || valorSalario <= 0){
        alert("Informe um valor válido para o salário")
        return
    }
    salario = valorSalario
    salarioInput.value = ""
    atualizarValorTotal()
    atualizarPoupanca() 
}



function atualizarTabelaDespesas(){
    let tabelaDespesas = document.getElementById("corpoTabelaDespesas")
    tabelaDespesas.innerHTML = ""

    despesas.forEach((despesa, index) => {
        let linha = document.createElement("tr")

        let colunaNome = document.createElement("td")
        colunaNome.textContent = despesa.nome

        let colunaValor = document.createElement("td")
        colunaValor.textContent = "R$" + despesa.valor.toFixed(2)

        let colunaAcoes = document.createElement("td")

        let btnRemover =  document.createElement("button")
        btnRemover.textContent = "Remover"
        btnRemover.classList.add("btn-remover")
        btnRemover.onclick = function(){
            removerDespesa(index)
        }

        let btnEditar =  document.createElement("button")
        btnEditar.textContent = "Editar"
        btnEditar.classList.add("btn-editar")
        btnEditar.onclick = function(){
            editarDespesa(index)
        }


        colunaAcoes.appendChild(btnRemover)
        colunaAcoes.appendChild(btnEditar)
        linha.appendChild(colunaNome)
        linha.appendChild(colunaValor)
        linha.appendChild(colunaAcoes)

        tabelaDespesas.appendChild(linha)

    })

}

function removerDespesa(index) {
    despesas.splice(index, 1)
    atualizarValorTotal()
    atualizarTabelaDespesas()
    atualizarPoupanca()
}

function atualizarPoupanca(){
    let totalDespesas = despesas.reduce((total, despesas) => total + despesas.valor, 0)
    poupanca = salario * 0.2 - totalDespesas
    document.getElementById("poupanca").textContent = "Poupança (20%)" + poupanca.toFixed(2)
}

function editarDespesa(index) {
    indiceDespesa = index
    let despesa = despesas[index]


    let despesaInput = document.getElementById("nomeDespesa")
    let valorDespesaInput = document.getElementById("valorDespesa")
    despesaInput.value = despesa.nome
    valorDespesaInput.value = despesa.valor

    let btnAdicionar = document.getElementById("btnAdicionar")
    btnAdicionar.textContent = 'Salvar'

    btnAdicionar.removeEventListener("click", adicionarDespesa)

    btnAdicionar.addEventListener("click", function () {
        salvarDespesa(index)
    })
}

function salvarDespesa(index) {
    let despesaInput = document.getElementById("nomeDespesa")
    let valorDespesaInput = document.getElementById("valorDespesa")
    let nomeDespesa = despesaInput.value.trim()
    let valorDespesa = parseFloat(valorDespesaInput.value)
    
    if (nomeDespesa === "" || isNaN(valorDespesa) || valorDespesa <= 0) {
        alert('Informe um nome e um valor válidos para a despesa')
        return
    }
    
    despesas[index].nome = nomeDespesa
    despesas[index].valor = valorDespesa

    despesaInput.value = ''
    valorDespesaInput.value = ''
    btnAdicionar.textContent = 'Adicionar'

    btnAdicionar.removeEventListener("click", salvarDespesa)
    btnAdicionar.addEventListener("click", adicionarDespesa)


    atualizarTabelaDespesas()
    atualizarValorTotal()
    atualizarPoupanca() 



 }
