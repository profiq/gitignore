# .gitignore HUB

[![DeepScan grade](https://deepscan.io/api/teams/22045/projects/25988/branches/821556/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=22045&pid=25988&bid=821556)

## Best .gitignore generator

Generate your project-specific .gitignore: Perfectly crafted for your tech stack

Simple webpage and api to generate .gitignore files for your project.

# API

## Search

- https://gitignore.profiq.com/api/search?query=<search_query>
- Searches for technologies that match the `search_query`
- Returns list of technologies that match the `search_query`

## Result

- https://gitignore.profiq.com/api/result?options=<options_list>&remDupl=<remove_duplicates>
- Generates `.gitignore` file for given options
- `options_list` is a list of technologies separated by comma
- `remove_duplicates` is a boolean value that indicates whether to remove duplicate lines from the result, default is `true`

# Development Guidelines

## Package Management

- Use Yarn as the package manager for this project.
- Make sure to include a `yarn.lock` file in the project repository.
- When adding or updating dependencies, use

```sh
yarn add
```

or respetively

```sh
yarn upgrade
```

## Installation

- Clone the project repository using

```sh
git clone https://github.com/profiq/gitignore
```

- Navigate to the project directory using

```sh
cd gitignore
```

- Clone Toptal templates using

```sh
yarn clone-templates
```

- Install project dependencies using

```sh
yarn install
```

## Development Workflow

- Run the project locally using

```sh
yarn dev
```

- Create a new branch for each feature or bug fix using

```sh
git checkout -b <branch-name>
```

- Commit changes frequently with descriptive commit messages using

```sh
git commit -m "<commit-message>"
```

- Push changes to the remote repository using

```sh
git push origin <branch-name>
```

- Create a pull request for code review and merge into the main branch.
- On every pull request, the code will be automatically tested and deployed to preview environment.

## Testing

- Write unit tests for all new features and bug fixes.
- Run tests using

```sh
yarn test
```

- Make sure all tests pass before merging changes.

## Code Style

- Follow the project's coding conventions and style guide.
- Use a linter to enforce code style rules.
- Format code using

```sh
yarn format
```

- All changed files are also formatted automatically on every commit.

# Templates structure

- For sake of ability to search templates without exact match, `techOptions.json` file is compiled using `update-tech-options/update-list.mjs` script run weekly
- `techOptions.json` is map with keys being possible keywords for search and values actual technology names
- To understand the structure of the templates, please check https://github.com/toptal/gitignore
- To combine templates, patch and stack files and also to deal with link files, the `update-tech-options/update-list.mjs` script generates also `techOptionsFiles.json` file where for each technology there is a list of files that should be combined to get the final template

# CI/CD Workflows and Deployment

## tests

- runs on PR and push to the main branch
- tests building the project
- checks prettier
- runs unit tests

## update-tech-options

- Runs weekly to update `techOptions.json` and `techOptionsFiles.json` files if the template structure changed
- If the structure of the templates changed, new PR is created

## Deploymet

- The project is deployed to Edgio
- organization: profiq
- property: gitignore
- There are 3 deployment workflows for 3 environments: preview, production and dev, each of them has similar steps:
  - checkout the code
  - get node_modules cache
  - install dependencies
  - clone Toptal templates
  - build and deploy the project to the environment
- To deploy project locally using Edgio, run

```sh
edg build && edg run -p
```

## deploy-preview

- runs on every PR to deploy the preview environment
- adds a comment to the PR with the link to the proper preview

## deploy-production

- runs on release to deploy the production environment

## deploy-dev

- runs on every push to the main branch to deploy preview of current state of the main branch
