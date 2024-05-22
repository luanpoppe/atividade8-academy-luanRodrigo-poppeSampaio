# language: pt

Funcionalidade: Validação ao criar usuários

Contexto: Acessar página de registro
    Dado que acessei a página de cadastrar usuário


Cenário: Informações da página de cadastro devem estar condizentes
    Quando olho as informações da página
    Então a página deve conter informações sobre o cadastro de usuários

@userCreated
Cenário: Usuário deve poder criar conta com sucesso
    Quando preencho os campos obrigatórios com valores válidos
    E tento realizar o cadastro
    Então deve aparecer uma mensagem de sucesso

@userCreated 
Cenário: Usuário criado deve ser do tipo comum
    Quando crio um usuário
    Então o seu tipo deve ser comum

@userCreated
Cenário: Novos usuários devem ter sua conta ativa
    Quando crio um usuário
    Então sua conta conta deve estar ativa

@userCreated 
Cenário: Usuário deve conseguir fechar mensagem de cadastro de sucesso ao clicar no botão
    Quando crio um usuário
    E tento fechar a mensagem clicando no botão disponível
    Então a mensagem deve ser fechada

@userCreated 
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
@userCreated 
Esquema do Cenário: Deve ser possível cadastrar usuários com qualquer valor de nome
    Quando tento cadastrar com qualquer valor de nome "<nome>"
    Então deve aparecer uma mensagem de sucesso
    Exemplos:
        | nome  |
        | a     |
        | a123  |
        | a$%   |
        | A     |

@userCreated 
Cenário: Deve ser possível cadastrar usuário passando senha com 6 caracteres
    Quando tento criar um usuário passando uma senha de 6 dígitos
    Então deve aparecer uma mensagem de sucesso

@userCreated 
Cenário: Deve ser possível cadastrar usuário passando senha com 12 caracteres
    Quando tento criar um usuário passando uma senha de 12 dígitos
    Então deve aparecer uma mensagem de sucesso

# region: CENÁRIOS DE FALHA:

Cenário: Não deve ser possível criar usuário sem preencher nenhum dos campos obrigatórios
    Quando tento criar um usuário sem preencher nenhum dos campos obrigatórios
    Então deve aparecer as mensagens referentes aos campos obrigatórios

Cenário: Não deve ser possível criar usuário sem preencher o campo usuário
    Quando tento criar usuário sem passar um nome
    Então deve aparecer um aviso informando que o nome é obrigatório

Cenário: Não deve ser possível criar usuário sem preencher o campo email
    Quando tento criar usuário sem passar um email
    Então deve aparecer um aviso informando que o email é obrigatório

Cenário: Não deve ser possível criar usuário sem preencher o campo senha
    Quando tento criar usuário sem passar uma senha
    Então deve aparecer um aviso informando que a senha é obrigatória

Cenário: Não deve ser possível criar usuário sem preencher o campo de repetir senha
    Quando tento criar usuário sem repetir a senha
    Então deve aparecer um aviso informando que é obrigatório repetir a senha

Cenário: Não deve ser possível se cadastrar com um email já utilizado por outro usuário
    E que sei o email de um usuário já cadastrado
    Quando tento criar novo usuário com o mesmo email
    Então deve aparecer uma mensagem informando não ser possível realizar a operação

Cenário: Usuário deve conseguir fechar mensagem de email já utilizado ao clicar no botão
    Quando tento criar um usuário com um email já utilizado por outro usuário
    E tento fechar a mensagem clicando no botão disponível
    Então a mensagem deve ser fechada

Cenário: Usuário deve conseguir fechar mensagem de cadastro de sucesso ao clicar fora da mensagem
    Quando tento criar um usuário com um email já utilizado por outro usuário
    E tento fechar a mensagem clicando fora da mensagem
    Então a mensagem deve ser fechada

Cenário: Não deve cadastrar usuário ao confirmar senha com uma senha diferente
    Quando tento cadastrar com a senha de confirmação diferente da senha escolhida
    Então deve aparecer uma mensagem de erro no cadastro "A senha deve ter no máximo 12 dígitos."

Esquema do Cenário: Não deve cadastrar usuário ao passar email com formato inválido
    Quando tento criar um usuário com um email inválido "<email>"
    Então deve aparecer uma mensagem informando falha no cadastro
    Exemplos:
        | email            | 
        | valoremail       | 
        | valoremail@      | 
        | valoremail@gmail | 
        | @gmail | 
        | @gmail.com | 

Cenário: Não deve cadastrar usuário ao passar uma senha muito curta
    Quando tento cadastrar usuário com uma senha muito curta
    Então deve aparecer mensagem informando o erro "A senha deve ter pelo menos 6 dígitos"

Cenário: Não deve cadastrar usuário ao passar uma senha muito longa
    Quando tento cadastrar com uma senha muito longa
    Então deve aparecer mensagem informando o erro "A senha deve ter no máximo 12 dígitos."

# Cenário: Não deve cadastrar um usuário quando já existe outro usuário com o mesmo email porém com letras em caps lock
#     E que sei o email de um usuário cadastrado todo em caps lock
#     Quando tento criar novo usuário com o mesmo email porém todo com letras minúsculas
#     Então deve aparecer uma mensagem informando não ser possível realizar a operação