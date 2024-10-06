# intro-to-serverless

In a nutshell, Functions as a Service is the ability to deploy functions in the cloud (whatever provider) and then run those functions based on events (there is the concept of Backend as a Service,
which is similar but delivers a bit more than just functions - e.g Firebase).

**Serverless vs Traditional servers (cloud or on prem):**

Serverless is executed on demand and the cost per request (like a pay as you go model), while traditional servers are long lived processes that are always there provisioned regardless of usage (fixed cost, usually only paying for scalings).

In a serverless environment, developers do not have to worry about management processes like deploy, scaling, etc. while with traditional servers they do.

The most suitable approach, especially from cost perspective, depends on the use case and usage.

**Lambda** is the name of Amazon's Functions as a Service product.

**Serverless Framework** is a build system and environment that helps developers to build serverless functions regardless of the provider through a common api (leaving the deploy only down the line, which it also helps) -
it can be seen as a kind of a local development environment and building tool. _To build serverless architectures you don't need to use the [serverless framework](https://serverless.com)._

## Basics

In a nutshell, lambdas (or serverless functions) consist of a handler function (entry point) that receives 3 parameters:

1. `event` - the structure is down to how the function is being triggered
2. `context` - further details of how and where the function is being executed
3. `callback` - follows nodejs pattern where first parameter is an error and the second the actual result

When working with `serverless framework`, it automates the deploy to aws. All details are set in the `serverless.yml` file (programming language being used, functions being deployed and their respective handlers, etc).

Sample application: `hello-world`. Run with `serverless invoke local -f hello -p src/event.json`

## Cold starts

When a lambda is called for the first time, AWS creates a container and then your function is executed. There's known a cold start and it has overhead.

Lambdas are recycled after some time of unusage and gets recreated once it's used again. This might impact efficiency and needs to be thought carefully.

Sync vs Async? A cold lambda calling another cold lambda? Database connections being created within those lambdas?

_to prevent lambdas going cold, you can call them regularly or use cloudwatch service_

_lambda is charged per usage, however the minimum that will be charged is 100 milliseconds_

### Cloudformation

Instead of opening individual services on aws dashboard, provisioning them individually and tying them together,
cloudformation is an api can be used from the CLI to create a configuration file in order have the all the necessary services provisioned.

_Serverless framework is a kind of an abstraction on top of Cloudformation_

_ps: not necessarily all aws services are supported on cloudformation, but it keeps being extended as new services are created (so does serverless framework)_

### CloudFront

It's amazong CDN solution.

### Incognito

Amazon's version of Auth0.

### API Gateway

It's like a proxy between anything external to AWS and anything internal: like a lambda function.

It can be used to route http requests into lambdas. To do so, a lambda has to subscribe to the event `API Gateway AWS Proxy`. The event is huge, but the most important properties are: `body` (http request body), `resource` (the url) and `identity` (logged in user).

`Regular` vs `Proxy` API Gateway: proxy allows the lambda to determine what the response is while regular has to have the format of the response defined within the API Gateway service (_velocity templates?_).

#### Other API Gateways

There are other gateways, like Kong, that can integrate with lambdas but is not provided by amazon.
Api Gateway is amazon's solution.

#### Setting up API Gateway locally - for development

`serverless-offline` is a serverless framework plugin that creates a local gateway to emulate
amazon's API Gateways and call functions with events close to the real ones (as though on AWS).

API Gateway is effectively a long lived process / server, however our lambdas are still serverless.

**Installation:**

1. `npm i -D serverless-offline`
2. inside `serverless.yml` create a attribute `plugins` with the value `- serverless-offline`

To run, simply execute `serverless offline` (or create a convenience script on `package.json`)

**Request:**

When using serverless framework, defining an http gateway requires the declaration of a regular function plus the definition of the event that it subscripts with its details:

_shorthand_

```yaml
api:
  handler: src/api/api.handler
  events:
    - httpApi: GET /api
```

_More advanced configs (way more available):_

```yaml
api:
  handler: src/api/api.handler
  events:
    - httpApi:
        path: /api
        method: GET
        cors: true
```

In the example above, whenever a request is performed to `/api`, the function `handler` of the file `api.js` is going to be called.

_ps remember that the event comes formatted according to the event being subscribed_

**Response:**
When defining the gateway function, it's important to provide the callback response following the expected format, so that api gateway can parse it and provide proper response to the client:

```javascript
callback(null, {
  statusCode: 200,
  headers: {},
  body: JSON.stringify({
    // sth
  }),
});
```

#### Deploying

It's possible to configure every single detail of the deploy in the serverless.yaml (region, stage, etc). _ps default region is us-east-1 and stage is dev_. _All configs can be overridden via env variables_

`sls deploy` to deploy the service to aws.

##### Amazon Key Management System (KMS)

Is amazon solution for encryption - e.g encrypt environment variables, which would require the application to decrypt before usage.

##### Roles

By default serverless creates IAM execution roles for services (lambdas). It consists of `{service_name}`-`{stage}`-`{region}`-`lambdaRole`. If the lambdas need to execute another lambdas and or services (e.g S3, DynamoDB, etc), it's necessary to give permission to that role.

##### Avoid bundling modules

The deploy artifact can getting fairly big depending on the projects dependencies. There are ways to avoid bundling unnecessary modules depending on the project's set up. Eg: there are servless plugins like dedupe, serverless-webpack, etc.

##### Basic Configs

Within the lambda dashboard, it's possible to define memory, timeouts, etc to control spendings.

##### VPC

It's like a private network / internet gateway that enables lambdas to talk to the internet - without it, lambdas would't be to access external services and apis. _you need to set up a vpc that connects to an internet gateway_

_everything can be setup via serverless.yml instead of directly on amazon console (env variable, execution role, function settings (memory, timeout), tags, vpc, etc)_
