---
title: "Syntax Highlighting on Hugo"
draft: false
tags: "hugo"
---

As I was writing some of this site's posts, I realized I was going to need a code highlighter to make some stuff more readable. Lucky for me, Hugo comes equipped with its own syntax highlighter, Chroma, built using Go.

But just because Hugo comes with its own highlighter doesn't mean you don't have to do a few steps to get it working. To get my syntax highlighting working, I needed to do two things: 

1. Generate a Chroma-specific stylesheet
2. Update my config file

## Generate your stylesheet

To generate syntax highlighting styles, you just need to run the following command in your terminal:

```bash
hugo gen chromastyles --style=monokai > syntax.css
```

Breaking this command down, the `--style` flag specifies the theme you want for your syntax highlighting. In this case, the theme monokai is being applied, but you can replace it with any theme of your choice. There are [a bunch of available alternatives](https://xyproto.github.io/splash/docs/) to choose from. 

The last part of this command (the `syntax.css` part) is the name of the file being generated. If you run this command as-is, it will generate a CSS file called syntax at the root of your project. You can change this part to generate a file in a specific directory, with a completely different filename and extension. For instance, you could run 

```bash
hugo gen chromastyles --style=monokai > assets/css/highlighter.scss
```

and it would generate a Sass file named highlighter in `assets/css/`. Just remember that wherever you generate your styles, you still have to add them to your project. You can do this by linking the stylesheet in the `<head>` of your website or by importing it into your main CSS/Sass file.

## Update your config

In `config.toml`, I needed to enable two settings: `pygmentsUseClasses`, to apply Chroma classnames to my code examples, and `pygmentsCodefences`, to apply Chroma classnames to the code written within Markdown fences, or the triple backtick syntax.

My updated config file looked something like this:

```yaml
pygmentsUseClasses = true
pygmentsCodefences = true
```

> **Troubleshooting Tip:** I do want to point out that it was here where I experienced a little bit of a hiccup. I was able to see my highlighting styles correctly locally, but the moment I published my work to Netlify those styles were suddenly gone. This was resolved by including `pygmentsCodefences`, something I initially hadn't done. So if you encounter something similar, check that this setting is enabled.

While you can easily see if your Chroma theme is being applied to your code blocks, the best way to test if you've successfully implemented it is by checking your developer tools when running your site locally. You should see something that looks like this:

```html
<div class="highlight">
  <pre class="chroma">
    <code class="language-<LANG CODE>" data-lang="<LANG>">
      All your code here...
    </code>
  </pre>
</div>
```

You can find [the complete list of supported Chroma highlighting keywords here](https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages).
