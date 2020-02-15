# maven-settings-xml-action

Github Action to create maven settings (`~/.m2/settings.xml`)

[![CodeFactor](https://www.codefactor.io/repository/github/whelk-io/maven-settings-xml-action/badge)](https://www.codefactor.io/repository/github/whelk-io/maven-settings-xml-action) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=whelk-io/maven-settings-xml-action)](https://dependabot.com)

## Inputs

### `servers`

**Optional** json array of servers to add to settings.xml.

### `repositories`
**Optional** json array of repositories to add to settings.xml

### `plugin_repositories`
**Optional** json array of plugin repositories to add to settings.xml

## Example usage

````yaml
- name: maven-settings-xml-action
  uses: whelk-io/maven-settings-xml-action@v4
  with:
    repositories: '[{ "id": "some-repository", "url": "http://some.repository.url" }]'
    plugin_repositories: '[{ "id": "some-plugin-repository", "url": "http://some.plugin.repository.url" }]'
    servers: '[{ "id": "some-server", "username": "some.user", "password": "some.password" }]'
````

## Example settings.xml

````xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0" 
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                              http://maven.apache.org/xsd/settings-1.0.0.xsd">
  
    <activeProfiles>
        <activeProfile>github</activeProfile>
    </activeProfiles>
  
    <profiles>
        <profile>
            <id>github</id>
            <repositories>
                <repository>
                    <id>central</id>
                    <url>https://repo1.maven.org/maven2</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>false</enabled>
                    </snapshots>
                </repository>
                <repository>
                    <id>some-repository</id>
                    <url>http://some.repository.url</url>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>some-plugin-repository</id>
                    <url>http://some.plugin.repository.url</url>
                </repository>
            </pluginRepositories>
        </profile>
    </profiles>
  
    <servers>
        <server>
            <id>foo</id>
            <username>fu</username>
            <password>bar</password>
        </server>
    </servers>
  
</settings>

````
