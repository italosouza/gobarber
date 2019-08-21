# SEQUELIZE

## Migrations

### Criando uma nova Migration

`Migrations` são utilizadas para versionar a execução de scripts, elas garantes que os comando de expansão e contração de dados sejam executadas na sua devida ordem.

```bash
npx sequelize migration:create --name=create-users
```

### Excutando as Migrations pendentes

Executa as `migration` que estiverem pendentes de execução.

```bash
npx sequelize db:migrate
```

### Realizando o Rollback de Migrations

Para desfazer a execução mais recente de um script podemos executar o seginte comando:

```bash
npx sequelize db:migrate:undo
```

## Seeds

### Criando uma Seed

`Seed` são utilizadas para alimentar a base com uma massa de dados.

```bash
npx sequelize seed:generate --name demo-user
```

### Run specified seeder

```bash
npx sequelize db:seed
```

### Rollback Seed

Deletes data from the database

```bash
npx sequelize db:seed:undo
```

### Run every seeder

```bash
npx sequelize db:seed:all
```

### About

    When we link two model in Sequelize we can refer them as pairs of `source` and `target` models.
    `hasOne` and `belongsTo` insert the association key in different models from each other. `hasOne` inserts the association key in `target` model whereas `belongsTo` inserts the association key in the `source` model.
