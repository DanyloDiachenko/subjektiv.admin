# Shared cross-service DTOs

## Installation

**WARNING**: All contents in `dto` folder are automatically generated. Do not edit them manually.

### Add module to project

**Disclaimer**: For comfort workflow with git submodules, recommended to enable global config `git config --global submodule.recurse true`.
It enables doing recursive operations on submodules, like `git fetch`.
Also, reload your ide after cloning, to make it recognize submodules.

Choice directory in which you will to store content of this repository and run command, for example:

```bash
cd src/submodules/
```

Now, clone submodule

```bash
git submodule add git@github.com:Subjektiv-co/common-dto.git
```

You are done!

Now you can use this module in your project, switching between branches and whatever you want.

## Usage

### Structure

All DTOs are located in `src/submodules/common-dto/dto` folder.
At the root each our service has own folder, which named as service itself (`main`, `auth`, etc).
Inside each service folder, we have folders for each controller, which located in this service (`cities`, `countries`, etc).
Inside each controller folder, we have files for each endpoint, which located in this controller (`post.dto`, `get.id.dto`, etc).
Inside each endpoint file, we have two classes: for request and for response. (if present).

You can import needed dtos in many ways, for example:

```typescript
// Import all dtos from main service
import { Main } from "../submodules/common-dto/dto";
// And use them like this:
const var = <Main.Cities.PostRequestDto>{ bla bla bla };

// Or import specified controller dtos from main service.
import { Cities } from "../submodules/common-dto/dto/main";
///And use like this:
const var = <Cities.PostRequestDto>{ bla bla bla };

// Or import directly one needed tdo
import { GetIdResponseDto } from "../submodules/common-dto/dto/main/cities";
const var = <GetIdResponseDto>{ bla bla bla };
````

### Naming convention

By design, all dto filenames has specific structure: `METHOD.PATH.REQUEST/RESPONSE.Dto`.
Type names itself also have naming-pattern: for incoming data `MethodPathRequestDto` and for responses `MethodPathResponseDto`.
It gives us ability to quickly find needed one.

For example, our module is `main`, and we have controller on path `users` with `POST` endpoint on path `foo/bar`.
In our case, we will create file `post.foo.bar.dto.ts`, which located in users folder, which located in main folder:

```typescript
// File: src/submodules/common-dto/dto/main/users/post.foo.bar.dto.ts

// For request
export class PostFooBarRequestDto {
    // ...
}

// For response
export class PostFooBarResponseDto {
	// ...
}
```

So, if you want to find concrete type, you will just start typing `Post..` and so on, or `Users.Post`..., or `Main.Users.Post...`: autocomplete will help you find what you exactly need.

## Generate own DTOs

### Setup project

Create `tsconfig.dto.json` in the root of project with contents: 

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./src/submodules/common-dto/dto/YOUR_MODULE_NAME/",
    "skipLibCheck": true,
    "strictNullChecks": true,
    "experimentalDecorators": false
  },
  "include": [
    "./src/dto/**/*.ts"
  ]
}
```

Just replace `YOUR_MODULE_NAME` with your module name.

Add this script into your `package.json`:

```json
{
  "scripts": {
    "dto:generate": "rm -fr src/sobmodules/common-dto/dto/YOUR_MODULE_NAME && tsc --emitDeclarationOnly -p tsconfig.dto.json"
  }
}
```

And all is done!

### Generate DTOs

All is ready! Just run `npm run dto:generate` and you will get declarations in `src/submodules/common-dto/dto/YOUR_MODULE_NAME/` directory.
(assuming that your dtos are placed in `src/dto` directory)

After than it is recommended tu run linter `npm run lint` and commit&push your typings.


some test
