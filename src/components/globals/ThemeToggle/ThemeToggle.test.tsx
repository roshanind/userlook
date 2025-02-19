import { render, screen, fireEvent, store, waitFor } from '@testUtils';
import ThemeToggle from '.';
import { toggleTheme } from '@store/slices/app.slice';
import { THEME } from '@constants/app.constants';

describe('ThemeToggle', () => {
  test('renders ThemeToggle component', () => {
    render(<ThemeToggle />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('toggles theme on switch click', () => {
    const dispatchSpy = jest.spyOn(store, "dispatch");

    render(<ThemeToggle />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleTheme());
  });

  test('displays tooltip with correct theme', async () => {
    const currentTheme = store.getState().app.theme;

    render(<ThemeToggle />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.mouseOver(switchElement);

    await waitFor(() => screen.getByText(/Switch to/i));

    expect(screen.getByText(`Switch to ${(currentTheme === THEME.DARK ? 'Light' : 'Dark')} Theme`)).toBeInTheDocument();
  });
});
