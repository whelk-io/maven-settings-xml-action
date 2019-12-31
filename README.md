# maven-settings-xml-action

Github Action to update maven ~/.m2/settings.xml

## Inputs

### `servers`

**Optional** json array of servers to add to settings.xml.

### `repositories`
**Optional** json array of repositories to add to settings.xml

## Example usage

````yaml
- name: maven-settings-xml-action
  uses: whelk-io/maven-settings-xml-action@v2
  with:
    repositories: '[{ "id": "some-repository", "url": "http://some.repository.url" }]'
    servers: '[{ "id": "some-server", "username": "some.user", "password": "some.password" }]'
````
