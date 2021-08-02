# recipes mongodb

### instrucciones

1) npm install
2) npm run dev ( he creado una instancia de cluster de mongodb para utilizar en mongo atlas, por lo que no seria necesario crear ninguna base de datos, esto para ayudar a las pruebas faciles)
3) una vez inicializado el servidor, entrar a http://localhost:3011/api y presionar en "query your server", esto nos redirigira a la interfaz para realizar querys;


### A continuacion, las querys de graphql

las mismas estan ordenadas de forma que se pueda copiar y pegar una por una.

```
mutation {
  signUp(
    data: {
      name: "admin",
      lastName: "admin",
      email: "admin@admin.com",
      password: "0123456789"
  }){
    name,
    lastName,
    email,
  }
}

mutation {
  login(
    email: "admin@admin.com",
    password: "0123456789"
  )
}

query {
  getUsers(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imxhc3ROYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImI3YWIyYjI5Y2JmZjYzNjAxMzA4NGM1NTFhNzU0NTg2OGU3MTEyMDE3NDJjMDEwZDY1ZWZkZmJjNWMwYWE2YTUiLCJzZWNyZXQiOiI3ODEzMmZlMmUzNDJiNTRlMjEyZDZkYjRhZTMwZDIyZCIsInJlY2lwZXMiOltdLCJfaWQiOiI2MTA3NDgxZGU5MjBmMjJjNGZhM2I1MjUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIl9fdiI6MH0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODY3MTc1LCJleHAiOjE2MzMwNTExNzV9.0L55ZoNRMgAzJCeQiVExaUYtCVpneiaJz325IxRjFbs"
  ){
    name,
    recipes {
      name
    }
  }
}

mutation{
  createCategory(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imxhc3ROYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImI3YWIyYjI5Y2JmZjYzNjAxMzA4NGM1NTFhNzU0NTg2OGU3MTEyMDE3NDJjMDEwZDY1ZWZkZmJjNWMwYWE2YTUiLCJzZWNyZXQiOiI3ODEzMmZlMmUzNDJiNTRlMjEyZDZkYjRhZTMwZDIyZCIsInJlY2lwZXMiOltdLCJfaWQiOiI2MTA3NDgxZGU5MjBmMjJjNGZhM2I1MjUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIl9fdiI6MH0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODY3MTc1LCJleHAiOjE2MzMwNTExNzV9.0L55ZoNRMgAzJCeQiVExaUYtCVpneiaJz325IxRjFbs",
    data: {
      name: "carne",
      description: "carne de ganado Argentino"
    }
  ){
    _id, 
    name
  }
}

query{
  getCategories(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imxhc3ROYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImI3YWIyYjI5Y2JmZjYzNjAxMzA4NGM1NTFhNzU0NTg2OGU3MTEyMDE3NDJjMDEwZDY1ZWZkZmJjNWMwYWE2YTUiLCJzZWNyZXQiOiI3ODEzMmZlMmUzNDJiNTRlMjEyZDZkYjRhZTMwZDIyZCIsInJlY2lwZXMiOltdLCJfaWQiOiI2MTA3NDgxZGU5MjBmMjJjNGZhM2I1MjUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIl9fdiI6MH0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODY3MTc1LCJleHAiOjE2MzMwNTExNzV9.0L55ZoNRMgAzJCeQiVExaUYtCVpneiaJz325IxRjFbs"
  ){
    _id, 
    name
  }
}

mutation{
  updateCategory(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "61074934893db62c92375b4a",
    data: {
      name: "verduras2",
      description: "extraidos de la tierra2"
    }
  )
}

mutation{
  deleteCategory(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "61076078341d902e39426798"
  )
}

mutation{
  createIngredient(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    data: {
      name: "costeleta",
      quantity: 10
    }
  ){
    _id, name
  }
}

query{
  getIngredient(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
  ){
    _id, name
  }
}

query{
  getIngredient(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
  ){
    _id, name
  }
}

query{
  getOneIngredient(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "6107541221e0b22d8a745eff"
  ){
    _id, name, quantity
  }
}

mutation{
  updateIngredient(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "6107541221e0b22d8a745eff",
    ingredient: {
      name: "costeleta",
      quantity: 5
    }
  )
}

mutation{
  deleteIngredient(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "61076053341d902e39426796"
  )
}


mutation{
  createRecipe(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imxhc3ROYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImI3YWIyYjI5Y2JmZjYzNjAxMzA4NGM1NTFhNzU0NTg2OGU3MTEyMDE3NDJjMDEwZDY1ZWZkZmJjNWMwYWE2YTUiLCJzZWNyZXQiOiI3ODEzMmZlMmUzNDJiNTRlMjEyZDZkYjRhZTMwZDIyZCIsInJlY2lwZXMiOltdLCJfaWQiOiI2MTA3NDgxZGU5MjBmMjJjNGZhM2I1MjUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIl9fdiI6MH0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODgwMDUxLCJleHAiOjE2MzMwNjQwNTF9.1sba3dl_Gh3ZwOzHpXZsPreiYI-Y0yA72pX7Eo3FSVQ",
    data: {
      name: "lomitos5",
      description: "lomitos de Córdoba",
      # ingredients: ["61076053341d902e39426796","61076053341d902e39426796"],
      # category: "61076078341d902e39426798"
    }
  ){
    _id, name, description, ingredients
  }
}

query{
  getRecipes(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
  ){
    _id, name, description, ingredients{ name }, category { name }
  }
}

query{
  getOneRecipes(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "61076f7d7e00b3307ab8b761"
  ){
    _id,
    name,
    ingredients { name },
    category { name }
  }
}

mutation{
  updateRecipe(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "61076f7d7e00b3307ab8b761",
    recipe: {
      name: "lomitos2",
      description: "lomitos2"
    }
  )
}

mutation{
  deleteRecipe(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoidGVzdCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsInBhc3N3b3JkIjoiNzIwNTVlMzg5NmJlOTA2MTI2ZmYxNTI4OTdmYWQyZjI0Y2ZjNWQ4ZmM1NTBmNDI5MmEwNjJjNmQ0MDg5MWI2MSIsInNlY3JldCI6IjcwYTE0M2MzN2QwZDc1ZTQxMDg4YzVhZWIwOTc0Y2ZkIn0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODQzMTY0LCJleHAiOjE2MzMwMjcxNjR9.vFS3x5m4Z6xqqp47iCXT9VqvSM-6wpbFxtjY02HZ8-o",
    _id: "61076f7d7e00b3307ab8b761"
  )
}

mutation {
  deleteUser(
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Imxhc3ROYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImI3YWIyYjI5Y2JmZjYzNjAxMzA4NGM1NTFhNzU0NTg2OGU3MTEyMDE3NDJjMDEwZDY1ZWZkZmJjNWMwYWE2YTUiLCJzZWNyZXQiOiI3ODEzMmZlMmUzNDJiNTRlMjEyZDZkYjRhZTMwZDIyZCIsInJlY2lwZXMiOltdLCJfaWQiOiI2MTA3NDgxZGU5MjBmMjJjNGZhM2I1MjUiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIl9fdiI6MH0sImVudGl0eSI6InVzZXIiLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNjI3ODY3MTc1LCJleHAiOjE2MzMwNTExNzV9.0L55ZoNRMgAzJCeQiVExaUYtCVpneiaJz325IxRjFbs",
    _id: "610747836768f22c4234668c"
  )
}
```