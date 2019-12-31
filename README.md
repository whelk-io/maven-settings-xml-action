# maven-settings-xml-action

Github Action to update maven ~/.m2/settings.xml

## Inputs

### `servers`

**Optional** json array of servers to add to settings.xml.

### `repositories`
**Optional** json array of repositories to add to settings.xml

## Example usage

````yaml
uses: whelk-io/maven-settings-xml-action@v1
with:
  repositories: '[{ "id": "some-repository", "url": "http://some.repository.url" }]'
  servers: '[{ "id": "some-server", "username": "some.user", "password": "some.password" }]'
````

## Local install

````
npm i mocha
npm i @actions/core
npm i xmldom
npm i path
npm i os
````
