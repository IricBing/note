# `NestJS` 支持 `XML` 传参

现在大部分项目都选择采用 `json` 的形式来传参， `json` 也成为了后台传参的标配，但是一些古老的技术栈还是会采用 `XML` 的形式进行传参，例如：微信公众号服务器。

为了兼容微信公众号的传参形式，我们不得不对项目加一些扩展，使其能够接受 `XML` 形式的参数。

> `PS:` 下面这个解决方案虽然实现上较为简洁，代码量也最少，但是令我不够满意的原因是：包过于陈旧，只支持旧版写法，而且 `body-parser-xml` 包的下载量也不足以配得上这种需求量。翻了 `GitHub` 上的 `issue` ，作者也是建议采用这种方式，[issue地址](https://github.com/nestjs/nest/issues/1076)

## `Step1.` 安装所需依赖包

``` shell
$ yarn add body-parser body-parser-xml
```

## `Step2.` 修改 `main.ts` 文件

``` typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as bodyParser from 'body-parser';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('body-parser-xml')(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    bodyParser['xml']({
      limit: '1MB', // Reject payload bigger than 1 MB
      xmlParseOptions: {
        normalize: true, // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false // Only put nodes in array if >1
      }
    })
  );

  await app.listen(3000);
}
bootstrap();
```

> 提示： `body-parser-xml` 这个包过于老旧，无法支持新版的 `import` 写法，写起来比较别扭。尝试找过其他替代方案，但是没有找到合适的，目前先将就使用。
