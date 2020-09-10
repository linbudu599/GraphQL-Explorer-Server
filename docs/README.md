# GraphQL

## N + 1

DataLoader思路的方案, 有查询需求时将查询进行延迟, 等拿到所有查询需求再一次性查询出来

## Tool

- GraphQL-Network
- GraphQLDoc
- GraphQL-Voyager

## Other

- 看起来schema会完全覆盖掉typeDefs与resolvers, 而不是只覆盖掉相同的Field和Type, 淦. 那这样TypeGraphQL和Apollo-Server看起来并不是兼容的很美好. 这样Apollo-Datasource-REST也就不能用了阿.