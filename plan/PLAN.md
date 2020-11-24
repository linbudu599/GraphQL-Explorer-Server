# PLAN

## TODO

- [ ] DataLoader + TypeGraphQL-DataLoader 原理
- [ ] TypeORM RelationId Decorator
- [ ] 参数错误校验错误统一处理
- [ ] JWT

## Server

- [x] 3层以上的解析链
- [x] 请求统一处理
- [ ] 细粒度鉴权(字段 + 权限组) + JWT
- [x] 移除data-source与apollo的schema定义, 只使用TypeGraphQL
- [x] extension
- [ ] 自定义装饰器
- [ ] 文件上传走另外一个目录
- [ ] 复杂度计算并抛弃复杂度过高的请求
- [ ] 安全相关
- [ ] 自定义指令
- [x] 自定义扩展
- [ ] 更复杂的数据库表结构
- [ ] 分页
- [ ] 标量
- [ ] 订阅类型
- [ ] 错误信息统一处理
- [ ] 缓存、APQ
- [ ] TypeORM 能力
- [x] Fix N+1 >>> DataLoader
  - > 如本例中查看用户及用户任务 会是查询所有用户1次+查询所有用户任务N次
- [ ] 拆开 service 和 resolver

## Client

- [ ] 缓存! 缓存! 缓存!
- [ ] useQuery useMutation
- [ ] 分页
- [ ] local schema
- [ ] 订阅类型
- [ ] 上个UI库做优化

## Common

- [ ] 依赖注入式的配置能力
