import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('has a title', () => {
  render(<App />);
  const page_title = screen.getByRole("heading", { level: 1 });
  expect(page_title).toHaveTextContent('Calcul des mensualités pour un prêt immobilier');
});

test('contains legal notices', () => {
  const { container } = render(<App />);
  const legal_notices_container = container.querySelector("#legal_notices");
  expect(legal_notices_container).toHaveTextContent("Mentions légales :Ce site ne collecte ni cookie ni donnée personnelle.Site hébergé par IONOS");
});

test('contains headers for the parameters', () => {
  render(<App />);
  const text_amount_mortgage = screen.getByText("Montant de votre prêt", { exact: false });
  const text_duration_mortgage = screen.getByText("Durée de votre prêt", { exact: false });
  expect(text_amount_mortgage).toBeInTheDocument();
  expect(text_duration_mortgage).toBeInTheDocument();
});

test('contains a header for the result', () => {
  render(<App />);
  const title_card_result = screen.getByText('Votre mensualité sera de');
  expect(title_card_result).toBeInTheDocument();
});

test('contains text for the result of monthly payment', () => {
  render(<App />);
  const text_result_monthly_payment = screen.getByText('€/mois');
  expect(text_result_monthly_payment).toBeInTheDocument();
});

test('contains text for the cost of the mortgage', () => {
  render(<App />);
  const text_result_monthly_payment_part_one = screen.getByText("Coût du crédit :", { exact: false });
  const text_result_monthly_payment_part_two = screen.getByText("€ dont", { exact: false });
  const text_result_monthly_payment_part_three = screen.getByText("€ d'assurance", { exact: false });
  expect(text_result_monthly_payment_part_one).toBeInTheDocument();
  expect(text_result_monthly_payment_part_two).toBeInTheDocument();
  expect(text_result_monthly_payment_part_three).toBeInTheDocument();
});

test('handle the new value when writing on the input for mortgage', () => {
  const { container } = render(<App />);
  const input_mortgage = container.querySelector('#input_amount_component');
  const slide_mortgage = container.querySelector('#slide_amount_component');
  fireEvent.change(input_mortgage, { target: { value: 100000 } });
  expect(input_mortgage.value).toBe('100000');
  expect(slide_mortgage.value).toBe('100000');
});

test('handle the new value when sliding on the input for mortgage', () => {
  const { container } = render(<App />);
  const slide_mortgage = container.querySelector('#slide_amount_component');
  const input_mortgage = container.querySelector('#input_amount_component');
  fireEvent.change(slide_mortgage, { target: { value: 110000 } });
  expect(input_mortgage.value).toBe('110000');
  expect(slide_mortgage.value).toBe('110000');
});

test('handle the new value when writing on the input for duration', () => {
  const { container } = render(<App />);
  const input_duration = container.querySelector('#input_duration_component');
  const slide_duration = container.querySelector('#slide_duration_component');
  fireEvent.change(input_duration, { target: { value: 10 } });
  expect(input_duration.value).toBe('10');
  expect(slide_duration.value).toBe('10');
});

test('handle the new value when sliding on the input for duration', () => {
  const { container } = render(<App />);
  const slide_duration = container.querySelector('#slide_duration_component');
  const input_duration = container.querySelector('#input_duration_component');
  fireEvent.change(slide_duration, { target: { value: 11 } });
  expect(input_duration.value).toBe('11');
  expect(slide_duration.value).toBe('11');
});

test('handle the new value when writing on the input for interest rate', () => {
  const { container } = render(<App />);
  const input_rate_interest = container.querySelector('#rate_interest');
  fireEvent.change(input_rate_interest, { target: { value: 1.5 } });
  expect(input_rate_interest.value).toBe('1.5');
});

test('handle the new value when writing on the input for insurance rate', () => {
  const { container } = render(<App />);
  const input_rate_insurance = container.querySelector('#rate_insurance');
  fireEvent.change(input_rate_insurance, { target: { value: 0.8 } });
  expect(input_rate_insurance.value).toBe('0.8');
});

test('handle the result due to all the parameters, by writing', () => {
  const { container } = render(<App />);
  const input_mortgage = container.querySelector('#input_amount_component');
  const input_duration = container.querySelector('#input_duration_component');
  const input_rate_interest = container.querySelector('#rate_interest');
  const input_rate_insurance = container.querySelector('#rate_insurance');
  const result_montly_payment = container.querySelector('#result_mortgage');
  const result_cost = container.querySelector('#result_cost');
  const result_insurance = container.querySelector('#result_insurance');
  fireEvent.change(input_mortgage, { target: { value: 150000 } });
  fireEvent.change(input_duration, { target: { value: 15 } });
  fireEvent.change(input_rate_interest, { target: { value: 1.8 } });
  fireEvent.change(input_rate_insurance, { target: { value: 0.9 } });
  expect(input_mortgage.value).toBe('150000');
  expect(input_duration.value).toBe('15');
  expect(input_rate_interest.value).toBe('1.8');
  expect(input_rate_insurance.value).toBe('0.9');
  expect(result_montly_payment).toHaveTextContent('1064');
  expect(result_cost).toHaveTextContent('41521');
  expect(result_insurance).toHaveTextContent('20250');
});

test('handle the result due to all the parameters, by sliding', () => {
  const { container } = render(<App />);
  const slide_mortgage = container.querySelector('#slide_amount_component');
  const slide_duration = container.querySelector('#slide_duration_component');
  const input_rate_interest = container.querySelector('#rate_interest');
  const input_rate_insurance = container.querySelector('#rate_insurance');
  const result_montly_payment = container.querySelector('#result_mortgage');
  const result_cost = container.querySelector('#result_cost');
  const result_insurance = container.querySelector('#result_insurance');
  fireEvent.change(slide_mortgage, { target: { value: 180000 } });
  fireEvent.change(slide_duration, { target: { value: 20 } });
  fireEvent.change(input_rate_interest, { target: { value: 1.6 } });
  fireEvent.change(input_rate_insurance, { target: { value: 0.7 } });
  expect(slide_mortgage.value).toBe('180000');
  expect(slide_duration.value).toBe('20');
  expect(input_rate_interest.value).toBe('1.6');
  expect(input_rate_insurance.value).toBe('0.7');
  expect(result_montly_payment).toHaveTextContent('981');
  expect(result_cost).toHaveTextContent('55652');
  expect(result_insurance).toHaveTextContent('25200');
});