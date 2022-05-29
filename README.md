![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

# Natours - Aplicação com RESTful API e Server-Side Rendering

**Natours é um site que tem as seguintes regras de negócio:**

- Permitir ao usuário visualizar um Overview de todos os produtos disponíveis.
- Permitir visualizar um produto contendo:

```
        1. Titulo
        2. Local
        3. Imagens
        4. Guias
        5. Fatos – Dificuldade, número de participantes, nota do público sobre o produto, data de início.
        6. Resumo
        7. Visualização de um mapa em tempo real
        8. Reviews
```

- Permitir ao usuário fazer compra do produto.

**Da parte do usuário teremos:**

- Permitir fazer Login in e Log out.
- Redefinir Nome e E-mail.
- Redefinir foto.
- Redefinir senha.
- Visualizar produtos comprados.

## **Arquitetura MVC**

Antes da falar da API em si, temos que analisar a estrutura desse projeto.

Foi utilizado arquitetura MVC – Model, View, Control. Podemos delegar pastas em Application Logic e Business Logic.

Por exemplos, temos as pastas:

- **Controllers** – onde podemos manipular models, lidar com requisições e respostas.
- **Views** – onde podemos usar Template Engines. Nesse projeto, foi utilizado PUG.
- **Models** – onde estão os Schemas sobre – Tour, Review, Booking, User – fazendo a ligação com Mongoose e criando uma coleção com MongoDB.

No final teremos:

- Usuário faz uma requisição, o Controller processa essa requisição e usa o Model.
- Model faz conexão com Banco de Dados (MongoDB) e reuni as informações necessários sobre a requisição.
- Controller envia informações para o View.
- View processa essa requisição de modo que o usuário possa visualizar com HTML, CSS, Javascript.

## **API**

Utilizando algumas features de RESTful API. Isso quer dizer que a maioria da arquitetura é feita por requisições e respostas via HTTP. Levando em consideração que:

- Foi utilizado **Uniform Interface** – As requisições são feitas via método HTTP. Dessa forma, cada requisição possui o mesmo padrão. Não dizemos, por exemplo, o que uma rota faz por seu endpoint. Porém, quebramos essa regra em alguns casos.
- Foi utilizado **Statelessness** – por exemplo, quando usuário faz login, os dados sobre essa sessão são guardados via cookie e não em alguma parte do servidor.
- Foi utilizado **Client-server Decoupling** – O cliente recebera apenas o URL e também não poderá interagir com o servidor.

Além disso, podemos fazer:

- CRUD – Create, Read, Update, Delete.
- Sort, Pagination, Filter e limitação de campos.
- Autorização - usuários podem ser – administradores, guias e usuário(padrão). Cada um tem um nível de poder e limitações.
- Produção de erros – em modo produção ou desenvolvimento. Por exemplo, cliente final não terá acesso ao stack do erro.
- Tokens – JSON Web Token.

## **Multer**

Usamos esse middleware para que o usuário possa redefinir sua foto. Quando o usuário cria uma conta no Natours, caso ele não faça upload de nenhuma foto, ele recebera um avatar padrão.

Funciona dessa forma:

- Verificamos se o arquivo é uma imagem (PNG, JPEG, etc.).

- No momento que usuário chega no endpoint e fazer o upload da foto, Multer guardará a imagem na memória (buffer).
- Antes dela ser salva no banco de dados, ela passará por outro middleware, o Sharp. Por exemplo, queremos que a imagem fique sempre na resolução 500x500 pixels.
- Depois dela passar por esses dois middlewares, só então será salva no banco de dados.

## **Mapbox**

Para o usuário visualizar a localização de cada Tour, foi utilizado a biblioteca Mapbox. O modo como essa parte da aplicação funciona é dessa maneira:

![image](https://user-images.githubusercontent.com/91689754/170886335-c8b0a177-d589-4439-ad29-cff6075accf8.png)

- Cada documento no MongoDB possui um campo chamado de **startLocation**.
- Nesse campo temos uma propriedade chamada de **coordinates** - uma Array que contem latitude e longitude.
- Passamos essas informações para a biblioteca que o Mapbox fornece.
- O resto é apenas manipulação de DOM.

## **Stripe**

Último recurso disponível na página de cada Tour. Usuário poderá fazer Booking comprando o produto usando Stripe.

![image](https://user-images.githubusercontent.com/91689754/170886187-4eb56bd2-4dee-47a4-8339-b6216b010556.png)

Funciona dessa forma:

- Quando o usuário clicar em &#39;Book Tour Now!&#39;, ele será direcionado para um pagina chamada de Checkout Session. Essa parte é feita no Backend.
- Checkout Session é uma página criada exclusivamente pelo Stripe e não temos como manipular. Isso quer dizer que nem podemos ver o cartão de credito do usuário usado.
- A única coisa que podemos fazer é personalizar esse Checkout Session com cores e logo do site. Essa parte é feita no Frontend.
- Quando a compra for concluída, o usuário será redirecionado para pagina de Bookings onde recebera um aviso, dizendo que a requisição foi concluída com sucesso.

No dashboard do Stripe, teremos:

![image](https://user-images.githubusercontent.com/91689754/170886137-a0af6d24-91f3-4890-99e9-08fca0595480.png)


## **Mailtrap e SendGrid -** Envio de Boas Vindas/ Redefinir Senha por E-mail

Em modo de desenvolvimento (em outras palavras, quando ainda não estamos com a build final), quando usuário faz cadastro no Natours, um e-mail é enviado tanto para o Maitrap com um Template HTML de boas-vindas quanto para o SendGrid que irá redirecionar para o usuário final.

![image](https://user-images.githubusercontent.com/91689754/170885877-f892d2e6-7eb7-473a-83db-fed5552c59e2.png)

## **Login e Autenticação**

Em ordem de verificar a autenticidade do usuário, foi utilizado o seguinte método:

1. Verificar se o usuário existe no banco de dados.
2. Verificar se a senha digita é a mesma presente no banco de dados. Para isso, a senha digitada pelo usuário passa pelo **Bcrypt** e então a comparação é feita com o método **compare**.
3. Se tudo ocorrer bem, usuário é logado e um cookie é enviado para o navegador no formato de **JSON Web Tokens** com data de expiração.

## **Questões de Segurança**

Foram utilizadas vários middlewares para esse projeto no que diz respeito a segurança. Por exemplo, contra NoSQL Query Injection, foi utilizado Express Mongo Sanitize. E para HTTPS, foi utilizado Helmet.

Isso não quer dizer aplicação está segura, porem retarda alguns ataques.

Além disso, foi levado em consideração algumas regras:

- Senhas de usuários só poderão ser armazenadas no banco de dados se forem encriptadas. Por exemplo, usando Bcrypt.
- Cookies são criptografados assim como Tokens de redefinir senha.
- Usuários são poderão acessar certos conteúdos do site se estiverem logados utilizando Bearer Authentication.
- IPs podem fazer no máximo 100 requisições.
- Foi implementado validações com Mongoose.

Um exemplo do documento usando método GET:

```js
  {
    "_id": "5c8a1d5b0190b214360dc057",
    "name": "Jonas Schmedtmann",
    "email": "admin@natours.io",
    "role": "admin",
    "active": true,
    "photo": "user-1.jpg",
    "password": "$2a$12$Q0grHjH9PXc6SxivC8m12.2mZJ9BbKcgFpwSG4Y1ZEII8HJVzWeyS"
  },
```

## **Mongoose e Modelo de Documento**

Algumas features que foram utilizadas:

- Document Middleware
- Schemas
- Schema Types
- Query Middleware
- Aggregate Middleware
- Populate
- Validation
- Virtual Properties
- Virtual Populate
- Instance Methods

Em ordem de fazer essa aplicação funcionar, temos que levar em conta um ponto:

Por exemplo, um Tour pode ter uma quantidade enorme de Reviews. Isso quer dizer que, quando o usuário fazer a requisição desse Tour, estamos trazendo não só informações sobre o Tour, como também informações sobre o Reviews, trazendo um trafico maior de informações.

Dessa forma, não colocamos o Reviews diretamente no documento do Tour. Em vez disso, fazemos apenas uma Referência. Quando o usuário fazer requisição desse Tour, o método Populate do Mongoose automaticamente preencherá essa lacuna com as informações necessárias.

Em outras palavras, estamos determinando os espaços de Tour e Reviews. Não queremos que o Review apareça em todo endpoint, poluindo informações mais relevantes naquele momento.
