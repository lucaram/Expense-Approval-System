// This is a frontend unit test for the Home page component in page.tsx
// Checks that the React page renders the expected expense form fields, heading, and Create Expense button.

import { render, screen } from '@testing-library/react';
import Home from '../../../frontend/app/page';

describe('Expense Approval System page', () => {
  it('renders the main page heading', () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: 'Expense Approval System',
      })
    ).toBeInTheDocument();
  });

  it('renders the create expense form', () => {
    render(<Home />);

    expect(
      screen.getByLabelText('Employee')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Description')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Amount (£)')
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText('Expense Date')
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Create Expense',
      })
    ).toBeInTheDocument();
  });
});