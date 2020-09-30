# GraphQL

## Notice

- TypeGraphQL 与 Apollo-Server 的能力不是完全兼容的
- 看起来schema会完全覆盖掉typeDefs与resolvers, 而不是只覆盖掉相同的Field和Type, 淦. 那这样TypeGraphQL和Apollo-Server看起来并不是兼容的很美好. 这样Apollo-Datasource-REST也就不能用了阿.

## TypeGraphQL

- [x] ObjectType 基本对象类型

- [x] InputType 输入对象类型

- [x] ArgsType 参数对象类型

- [x] Query 查询解析器

- [x] Mutation 变更解析器

- [ ] Subscriptions 订阅支持

- [x] Resolver Resolver装饰的类会被合并, 因为只会根据Query/Mutation进行分类

- [ ] RootResolver

- [x] Arg & Args 一般Arg用来处理单个形参, Args用来处理整个输入对象类型

- [ ] Scalar 内置标量与自定义标量(需要提供序列化与解析方法)

- [x] Enums 由于TS装饰器只能在类上(内)使用, 需要手动调用方法注册

- [x] Unions 同样需要手动创建, 传入名称与包含类型

- [x] InterfaceType 就是原生GraphQL中的Interface, 类似抽象类的存在

- [ ] Directives 

- [ ] Extensions

- [x] Auth 被`@Authorization`装饰的field, 会走在`buildSchema`时传入的`authChecker`, 这个方法内能获取到上下文(包括当前用户的`token`以及权限级别控制)

- [x] Validation(By `class-validator`) 由于都是装饰器形式, 因此整体还是比较简洁的

  > 由于TypeORM TypeGraphQL TypeStack都是以装饰器为主, 如果都混在一个文件夹里定义Entity + Schema + Validation/Transform/... 会显得很乱, 我的解决是用`InterfaceType`定义字段, 然后`@Entity()`与`@ObjectType()`使用这样.

- [x] Middlewares & Guards

  > 中间件可以是函数的形式, 也可以是类(内部定义`use`方法)

  - [x] ResolveTime, 获取schema各个字段解析时间

- [x] DIY Decorators

  > 自定义的装饰器内部方法需要调用`next`(导出自`type-graphql`)

  - [x] ArgsValidator, 更灵活的参数校验

- [ ] With DI

## Apollo-Server

> 大部分能力使用TypeGraphQL提供的即可, 这里只列举不兼容的实现

- [ ] schema directives
- [ ] custom directives implement
- [ ] custom scalars & enums & union types & ...
- [ ] data-source(BFF)
- [ ] Error Handling
- [ ] File(这个似乎有一定问题)
- [ ] Auth

## Apollo-Client

> TODO

## TypeORM

- [x] Transaction
- [ ] OneToOne
- [ ] ManyToOne & ManyToOne
- [ ] ManyToMany
- [ ] Entity & Repo Manager
- [ ] Lazy Relation?
- [ ] Listener
- [ ] Log



## TypeStack

### Class-Validator



## N + 1

DataLoader思路的方案, 有查询需求时将查询进行延迟, 等拿到所有查询需求再一次性查询出来

## Tool

- GraphQL-Network
- GraphQLDoc
- GraphQL-Voyager

