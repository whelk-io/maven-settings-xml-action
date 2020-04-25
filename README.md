# maven-settings-xml-action

[![CodeFactor](https://www.codefactor.io/repository/github/whelk-io/maven-settings-xml-action/badge)](https://www.codefactor.io/repository/github/whelk-io/maven-settings-xml-action) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=whelk-io/maven-settings-xml-action)](https://dependabot.com)

Github Action to create maven settings (`~/.m2/settings.xml`). 

Supports `<servers>`, `<repositories>`, and `<pluginRepositories>`.

## Inputs

### `servers`

**Optional** json array of servers to add to settings.xml.
* **id** - The ID of the server (not of the user to login as) that matches the id element of the repository/mirror that Maven tries to connect to.
* **username** - Required to authenticate to this server.
* **password** - Required to authenticate to this server.

Reference: [Maven Settings > Servers](http://maven.apache.org/settings.html#servers)

### `repositories`
**Optional** json array of repositories to add to settings.xml
* **id** - The ID of the repository that matches the id element of the server.
* **name** - Name of the repository.
* **url** - URL to connect to repository.
* **releases.enabled** - Enable release policy.
* **snapshots.enabled** - Enable snapshot policy.

Reference: [Maven Settings > Plugin Repositories](http://maven.apache.org/settings.html#repositories)

### `plugin_repositories`
**Optional** json array of repositories to add to settings.xml
* **id** - The ID of the repository that matches the id element of the server.
* **name** - Name of the repository.
* **url** - URL to connect to repository.
* **releases.enabled** - Enable release policy.
* **snapshots.enabled** - Enable snapshot policy.

Reference: [Maven Settings > Repositories](http://maven.apache.org/settings.html#Plugin_Repositories)

## Simple Usage

````yaml
- name: maven-settings-xml-action
  uses: whelk-io/maven-settings-xml-action@v4
  with:
    repositories: '[{ "id": "some-repository", "url": "http://some.repository.url" }]'
    plugin_repositories: '[{ "id": "some-plugin-repository", "url": "http://some.plugin.repository.url" }]'
    servers: '[{ "id": "some-server", "username": "some.user", "password": "some.password" }]'
````

## Simple settings.xml

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

## Full Usage

````yaml
- name: maven-settings-xml-action
  uses: whelk-io/maven-settings-xml-action@v4
  with:
    repositories: '[{ "id": "some-repository", "name": "some-repository-name", "url": "http://some.repository.url", "releases": { "enabled": "true" }, "snapshots": { "enabled": "false" } }]'
    plugin_repositories: '[{ "id": "some-plugin-repository", "name": "some-plugin-repository-name", "url": "http://some.plugin.repository.url", "releases": { "enabled": "true" }, "snapshots": { "enabled": "false" }}]'
    servers: '[{ "id": "some-server", "username": "some.user", "password": "some.password" }]'
````

## Full settings.xml

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
                    <name>some-repository-name</name>
                    <url>http://some.repository.url</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>false</enabled>
                    </snapshots>
                </repository>
            </repositories>
            <pluginRepositories>
                <pluginRepository>
                    <id>some-plugin-repository</id>
                    <name>some-plugin-repository-name</name>
                    <url>http://some.plugin.repository.url</url>
                    <releases>
                        <enabled>true</enabled>
                    </releases>
                    <snapshots>
                        <enabled>false</enabled>
                    </snapshots>
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
