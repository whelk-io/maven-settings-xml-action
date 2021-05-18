# maven-settings-xml-action

[![CodeFactor](https://www.codefactor.io/repository/github/whelk-io/maven-settings-xml-action/badge)](https://www.codefactor.io/repository/github/whelk-io/maven-settings-xml-action) ![build-test](https://github.com/whelk-io/maven-settings-xml-action/workflows/build-test/badge.svg)

Github Action to create maven settings (`~/.m2/settings.xml`). 

Supports `<servers>`, `<repositories>`, `<pluginRepositories>`, `<mirrors>`, and `<profiles>`.

## Inputs

### `servers`

**Optional** json array of servers to add to settings.xml.
* **id** - The ID of the server (not of the user to login as) that matches the id element of the repository/mirror that Maven tries to connect to.
* **username**, **password** - These elements appear as a pair denoting the login and password required to authenticate to this server.
* **privateKey**, **passphrase** - Like the previous two elements, this pair specifies a path to a private key (default is `${user.home}/.ssh/id_dsa`) and a `passphrase`, if required. 
* **filePermissions**, **directoryPermissions** - When a repository file or directory is created on deployment, these are the permissions to use. The legal values of each is a three digit number corresponding to *nix file permissions, e.g. 664, or 775.
* **configuration** - Any additional custom configuration for server in JSON format.

Reference: [Maven Settings > Servers](http://maven.apache.org/settings.html#servers)

### `mirrors`

* **id** - The unique identifier of this mirror. The `id` is used to differentiate between mirror elements and to pick the corresponding credentials from the `<servers>` section when connecting to the mirror.
* **mirrorOf** - The `id` of the repository that this is a mirror of. For example, to point to a mirror of the Maven central repository (`https://repo.maven.apache.org/maven2/`), set this element to `central`. More advanced mappings like `repo1,repo2` or `*,!inhouse` are also possible. This must not match the mirror `id`.
* **url** - The base URL of this mirror. The build system will use this URL to connect to a repository rather than the original repository URL.

Reference: [Maven Settings > Mirrors](http://maven.apache.org/settings.html#mirrors)

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

### `plugin_groups`
**Optional** json array of plugin groups to add to settings.xml

Reference: [Maven Settings > Plugin Groups](http://maven.apache.org/settings.html#Plugin_Groups)

### `profiles`
**Optional** json array of profiles to add to settings.xml

The `profile` element in the `settings.xml` is a truncated version of the `pom.xml` `profile` element. It consists of the `activation`, `repositories`, `pluginRepositories` and `properties` elements. The `profile` elements only include these four elements because they concerns themselves with the build system as a whole (which is the role of the `settings.xml` file), not about individual project object model settings.

Reference: [Maven Settings > Profiles](http://maven.apache.org/settings.html#profiles)

## Simple Usage

````yaml
- name: maven-settings-xml-action
  uses: whelk-io/maven-settings-xml-action@v16
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
                </pluginRepository>
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
  uses: whelk-io/maven-settings-xml-action@v16
  with:
    repositories: |
      [
        {
          "id": "some-repository",
          "name": "some-repository-name",
          "url": "http://some.repository.url",
          "releases": {
            "enabled": "true"
          },
          "snapshots": {
            "enabled": "false"
          }
        }
      ]
    plugin_repositories: |
      [
        {
          "id": "some-plugin-repository",
          "name": "some-plugin-repository-name",
          "url": "http://some.plugin.repository.url",
          "releases": {
            "enabled": "true"
          },
          "snapshots": {
            "enabled": "false"
          }
        }
      ]
    servers: |
      [
        {
          "id": "some-id",
          "username": "${env.USER}",
          "password": "${env.PASS}",
          "configuration": {
            "httpConfiguration": {
              "all": {
                "usePreemptive": "true"
              }
            }
          }
        }
      ]
    mirrors: |
      [
        {
          "id": "nexus",
          "mirrorOf": "!my-org-snapshots,*",
          "url": "http://redacted/nexus/content/groups/public"
        }
      ]
    profiles: |
      [
        {
          "id": "foo.profile",
          "name": "foo.profile",
          "url": "http://foo.bar.profile",
          "properties": {
            "foo": "property-1",
            "bar": "property-2"
          }
        }
      ]
    plugin_groups: |
      [ 
        "some.plugin.group.id", 
        "some.other.plugin.group.id"
      ]

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
                </pluginRepository>
            </pluginRepositories>
        </profile>
        <profile>
            <id>foo.profile</id>
            <name>foo.profile</name>
            <url>http://foo.bar.profile</url>
            <properties>
                <foo>property-1</foo>
                <bar>property-2</bar>
            </properties>
        </profile>
    </profiles>
  
    <servers>
        <server>
            <id>foo</id>
            <username>fu</username>
            <password>bar</password>
            <privateKey>${user.home}/.ssh/id_dsa</privateKey>
            <passphrase>some_passphrase</passphrase>
            <filePermissions>664</filePermissions>
            <directoryPermissions>775</directoryPermissions>
            <configuration>
                <httpConfiguration>
                    <all>
                        <usePreemptive>true</usePreemptive>
                    </all>
                </httpConfiguration>
            </configuration>
        </server>
    </servers>
  
    <mirrors>
        <mirror>
            <id>nexus</id>
            <mirrorOf>!my-org-snapshots,*</mirrorOf>
            <url>http://redacted/nexus/content/groups/public</url>
        </mirror>
    </mirrors>
  
    <pluginGroups>
        <pluginGroup>some.plugin.group.id</pluginGroup>
        <pluginGroup>some.other.plugin.group.id</pluginGroup>
    </pluginGroups>
  
</settings>
````
