let db;

// Inicializar o banco de dados IndexedDB
function iniciarDB() {
    const request = indexedDB.open('BarbeariaSantosDB', 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        const objectStore = db.createObjectStore('clientes', { keyPath: 'telefone' });
        objectStore.createIndex('nome', 'nome', { unique: false });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
    };

    request.onerror = function () {
        console.error('Erro ao abrir o banco de dados.');
    };
}

// Buscar cliente pelo telefone
function buscarCliente(telefone) {
    const transaction = db.transaction(['clientes'], 'readonly');
    const objectStore = transaction.objectStore('clientes');
    const request = objectStore.get(telefone);

    request.onsuccess = function () {
        const cliente = request.result;
        if (cliente) {
            preencherFormulario(cliente);
            exibirHistorico(cliente);
        } else {
            limparFormulario(); // Permitir que novos dados sejam inseridos
        }
    };
}

// Adicionar ou atualizar cliente
function adicionarOuAtualizarCliente(cliente) {
    const transaction = db.transaction(['clientes'], 'readwrite');
    const objectStore = transaction.objectStore('clientes');
    objectStore.put(cliente);

    transaction.oncomplete = function () {
        alert('Cliente salvo com sucesso!');
    };

    transaction.onerror = function () {
        console.error('Erro ao salvar cliente.');
    };
}

// Preencher o formulário com os dados do cliente
function preencherFormulario(cliente) {
    document.getElementById('nome').value = cliente.nome;
    document.getElementById('aniversario').value = cliente.aniversario;

    // Habilitar os campos para edição
    document.getElementById('nome').disabled = false;
    document.getElementById('aniversario').disabled = false;
}

// Limpar o formulário
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('aniversario').value = '';
    document.getElementById('listaHistorico').innerHTML = '';
    document.getElementById('mensagemDesconto').innerText = '';
    document.getElementById('mensagemTexto').value = '';

    // Habilitar os campos para entrada de dados
    document.getElementById('nome').disabled = false;
    document.getElementById('aniversario').disabled = false;
}

// Exibir o histórico de cortes
function exibirHistorico(cliente) {
    const listaHistorico = document.getElementById('listaHistorico');
    listaHistorico.innerHTML = '';

    cliente.historico.forEach((data, index) => {
        const li = document.createElement('li');
        li.textContent = `Corte ${index + 1}: ${data}`;
        listaHistorico.appendChild(li);
    });

    // Verificar se o cliente tem direito a desconto
    if (cliente.historico.length === 5) {
        const mensagem = `Parabéns ${cliente.nome}! Você completou 5 cortes e ganhou 50% de desconto no próximo corte!`;
        document.getElementById('mensagemDesconto').innerText = mensagem;
        document.getElementById('mensagemTexto').value = mensagem;
    } else {
        document.getElementById('mensagemDesconto').innerText = '';
        document.getElementById('mensagemTexto').value = '';
    }
}

// Evento de busca pelo telefone
document.getElementById('telefone').addEventListener('input', function () {
    const telefone = this.value;
    if (telefone) {
        buscarCliente(telefone);
    }
});

// Evento para adicionar ou atualizar cliente
document.getElementById('clienteForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const telefone = document.getElementById('telefone').value;
    const nome = document.getElementById('nome').value || 'Cliente Anônimo';
    const aniversario = document.getElementById('aniversario').value || '';
    const dataCorte = document.getElementById('dataCorte').value;

    const cliente = {
        telefone,
        nome,
        aniversario,
        historico: [],
    };

    const transaction = db.transaction(['clientes'], 'readonly');
    const objectStore = transaction.objectStore('clientes');
    const request = objectStore.get(telefone);

    request.onsuccess = function () {
        const existente = request.result;
        if (existente) {
            cliente.historico = existente.historico;
        }
        cliente.historico.push(dataCorte);
        adicionarOuAtualizarCliente(cliente);
    };
});

// Copiar mensagem para o cliente
document.getElementById('copiarMensagem').addEventListener('click', function () {
    const mensagem = document.getElementById('mensagemTexto');
    mensagem.select();
    document.execCommand('copy');
    alert('Mensagem copiada!');
});

// Função para exportar dados para JSON
document.getElementById('exportarBackup').addEventListener('click', function () {
    const transaction = db.transaction(['clientes'], 'readonly');
    const objectStore = transaction.objectStore('clientes');
    const request = objectStore.getAll();

    request.onsuccess = function () {
        const clientes = request.result;
        const blob = new Blob([JSON.stringify(clientes)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'clientes_backup.json';
        link.click();
    };
});

// Função para restaurar dados do JSON
document.getElementById('restaurarBackup').addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function (e) {
            const data = JSON.parse(e.target.result);
            data.forEach(cliente => {
                adicionarOuAtualizarCliente(cliente);
            });
            alert('Dados restaurados com sucesso!');
        };
        
        reader.readAsText(file);
    });

    input.click();
});

// Inicializar o banco de dados
iniciarDB();
