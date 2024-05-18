# language: pt

Funcionalidade: Validação ao criar usuários

Contexto: Acessar página de registro
    Dado que acessei a página de cadastrar usuário

@userCreated @ignore
Cenário: Usuário deve poder criar conta com sucesso
    Quando preencho os campos obrigatórios com valores válidos
    E tento realizar o cadastro
    Então deve aparecer uma mensagem de sucesso

@userCreated @ignore
Cenário: Usuário criado deve ser do tipo comum
    Quando crio um usuário
    Então o seu tipo deve ser comum

@userCreated @ignore
Cenário: Usuário deve conseguir fechar mensagem de cadastro de sucesso ao clicar no botão
    Quando crio um usuário
    E tento fechar a mensagem clicando no botão disponível
    Então a mensagem deve ser fechada

@userCreated @ignore
Cenário: Usuário deve conseguir fechar mensagem de cadastro de sucesso ao clicar fora da mensagem
    Quando crio um usuário
    E tento fechar a mensagem clicando fora da mensagem
    Então a mensagem deve ser fechada

@userCreated
Cenário: Após criar usuário, ele deve ser logado automaticamente
    Quando crio um usuário
    Então deve ser realizado o login automaticamente do usuário criado

@userCreated
Cenário: Após criar usuário, as opções de navegação devem mudar para condizer com o usuário logado
    Quando crio um usuário
    Então as opções de navegação devem mudar para condizer com o usuário logado

# CENÁRIOS DE FALHA:
@ignore
Cenário: Não deve ser possível criar usuário sem preencher o campo usuário
    Quando tento criar usuário sem passar um nome
    Então deve aparecer um aviso informando que o nome é obrigatório

@ignore
Cenário: Não deve ser possível criar usuário sem preencher o campo email
    Quando tento criar usuário sem passar um email
    Então deve aparecer um aviso informando que o email é obrigatório
@ignore
Cenário: Não deve ser possível criar usuário sem preencher o campo senha
    Quando tento criar usuário sem passar uma senha
    Então deve aparecer um aviso informando que a senha é obrigatória
@ignore
Cenário: Não deve ser possível criar usuário sem preencher o campo de repetir senha
    Quando tento criar usuário sem repetir a senha
    Então deve aparecer um aviso informando que é obrigatório repetir a senha
@ignore
Cenário: Não deve ser possível se cadastrar com um email já utilizado por outro usuário
    E que sei o email de um usuário já cadastrado
    Quando tento criar novo usuário com o mesmo email
    Então deve aparecer uma mensagem informando não ser possível realizar a operação
@ignore
Cenário: Usuário deve conseguir fechar mensagem de email já utilizado ao clicar no botão
    Quando tento criar um usuário com um email já utilizado por outro usuário
    E tento fechar a mensagem clicando no botão disponível
    Então a mensagem deve ser fechada
@ignore
Cenário: Usuário deve conseguir fechar mensagem de cadastro de sucesso ao clicar fora da mensagem
    Quando tento criar um usuário com um email já utilizado por outro usuário
    E tento fechar a mensagem clicando fora da mensagem
    Então a mensagem deve ser fechada
@ignore
Cenário: Não deve cadastrar usuário confirmar senha com uma senha diferente
    Quando tento cadastrar com a senha de confirmação diferente da senha escolhida
    Então deve aparecer uma mensagem de erro no cadastro "As senhas devem ser iguais."
@ignore
Cenário: Não deve cadastrar usuário ao passar email com formato inválido
    Quando tento criar um usuário com um email inválido "<email>"
    Então deve aparecer uma mensagem de abaixo do campo email
    Exemplos:
        | email            | 
        | valoremail       | 
        | valoremail@      | 
        | valoremail@gmail | 