import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input Component', () => {
    test('renders input with placeholder and img', () => {
        render(
            <Input
                placeholder="Type here"
                imgSrc="/icon.svg"
                imgAlt="icon"
            />
        );
        // Input
        const input = screen.getByPlaceholderText('Type here');
        expect(input).toBeInTheDocument();
        // Img
        const img = screen.getByAltText('icon');
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/icon.svg');
    });

    test('allows user to type', async () => {
        const user = userEvent.setup();
        render(<Input placeholder="E-Mail" />);
        const input = screen.getByPlaceholderText('E-Mail');
        await user.type(input, 'test@example.com');
        expect(input).toHaveValue('test@example.com');
    });

    test('calls onChange handler', async () => {
        const user = userEvent.setup();
        const handleChange = jest.fn();
        render(<Input placeholder="Test" onChange={handleChange} />);
        const input = screen.getByPlaceholderText('Test');
        await user.type(input, 'abc');
        // onChange for each character
        expect(handleChange).toHaveBeenCalledTimes(3);
    });

    test('applies disabled, readOnly and required', () => {
        render(<Input placeholder="Entry" disabled readOnly required />);
        const input = screen.getByPlaceholderText('Entry');
        expect(input).toBeDisabled();
        expect(input).toHaveAttribute('readonly');
        expect(input).toBeRequired();
    });

    test('forwards ref to input', () => {
        const ref = React.createRef<HTMLInputElement>();
        render(<Input placeholder="R" ref={ref} />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    })
});
