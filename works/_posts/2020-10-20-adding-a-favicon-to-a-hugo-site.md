---
title: "Adding a Favicon to a Hugo Site"
draft: false
tags: "hugo"
---

In the past, adding a favicon to your site used to be a fairly involved process that required making about a dozen different-sized assets to support all the browser-device combinations out there. But now that [modern browsers support SVG](https://caniuse.com/link-icon-svg), things have gotten *much* simpler. That's because an SVG, or scalable vector graphic, allows you to scale your image to any size without loss of quality, so one SVG can go a long way.

On BitsPlease, I made and implemented my own favicon and I'm going to walk through the steps I took to do that. I should note, however, that I'm not providing a fallback for older browsers that don't support SVG - and that's because this is my website and I can do what I want.

## How do you get an SVG?

In order to add an SVG favicon to your site, you gotta have the SVG assets. Here, you've got a few options: 

- You could ask a friend or relative to make you one
- You could find an SVG somewhere in the public domain
- You could make your own

### Inkscape

Since I don't have super in-depth knowledge of [the SVG API](https://developer.mozilla.org/en-US/docs/Web/SVG) and because I'm a cheapskate, I opted to make my own using the free, vector editing program [Inkscape](https://inkscape.org/).

This was my first time using Inkscape, but I did have experience using Adobe Illustrator from way back in the day that definitely helped me out. If you're brand new to using any vector-editing programs don't worry - there are [resources out there to help you](https://inkscape.org/learn/)!

Back in Inkscape, I start by making a canvas that's 180 pixels square to work within and used the pen tool to create my image. I'll explain the reasoning behind the canvas size in a bit, but first, I want to highlight some tips for any new folks working with vectors:

- Favicons are always tiny (under 180px), so hyper-realistic detail isn't needed
- The less points you add with your pen tool, the smoother your lines will be
- Keep track of the number of objects you create - the less objects you have, the more optimized your SVG will be
- Adding descriptive names to each of those objects will help a bunch when you need to edit your image

Once you have an image you're happy with, you'll need to save three different versions to your project's `/static` folder: `favicon.svg`, `mask-icon.svg`, and `apple-touch-icon.png`. After creating each file, you should run your SVG code through [OMGSVG](https://jakearchibald.github.io/svgomg/) to pull out any unused bits of code, thereby reducing your image size.

#### `favicon.svg`

This is your default favicon image that will show up in all modern browsers (save for Safari). No special treatment's necessary here, just SAVE AS... `favicon.svg` and you're done.

#### `apple-touch-icon.png`

Because you don't need to modify the look of your image for this one, I found saving your Apple touch favicon is the next best step.

For this image, make sure you have a **transparent background** and your image is **within 180 pixels square**. 

If you're working in Inkscape, you'll need to export your file by clicking FILE > EXPORT PNG IMAGE. A new panel will open, allowing you to adjust the image size and specify a Filename for your image. This filename should be `apple-touch-icon.png`.

#### `mask-icon.svg`

This image is specific for Safari and has the annoying requirement that **the image must has to be one color - that being black**. It also needs to have a transparent background, but that's less annoying.

> Modifying your favicon's color is the one reason I highlighted naming your objects - it's much easier modifying specific parts of your image when you can reference them by name.

After you've edited your image for the last time, click SAVE AS... and save your image as `mask-icon.svg`.

## How do you add your favicon to Hugo?

It turns out you only need three lines of code to implement your favicon in Hugo.

For this site, I added the following lines of code to the global `<head>` element. In my case, this all lives in the `baseof.html` layout file.

```html
<link rel="icon" href="/favicon.svg">
<link rel="mask-icon" href="/mask-icon.svg" color="#000000">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

Here's a run-down of what each line's doing:

1. The SVG sourced to this line of code acts as a generic fallback for most modern browsers. The exception to this being Safari, which is explained in the next two lines of code.
2. This line of code is different from the previous one in a few ways. For starters, `rel` needs to be set to "mask-icon" - without it, Safari will render the first letter of your domain name. The SVG sourced here must also only use the color black. The `color` attribute is unique here and supports text value (i.e., "greenyellow"), hex, or RGB values. This attribute determines the color you want to use on hover and for the active state of a pinned tab.
3. This line's specifically for Apple touch devices, which explains the use of "apple-touch-icon" on the `rel`. It's also the only line sourcing a PNG, which must be within a 180px square image. You can see this favicon in use when pinning or favoriting a tab in any Apple touch environment.

I also want to stress that all the favicon images sourced above live within `/static` of this project.

## Conclusion

As you can see, with a little bit of effort, adding a favicon's not that intimidating. I went super basic with my implementation, but SVGs are pretty flexible and you can do pretty much anything you can think of with 'em. I'd encourage you to give it a try!
