import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";



describe('Route "/meals"', () => {
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('Render all recipes cards', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    expect(await screen.findAllByRole('heading', {level: 2})).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /Kumpir/i})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {  name: /Kumpir/i})).toBeInTheDocument();

  
  });
});