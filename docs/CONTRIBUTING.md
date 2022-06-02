# Contributing to SMSWithoutborders

Thank you for supporting SMSWithoutBorders. Please follow the steps below to get started. This SMSWithoutBorders.com is built with [React](https://reactjs.org/)

Existing features can be found in [FEATURES.md](FEATURES.md);

## Project Structure

We use three main branches in our workflow: [stable(master)](https://github.com/smswithoutborders/smswithoutborders.com/tree/master), [dev](https://github.com/smswithoutborders/smswithoutborders.com/tree/dev) and [testing](https://github.com/smswithoutborders/smswithoutborders.com/tree/testing)

* The [stable](https://github.com/smswithoutborders/smswithoutborders.com/tree/master) branch contains the code for the latest release version of the project
* [dev](https://github.com/smswithoutborders/smswithoutborders.com/tree/dev) is the active development branch. All recent changes and contributions go here
* [testing](https://github.com/smswithoutborders/smswithoutborders.com/tree/testing) is where we try out newly developed features in prepartion for a release.

In summary, we build, test then deploy

## Getting started

Create a fork of the [project](https://github.com/smswithoutborders/smswithoutborders.com)

Switch to the dev branch

```bash
git checkout dev
```

You can confirm you are on the dev branch by running

```bash
git branch
```

 Create the branch you will be working from

 ```bash
git checkout -b <your branch name here>
 ```

## Style Guide

This project was bootstraped with [Create React App](https://github.com/facebook/create-react-app) which specifies environment variable naming conventions.

We use [Redux](https://redux.js.org/) for state management and as such [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) for data fetching and API Calls.

Files are grouped [by type](https://reactjs.org/docs/faq-structure.html) and placed in subfolders under [src](../src). Each subfolder contains an index file for [barrel exports](https://github.com/basarat/typescript-book/blob/master/docs/tips/barrel.md).

We follow the [conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/) for all commits. Please reference this guide when writting commit messages.

## Adding features

Please create a new branch to work on a new feature. That way you can easily roll back if something goes wrong. Once complete open a pull request and we will be happy to review and merge your contribution.

New features are very welcome but should first be discussed with the team for guidance.

New  pages, components and features can be created in their respective folders and linked accordingly. Helper functions can be defined under utils

All routes are defined in App.js and any new routes can be added there.

## Testing

Some parts of the project are inter-connected. Whenever a component in this section gets updated, it is advised to test all other components related to it. Please see the [testing guide](TESTING.md)

## Reporting Issues

New issues can be opened on Github. Please check to make sure it has not been reported before.

## Fixing Issues

When writting commit messages for fixes, please reference the issue being solved by adding the issue number in the commit message like below. [learn more](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue)

```bash
fix:  critical bug in example component, fixes #12
```
