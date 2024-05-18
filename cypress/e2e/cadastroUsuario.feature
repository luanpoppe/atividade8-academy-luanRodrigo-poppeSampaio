# language: pt

Funcionalidade: Validação ao criar usuários

Cenário: Usuário deve criar conta com sucesso
    Dado que acessei a página de cadastrar usuário
    Quando preencho os campos obrigatórios com valores válidos
    E tento realizar o cadastro
    Então deve aparecer uma mensagem de sucesso