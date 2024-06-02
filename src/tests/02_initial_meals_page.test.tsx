import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";
import meals from "./mock/meals";



describe('Route "/meals"', () => {
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('Render all recipes cards', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    expect(await screen.findAllByRole('heading', { level: 6 })).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Kumpir/i })).toBeInTheDocument();
    const backGroundImages = screen.getAllByTestId('bg-card-image')
    expect(backGroundImages[0])
      .toHaveStyle(`background-image: url(${meals.meals[0].strMealThumb})`)
    expect(backGroundImages[1])
      .toHaveStyle(`background-image: url(${meals.meals[1].strMealThumb})`)
  });

  it('"Select By Category" return the correct recipes', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    expect(await screen.findAllByRole('heading', { level: 6 })).toHaveLength(2);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Breakfast'));
    expect(global.fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`);
    expect(await screen.findByRole('heading', { name: /breakfast 1/i })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /breakfast 2/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByText('Breakfast'));
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Kumpir/i })).toBeInTheDocument();
  });
});