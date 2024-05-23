import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";



describe('Route "/drinks"', async () => {
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('Router to recipe details after click', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/drinks' },
    );

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('heading', { name: /Aquamarine/i }));
    expect(await screen.findByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {  name: /measures/i})).toBeInTheDocument();
    expect(screen.getByRole('columnheader', {  name: /Ingredient/i})).toBeInTheDocument();
    expect(screen.getByText(/Shake well in a shaker with ice/i));
  });
});