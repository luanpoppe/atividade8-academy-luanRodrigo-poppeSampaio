# language: pt

Funcionalidade: Validação ao logar usuários

Contexto: Acessar página de registro
    Dado que acessei a página de login

Cenário: Informações da página de login devem estar condizentes
    Quando olho as informações da página
    Então a página deve conter informações sobre o login de usuários

@usuarioCriado
Cenário: Usuário deve conseguir logar
    E possuo dados de login de um usuário
    Quando tento realizar o login
    Então o login deve ser realizado com sucesso

# region: Cenários de Falha 

Cenário: Não deve ser possível logar sem preencher os campos obrigatórios
    Quando tento realizar o login sem preencher os campos obrigatórios
    Então deve aparecer mensagem informando que não foi possível realizar login

Cenário: Não deve ser possível logar sem passar o valor de email
    Quando tento realizar o login sem passar um valor de email
    Então deve aparecer mensagem informando que o email é obrigatório "Informe o e-mail"

Cenário: Não deve ser possível logar sem passar o valor de senha
    Quando tento realizar o login sem passar um valor de senha
    Então deve aparecer mensagem informando que a senha é obrigatório "Informe a senha"

Cenário: Não deve ser possível logar com um email errado
    Quando tento realizar o login passando um valor de senha errado
    Então deve aparecer mensagem informando falha ao autenticar

Cenário: Não deve ser possível logar com uma senha errado
    Quando tento realizar o login passando uma senha incorreta
    Então deve aparecer mensagem informando falha ao autenticar

Cenário: Usuário deve conseguir fechar mensagem de falha no login ao clicar no botão disponível
    E que tentei realizar o login com dados incorretos
    Quando tento fechar a mensagem clicando no botão disponível
    Então a mensagem deve ser fechada

Cenário: Usuário deve conseguir fechar mensagem de falha no login ao clicar fora da mensagem
    E que tentei realizar o login com dados incorretos
    Quando tento fechar a mensagem clicando fora da mensagem
    Então a mensagem deve ser fechada


# Cenários não mais necessários:

# @usuarioCriado
# Cenário: Usuário deve conseguir logar mesmo sem diferenciar as letras minúsculas e maiúsculas do email criado
#     Dado que criei um usuário com um email todo em caps lock
#     Quando tento logar com o mesmo email mas todo com letras minúscuals
#     Então o login deve ser realizado com sucesso