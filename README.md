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

### Cloudformation

Instead of opening individual services on aws dashboard, provisioning them individually and tying them together,
cloudformation is an api can be used from the CLI to create a configuration file in order have the all the necessary services provisioned.

_Serverless framework is a kind of an abstraction on top of Cloudformation_

_ps: not necessarily all aws services are supported on cloudformation, but it keeps being extended as new services are created (so does serverless framework)_

### CloudFront

It's amazong CDN solution.

### API Gateway

It's like a proxy between anything external to AWS and anything internal: like a lambda function.

It can be used to route http requests into lambdas. To do so, a lambda has to subscribe to the event `API Gateway AWS Proxy`. The event is huge, but the most important properties are: `body` (http request body), `resource` (the url) and `identity` (logged in user).

`Regular` vs `Proxy` API Gateway: proxy allows the lambda to determine what the response is while regular has to have the format of the response defined within the API Gateway service (_velocity templates?_).

#### Other API Gateways

There are other gateways, like Kong, that can integrate with lambdas but is not provided by amazon.
Api Gateway is amazon's solution.
