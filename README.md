# Userlook

Welcome to the **Userlook** project! This is a Frontend (FE) development project that demonstrates various libraries and tools that can be used to build a modern web application. This project is highly opinionated, and while there are many other libraries and tools you could use to bootstrap a frontend project, this serves as a starting point for developers seeking guidance.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Developer Experience (DX)](#dx)
3. [Project Structure](#project-structure)
4. [Path Aliases in `tsconfig.app.json`](#path-aliases-in-tsconfigjson)
5. [State Management with RTK and RTK Query](#state-management-with-rtk-and-rtk-query)
6. [UI with Material-UI and Theme Customization](#ui-with-material-ui-and-theme-customization)
7. [Testing](#testing)

---

## Quick Start

This project uses **Vite** for fast development and build processes. Follow the steps below to get started:

### 1. Install Dependencies

Run the following command to install all required dependencies:

```bash
pnpm install
```

### 2. Start Development Server

To start the development server and view the project in your browser, run:

```bash
pnpm start
```

#### Other Commands

##### 3. Build for Production

To build the app for production (using TypeScript and Vite), run:

```bash
pnpm run build
```

This will compile the TypeScript code and bundle the app for production.

##### 4. Preview Production Build

To preview the production build locally, run:

```bash
pnpm run preview
```

##### 5. Lint Code

To run ESLint and check for code quality issues, run:

```bash
pnpm run lint
```

##### 6. Run Tests

To run the tests with Jest, use:

```bash
pnpm run test
```

---

## Developer Experience (DX)

Developer experience is a key focus for any project. DX refers to the overall experience of developers interacting with tools, processes, and environments throughout the software development lifecycle. The goal is to make the development process smoother, more efficient, and more enjoyable.

In this project, the following tools have been used to improve the DX:

- **[Prettier](https://prettier.io/)**: An opinionated code formatter that ensures consistent style across your codebase.
- **[EditorConfig](https://editorconfig.org/)**: Maintains consistent coding styles for multiple developers working on the same project.
- **[ESLint](https://eslint.org/)**: A static code analysis tool to identify and fix issues in JavaScript and TypeScript code.
- **[Husky](https://typicode.github.io/husky/#/)**: Manages Git hooks, allowing checks before commits or pushes.
- **[Commitlint](https://commitlint.js.org/)**: Ensures commit messages follow a defined convention for consistency.
- **[Commitizen](https://github.com/commitizen/cz-cli)**: Helps you write standardized commit messages in a conventional format.
- **[GitHub Actions](https://github.com/features/actions)**: A CI/CD platform for automating workflows such as testing, building, and deploying code.

---

## Project Structure

```
.
└── src/
    ├── components/
    │   ├── globals
    │   ├── layouts
    │   ├── pages
    │   └── ui
    ├── constants
    ├── utils
    ├── store
    ├── types
    ├── contextProviders
    └── store/
        └── slices
```

- **components**: Contains all the React components used in the project.
  - **globals**: Global components used across the application (e.g., Header, Footer).
  - **layouts**: Layout components that define the structure of pages.
  - **pages**: Page components representing different routes.
  - **ui**: Reusable UI components (e.g., buttons, inputs).

- **constants**: Contains constant values used throughout the project. When naming files, please use `<file_name>.constant.ts`. This helps developers easily identify files through IntelliSense.

- **utils**: Utility functions and helpers. When naming files, please use `<file_name>.util.ts`.

- **store**: Redux store configuration and slices.
  - **slices**: Redux slices for managing state. When naming files, please use `<file_name>.slice.ts`.

- **types**: TypeScript type definitions. When naming files, please use `<file_name>.types.ts`.

- **contextProviders**: Context providers for managing global state.

> **Why a separate folder for types?**  
> This is an opinionated decision. I prefer keeping all types in one place to avoid duplication and ensure consistency. This approach helps prevent type mismatches across the project.

---

## Path Aliases in `tsconfig.json`

In this project, TypeScript path aliases are configured to simplify imports and create a more organized and readable code structure. These aliases are defined in the `tsconfig.app.json` file, allowing you to refer to specific folders or files using short, intuitive paths instead of relative file paths.

### Path Aliases Setup

Here’s how the aliases are set up in the `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ui": ["src/components/ui/index"],
      "@ui/*": ["src/components/ui/*"],
      "@store/*": ["src/store/*"],
      "@type/*": ["src/types/*"],
      "@globals/*": ["src/components/globals/*"],
      "@pages/*": ["src/components/pages/*"],
      "@layouts/*": ["src/components/layouts/*"],
      "@utils/*": ["src/utils/*"],
      "@constants/*": ["src/constants/*"],
      "@hooks/*": ["src/hooks/*"],
      "@providers/*": ["src/contextProviders/*"],
      "@testUtils": ["src/test-utils.tsx"]
    }
  }
}
```

### Example Usage

With these aliases in place, you can import components or modules like this:

```typescript
import { Button } from '@ui'; // Points to src/components/ui/index.tsx
import { useFetchUsersQuery } from '@store/slices/users.slice'; // Points to src/store/slices/users.slice.ts
import { User } from '@type/user.types'; // Points to src/types/users.types.ts
```

### Pros of Using Path Aliases

1. **Cleaner Imports**:  
   Path aliases eliminate the need for long and complex relative imports. Instead of navigating through multiple `../` directories, you can use short, meaningful paths like `@utils`, `@ui`, etc.

2. **Easier Refactoring**:  
   If you need to move or restructure your files, you only need to update the alias path in one place (the `tsconfig.json` file), rather than updating all import statements across the project.

3. **Improved Readability**:  
   Aliases make it easier to understand the origin of an imported file/module. It becomes clear which part of the project the import belongs to (e.g., `@store` for store-related files).

4. **Consistent File Access**:  
   With aliases, all team members use the same path structure, leading to consistency across the project.

5. **Better Organization**:  
   Aliases help organize your project by logically grouping related files under the same alias (e.g., `@hooks`, `@layouts`), which improves the overall project structure.

### Cons of Using Path Aliases

1. **Potential IDE Configuration Issues**:  
   Some IDEs or text editors may not automatically recognize the aliases unless they are properly configured. This may require additional setup in your development environment to make the IDE aware of the aliases.

2. **Dependency on `tsconfig.json`**:  
   If someone isn't familiar with the alias setup, they might struggle to find the source of an import, as the alias could obscure the actual file path. This can be confusing for new developers.

3. **Tooling Compatibility**:  
   While most modern tools (like Webpack, Jest, etc.) support path aliases, older or poorly configured tools may not. This can sometimes cause issues with builds, testing, or deployment unless the toolchain is properly set up to handle the aliases.

4. **Complexity in Large Projects**:  
   For very large projects, overuse of aliases can make it harder to track where certain modules are coming from, especially if aliases are used too generically (e.g., `@models`, `@services`, etc.). It's important to keep the alias structure organized to avoid confusion.

---

## State Management with RTK and RTK Query

This project uses **[Redux Toolkit (RTK)](https://redux-toolkit.js.org/)** for state management and **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)** for handling data fetching and caching. RTK simplifies Redux development and provides a standardized approach to managing application state.

### Why RTK + RTK Query?

- **Redux Toolkit (RTK)** simplifies Redux setup with utilities that reduce boilerplate and improve the developer experience.
- **RTK Query** is a powerful data fetching and caching tool integrated with Redux, offering automatic caching, pagination, and optimistic updates.

### Key Features of RTK and RTK Query:

- **Automatic Caching**: RTK Query caches responses by default, reducing redundant requests.
- **Built-in Hooks**: RTK Query generates React hooks like `useGetPostsQuery` to simplify component logic.
- **Pagination Support**: Easily handle paginated data.
- **Optimistic Updates**: Automatically update the UI when data is being modified.

---

## UI with Material-UI and Theme Customization

This project uses **[Material-UI](https://mui.com/)** for building the user interface. Material-UI is a popular React UI framework that provides a set of accessible, customizable components, along with a powerful theming system that allows you to adjust the look and feel of the entire app.

### Why Material-UI?

- **Pre-built components**: Material-UI provides a wide range of components that follow Google’s Material Design guidelines.
- **Customizable themes**: You can easily customize Material-UI components using themes.
- **TypeScript support**: Material-UI provides excellent TypeScript support, making it easier to work with in typed projects.

### Theme Customization with `createTheme`

Material-UI's `createTheme` function allows you to define a custom theme and apply it globally across the project. You can customize properties like colors, typography, spacing, and more.

#### Extending the theme

Theme files are situated in `src/components/ui/theme` folder.

- **`GlobalStyles.tsx`**: Used for global styles that affect all components or overrides.
- **`index.ts`**: Contains two theme objects (light and dark). When changing colors or overriding Material component styles, use the `theme` object to avoid hard-coding colors.

Try to leverage Material UI's style overriding capabilities to reduce duplicate styles and maintain consistency throughout the application.

---

## Testing

This project uses **[Jest](https://jestjs.io/)** and **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** for testing. These tools are chosen for their ease of use, seamless integration, and ability to write clear, maintainable tests.

### Why Jest + React Testing Library?

- **Jest** is a zero-config, all-in-one testing framework with built-in assertions and mocks.
- **React Testing Library** encourages testing components the way a user would interact with them, focusing on behavior over implementation details.

### Example Test

Here’s a simple example of how to write a test for a React component:

```javascript
// MyComponent.js
import React from 'react';

const MyComponent = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

export default MyComponent;
```

```javascript
// MyComponent.test.js
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders the name prop', () => {
  render(<MyComponent name="John" />);
  const element = screen.getByText(/Hello, John!/i);
  expect(element).toBeInTheDocument();
});
```

This test renders the `MyComponent` and checks that it displays the text based on the `name` prop.