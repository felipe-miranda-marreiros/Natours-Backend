# Natours-Backend

## Aggregation Pipeline

* Documentação: [Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/#aggregation-pipeline)
* Commit: [dcbc39b](https://github.com/felipe-miranda-marreiros/Natours-Backend/commit/dcbc39b80e9596ebc7fa499885f7e86c77b59e5c)

Nos permite fazer operações com documentos usando o conceito de Pipeline no MongoDB. Podemos processar documentos e, no fim, moldar novos dados. Por exemplo, agrupar documentos do banco de dados pelo número de avaliações e em seguida filtrar pelo preço.

Avaliações será o agrupamento de todos os documentos que possuem avaliações e logo em seguida podemos passar para o MongoDB de que forma queremos filtrar o preço. Como por exemplo, o menor preço: **$min**; ou o maior preço: **$max**.

