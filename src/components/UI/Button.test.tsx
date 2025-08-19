import { render, screen } from '@testing-library/react';
import Button from "./Button.tsx";

describe('Button Component', () => {
    test('render button correct', () => {
        render(<Button>Test Button</Button>)
        expect(screen.getByText('Test Button')).toBeInTheDocument();
    })
})