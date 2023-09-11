import { describe, it, expect } from 'vitest';
import { act, fireEvent, render } from '@testing-library/react';
import { ReadMore } from './ReadMore';

describe('ReadMore', () => {
  const dummyText = 'In the cold war, a lawyer, James B. Donovan is recruited by the CIA and involved in an intense negotiation mission to release and exchange a CIA U-2 spy-plane pilot, Francis G. Powers. The pilot was arrested alive after his plane was shot down by the Soviet Union during a mission and stays in the company of a KGB intelligence officer, Rudolf Abel, who was arrested for espionage in the US.';

  it('should render the component', () => {
    const { getByTestId } = render(<ReadMore>{dummyText}</ReadMore>);
    expect(getByTestId('read-more')).toBeVisible();
  });

  it('should render toggle read more', () => {
    const { getByTestId } = render(<ReadMore>{dummyText}</ReadMore>);
    const readToggle = getByTestId('read-toggle');
    act(() => {
      fireEvent.click(readToggle);
      expect(getByTestId('read-toggle')).toBeVisible();
    })
  });
})
