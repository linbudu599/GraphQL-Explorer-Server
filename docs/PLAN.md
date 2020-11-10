# PLAN

## Server

- [ ] 3层以上的解析链
- [ ] 细粒度鉴权(字段 + 权限组) + JWT
- [ ] 移除data-source与apollo的schema定义, 只使用TypeGraphQL
- [ ] extension
- [ ] 自定义装饰器
- [ ] 文件上传走另外一个目录
- [ ] 复杂度计算并抛弃复杂度过高的请求
- [ ] 安全相关
- [ ] 分页
- [ ] 标量
- [ ] 订阅类型

## Client

- [ ] 缓存! 缓存! 缓存!
- [ ] useQuery useMutation
- [ ] 分页
- [ ] local schema
- [ ] 订阅类型
- [ ] 上个UI库做优化

## Common

- [ ] 依赖注入式的配置能力