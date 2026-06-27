
## 背景

Cedar 本身是一门授权策略语言，类似一种专门写权限规则的 DSL

AWS 的 Cedar 授权策略语言/SDK：它由 Amazon Web Services（AWS）开发。开发之初主要是为了解决应用中的细粒度访问控制问题：把授权逻辑从业务代码中解耦出来，用可读、可审计、可验证的策略来表达“谁可以对什么资源做什么操作”。参考：AWS 公告、Cedar 官方文档。

  - Cedar 本身是一门授权策略语言，类似一种专门写权限规则的 DSL，不是 Java/Rust/Python 里的普通库语言。
  - AWS 主要把 Cedar 用在 Amazon Verified Permissions，用来给你自己的应用做细粒度授权，比如“用户 A 能不能调用接口 B”“用户能不能编辑某个订单”。
  - 业务应用可以是任意语言写的：Java、Go、Python、Node.js/TypeScript、.NET、Rust 等都可以通过 AWS SDK 或 HTTPS API 调用 Verified Permissions。
  - Cedar 开源授权引擎的核心实现主要是 Rust。如果你想把 Cedar 嵌入本地应用里跑，官方主路径是 Rust crate：cedar-policy。
  - 如果是前端/Node.js 场景，Cedar 仓库也有 cedar-wasm，可以通过 WebAssembly 给 JavaScript/TypeScript 使用，但这不是 AWS 服务调用 Cedar 的唯一方式

## 最佳实践

一种比较现代的权限架构：RBAC + ABAC + policy-as-data + hot reload

## 核心概念

- principal：请求的发起者，通常是用户、服务账号、设备、组织成员等。例如 User::"alice"。Cedar 不负责认证，认证之后得到的身份会作为 principal 传给 Cedar 做授权判
    断。
  - action：principal 想做的操作，例如 Action::"read"、Action::"delete"、Action::"ViewPhoto"。在 Cedar 中，action 也是一种实体，但实体类型固定为 Action。action
    可以分组，例如把 view、list 放进 readOnly 动作组，然后策略里写 action in Action::"readOnly"。
  - resource：被访问或被操作的对象，例如 Document::"doc1"、Photo::"VacationPhoto94.jpg"、Album::"jane_vacation"。resource 也可以有层级关系，例如文件属于文件夹、
    照片属于相册，策略里可以用 resource in Album::"xxx" 判断资源是否在某个父级容器内。
  - context：这次请求的临时上下文，不适合长期挂在 principal 或 resource 上的数据。例如请求 IP、当前时间、MFA 是否通过、HTTP header、设备状态、请求参数等。策略中
    可以写 when { context.mfa == true }。官方建议不要把 principal/resource 固有属性塞进 context。
  - entity：Cedar 里的 principal、action、resource 都是 entity。每个 entity 有一个 UID，由“类型 + ID”组成，例如 User::"alice"、Action::"read"、Document::"doc1"。
    entity 可以有属性 attrs、父实体 parents、标签 tags。策略里的 principal.department == "finance" 或 resource.owner == principal 就依赖 entity 属性。
  - entity hierarchy / group：实体之间的父子关系。常用于 RBAC、资源目录、动作分组。例如 User::"alice" 的 parent 是 Group::"admin"，策略就可以写 principal in
    Group::"admin"。in 判断的是层级关系，不只是直接父级。
  - policy：授权规则。一个 policy 由 effect、scope、可选 condition 组成。最小形式如下：

    permit (
      principal == User::"alice",
      action == Action::"read",
      resource == Document::"doc1"
    );

  - effect：策略效果，只有两种：permit 和 forbid。permit 表示匹配时允许，forbid 表示匹配时拒绝。Cedar 的组合规则很关键：默认拒绝；只要有一个匹配的 forbid，最终就
    是拒绝；只有至少一个 permit 匹配且没有任何 forbid 匹配时才允许。
  - scope：策略作用范围，即三元组 principal、action、resource。scope 是必需的，用来快速确定一条策略是否和本次请求有关。可以写精确匹配 ==，也可以写层级匹配 in。
  - condition：策略条件，用 when 和 unless 表示。when 必须为真，unless 必须为假，策略才生效。例如：

    permit (
      principal,
      action == Action::"read",
      resource
    )
    when {
      principal.department == resource.department
    }
    unless {
      resource.confidential == true
    };

  - PolicySet：一组策略。实际授权时通常不是只评估一条 policy，而是把某个租户、应用、资源域相关的策略集合传给 Cedar。Rust crate 里对应 PolicySet。
  - authorization request：一次授权请求，本质是 <principal, action, resource, context>。它问的是：“这个 principal 能否在这个 context 下对这个 resource 执行这个
    action？”
  - authorizer：授权引擎。Rust 里是 Authorizer，核心调用是 is_authorized(&request, &policy_set, &entities)，返回 Response，里面有 Decision::Allow 或
    Decision::Deny，以及 diagnostics。
  - schema：你的授权模型声明。它定义有哪些 entity type、action、属性类型、哪些 action 可用于哪些 principal/resource/context。Cedar 不强制必须有 schema，但生产环
    境强烈建议使用，因为 schema 可以提前发现策略里的属性名拼错、类型不匹配、action 用错资源类型等问题。
  - policy template：带占位符的策略模板，适合批量生成相似授权关系。例如“某用户可以访问某资源”的模式，不用为每一对用户/资源手写完整策略。模板不能直接授权，必须
    link 成具体 policy 后才参与评估。

  Rust 最小例子

  Cargo.toml：

  [dependencies]
  cedar-policy = "4.10"

  或者：

  cargo add cedar-policy

  src/main.rs：

  use cedar_policy::{Authorizer, Context, Decision, Entities, EntityUid, PolicySet, Request};
  use std::str::FromStr;

  fn main() {
      let policies = PolicySet::from_str(
          r#"
          permit (
              principal == User::"alice",
              action == Action::"read",
              resource == Document::"doc1"
          );
          "#,
      )
      .expect("parse policies");

      let entities = Entities::from_json_str(
          r#"
          [
              {
                  "uid": { "type": "User", "id": "alice" },
                  "attrs": {},
                  "parents": []
              },
              {
                  "uid": { "type": "Document", "id": "doc1" },
                  "attrs": {},
                  "parents": []
              }
          ]
          "#,
          None,
      )
      .expect("parse entities");

      let request = Request::new(
          EntityUid::from_str(r#"User::"alice""#).expect("parse principal"),
          EntityUid::from_str(r#"Action::"read""#).expect("parse action"),
          EntityUid::from_str(r#"Document::"doc1""#).expect("parse resource"),
          Context::empty(),
          None,
      )
      .expect("build request");

      let authorizer = Authorizer::new();
      let response = authorizer.is_authorized(&request, &policies, &entities);

      println!("decision = {:?}", response.decision());
      assert_eq!(response.decision(), Decision::Allow);
  }

  这个例子做了四件事：

  1. 用 Cedar 语法定义一组策略 PolicySet。
  2. 用 JSON 定义实体集合 Entities。
  3. 构造一次授权请求 Request。
  4. 调用 Authorizer::is_authorized 得到允许或拒绝。

  生产环境里通常还会加上 schema，并在策略发布阶段用 validator 校验策略；授权热路径里则尽量复用已经解析好的 PolicySet、Schema 和实体数据。

## cedar、PDP、PEP

  一句话总结：Cedar 负责表达和计算授权规则；PDP 负责做决策；PEP 负责把决策落到真实请求上。

  请求进入系统
     |
     v
  PEP ：拦截请求、收集信息、执行结果
     |
     | 发送授权问题：
     | principal 能不能对 resource 执行 action？
     v
  PDP：做授权决策
     |
     | 使用 Cedar 策略 + 实体数据 + 上下文
     v
  Allow / Deny
     |
     v
  PEP  根据结果放行或拒绝

  关系拆开看：

  - Cedar：是策略语言和授权规则模型。你用它写“谁可以做什么”的规则，例如 permit(principal in Role::"Admin", action == Action::"Invoke", resource == Api::"A");。
  - PDP：Policy Decision Point，策略决策点。它负责回答“允许还是拒绝”。PDP 可以用 Cedar 作为策略语言和评估引擎。
  - PEP：Policy Enforcement Point，策略执行点。它通常在 API 网关、后端中间件、服务入口、Controller 前面，负责拦截请求、调用 PDP、再根据结果返回 200 或 403。

  所以 Cedar 不是 PEP，也不完全等于 PDP。更准确是：

  Cedar policy + Cedar engine 是 PDP 的核心能力之一
  PEP 调用 PDP
  PDP 用 Cedar 做判断
  PEP 执行 Allow/Deny

  放到 AWS 体系里：

  你的 API / 服务 / 中间件
  = PEP

  Amazon Verified Permissions
  = 托管 PDP

  Cedar
  = Verified Permissions 使用的策略语言

  比如“管理员能访问接口 A，普通用户不能，二者都能访问接口 B”：

  用户请求 GET /api/a
          |
  API 中间件 PEP 把请求转换成：
  principal = User::"alice"
  action    = Action::"Invoke"
  resource  = Api::"A"
  context   = {...}
          |
  调用 PDP
          |
  PDP 用 Cedar 策略判断
          |
  返回 Allow 或 Deny
          |
  PEP 放行或返回 403


## Q&A

### 如果我想写一个策略，管理员可以访问接口A，普通用户不能访问接口A，管理员和普通用户都能访问接口B，这种我应该怎么写

• 可以把“接口”建模成 resource，把“调用接口”建模成 action，把管理员/普通用户建模成用户所在的角色组。

  最推荐写法是：只写允许规则，不给普通用户写 forbid。因为 Cedar 默认拒绝，没有匹配到 permit 就会拒绝。

  // 管理员可以访问接口 A
  permit (
    principal in Role::"Admin",
    action == Action::"Invoke",
    resource == Api::"A"
  );

  // 所有登录用户都可以访问接口 B
  permit (
    principal in Role::"AuthenticatedUser",
    action == Action::"Invoke",
    resource == Api::"B"
  );

  对应的实体关系可以这样理解：

  [
    {
      "uid": { "type": "User", "id": "alice" },
      "attrs": {},
      "parents": [
        { "type": "Role", "id": "Admin" }
      ]
    },
    {
      "uid": { "type": "User", "id": "bob" },
      "attrs": {},
      "parents": [
        { "type": "Role", "id": "NormalUser" }
      ]
    },
    {
      "uid": { "type": "Role", "id": "Admin" },
      "attrs": {},
      "parents": [
        { "type": "Role", "id": "AuthenticatedUser" }
      ]
    },
    {
      "uid": { "type": "Role", "id": "NormalUser" },
      "attrs": {},
      "parents": [
        { "type": "Role", "id": "AuthenticatedUser" }
      ]
    }
  ]

  这样结果是：

  | 用户 | 角色 | 接口 A | 接口 B |
  |---|---|---:|---:|
  | alice | Admin | 允许 | 允许 |
  | bob | NormalUser | 拒绝 | 允许 |

  关键点：

  - principal in Role::"Admin"：表示用户直接或间接属于管理员角色。
  - principal in Role::"AuthenticatedUser"：表示管理员和普通用户都属于“已登录用户”这个大组。
  - 普通用户不能访问接口 A，不需要专门写拒绝规则；因为没有匹配到允许策略时，Cedar 默认 Deny。

  如果你想把“普通用户禁止访问接口 A”写成硬性约束，也可以写：

  forbid (
    principal in Role::"NormalUser",
    action == Action::"Invoke",
    resource == Api::"A"
  );

  但要谨慎：forbid 优先级高于 permit。如果某个用户同时属于 Admin 和 NormalUser，访问接口 A 会被拒绝。所以一般 RBAC 场景里，优先用“只给需要的人写 permit”的方式。
