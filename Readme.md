
# match-around

  match around a text offset. useful for implementing at-cursor searches.

## Installation

  Install with [component(1)](http://component.io):

    $ component install matthewmueller/match-around

## API

### match(pattern, text, offset)

Match `pattern` against some `text`. Expands from `offset`.

```js
var str = 'hi there';
match('th', str, 5);
```

## License

  MIT
