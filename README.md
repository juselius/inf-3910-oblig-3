# INF-3910

This repository contains an (almost) unmodified, vanilla SAFE template.

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

* The [.NET Core SDK](https://www.microsoft.com/net/download)
* [FAKE 5](https://fake.build/) installed as a [global tool](https://fake.build/fake-gettingstarted.html#Install-FAKE)
* The [Yarn](https://yarnpkg.com/lang/en/docs/install/) package manager (you an also use `npm` but the usage of `yarn` is encouraged).
* [Node LTS](https://nodejs.org/en/download/) installed for the front end components.
* If you're running on OSX or Linux, you'll also need to install [Mono](https://www.mono-project.com/docs/getting-started/install/).

### Work with the application

To concurrently run the server and the client components in watch mode use the following command:

```bash
paket install
yarn install
fake build -t run
```
