import { render, screen } from '@testing-library/react';
import InputDuration from './InputDuration';

test('has a title', () => {
    render(<InputDuration />);
    const title_input_duration = screen.getByText('Durée de votre prêt');
    expect(title_input_duration).toBeInTheDocument();
});
