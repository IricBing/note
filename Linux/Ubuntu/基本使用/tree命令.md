# Linux tree命令

## tree是什么

`tree命令` 是用来格式化输出磁盘目录结构的命令。

## 基本用法

### tree

当前目录下的所有内容显示

``` bash
$ tree
.
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── README.md
├── src
│   ├── app.module.ts
│   ├── app.proto
│   ├── filters
│   │   └── exception.filter.ts
│   ├── main.ts
│   ├── modules
│   │   ├── common
│   │   │   ├── common.module.ts
│   │   │   ├── constants
│   │   │   │   └── common.constant.ts
│   │   │   ├── decorators
│   │   │   │   └── grpc-payload.decorator.ts
│   │   │   ├── dtos
│   │   │   │   ├── paging.req.dto.ts
│   │   │   │   └── paging.res.dto.ts
│   │   │   ├── services
│   │   │   │   └── init.service.ts
│   │   │   └── utils
│   │   │       └── lant.util.ts
│   │   ├── config
│   │   │   ├── config.module.ts
│   │   │   ├── constants
│   │   │   │   └── config.constant.ts
│   │   │   ├── registers
│   │   │   │   ├── common.register.ts
│   │   │   │   ├── database.register.ts
│   │   │   │   └── kafka.register.ts
│   │   │   ├── service
│   │   │   │   └── config.service.ts
│   │   │   └── validations
│   │   │       └── config.validation.ts
│   │   ├── kafka
│   │   │   ├── constants
│   │   │   │   └── kafka.constant.ts
│   │   │   ├── decorators
│   │   │   │   ├── kafka-handler.decorator.ts
│   │   │   │   └── kafka-payload.decorator.ts
│   │   │   ├── interfaces
│   │   │   │   └── payload
│   │   │   │       ├── mqtt-log.payload.interface.ts
│   │   │   │       ├── system-log.payload.interface.ts
│   │   │   │       └── user-activity-log.payload.interface.ts
│   │   │   ├── kafka.module.ts
│   │   │   ├── services
│   │   │   │   └── kafka.service.ts
│   │   │   └── strategies
│   │   │       └── kafka-consumer.strategy.ts
│   │   ├── mqtt-log
│   │   │   ├── constants
│   │   │   ├── controllers
│   │   │   │   └── mqtt-log.controller.ts
│   │   │   ├── dtos
│   │   │   │   └── mqtt-log
│   │   │   │       ├── get-mqtt-log-list.req.dto.ts
│   │   │   │       └── get-mqtt-log-list.res.dto.ts
│   │   │   ├── interfaces
│   │   │   │   ├── mongodb
│   │   │   │   │   └── query
│   │   │   │   │       └── mqtt-log.query.res.interface.ts
│   │   │   │   └── schemas
│   │   │   │       └── mqtt-log.schema.interface.ts
│   │   │   ├── messages
│   │   │   │   └── get-mqtt-log-list.message.proto
│   │   │   ├── mqtt-log.module.ts
│   │   │   ├── schemas
│   │   │   │   └── mqtt-log.schema.ts
│   │   │   └── services
│   │   │       ├── mqtt-log.service.proto
│   │   │       └── mqtt-log.service.ts
│   │   ├── system-log
│   │   │   ├── constants
│   │   │   │   └── system-log.constant.ts
│   │   │   ├── interfaces
│   │   │   │   └── schemas
│   │   │   │       └── system-log.schema.interface.ts
│   │   │   ├── messages
│   │   │   │   └── get-system-log-list.message.proto
│   │   │   ├── schemas
│   │   │   │   └── system-log.schema.ts
│   │   │   ├── services
│   │   │   │   ├── system-log.service.proto
│   │   │   │   └── system-log.service.ts
│   │   │   └── system-log.module.ts
│   │   └── user-activity-log
│   │       ├── constants
│   │       │   └── user-activity-log.constant.ts
│   │       ├── interfaces
│   │       │   └── schemas
│   │       │       └── user-activity-log.schema.interface.ts
│   │       ├── messages
│   │       ├── schemas
│   │       │   └── user-activity-log.schema.ts
│   │       ├── services
│   │       │   ├── user-activity-log.service.proto
│   │       │   └── user-activity-log.service.ts
│   │       └── user-activity-log.module.ts
│   └── pipes
│       └── transformer.pipe.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

49 directories, 60 files

```

### tree -L [level]

只显示当前目录下指定最大深度的目录结构

``` bash
$ tree -L 3
.
├── docker-compose.yml
├── nest-cli.json
├── package.json
├── README.md
├── src
│   ├── app.module.ts
│   ├── app.proto
│   ├── filters
│   │   └── exception.filter.ts
│   ├── main.ts
│   ├── modules
│   │   ├── common
│   │   ├── config
│   │   ├── kafka
│   │   ├── mqtt-log
│   │   ├── system-log
│   │   └── user-activity-log
│   └── pipes
│       └── transformer.pipe.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
└── yarn.lock

11 directories, 14 files
```

### tree -d

显示目录名称而非内容。

```bash
$ tree -d
.
├── src
│   ├── filters
│   ├── modules
│   │   ├── common
│   │   │   ├── constants
│   │   │   ├── decorators
│   │   │   ├── dtos
│   │   │   ├── services
│   │   │   └── utils
│   │   ├── config
│   │   │   ├── constants
│   │   │   ├── registers
│   │   │   ├── service
│   │   │   └── validations
│   │   ├── kafka
│   │   │   ├── constants
│   │   │   ├── decorators
│   │   │   ├── interfaces
│   │   │   │   └── payload
│   │   │   ├── services
│   │   │   └── strategies
│   │   ├── mqtt-log
│   │   │   ├── constants
│   │   │   ├── controllers
│   │   │   ├── dtos
│   │   │   │   └── mqtt-log
│   │   │   ├── interfaces
│   │   │   │   ├── mongodb
│   │   │   │   │   └── query
│   │   │   │   └── schemas
│   │   │   ├── messages
│   │   │   ├── schemas
│   │   │   └── services
│   │   ├── system-log
│   │   │   ├── constants
│   │   │   ├── interfaces
│   │   │   │   └── schemas
│   │   │   ├── messages
│   │   │   ├── schemas
│   │   │   └── services
│   │   └── user-activity-log
│   │       ├── constants
│   │       ├── interfaces
│   │       │   └── schemas
│   │       ├── messages
│   │       ├── schemas
│   │       └── services
│   └── pipes
└── test

49 directories
```

### tree -f
在每个文件或目录之前，显示完整的相对路径名称。

```bash
.
├── ./docker-compose.yml
├── ./nest-cli.json
├── ./package.json
├── ./README.md
├── ./src
│   ├── ./src/app.module.ts
│   ├── ./src/app.proto
│   ├── ./src/filters
│   │   └── ./src/filters/exception.filter.ts
│   ├── ./src/main.ts
│   ├── ./src/modules
│   │   ├── ./src/modules/common
│   │   │   ├── ./src/modules/common/common.module.ts
│   │   │   ├── ./src/modules/common/constants
│   │   │   │   └── ./src/modules/common/constants/common.constant.ts
│   │   │   ├── ./src/modules/common/decorators
│   │   │   │   └── ./src/modules/common/decorators/grpc-payload.decorator.ts
│   │   │   ├── ./src/modules/common/dtos
│   │   │   │   ├── ./src/modules/common/dtos/paging.req.dto.ts
│   │   │   │   └── ./src/modules/common/dtos/paging.res.dto.ts
│   │   │   ├── ./src/modules/common/services
│   │   │   │   └── ./src/modules/common/services/init.service.ts
│   │   │   └── ./src/modules/common/utils
│   │   │       └── ./src/modules/common/utils/lant.util.ts
│   │   ├── ./src/modules/config
│   │   │   ├── ./src/modules/config/config.module.ts
│   │   │   ├── ./src/modules/config/constants
│   │   │   │   └── ./src/modules/config/constants/config.constant.ts
│   │   │   ├── ./src/modules/config/registers
│   │   │   │   ├── ./src/modules/config/registers/common.register.ts
│   │   │   │   ├── ./src/modules/config/registers/database.register.ts
│   │   │   │   └── ./src/modules/config/registers/kafka.register.ts
│   │   │   ├── ./src/modules/config/service
│   │   │   │   └── ./src/modules/config/service/config.service.ts
│   │   │   └── ./src/modules/config/validations
│   │   │       └── ./src/modules/config/validations/config.validation.ts
│   │   ├── ./src/modules/kafka
│   │   │   ├── ./src/modules/kafka/constants
│   │   │   │   └── ./src/modules/kafka/constants/kafka.constant.ts
│   │   │   ├── ./src/modules/kafka/decorators
│   │   │   │   ├── ./src/modules/kafka/decorators/kafka-handler.decorator.ts
│   │   │   │   └── ./src/modules/kafka/decorators/kafka-payload.decorator.ts
│   │   │   ├── ./src/modules/kafka/interfaces
│   │   │   │   └── ./src/modules/kafka/interfaces/payload
│   │   │   │       ├── ./src/modules/kafka/interfaces/payload/mqtt-log.payload.interface.ts
│   │   │   │       ├── ./src/modules/kafka/interfaces/payload/system-log.payload.interface.ts
│   │   │   │       └── ./src/modules/kafka/interfaces/payload/user-activity-log.payload.interface.ts
│   │   │   ├── ./src/modules/kafka/kafka.module.ts
│   │   │   ├── ./src/modules/kafka/services
│   │   │   │   └── ./src/modules/kafka/services/kafka.service.ts
│   │   │   └── ./src/modules/kafka/strategies
│   │   │       └── ./src/modules/kafka/strategies/kafka-consumer.strategy.ts
│   │   ├── ./src/modules/mqtt-log
│   │   │   ├── ./src/modules/mqtt-log/constants
│   │   │   ├── ./src/modules/mqtt-log/controllers
│   │   │   │   └── ./src/modules/mqtt-log/controllers/mqtt-log.controller.ts
│   │   │   ├── ./src/modules/mqtt-log/dtos
│   │   │   │   └── ./src/modules/mqtt-log/dtos/mqtt-log
│   │   │   │       ├── ./src/modules/mqtt-log/dtos/mqtt-log/get-mqtt-log-list.req.dto.ts
│   │   │   │       └── ./src/modules/mqtt-log/dtos/mqtt-log/get-mqtt-log-list.res.dto.ts
│   │   │   ├── ./src/modules/mqtt-log/interfaces
│   │   │   │   ├── ./src/modules/mqtt-log/interfaces/mongodb
│   │   │   │   │   └── ./src/modules/mqtt-log/interfaces/mongodb/query
│   │   │   │   │       └── ./src/modules/mqtt-log/interfaces/mongodb/query/mqtt-log.query.res.interface.ts
│   │   │   │   └── ./src/modules/mqtt-log/interfaces/schemas
│   │   │   │       └── ./src/modules/mqtt-log/interfaces/schemas/mqtt-log.schema.interface.ts
│   │   │   ├── ./src/modules/mqtt-log/messages
│   │   │   │   └── ./src/modules/mqtt-log/messages/get-mqtt-log-list.message.proto
│   │   │   ├── ./src/modules/mqtt-log/mqtt-log.module.ts
│   │   │   ├── ./src/modules/mqtt-log/schemas
│   │   │   │   └── ./src/modules/mqtt-log/schemas/mqtt-log.schema.ts
│   │   │   └── ./src/modules/mqtt-log/services
│   │   │       ├── ./src/modules/mqtt-log/services/mqtt-log.service.proto
│   │   │       └── ./src/modules/mqtt-log/services/mqtt-log.service.ts
│   │   ├── ./src/modules/system-log
│   │   │   ├── ./src/modules/system-log/constants
│   │   │   │   └── ./src/modules/system-log/constants/system-log.constant.ts
│   │   │   ├── ./src/modules/system-log/interfaces
│   │   │   │   └── ./src/modules/system-log/interfaces/schemas
│   │   │   │       └── ./src/modules/system-log/interfaces/schemas/system-log.schema.interface.ts
│   │   │   ├── ./src/modules/system-log/messages
│   │   │   │   └── ./src/modules/system-log/messages/get-system-log-list.message.proto
│   │   │   ├── ./src/modules/system-log/schemas
│   │   │   │   └── ./src/modules/system-log/schemas/system-log.schema.ts
│   │   │   ├── ./src/modules/system-log/services
│   │   │   │   ├── ./src/modules/system-log/services/system-log.service.proto
│   │   │   │   └── ./src/modules/system-log/services/system-log.service.ts
│   │   │   └── ./src/modules/system-log/system-log.module.ts
│   │   └── ./src/modules/user-activity-log
│   │       ├── ./src/modules/user-activity-log/constants
│   │       │   └── ./src/modules/user-activity-log/constants/user-activity-log.constant.ts
│   │       ├── ./src/modules/user-activity-log/interfaces
│   │       │   └── ./src/modules/user-activity-log/interfaces/schemas
│   │       │       └── ./src/modules/user-activity-log/interfaces/schemas/user-activity-log.schema.interface.ts
│   │       ├── ./src/modules/user-activity-log/messages
│   │       ├── ./src/modules/user-activity-log/schemas
│   │       │   └── ./src/modules/user-activity-log/schemas/user-activity-log.schema.ts
│   │       ├── ./src/modules/user-activity-log/services
│   │       │   ├── ./src/modules/user-activity-log/services/user-activity-log.service.proto
│   │       │   └── ./src/modules/user-activity-log/services/user-activity-log.service.ts
│   │       └── ./src/modules/user-activity-log/user-activity-log.module.ts
│   └── ./src/pipes
│       └── ./src/pipes/transformer.pipe.ts
├── ./test
│   ├── ./test/app.e2e-spec.ts
│   └── ./test/jest-e2e.json
├── ./tsconfig.build.json
├── ./tsconfig.json
└── ./yarn.lock

49 directories, 60 files
```

### tree -t

用文件和目录的更改时间排序。

```bash
$ tree -t
.
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
├── tsconfig.json
├── nest-cli.json
├── docker-compose.yml
├── README.md
├── package.json
├── yarn.lock
└── src
    ├── filters
    │   └── exception.filter.ts
    ├── modules
    │   ├── config
    │   │   ├── constants
    │   │   │   └── config.constant.ts
    │   │   ├── service
    │   │   │   └── config.service.ts
    │   │   ├── validations
    │   │   │   └── config.validation.ts
    │   │   ├── registers
    │   │   │   ├── database.register.ts
    │   │   │   ├── common.register.ts
    │   │   │   └── kafka.register.ts
    │   │   └── config.module.ts
    │   ├── system-log
    │   │   ├── schemas
    │   │   │   └── system-log.schema.ts
    │   │   ├── messages
    │   │   │   └── get-system-log-list.message.proto
    │   │   ├── constants
    │   │   │   └── system-log.constant.ts
    │   │   ├── services
    │   │   │   ├── system-log.service.proto
    │   │   │   └── system-log.service.ts
    │   │   ├── interfaces
    │   │   │   └── schemas
    │   │   │       └── system-log.schema.interface.ts
    │   │   └── system-log.module.ts
    │   ├── user-activity-log
    │   │   ├── messages
    │   │   ├── interfaces
    │   │   │   └── schemas
    │   │   │       └── user-activity-log.schema.interface.ts
    │   │   ├── services
    │   │   │   ├── user-activity-log.service.proto
    │   │   │   └── user-activity-log.service.ts
    │   │   ├── schemas
    │   │   │   └── user-activity-log.schema.ts
    │   │   ├── constants
    │   │   │   └── user-activity-log.constant.ts
    │   │   └── user-activity-log.module.ts
    │   ├── kafka
    │   │   ├── services
    │   │   │   └── kafka.service.ts
    │   │   ├── strategies
    │   │   │   └── kafka-consumer.strategy.ts
    │   │   ├── constants
    │   │   │   └── kafka.constant.ts
    │   │   ├── interfaces
    │   │   │   └── payload
    │   │   │       ├── system-log.payload.interface.ts
    │   │   │       ├── user-activity-log.payload.interface.ts
    │   │   │       └── mqtt-log.payload.interface.ts
    │   │   ├── decorators
    │   │   │   ├── kafka-handler.decorator.ts
    │   │   │   └── kafka-payload.decorator.ts
    │   │   └── kafka.module.ts
    │   ├── mqtt-log
    │   │   ├── constants
    │   │   ├── schemas
    │   │   │   └── mqtt-log.schema.ts
    │   │   ├── services
    │   │   │   ├── mqtt-log.service.proto
    │   │   │   └── mqtt-log.service.ts
    │   │   ├── messages
    │   │   │   └── get-mqtt-log-list.message.proto
    │   │   ├── controllers
    │   │   │   └── mqtt-log.controller.ts
    │   │   ├── dtos
    │   │   │   └── mqtt-log
    │   │   │       ├── get-mqtt-log-list.res.dto.ts
    │   │   │       └── get-mqtt-log-list.req.dto.ts
    │   │   ├── mqtt-log.module.ts
    │   │   └── interfaces
    │   │       ├── schemas
    │   │       │   └── mqtt-log.schema.interface.ts
    │   │       └── mongodb
    │   │           └── query
    │   │               └── mqtt-log.query.res.interface.ts
    │   └── common
    │       ├── services
    │       │   └── init.service.ts
    │       ├── utils
    │       │   └── lant.util.ts
    │       ├── constants
    │       │   └── common.constant.ts
    │       ├── common.module.ts
    │       ├── dtos
    │       │   ├── paging.res.dto.ts
    │       │   └── paging.req.dto.ts
    │       └── decorators
    │           └── grpc-payload.decorator.ts
    ├── app.proto
    ├── app.module.ts
    ├── pipes
    │   └── transformer.pipe.ts
    └── main.ts

49 directories, 60 files
```