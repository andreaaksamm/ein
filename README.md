# EIN

A simple custom Ghost theme

### Instructions
1. Download this theme
2. Log into Ghost, and go to the Design settings area to upload the zip file
3. Unzip the theme archive on your computer and locate the file called routes.yaml
4. Inside Ghost admin, go to the Labs settings area and scroll down until you see the Custom Routes section
5. Upload the routes.yaml from this theme

### Config

#### Setup routes
1. Unzip the theme archive on your computer and locate the file called `routes.yaml`
2. Inside Ghost admin, go to the Labs settings area and scroll down until you see the Custom Routes section
3. Upload the `routes.yaml` from this theme

#### Setup members
1. Setup [routes](#setup-routes)
2. Set up <a href="https://ghost.org/docs/members/setup/" target="_blank">members & subscriptions</a>

#### Setup contact pages
1. Setup [routes](#setup-routes)
2. Inside Ghost admin, create a new page with Page URL `contact`
3. Copy your Formspree form's endpoint in the `meta description` inside `Meta data` in the `Page settings`

Your form's endpoint should look something like this:
```
https://formspree.io/xdowqkje
```

#### Setup Disqus

1. Get your disqus [shortname](http://disqus.com/admin/settings/general/).
2. Go to Code injection.
3. Add this to Blog Header:

```javascript
<script>var disqus_shortname = 'YOUR_DISQUS_SHORTNAME';</script>
```

#### Setup search

1. Go to Integrations.
2. Choose Add custom integration, name it ghostSearch and choose Create. Copy the generated Content API Key and API URL.
3. Go to Code injection.
4. Add this to Blog Header:

```javascript
<script>
    var ghostsearch_key = "PASTE_THE_GENERATED_KEY_HERE";
    var ghostsearch_url = "PASTE_THE_GENERATED_URL_HERE";
</script>
```

### Development

#### Bases

**The main files are:**

- `default.hbs` - The main template file
- `index.hbs` - Used for the home page
- `post.hbs` - Used for individual posts
- `page.hbs` - Used for individual pages
- `tag.hbs` - Used for tag archives
- `author.hbs` - Used for author archives

One neat trick is that you can also create custom one-off templates just by adding the slug of a page to a template file. For example:

- `page-about.hbs` - Custom template for the `/about/` page
- `tag-news.hbs` - Custom template for `/tag/news/` archive
- `author-ali.hbs` - Custom template for `/author/ali/` archive

Styles are compiled using Gulp/PostCSS to polyfill future CSS spec. You'll need [Node](https://nodejs.org/), [Yarn](https://yarnpkg.com/) and [Gulp](https://gulpjs.com) installed globally. After that, from the theme's root directory:

```bash
### Install
yarn

# Run build & watch for changes
$ yarn dev
```

Now you can edit `/assets/css/` files, which will be compiled to `/assets/built/` automatically.

The `zip` Gulp task packages the theme files into `dist/<theme-name>.zip`, which you can then upload to your site.

```bash
yarn zip
```

#### PostCSS

- Autoprefixer - Don't worry about writing browser prefixes of any kind, it's all done automatically with support for the latest 2 major versions of every browser.
- [Color Mod](https://github.com/jonathantneal/postcss-color-mod-function)
