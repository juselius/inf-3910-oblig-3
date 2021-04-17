# INF-3910

## Introduction

This repository contains a stub code, based on a modified SAFE 3.0 template.
The SAFE template can be used to generate a full-stack web application using the
[SAFE Stack](https://safe-stack.github.io/). If you
want to learn more about the template read the
[quick start guide](https://safe-stack.github.io/docs/quickstart/).

This code has been modified from the original SAFE template in the following
ways:

* [Fable.Remoting](https://github.com/Zaid-Ajaj/Fable.Remoting) has been replaced
  with [Thot.Fetch](https://thoth-org.github.io/Thoth.Fetch/) and
  [Thoth.Json](https://thoth-org.github.io/Thoth.Json/). While Fable.Remoting is
  nice and provides much better type safety on API calls, it also hides a lot of
  details. Fable.Remoting is a RPC framework, and while RPC can seem to make life really nice and dandy,
  it has [been criticized](https://medium.com/programming-philosophy/a-critique-of-the-remote-procedure-call-paradigm-db0bcc71d8a1).
* [Saturn](https://saturnframework.org/) is only used to configure the web server
  pipeline. The Saturn routing has been replaced with straight
  [Giraffe](https://github.com/giraffe-fsharp/Giraffe). Again, Saturn does a
  wonderful job, but hides a lot of detail.

The example code makes heavy use of the
[Feliz](https://zaid-ajaj.github.io/Feliz/) and
[Feliz.Bulma](https://zaid-ajaj.github.io/Feliz/#/UIFrameworks/Bulma)
libraries for the UI in ```src/Client```. You will want to skim trough the
documentation.

## Oblig 3

In this exercise you will combine the skills and knowledge from the previous
exercises. The task is to create a client-server web application, for processing
numerical CSV data, a sort of poor man's spread sheet:

1. Create a web interface with a text input for filling in numerical CSV, and a
   submit button to send the contents to the server
2. Create a server with a REST JSON API endpoint to receive the CSV as a string.
   Parse the string, and return the numerical data in a suitable format. Take
   care of reporting back errors, in case the parsing fails.
3. Render the parsed CSV in a table, dynamically replacing the text input box.
   Add buttons to sum and multiply the table data both horizontally and
   vertically.
4. Add a reset button to start over.
5. Bonus: Add a file upload button.

Feel free to play with ideas and features if you feel like. Have fun!

### Install pre-requisites

You'll need to install the following pre-requisites in order to build SAFE applications

* The [.NET 5.0 SDK](https://www.microsoft.com/net/download)
* [Fable 3](https://fable.io)  installed as a global tool: ```dotnet tool install -g fable```
* The [NPM](https://npmjs.com) package manager.
* [Node LTS](https://nodejs.org/en/download/) installed for the front end components.

## Building and running

Before you run the project **for the first time only** you must install dotnet "local tools" with this command:

```bash
dotnet tool restore
```

There are two ways of bulding and running the application, either manually or automagically. The toplevel folder contains a F# project ```Build.fsproj``` which run, will do (almost) all everything automatically. See ```Build.fs``` and [FAKE](https://fake.build/) for more information.

## Working with the application using FAKE

To concurrently run the server and the client components in watch mode use the following command:

```bash
dotnet run
```

Then open `http://localhost:8080` in your browser.

The build project in root directory contains a couple of different build targets. You can specify them after `--` (target name is case-insensitive).

To run concurrently server and client tests in watch mode (you can run this command in parallel to the previous one in new terminal):

```bash
dotnet run -- RunTests
```

Client tests are available under `http://localhost:8081` in your browser and server tests are running in watch mode in console.

Finally, there are `Bundle` and `Azure` targets that you can use to package your app and deploy to Azure, respectively:

```bash
dotnet run -- Bundle
dotnet run -- Azure
```
### Manually work with the application

```bash
npm install
dotnet restore
# In terminal 1
cd src/Server; dotnet run
# In terminal 2
cd src/Client; fable watch --run webpack-dev-server
```
