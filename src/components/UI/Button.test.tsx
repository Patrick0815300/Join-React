import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from "./Button";

describe('Button Component', () => {
    test('render button correct', () => {
        render(<Button>Test Button</Button>)
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    })

    test('button is clickable', async () => {
        const user = userEvent.setup();
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Test Button</Button>)

        const button = screen.getByText('Test Button');

        await user.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    })

})