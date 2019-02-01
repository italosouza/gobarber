# SEQUELIZE

## Criando uma nova Migration

`Migrations` são utilizadas para versionar a execução de scripts, elas garantes que os comando de expansão e contração de dados sejam executadas na sua devida ordem.

```bash
npx sequelize migration:create --name=create-users
```

## Excutando as Migrations pendentes


```bash
npx sequelize migration:
```

## Realizando o Rollback de Migrations

```bash
npx sequelize migration:
```