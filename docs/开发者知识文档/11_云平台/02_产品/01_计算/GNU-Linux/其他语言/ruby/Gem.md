



## Gemfile

A `Gemfile` is a list of gems required for your site. For a simple Jekyll site it might look something like this:

```ruby
source "https://rubygems.org"

gem "jekyll"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end
```