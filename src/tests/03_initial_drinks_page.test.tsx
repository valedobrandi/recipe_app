import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";
import drinks from "./mock/drinks";



describe('Route "/drinks"', () => {
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('1 - Render all recipes cards', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/drinks' },
    );

    expect(await screen.findAllByRole('heading', { level: 6 })).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /A1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ABC/i })).toBeInTheDocument();
    const backGroundImages = screen.getAllByTestId('bg-card-image')
    expect(backGroundImages[0])
      .toHaveStyle(`background-image: url(${drinks.drinks[0].strDrinkThumb})`)
    expect(backGroundImages[1])
      .toHaveStyle(`background-image: url(${drinks.drinks[1].strDrinkThumb})`)
    expect(backGroundImages[2])
      .toHaveStyle(`background-image: url(${drinks.drinks[2].strDrinkThumb})`)
  });

  it('2 - "Select By Category" return the correct recipes', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/drinks' },
    );

    expect(await screen.findAllByRole('heading', { level: 6 })).toHaveLength(3);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Ordinary Drink'));
    expect(await screen.findByRole('heading', { name: /ordinary drink 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /ordinary drink 2/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Ordinary Drink'));
    expect(await screen.findByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /A1/i })).toBeInTheDocument();
  });
});