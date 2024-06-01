import App from "../App"
import Wrapper from "./helpers/context_Wrapper"
import renderWithRouter from "./helpers/render_with_router"
import { screen } from '@testing-library/react'
import { vi } from 'vitest';
import fetch_api from "./mock/fetch";
import userEvent from "@testing-library/user-event";



describe('Route "/drinks"', async () => {
  window.Element.prototype.animate = function () { return {} as Animation }
  vi.spyOn(window.Element.prototype, 'animate')
    .mockImplementation(() => { return {} as Animation });
  vi.spyOn(global, 'fetch').mockImplementation(fetch_api);
  it(`Router to recipe details, start a recipe with "start recipe" and finish with
   "finish recipe btn, check that it add to recipe donne and to favorite recipe`, async () => {
    renderWithRouter(
      <Wrapper>
        <App />
      </Wrapper>,
      { route: '/drinks' },
    );
    localStorage.clear()

    expect(await screen.findAllByRole('heading', { level: 6 })).toHaveLength(3);
    expect(screen.getByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('heading', { name: /Aquamarine/i }));

    expect(await screen.findByRole('heading', { name: /Aquamarine/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /measures/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Ingredient/i })).toBeInTheDocument();
    expect(screen.getByText(/Shake well in a shaker with ice/i));

    const LIKE_BTN = screen.getByAltText(/dislike/i)
    expect(LIKE_BTN).toBeInTheDocument();
    await userEvent.click(LIKE_BTN);
    await userEvent.click(screen.getByRole('button', { name: /start/i }));

    const CHECK_BOX_INGREDIENT = await screen.findAllByRole('checkbox');
    expect(CHECK_BOX_INGREDIENT).toHaveLength(3);

    expect(CHECK_BOX_INGREDIENT[0]).not.toBeChecked();
    expect(CHECK_BOX_INGREDIENT[1]).not.toBeChecked();
    expect(CHECK_BOX_INGREDIENT[2]).not.toBeChecked();

    const FINISH_BTN = screen.getByRole('button', { name: /finish recipe/i });
    expect(FINISH_BTN).toBeDisabled();

    await userEvent.click(CHECK_BOX_INGREDIENT[0]);
    await userEvent.click(CHECK_BOX_INGREDIENT[1]);
    await userEvent.click(CHECK_BOX_INGREDIENT[2]);

    expect(FINISH_BTN).toBeEnabled();
    await userEvent.click(FINISH_BTN);

    expect(await screen.findByText(/aquamarine/i)).toBeInTheDocument();
    expect(await screen.findAllByText(/Done in:/i)).toHaveLength(1);

    await userEvent.click(screen.getByAltText('profile'));
    await userEvent.click(screen.getByText('Favorite Recipe'));

    expect(await screen.findByText(/aquamarine/i)).toBeInTheDocument();
    await userEvent.click(screen.getByAltText(/like/i));
    expect(screen.getByText(/Favorite Recipes/i))
    expect(screen.queryByText(/Aquamarine/i)).not.toBeInTheDocument();

  });
});