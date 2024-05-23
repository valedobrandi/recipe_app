import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";



describe('Search Bar', async () => {
  window.Element.prototype.animate = function() {return {} as Animation}
  vi.spyOn(window.Element.prototype, 'animate')
  .mockImplementation(() => { return {} as Animation});
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it('Search by recipe by name', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await userEvent.click(screen.getByRole('img', {  name: /open search bar/i}));
    await userEvent.type(screen.getByRole('searchbox'), 'cake')
    await userEvent.click(screen.getByRole('button', {name: 'Search'}));

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /cake 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /cake 2/i})).toBeInTheDocument();
  });

  it('Search recipe by ingredient', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await userEvent.click(screen.getByRole('img', {  name: /open search bar/i}));
    await userEvent.click(screen.getByRole('checkbox', {  name: /ingredient/i}))
    await userEvent.type(screen.getByRole('searchbox'), 'cake')
    await userEvent.click(screen.getByRole('button', {name: 'Search'}));

    expect(await screen.findAllByRole('heading', {level: 6})).toHaveLength(2);
    expect(screen.getByRole('heading', { name: /cake 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', {  name: /cake 2/i})).toBeInTheDocument();
  });

  it('Search one random recipe', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await userEvent.click(screen.getByRole('img', {  name: /open search bar/i}));
    await userEvent.click(screen.getByRole('checkbox', {  name: /random recipe/i}))
    expect(screen.getByRole('searchbox')).toBeDisabled();
    await userEvent.click(screen.getByRole('button', {name: 'Search'}));


    expect(await screen.findByRole('heading', { name: /detail recipe/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Lentils/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Onion/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Mint/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Thyme/i})).toBeInTheDocument();
  });

  it('Route to recipe details when search return one recipe', async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await userEvent.click(screen.getByRole('img', {  name: /open search bar/i}));
    await userEvent.type(screen.getByRole('searchbox'), 'one cake')
    await userEvent.click(screen.getByRole('button', {name: 'Search'}));


    expect(await screen.findByRole('heading', { name: /detail recipe/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Lentils/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Onion/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Mint/i})).toBeInTheDocument();
    expect(screen.getByRole('cell', {  name: /Thyme/i})).toBeInTheDocument();
  });

  it('Return a window alert when a recipe is not found.', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => 'Receita não encontrada!');
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/meals' },
    );

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
    await userEvent.click(screen.getByRole('img', {  name: /open search bar/i}));
    await userEvent.type(screen.getByRole('searchbox'), 'no recipe')
    await userEvent.click(screen.getByRole('button', {name: 'Search'}));

    expect(window.alert).toHaveBeenCalled();
  });
});