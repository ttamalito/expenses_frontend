# Expenses Frontend Development Guidelines

This document provides specific information for developers working on the Expenses Frontend project.

## Build and Configuration Instructions

### Project Structure
The project is organized as follows:
- `ui/`: Frontend React application
- `backend/`: Backend Spring Boot application

### Frontend Setup
The frontend is a React TypeScript application built with Vite. To set up the development environment:

1. Navigate to the `ui` directory:
   ```
   cd ui
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   This will start the development server at http://localhost:3000.

### Build Process
To build the application for production:

1. Navigate to the `ui` directory:
   ```
   cd ui
   ```

2. Run the build command:
   ```
   npm run build
   ```
   This will:
   - Run ESLint to check for code quality issues
   - Run TypeScript type checking
   - Build the application using Vite

The build output will be in the `ui/dist` directory.

### Configuration
The application uses the following configuration files:
- `vite.config.ts`: Vite configuration
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configuration
- `.env`: Environment variables
- `.prettierrc`: Prettier configuration
- `eslint.config.js`: ESLint configuration

## Testing Information

### Testing Setup
The project uses Vitest for testing, along with React Testing Library. The testing configuration is in `vitest.config.ts`.

### Running Tests
To run tests:

1. Navigate to the `ui` directory:
   ```
   cd ui
   ```

2. Run one of the following commands:
   - Run all tests once:
     ```
     npm test
     ```
   - Run tests in watch mode (re-runs when files change):
     ```
     npm run test:watch
     ```
   - Run tests with coverage reporting:
     ```
     npm run test:coverage
     ```

### Adding New Tests
To add new tests:

1. Create a test file with the naming convention `*.test.tsx` or `*.test.ts` next to the file you want to test.

2. Import the necessary testing utilities:
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   ```

3. Write your tests using the describe/it pattern:
   ```typescript
   describe('ComponentName', () => {
     it('should do something specific', () => {
       // Arrange
       render(/* JSX: ComponentToTest prop={value} */);

       // Act
       const element = screen.getByText('Expected Text');

       // Assert
       expect(element).toBeInTheDocument();
     });
   });
   ```

### Example Test
Here's a simple example of a component test:

```typescript
// TestComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestComponent } from './TestComponent';

describe('TestComponent', () => {
  it('renders the text passed as prop', () => {
    // Arrange
    const testText = 'Hello, Test!';

    // Act
    render(/* JSX: TestComponent text={testText} */);

    // Assert
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('renders a button', () => {
    // Arrange
    render(/* JSX: TestComponent text="Any text" */);

    // Act
    const button = screen.getByRole('button', { name: /click me/i });

    // Assert
    expect(button).toBeInTheDocument();
  });
});
```

## Additional Development Information

### Code Style
The project uses ESLint and Prettier for code formatting and linting. To maintain consistent code style:

1. Run the linter:
   ```
   npm run lint
   ```

2. Fix linting issues automatically:
   ```
   npm run fix:lint
   ```

### Type Checking
The project uses TypeScript for type safety. To check types:
```
npm run type-check
```

### API Client Generation
The project uses NSwag to generate TypeScript clients from OpenAPI specifications:
```
npm run nswag
```
This generates client code in `src/models/clients.ts` based on the specification in `src/utils/nswag.json`.

### Path Aliases
The project uses path aliases for cleaner imports:
- `@clients`: Points to `./src/models/clients.ts`
- `@routes`: Points to `./src/routes/routes.ts`

### UI Libraries
The project uses multiple UI component libraries:
- Material UI (MUI) as the primary UI library
- Mantine for specific components

### Bundle Analysis
The project includes a bundle analyzer. To view the bundle analysis report, set `open: true` in the visualizer plugin configuration in `vite.config.ts`.

# Backend Development Guidelines

This section provides specific information for developers working on the Expenses Backend API.

## Backend Architecture

The backend is a Spring Boot application with the following architecture:

### Project Structure
- `src/main/java/`: Contains the Java source code
  - `com.api.expenses`: Main package
    - `rest/`: Contains the REST API components
      - `configuration/`: Configuration classes
      - `controllers/`: REST API controllers
      - `exceptions/`: Exception handling
      - `filters/`: Request/response filters
      - `models/`: Data models/entities
      - `repositories/`: Data access repositories
      - `services/`: Business logic services
      - `utils/`: Utility classes
- `src/main/resources/`: Contains configuration files
  - `application.properties`: Main configuration file
- `src/test/`: Contains test code and resources

## Backend Setup and Configuration

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher

### Database Setup
1. Install MySQL 8.0 or higher
2. Create a database named `dev_expensesdb`
3. Configure the database connection in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/dev_expensesdb
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```

### Building the Backend
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Build the application:
   ```
   mvn clean install
   ```
   This will:
   - Compile the Java code
   - Run tests (if not skipped)
   - Package the application as a JAR file

### Running the Backend
1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Run the application:
   ```
   mvn spring-boot:run
   ```
   This will start the application on port 8080 with the context path `/api`.

3. Alternatively, you can run the JAR file directly:
   ```
   java -jar target/expenses-backend-api-0.0.1-SNAPSHOT.jar
   ```

### Configuration
The application uses the following configuration files:
- `application.properties`: Main configuration file with settings for:
  - Server port and context path
  - Database connection
  - JPA/Hibernate configuration
  - JWT security configuration

## Testing Information

### Testing Setup
The project uses Spring Boot Test for testing. The testing configuration is in the `pom.xml` file.

### Running Tests
By default, tests are skipped during the build process. To run tests:

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Run tests with the `execute-integration-tests` profile:
   ```
   mvn test -Pexecute-integration-tests
   ```

### Adding New Tests
To add new tests:

1. Create a test class in the `src/test/java` directory with the naming convention `*Test.java` or `*IT.java` for integration tests.

2. Use the Spring Boot Test annotations:
   ```java
   @SpringBootTest
   public class MyServiceTest {
       @Autowired
       private MyService myService;

       @Test
       public void testSomething() {
           // Test code
       }
   }
   ```

## API Documentation

The backend uses SpringDoc OpenAPI for API documentation. The API documentation is available at:
- `/api/v3/api-docs`: OpenAPI JSON
- `/api/swagger-ui.html`: Swagger UI (if enabled)

## Security

The backend uses Spring Security with JWT for authentication and authorization. JWT tokens are:
- Generated upon successful authentication
- Valid for 1 day (configurable in `application.properties`)
- Required for accessing protected endpoints

## Development Guidelines

### Code Organization
- Follow the standard Spring Boot project structure
- Use the appropriate package for each component type:
  - Controllers in `controllers` package
  - Services in `services` package
  - Repositories in `repositories` package
  - Models in `models` package
  - etc.

### API Design
- Use RESTful principles for API design
- Use appropriate HTTP methods (GET, POST, PUT, DELETE)
- Use appropriate HTTP status codes
- Use consistent URL patterns
- Document APIs using OpenAPI annotations

### Error Handling
- Use exception handlers to handle exceptions and return appropriate error responses
- Use custom exceptions for specific error cases
- Return appropriate HTTP status codes and error messages

### Database Access
- Use Spring Data JPA for database access
- Use repositories for database operations
- Use entities for database models
- Use DTOs for API request/response objects
