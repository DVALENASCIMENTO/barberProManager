![image](https://github.com/user-attachments/assets/db985886-bf42-40cd-96e3-56f09acb283d)

# BarberPro Manager

https://dvalenascimento.github.io/barberProManager/

Bem-vindo ao sistema da BarberPro Manager, um gerenciador de clientes e histórico de cortes que simplifica o dia a dia da sua barbearia. Este projeto foi desenvolvido com foco em usabilidade, produtividade e eficácia no gerenciamento de dados dos clientes.

## Descrição do Projeto
O sistema da BarberPro Manager é uma aplicação web responsiva que permite:

- **Cadastrar e gerenciar clientes** com dados como nome, telefone, aniversário e histórico de cortes.
- **Exibir histórico de cortes** e oferecer descontos automáticos após 5 cortes realizados.
- **Gerar recibos em PDF** com as informações do cliente e da barbearia.
- **Realizar backup e restauração** dos dados dos clientes em formato JSON.

## Estrutura do Projeto
O projeto está organizado da seguinte forma:

```
/barbearia-santos
├── index.html          # Arquivo principal da interface
├── css/
│   └── styles.css      # Arquivo de estilos
├── js/
│   ├── script.js       # Lógica principal do sistema
│   └── backup.js       # Funções de backup e restauração
├── data/
│   └── clientes.json   # Exemplo de dados de clientes
└── README.md           # Documentação do projeto
```

## Tecnologias Utilizadas
- **HTML5**: Estrutura e conteúdo da página.
- **CSS3**: Estilização responsiva e atraente.
- **JavaScript**: Lógica do sistema e manipulação de dados.
- **IndexedDB**: Banco de dados local para armazenamento de informações dos clientes.
- **jsPDF**: Biblioteca para gerar recibos em PDF.

## Funcionalidades Principais

1. **Cadastro e Atualização de Clientes**
   - Busca automática pelo telefone.
   - Possibilidade de editar nome e data de aniversário.

2. **Histórico de Cortes**
   - Exibição do histórico completo de cortes do cliente.
   - Informação sobre descontos automáticos após 5 cortes realizados.

3. **Mensagens Personalizadas**
   - Gera mensagens de desconto para compartilhar com os clientes.

4. **Backup e Restauração de Dados**
   - Exporta dados dos clientes em formato JSON.
   - Permite importar um arquivo JSON para restaurar o banco de dados.

5. **Geração de Recibos**
   - Cria um recibo em PDF com as informações do cliente e detalhes do serviço.

## Como Executar o Projeto
1. **Baixe ou clone o repositório.**
   ```bash
   git clone https://github.com/seu-usuario/barbearia-santos.git
   ```

2. **Abra o arquivo `index.html` em qualquer navegador moderno.**

## Como Fazer Backup e Restauração

### Backup:
- Clique no botão **Exportar Backup**.
- Um arquivo `clientes.json` será baixado automaticamente.

### Restauração:
- Clique no botão **Importar Backup**.
- Selecione o arquivo JSON contendo os dados dos clientes.

## Exemplo de Arquivo JSON para Restauração
```json
[
    {
        "telefone": "123456789",
        "nome": "João Silva",
        "aniversario": "1985-04-10",
        "historico": [
            "2024-01-15",
            "2024-02-20",
            "2024-03-25",
            "2024-04-10",
            "2024-05-05"
        ]
    }
]
```

## Requisitos do Sistema
- Navegador moderno com suporte a IndexedDB e JavaScript (Chrome, Firefox, Edge).

## Contribuições
Sinta-se à vontade para contribuir com o projeto. Para isso:

1. Realize um fork do repositório.
2. Crie um branch para sua nova funcionalidade.
3. Envie um Pull Request.

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

---
**Desenvolvido por Diego Vale do Nascimento.**

