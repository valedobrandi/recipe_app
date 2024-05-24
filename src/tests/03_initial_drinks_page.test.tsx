import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";



describe('Route "/drinks"', () => {
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('Render all recipes cards', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/drinks' },
    );

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /A1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /ABC/i})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {  name: /A1/i})).toBeInTheDocument();
    expect(screen.getByRole('img', {  name: /ABC/i})).toBeInTheDocument();
  });

  it('"Select By Category" return the correct recipes', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/drinks' },
    );

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(3);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', {  name: /ordinary drink/i}));
    expect(await screen.findByRole('heading', { name: /ordinary drink 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /ordinary drink 2/i})).toBeInTheDocument();

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', {  name: /all/i}));
    expect(await screen.findByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /A1/i})).toBeInTheDocument();
  });
});