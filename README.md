# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1
with:
  who-to-greet: 'Mona the Octocat'

-----


## NPM Install
npm i @actions/core
npm i @actions/github
npm i os
npm i fs
npm i path 
npm i xmldom
