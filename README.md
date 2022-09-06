## Documentação API

### Rotas Para Usuário
 - #### rota para criação de usuário
    ```
    Método POST - [url]/user/new
    ```
    - #### corpo que deve ser enviado
    ```
    {
     "name": "[nome do usuário]",
     "email": "[email do usuário]",
     "password": "[senha de acesso]",
     "confirmPassword": "[confirmação de senha]"
    }
    ```
    - #### resposta
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
    
 
