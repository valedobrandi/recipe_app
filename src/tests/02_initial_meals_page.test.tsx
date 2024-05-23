import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";



describe('Route "/meals"', () => {
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('Render all recipes cards', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /Kumpir/i})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {  name: /Kumpir/i})).toBeInTheDocument();
  });

  it('"Select By Category" return the correct recipes', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(2);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', {  name: /breakfast/i}));
    expect(await screen.findByRole('heading', { name: /breakfast 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /breakfast 2/i})).toBeInTheDocument();

    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', {  name: /all/i}));
    expect(await screen.findByRole('heading', { name: /corba/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /Kumpir/i})).toBeInTheDocument();
  });
});