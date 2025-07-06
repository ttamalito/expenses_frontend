import {
  Button,
  Container,
  Group,
  List,
  Paper,
  Text,
  Title,
  Accordion,
  Divider,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconChartPie,
  IconCoin,
  IconReportMoney,
  IconUser,
  IconSettings,
} from '@tabler/icons-react';
import classes from './Documentation.module.css';
import { useNavigate } from 'react-router';
import { routes } from '@routes';

/**
 * Documentation page for the Expenses application
 * Provides detailed documentation on how to use the application
 */
function Documentation() {
  const navigate = useNavigate();

  return (
    <Container size="xl">
      {/* Header with back button */}
      <Group className={classes.headerButtons}>
        <Button
          variant="subtle"
          className={classes.navButton}
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => {
            return navigate(routes.home.index);
          }}
        >
          Back to Home
        </Button>
      </Group>

      {/* Hero section */}
      <div>
        <Title className={classes.title}>Expenses App User Guide</Title>
        <Text className={classes.subtitle} c="dimmed">
          Learn how to use all features of the Expenses application to manage
          your finances effectively
        </Text>
      </div>

      {/* Introduction */}
      <Paper shadow="md" p="xl" radius="md" withBorder mt={30}>
        <Text>
          Welcome to the Expenses application! This guide will help you
          understand how to use all the features available in the application.
          Whether you're tracking expenses, monitoring income, analyzing your
          spending patterns, or setting up budgets, this guide has you covered.
        </Text>
      </Paper>

      {/* Getting Started */}
      <Title order={2} className={classes.sectionTitle}>
        Getting Started
      </Title>
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Text mb="md">
          Before you can start using the application, you need to create an
          account and log in:
        </Text>

        <div className={classes.instructionStep}>
          <Text>
            <span className={classes.stepNumber}>1.</span> Click the "Sign Up"
            button on the home page.
          </Text>
        </div>

        <div className={classes.instructionStep}>
          <Text>
            <span className={classes.stepNumber}>2.</span> Fill in your details
            in the registration form and submit.
          </Text>
        </div>

        <div className={classes.instructionStep}>
          <Text>
            <span className={classes.stepNumber}>3.</span> Once registered, log
            in with your credentials.
          </Text>
        </div>

        <div className={classes.instructionStep}>
          <Text>
            <span className={classes.stepNumber}>4.</span> After logging in,
            you'll be taken to the dashboard where you can start using the
            application.
          </Text>
        </div>
      </Paper>

      {/* Main Features */}
      <Title order={2} className={classes.sectionTitle}>
        Main Features
      </Title>

      <Accordion>
        {/* Tracking Expenses */}
        <Accordion.Item value="expenses">
          <Accordion.Control icon={<IconCoin size={20} />}>
            <Text className={classes.featureTitle}>Tracking Expenses</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text className={classes.featureDescription}>
              Record and categorize your daily expenses to understand where your
              money goes.
            </Text>

            <Title order={4} mt="md">
              How to Add an Expense:
            </Title>
            <List withPadding>
              <List.Item>Navigate to the Home page</List.Item>
              <List.Item>Click the "Add Expense" button</List.Item>
              <List.Item>
                Fill in the expense details (amount, date, category,
                description)
              </List.Item>
              <List.Item>Click "Save" to record the expense</List.Item>
            </List>

            <Title order={4} mt="md">
              Managing Expense Categories:
            </Title>
            <List withPadding>
              <List.Item>Go to the Profile page</List.Item>
              <List.Item>Scroll to the "Expense Categories" section</List.Item>
              <List.Item>Add new categories or edit existing ones</List.Item>
              <List.Item>
                Categories help you organize and analyze your spending
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Monitoring Income */}
        <Accordion.Item value="income">
          <Accordion.Control icon={<IconReportMoney size={20} />}>
            <Text className={classes.featureTitle}>Monitoring Income</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text className={classes.featureDescription}>
              Keep track of all your income sources and see your earnings over
              time.
            </Text>

            <Title order={4} mt="md">
              How to Add Income:
            </Title>
            <List withPadding>
              <List.Item>Navigate to the Home page</List.Item>
              <List.Item>Click the "Add Income" button</List.Item>
              <List.Item>
                Fill in the income details (amount, date, category, description)
              </List.Item>
              <List.Item>Click "Save" to record the income</List.Item>
            </List>

            <Title order={4} mt="md">
              Managing Income Categories:
            </Title>
            <List withPadding>
              <List.Item>Go to the Profile page</List.Item>
              <List.Item>Scroll to the "Income Categories" section</List.Item>
              <List.Item>Add new categories or edit existing ones</List.Item>
              <List.Item>
                Categories help you track different income sources
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Visualizing Data */}
        <Accordion.Item value="statistics">
          <Accordion.Control icon={<IconChartPie size={20} />}>
            <Text className={classes.featureTitle}>Visualizing Data</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text className={classes.featureDescription}>
              View detailed charts and statistics to gain insights into your
              financial habits.
            </Text>

            <Title order={4} mt="md">
              Viewing Statistics:
            </Title>
            <List withPadding>
              <List.Item>Navigate to the Statistics page</List.Item>
              <List.Item>
                View summary charts showing your income vs. expenses
              </List.Item>
              <List.Item>See breakdowns of expenses by category</List.Item>
              <List.Item>Track your spending trends over time</List.Item>
            </List>

            <Title order={4} mt="md">
              Monthly and Yearly Views:
            </Title>
            <List withPadding>
              <List.Item>
                Click on "Monthly View" to see data for specific months
              </List.Item>
              <List.Item>
                Click on "Yearly View" to see annual summaries
              </List.Item>
              <List.Item>
                Use the date selectors to navigate between different time
                periods
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Budget Management */}
        <Accordion.Item value="budget">
          <Accordion.Control icon={<IconUser size={20} />}>
            <Text className={classes.featureTitle}>Budget Management</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text className={classes.featureDescription}>
              Create custom budgets tailored to your financial goals and
              lifestyle.
            </Text>

            <Title order={4} mt="md">
              Setting Up a Budget:
            </Title>
            <List withPadding>
              <List.Item>Navigate to the Budget page</List.Item>
              <List.Item>
                Click "Create Budget" to set up a new budget
              </List.Item>
              <List.Item>
                Set budget amounts for different expense categories
              </List.Item>
              <List.Item>
                Specify the time period for your budget (monthly, quarterly,
                etc.)
              </List.Item>
            </List>

            <Title order={4} mt="md">
              Monitoring Budget Performance:
            </Title>
            <List withPadding>
              <List.Item>
                View your budget progress on the Budget page
              </List.Item>
              <List.Item>
                See visual indicators of how your spending compares to your
                budget
              </List.Item>
              <List.Item>
                Get alerts when you're approaching or exceeding budget limits
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>

        {/* Profile Management */}
        <Accordion.Item value="profile">
          <Accordion.Control icon={<IconSettings size={20} />}>
            <Text className={classes.featureTitle}>Profile Management</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Text className={classes.featureDescription}>
              Manage your account settings and customize your experience.
            </Text>

            <Title order={4} mt="md">
              Updating Profile Information:
            </Title>
            <List withPadding>
              <List.Item>Navigate to the Profile page</List.Item>
              <List.Item>Edit your personal information</List.Item>
              <List.Item>Change your password if needed</List.Item>
            </List>

            <Title order={4} mt="md">
              Managing Categories:
            </Title>
            <List withPadding>
              <List.Item>
                Create, edit, or delete expense and income categories
              </List.Item>
              <List.Item>
                Customize categories to match your financial needs
              </List.Item>
            </List>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {/* Tips and Best Practices */}
      <Title order={2} className={classes.sectionTitle}>
        Tips and Best Practices
      </Title>
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <List>
          <List.Item>
            <Text fw={500}>Regular Updates:</Text>
            <Text>
              Enter your expenses and income regularly to maintain accurate
              records.
            </Text>
          </List.Item>
          <Divider my="sm" />

          <List.Item>
            <Text fw={500}>Detailed Descriptions:</Text>
            <Text>
              Add detailed descriptions to your transactions to help you
              remember what they were for.
            </Text>
          </List.Item>
          <Divider my="sm" />

          <List.Item>
            <Text fw={500}>Use Categories Effectively:</Text>
            <Text>
              Create specific categories that match your spending habits for
              better analysis.
            </Text>
          </List.Item>
          <Divider my="sm" />

          <List.Item>
            <Text fw={500}>Review Statistics Regularly:</Text>
            <Text>
              Check your statistics monthly to identify spending patterns and
              areas for improvement.
            </Text>
          </List.Item>
          <Divider my="sm" />

          <List.Item>
            <Text fw={500}>Realistic Budgets:</Text>
            <Text>
              Set realistic budget goals based on your actual income and
              necessary expenses.
            </Text>
          </List.Item>
        </List>
      </Paper>

      {/* Call to action */}
      <Paper shadow="md" p="xl" radius="md" withBorder mt={50} ta="center">
        <Title order={2} mb="md">
          Ready to start managing your finances?
        </Title>
        <Text size="lg" mb="xl">
          Now that you understand how to use the application, it's time to take
          control of your financial future.
        </Text>
        <Group justify="center">
          <Button
            size="lg"
            onClick={() => {
              return navigate(routes.login.index);
            }}
            variant="outline"
          >
            Login
          </Button>
          <Button
            size="lg"
            onClick={() => {
              return navigate(routes.register.index);
            }}
          >
            Create Account
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}

export default Documentation;
