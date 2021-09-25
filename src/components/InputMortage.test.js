import { render, screen } from '@testing-library/react';
import InputMortgage from './InputMortgage';

test('has a title', () => {
    render(<InputMortgage />);
    const title_input_mortgage = screen.getByText('Montant de votre prêt');
    expect(title_input_mortgage).toBeInTheDocument();
});