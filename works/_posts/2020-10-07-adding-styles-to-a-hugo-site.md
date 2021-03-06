---
title: "Adding Styles to a Hugo Site"
draft: false
tags: "hugo"
---

I want to kick things off by saying I'm new to Hugo and struggled figuring out how to add custom styles my site. I wasn't sure if I needed to add styles to `/assets` or `/static`, or if I had to create some kind of Go equivalent of a Gemlock or package.json file to install specific plugins. Did I have to add something like Gulp to run, compile and minify the whole thing? I had so many questions and no idea where to start.

After looking for a general consensus on "the right way" to add styles, I finally found a solution I was thrilled with, but it took testing a few different options to get there. This is kind of a mini-guide to implementing the solution I landed on as well as a review of the other options I encountered along the way.

## Hugo Pipes: The winning solution

Being new to Hugo, I assumed pipes were for more advanced Hugoists. After all, in every "Getting Started" guide I read, not a one of 'em mentioned Hugo Pipes. It actually took me stumbling across [this 'Intro to Hugo' series from JAMstack Boston](https://www.youtube.com/watch?v=u53xfby0EYI&list=PLbWvcwWtuDm1OpcbohZTOwwzmc8SMmlBD) to learn that pipes are kind of like Gulp without all the fuss.

For this site, I knew I wanted to write all my styles in Sass, minify the CSS-compiled version, and hash the file name to prevent some caching issues I encountered. Using pipes, I created a `styles.scss` file in `/assets/css` and put the following code in the `<head>` of my site:

```html
{{ $style := resources.Get "css/styles.scss" }}
{{ $style = $style | toCSS | minify | fingerprint }}
<link rel="stylesheet" href="{{ $style.Permalink }}" />
```

It's important to note that for pipes to work, the file you're targeting *must* exist in `/assets`. After being piped through all the functions you want to use, this file is then copied into `/public` for publishing.

What surprised me about this solution is all the functions I needed were readily available in a fresh install of Hugo. In previous experiences working with static site generators like Jekyll, Middleman, Gatsby and 11ty, I've never encountered such a straight-forward way to get styles set up. In less than 5 minutes, I was able to stand up a style pipeline the way I wanted - and there was no configuration required!

Discovering Hugo Pipes made me realize how powerful this framework is compared to other options I've played with and it made working on my site a complete joy.

## Alternative Options

### Adding a theme

When I first got into Hugo, I found a number of guides that recommended using a pre-built theme to get started. Fortunately, Hugo has [a robust library of themes](https://themes.gohugo.io/) to choose from, and as someone who gets easily distracted by the process of picking colors and making font choices, having a huge variety of well-designed themes at my disposal was pretty appealing. The way I looked at it, I could add a theme now so I could focus on building out my site's content, then customize its appearance later on once I had more to work with. It made sense at the time anyway 😅.

I ended up adding my theme using [a guide I found on Smashing Magazine](https://www.smashingmagazine.com/2020/04/free-developer-blog-hugo-firebase/) that relies on Git submodules to do the job. Now, I don't know if this is the "official way" to add a theme to Hugo, but it got the job done.

Right off the bat, I saw a lot of extra stuff included in the theme that I didn't need. I ended up removing almost all of the options in the config file, and found myself prioritizing the creation of pages I didn't want because I didn't know how to update the navigation. When I did try to make updates, I'd get a flurry of build errors I was unable to resolve. Everything about this felt like **code magic** to me, probably because I didn't have a solid grasp on Hugo basics (or Git submodules for that matter).

This solution probably works best for...

- ...folks who aren't that interested in the code and need something up and running fast.
- ...experienced Hugoists who understand what the template's actually doing and have the means to customize it.

I'm neither of these people, so this wasn't a good solution for me. But I wouldn't rule out revisiting this solution once I have more experience under my belt; These themes appear to be well-made and might offer more instruction on best coding practices and stuff.

### Using a template

While troubleshooting problems I encountered using Hugo themes, I found [a template from Netlify](https://github.com/netlify-templates/victor-hugo), designed to get a Hugo site set up and running quickly on the service. And since my site's hosted on Netlify, I figured this was the "correct" way to build my Hugo site.

Getting this template working required me to fork the project and go from there. You can find more detailed instructions on the project's README, but that's the gist of it. In doing this, I noticed there was **a lot** more going on under the hood compared to adding a theme. For starters, I was now using `npm` commands instead of `hugo` and there were **so many** config files to contend with.

I eventually hit a wall with this option when I found myself neck-deep in Webpack documentation 😱. It turned out the original template had been updated, replacing Gulp with Webpack, and all accompanying documentation and guides were outdated. It was a frustrating and miserable developer experience, but I eventually cobbled together something that worked, just not entirely the way I wanted.

The other issue I ran into was that it seemed like a *very* specific build for Netlify and had so much Javascript in it I could no longer follow along with Hugo documentation or other Hugo guides. I imagine this solution is optimal for someone who's more experienced with intense Javascript builds, but for me it was overkill for what I was trying to accomplish.

## Conclusion

As you can see, there are different approaches for different developer levels when building your Hugo site. If you're interested in learning the framework and creating a custom experience for yourself, I highly recommend using Hugo Pipes. More seasoned developers might get more value out of implementing any of the alternative options I mentioned, but since pipes come with Hugo and are quick and easy to use, I don't know why you wouldn't use them.