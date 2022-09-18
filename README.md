<div align="center">
  <img src=".github/logo.svg" alt="logo">
</div>

# Sobre o projeto

Essa será uma aplicação onde o principal objetivo criar Upload de imagens

- Infinite Queries e Mutations com React Query;
- Envio de formulário com React Hook Form;
- Exibição de Modal e Toast com Chakra UI;
- Entre outros.

## Components

<br/>

### CardList

<img src=".github/Home.png" alt="pagina home">
No useInfiniteQuery foi montar duas seções principais:

1. Uma função que recebe como parâmetro um objeto que contêm a propriedade `pageParam` (caso o parâmetro não exista, utilize como `default` o valor `null`). Esse parâmetro é utilizado no momento da requisição para chamarmos uma próxima página.
   Já no corpo da função, deve realizar uma requisição GET para a rota `/api/images` da API do Next.js informando como um `query param` de nome `after` o valor do `pageParam` e retornar os dados recebidos.
2. Uma função chamada `getNextPageParam` que recebe como parâmetro o resultado da última requisição. Se o valor `after` retornado na última requisição existir, então você deve retornar esse valor, caso contrário retorne `null`.

Outro passo importante a se fazer é formatar os dados recebidos do React Query da forma que a aplicação espera. Portanto, no `formattedData` é preciso utilizar o `map` e o `flat` para que transforme o `data` (um objeto com mais informações do que o seu `CardList.tsx` precisa) em um array de objetos apenas com as informações necessárias.

`useInfiniteQuery`, dê uma olhada [nesse trecho da doc oficial](https://react-query.tanstack.com/guides/infinite-queries)

### AddImage

<img src=".github/Form.png" alt="modal para add mais imagem">

Nesse componet, tem quatro etapas principais que foi implementada:

1. As validações do formulário;
2. A `mutation` do React Query;
3. A função `onSubmit`;
4. O registro dos inputs no React Hook Form.

Começando pelas validações, criado um objeto `formValidations` com as propriedades `image`, `title` e `description`. Essas propriedades representam cada um dos três inputs do formulário e é dentro delas que foi declarada as validações desses inputs. As validações são:

- image:
  - **required**: Campo obrigatório, não pode estar vazio no momento do envio. A mensagem de erro deve ser `Arquivo obrigatório`
  - **validate**: Como as outras duas validações são customizadas, ou seja, não tem por padrão no React Hook Form, iremos criá-las manualmente com o `validate`.
    - **lessThan10MB**: O tamanho do arquivo não pode exceder 10 MB. Utilize a propriedade `size` do arquivo de imagem para realizar a comparação. A mensagem de erro deve ser `O arquivo deve ser menor que 10MB`.
    - **acceptedFormats**: O arquivo enviado pelo usuário deve ser um dos três tipos: image/jpeg, image/png ou image/gif. Utilize a propriedade `type` do arquivo de imagem e um `regex` com os tipos aceitos para realizar a comparação. A mensagem de erro deve ser `Somente são aceitos arquivos PNG, JPEG e GIF`.
- title:
  - **required**: Campo obrigatório, não pode estar vazio no momento do envio. A mensagem de erro deve ser `Título obrigatório`
  - **minLength**: O tamanho mínimo da string deve ser de 2 caracteres. A mensagem de erro deve ser `Mínimo de 2 caracteres`.
  - **maxLength**: O tamanho máximo da string deve ser de 20 caracteres. A mensagem de erro deve ser `Máximo de 20 caracteres`.
- description:
  - **required**: Campo obrigatório, não pode estar vazio no momento do envio. A mensagem de erro deve ser `Descrição obrigatória`
  - **maxLength**: O tamanho máximo da string deve ser de 65 caracteres. A mensagem de erro deve ser `Máximo de 65 caracteres`.

Nesse arquivo é a `mutation` do React Query. Essa `mutation` será responsável pelo cadastro da nova imagem no FaunaDB. Portanto, como primeiro argumento do `useMutation`, implementar uma função que recebe como parâmetro os dados do formulário e no seu corpo realizar uma requisição POST para a rota `api/images` enviando os dados recebidos.
Já como segundo parâmetro,irá utilizar a propriedade `onSuccess` da `mutation` para que, caso ela ocorra com sucesso, invalidade a `query` que listou as imagens, forçando o React Query a atualizar esses dados. Para isso, com o método `invalidateQueries`.

Por fim, é preciso implementar a função `onSubmit`. Essa função recebe como argumento os dados do formulário de cadastro da imagem. No corpo da função, três seções:

- **try**: Nesse trecho se concentrar em três etapas:
  - Verificar se o `imageUrl` existe. Se não existir, mostrar um `toast` de informação com o título `Imagem não adicionada` e descrição `É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.` e sair imediatamente da função. Caso exista, basta seguir para as próximas etapas.
  - Executar a `mutation` utilizando o `mutateAsync` para pode aguardar o resultado da Promisse.
  - Mostrar um `toast` de sucesso com o título `Imagem cadastrada` e descrição `Sua imagem foi cadastrada com sucesso.`
- **catch**: Nesse trecho deve mostrar um `toast` de erro com o título `Falha no cadastro` e descrição `Ocorreu um erro ao tentar cadastrar a sua imagem.`
- **finally**: Nesse trecho deve limpar os campos do form, os estados do componente e fechar o modal.

### ViewImage

<img src=".github/Image.png" alt="imagem">
Em relação ao link,  deve ser renderizado abaixo da imagem com o texto `Abrir original` que aponta para o endereço onde a imagem está hospedada no ImgBB. Ao clicar no link, ele deve abrir uma nova aba no navegador
