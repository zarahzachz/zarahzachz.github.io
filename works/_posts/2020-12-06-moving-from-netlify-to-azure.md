---
title: "Moving from Netlify to Azure"
draft: false
tags: "azure"
---

When I first launched this website, I configured its hosting and deployment to run through Netlify. I wish I could say I picked Netlify after comparing it to a dozen other competitors, but in reality, I picked it because Netlify was something I was familiar with and using it didn't make me want to kill myself.

Pretty good experiences aside, I recently made the choice to leave Netlify for Azure. The main motivator behind this move being that I want to learn more about Azure and get some firsthand experience actually using it. I just hope this experiment doesn't backfire 😬

## Azure Static Web Apps

Since Azure's a new thing for me, I needed to do some research to figure out what first step I needed to take to leave Netlify. Pretty quickly, I discovered an Azure service called [Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/) that looked like it might do the job.

Currently, Static Web Apps is available in preview mode - meaning it's free, until it's not. This could end up being a very expensive mistake in the end - who knows 💃

Aside from the mystery price, Static Web Apps offers a few features I'm intrigued by: Github integration and serverless functions.

With Github integration, I'm looking forward to having Big Dev<span>&trade;</span> CI/CD pipelines on a personal project. Also, it'll finally give me a reason to play around with Github Actions! 

Serverless functions just sound really cool. I admittedly don't know anything about them, but Azure's got a few serverless services available, so hopefully this move gives me a good excuse to see what they're all about.

## Publishing My Site on Azure

In discovering Azure Static Web Apps, I luckily came across a Microsoft walk-thru on [publishing a Hugo site on Azure](https://docs.microsoft.com/en-us/azure/static-web-apps/publish-hugo).

The first two sections of this guide walk you through a very basic Hugo setup and initializing a Github repo. Since I've already done those two things, I jumped straight to [Deploy your web app](https://docs.microsoft.com/en-us/azure/static-web-apps/publish-hugo#deploy-your-web-app) to, well... deploy my web app.

I was able to follow along pretty easily, making slight modifications to names and stuff here and there with no big issues.

Once I reached the <strong><a href="https://docs.microsoft.com/en-us/azure/static-web-apps/publish-hugo#build">Build</a></strong> step, things diverged slightly. While the guide shows a button reading <strong>Next: Build</strong> in the footer of the resource, I got a new section with a dropdown labeled <strong>Build Presets</strong>.

Selecting **Hugo** from the **Build Presets** dropdown revealed additional dropdowns that once more aligned with the guide. I added the values indicated there to these fields and clicked the **Review + Create**, then **Create** buttons to deploy my static site.

## Setting a Custom Domain

Clicking the preview link from the resource showed me my migration was successful 🎉 However, I wasn't a fan of the generated URL Azure gave me. Luckily, the guide I'd been following linked to another for [adding a custom domain name](https://docs.microsoft.com/en-us/azure/static-web-apps/custom-domain) - just the thing I needed!

This walk-thru provides three options to setting up your custom domain in Azure. I went with the first option, [Map a CNAME record](https://docs.microsoft.com/en-us/azure/static-web-apps/custom-domain#map-a-cname-record). Unfortunately, here's where things got a little prickly for me.

Remember way back when, when I told you I initially configured this site to use Netlify's hosting? Well that little detail was proving to be a nuisance. Since I was using Netlify's DNS, my domain registrar no longer had the ability to create a CNAME record, and I couldn't find *anything* on how to leave Netlify's DNS.

After reading too many guides, I took a stab at what I thought was the right thing to do and **SURPRISE** it worked!

Decoupling Netlify from my registrar (Namecheap, in this case) required two steps (both in Namecheap):

1. From the domain list **Details** page, I changed **Nameservers** from **Custom DNS** to **Namecheap BasicDNS**
2. The **Advanced DNS** tab now had additional options, allowing me to delete the Netlify CNAME and **Add New Record**

Now that Namecheap was devoid of any mention of Netlify, I was able to continue with [Azure's domain guide](https://docs.microsoft.com/en-us/azure/static-web-apps/custom-domain#configure-dns-provider) with no issue. And after waiting about 5 minutes to validate my custom domain, Azure was good to go!

Here's where I note that because Azure Static Web Apps is in preview mode, it doesn't support root domain configuration. There are workarounds documented in the domain guide linked above, but I've chosen to keep things simple and stay with Azure's current capabilities.

## Summary

Having almost no experience using Azure, I was pleasantly surprised by how straight-forward things were. Granted, my setup is incredibly basic, but it was still a good first impression. And I _finally_ got to use Github Actions on something! While my goals at the beginning of all this were relatively small in scale, I'm starting to envision all the fun resources I can hook into my site and I'm genuinely excited for what comes next.
