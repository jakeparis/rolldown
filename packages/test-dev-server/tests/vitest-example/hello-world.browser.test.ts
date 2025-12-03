import { getByText } from '@testing-library/dom';
import { expect, test } from 'vitest';
import HelloWorld from './hello-world.js';

test('renders name', () => {
  const parent = HelloWorld({ name: 'Vitest' });
  document.body.appendChild(parent);

  const element = getByText(parent, 'Hello Vitest!');
  expect(element).toBeInTheDocument();
});
