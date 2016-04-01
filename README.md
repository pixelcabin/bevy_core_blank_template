# Bevy Core Blank Theme Template

Built with Ziplines - see [Ziplines](https://github.com/pixelcabin/ziplines) for more info.

## What is this?
**bevy_core_blank_template** is the template repo for setting up new stores that will use [bevy_core](https://github.com/pixelcabin/bevy_core).

## Setup Instructions
1. Follow [Ziplines Setup Instructions](https://github.com/pixelcabin/ziplines#setup-instructions). If using the `ziplines new` command, pass in `pixelcabin/bevy_core_blank_template` as the third argument to tell Ziplines to install from this repo.

## Day to Day Operation
1. On *dev*, update the `bower.json` version to the newly published version of `bevy_core`
1. Run `grunt:update_bevy_core`
1. Update any variables in `src/scss/_theme_variables.scss` that have changed after updating **bevy_core**
1. Commit
1. Deploy to *uat* for QA, and then to *master* for Production

> NB: Particular care needs to be taken when updates to **bevy_core** introduce changes to the way `theme_variables.scss` works. In most cases, it will require a manual update of the store's `theme_variables.scss` file.

## Versioning
Versioning should match the current version of **bevy_core**

## Contributing
All contributions should be submitted as pull requests; in lieu of a formal styleguide, take care to maintain the existing coding style.

Any questions, please contact the project maintainer [@michaelrshannon](https://github.com/michaelrshannon).
