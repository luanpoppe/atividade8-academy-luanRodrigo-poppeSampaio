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

# @userCreated
# Cenário: Usuário deve conseguir fechar mensagem informando a criação de nova conta com sucesso
#     Quando crio um usuário
#     E e tento fechar a mensagem clicando no botão disponível
#     Então deve a mensagem deve ser fechada

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

Cenário: Não deve ser possível se cadastrar com um email já utilizado por outro usuário
    E que sei o email de um usuário já cadastrado
    Quando tento criar novo usuário com o mesmo email
    Então deve aparecer uma mensagem informando não ser possível realizar a operação