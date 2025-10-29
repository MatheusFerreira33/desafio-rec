# Desafio Node.js

## Requisitos:
- Usar GRAPHQL.
- Validar os dados de entrada.
- Implementar JWT stateless.
- Usar persistência de dados.
- Usar um linter (Eslint, Jshiint).
- Utilizar Docker para subir o backend.
- Deployar API na nuvem (heroku, next, aws, google cloud, etc).
- Publicar o código-fonte em um repositório na internet (Bitbucket ou Github).
- ORM - Prisma.
- Primordial - CODEGEN.

## Desejado:
 - Testes de unidade da API.
 - Teste E2E.
 - Criptografia irreversível (hash) para senha e token.

## Linguagens Desejadas:
 - BACKEND: Docker, NEST, TypeScript, JWT, GRAPHQL.
 - WEB: React, Nextjs, TypeScript, Tailwind e Codegen.
 - APP: React Native, Expo, TypeScript, Tailwind e Codegen.

## FIGMA:
 - WEB/APP: Para criação do login seguir o FIGMA abaixo.
 - https://www.figma.com/design/4KNi283SAEivoLkJ7S1NVH/Untitled?node-id=0-1&t=5uMaGmxGrNIv0BpR-1
 - Tela de criação de usuário, seguir a proposta de layout do FIGMA de Login.
 - Tela pós login, ter uma opção de listagem e pesquisa de usuários criados, com um botão de logout, seguindo a identidade visual proposta pelo FIGMA.

## Registro de usuário (Sign up)

Este endpoint deve receber um objeto com o seguinte modelo:

```
{
 "name": "string",
 "email": "string",
 "password": "string",
 "telephones": [
   {
     "number": "number",
     "area_code": "number"
   }
 ]
}
```

Em caso de êxito retorna o status 200:

```
{
 "id": "string",
 "created_at": "date"
 "modified_at": "date"
 
}
```

Em caso de erro, retorna o código de status e a mensagem de erro correspondente.

# Login de usuários (Sign in)
Este endpoint deve receber um objeto com `email` e `password`
Caso o e-mail exista e a senha seja igual a persistida, deve retornar um token JWT que deve ser incluído no payload: `email`, `id`.
Em caso de login inválido, deve retornar 401 e uma mensagem de erro apropriada.

# Buscar usuário
Este endpoint deve receber um header:

```
Header
Authorization: Bearer <token>
```

Onde `token` é o retornado no endpoint de login.
Em caso de token inválido deve retornar 401 e uma mensagem de erro apropriada.
Em caso de êxito retorna `email`, `id`, `telephones`, `created_at`, `modified_at`

## APLICATIVO
Criar um aplicativo em ReactNative que realize a operação de login e na home traga os dados de usuário igual a um cartão de identificação (Utilize estilização da sua imaginação), ter a opção de listar usuários criados e buscar pelo nome do usuário.


## Boa sorte!
