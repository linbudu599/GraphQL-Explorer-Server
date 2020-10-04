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

- [ ] FieldResolver

- [x] Arg & Args 一般Arg用来处理单个形参, Args用来处理整个输入对象类型

- [ ] Scalar 内置标量与自定义标量(需要提供序列化与解析方法)

- [x] Enums 由于TS装饰器只能在类上(内)使用, 需要手动调用方法注册

- [x] Unions 同样需要手动创建, 传入名称与包含类型

- [x] InterfaceType 就是原生GraphQL中的Interface, 类似抽象类的存在

- [x] Directives  @Directive('@deprecated(reason: "Use newField")')

- [ ] Extensions

- [x] Auth 被`@Authorization`装饰的field, 会走在`buildSchema`时传入的`authChecker`, 这个方法内能获取到上下文(包括当前用户的`token`以及权限级别控制)

- [x] Validation(By `class-validator`) 由于都是装饰器形式, 因此整体还是比较简洁的

  > 由于TypeORM TypeGraphQL TypeStack都是以装饰器为主, 如果都混在一个文件夹里定义Entity + Schema + Validation/Transform/... 会显得很乱, 我的解决是用`InterfaceType`定义字段, 然后`@Entity()`与`@ObjectType()`使用这样.

- [x] Middlewares & Guards

  > 中间件可以是函数的形式, 也可以是类(内部定义`use`方法)

  - [x] ResolveTime, 获取schema各个字段解析时间
  - [x] Interceptor, 拦截执行结果并作出修改, 或者拦截参数/上下文中的信息进行特殊处理

- [x] DIY Decorators

  > 自定义的装饰器内部方法需要调用`next`(导出自`type-graphql`)

  - [x] ArgsValidator, 更灵活的参数校验

- [ ] With DI

## Apollo-Server

> 大部分能力使用TypeGraphQL提供的即可, 这里只列举不兼容的实现

- [ ] serve by basic graphql schema
- [ ] schema directives
- [ ] custom directives implement
- [ ] custom scalars & enums & union types & ...
- [ ] data-source(BFF)
- [ ] Error Handling
- [ ] File(这个似乎有一定问题)
- [ ] Auth



## Apollo-Client

- [x] useQuery

  - [x] with vars
  - [x] cache control 返回的结果会被自动缓存, 如果想更新缓存, 可以使用轮询或者refetch方法
  - [x] refetch 支持变量更改, 通常用于提供给用户进行某些操作
  - [x] networkStatus  可以用来更精细的判断请求状态, 甚至可以判断是否正在refetch
  - [x] errorPolicy, 错误控制, none -> 丢弃掉返回的结果, all -> 不会丢弃, 允许你根据错误信息渲染界面
  - [x] fetch-policy
    - **cache-first** 优先向缓存发起查询 如果有数据不存在 那么还是会向服务器发起请求, 并且在缓存新数据后返回这些数据
    - cache-only 只向缓存查询 并且在无法查询到结果时抛出错误
    - cache-and-network  同时向服务器和缓存发起完整请求 会自动更新缓存字段
    - network-only 不会检查缓存 但会缓存结果 直接向服务器发起请求
    - no-cache 不会检查缓存, 并且不会缓存
    - standby 类似缓存优先, 但是不会自动更新缓存
  - [ ] updateQuery   更新缓存内的查询结果

- [x] useMutation

  - [x] basic 类似useLazyQuery 需要手动调用  

  - [ ] cache apollo基于id去识别实体  会在mutation后自动更新缓存  同时UI也会自动变化

  - [ ] update 用于非当前实体的缓存更新,  这个函数接收缓存与本次变更结果作为入参, 使用`readQuery`, `writeQuery`, `readFragment`, `writeFragment` and `modify`来更新缓存

    

- [ ] Common Usage: Auth by Client Query
- [ ] useQuery(useLazyQuery) API
- [ ] useMutation
- [ ] Cache handler after operation
- [ ] Pagination
- [ ] (Inline) Fragment
- [ ] Error Handling
- [ ] Global Cache Read/Write/...
- [ ] Local State
- [ ] With TypeGraphQL
- [ ] API Collections



## TypeORM

- [ ] TypeORM-TypeDI-Extensions

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

