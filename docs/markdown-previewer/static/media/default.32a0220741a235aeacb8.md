Dorian's Markdown Previewer
=============================

This is a certification project from [freeCodeCamp.org]. It allows you to enter Markdown code in the left pane that will be rendered in the right pane.

Built by [Dorian Ignee]

Abilities
---------
Of course, this previewer can parse all the stuff, that you will use in Markdown.

- You can build unordered lists
- by simply prepending a "-" 
- in front of your line
    - That can even be
        - indented
        - to different
        - levels

1. You can also build
2. ordered lists by
3. prepending a number 
4. and dot to your line.
    1. These can also
    2. be indented.

> You can insert
> blockquotes

You can format your text *italic* or **bold** or even ***italic and bold*** by adding asterisks ("*") around your text. You can even write ~~strike-through~~ text by wrapping your text in double tildes like this: `~~text~~`

The previewer also accepts [links](https://www.youtube.com/watch?v=dQw4w9WgXcQ) in multiple ways. The most common will be these two:
1. writing the url directly behind the link: `[link](https://www.example.com/)`
2. writing the Title in square brackets (`[link]`) and then at some other point in the text, defining the link: `[link]: https://www.example.com/`

Of course, you can also add pictures like this:
![Thumbs-up](https://i.kym-cdn.com/entries/icons/original/000/012/982/039.jpg)

This is done almost similar to a link, but you need to add an exclamation mark before the link: `![Picture Description](https://www.example.com/picture.jpg)`

You can also show code snippets:
```
default export function fooBar() {
    console.log('I am so smart. S-M-R-T');
}
```
And you can show tables

| Nice         | Header     |
| ------------ | ---------- |
| even nicerer | content    |
| in the       | nice table |

[Dorian Ignee]: https://github.com/dorianignee/freeCodeCamp_Challenges
[freeCodeCamp.org]: https://www.freecodecamp.org/learn/front-end-development-libraries/