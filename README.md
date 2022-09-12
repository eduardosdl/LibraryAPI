## Documentação API

### Rotas Para Usuário
- ### Rota para criação de usuário
   ```
      Método POST - [url]/user/new
   ```
   - #### Corpo que deve ser enviado
   ```
      {
         "name": "[nome do usuário]",
         "email": "[email do usuário]",
         "password": "[senha de acesso]",
         "confirmPassword": "[confirmação de senha]"
      }
   ```
   - #### Informações que constaram na resposta
   ```
      {
         "msg": "Usuário criado e logado com sucesso",
         "data": {
            "id": "[id do usuário]",
            "name": [nome do usuário]",
            "email": "[email do usuário]"
         },
         "token": "[json web token]"
      }
   ```
<<<<<<< HEAD
- ### Rota para criação de usuário
   ```
      Método GET - [url]/user/new
   ```
   - #### Informações que devem ser enviadas
   ```
      Deve conter o login e a senha do usuário,
      codificados com Base64  enviado através do header
   ```
   - #### Informações que constaram na resposta
   ```
      {
         "msg": "Usuário criado e logado com sucesso",
         "data": {
            "id": "[id do usuário]",
            "name": [nome do usuário]",
            "email": "[email do usuário]"
         },
         "token": "[json web token]"
      }
   ```
=======
>>>>>>> d9d1e8fd0fc349bd8a342912c8a88a7f47449328
