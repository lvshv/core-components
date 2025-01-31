import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Textarea } from './index';

describe('Textarea', () => {
    describe('Snapshots tests', () => {
        it('should match snapshot', () => {
            const { container } = render(<Textarea value='value' nativeScrollbar={true} />);

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with default counter', () => {
            const { container } = render(
                <Textarea
                    value='value'
                    showCounter={true}
                    maxLength={500}
                    nativeScrollbar={true}
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with custom counter', () => {
            const { container } = render(
                <Textarea
                    nativeScrollbar={true}
                    value='value'
                    showCounter={true}
                    maxLength={500}
                    getCounterText={() => 'Custom counter'}
                />,
            );

            expect(container).toMatchSnapshot();
        });

        it('should match snapshot with custom scrollbar', () => {
            const { container } = render(<Textarea nativeScrollbar={false} value='value' />);

            expect(container).toMatchSnapshot();
        });
    });

    it('should forward ref to textarea', () => {
        const textareaRef = jest.fn();
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Textarea ref={textareaRef} dataTestId={dataTestId} />);

        expect(textareaRef.mock.calls).toEqual([[getByTestId(dataTestId)]]);
    });

    it('should set `data-test-id` attribute to textarea', () => {
        const dataTestId = 'test-id';
        const { getByTestId } = render(<Textarea block={true} dataTestId={dataTestId} />);

        expect(getByTestId(dataTestId).tagName).toBe('TEXTAREA');
    });

    describe('Classes tests', () => {
        it('should set `className` class to form-control wrapper', () => {
            const { container } = render(<Textarea className='test-class' />);

            expect(container.querySelector('.test-class')).toHaveClass('component');
        });

        it('should set `textareaClassName` class to textarea', () => {
            const dataTestId = 'test-id';
            const className = 'test-class';
            const { getByTestId } = render(
                <Textarea textareaClassName={className} dataTestId={dataTestId} />,
            );

            expect(getByTestId(dataTestId)).toHaveClass(className);
        });

        describe('when component is controlled', () => {
            it('should set `filled` class when value passed', () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(
                    <Textarea value='some value' dataTestId={dataTestId} nativeScrollbar={true} />,
                );

                expect(getByTestId(dataTestId)).toHaveClass('filled');
            });

            it('should not set `filled` class if the value is empty', () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(<Textarea value='' dataTestId={dataTestId} />);

                expect(getByTestId(dataTestId)).not.toHaveClass('filled');
            });

            it('should unset `filled` class if the value becomes empty', () => {
                const dataTestId = 'test-id';
                const { getByTestId, rerender } = render(
                    <Textarea value='some value' dataTestId={dataTestId} />,
                );

                rerender(<Textarea value='' dataTestId={dataTestId} />);

                expect(getByTestId(dataTestId)).not.toHaveClass('filled');
            });
        });

        describe('when component is uncontrolled', () => {
            it('should set `filled` class when defaultValue passed', () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(
                    <Textarea
                        defaultValue='some value'
                        dataTestId={dataTestId}
                        nativeScrollbar={true}
                    />,
                );

                expect(getByTestId(dataTestId)).toHaveClass('filled');
            });

            it('should not set `filled` class if the value is empty', () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(
                    <Textarea dataTestId={dataTestId} nativeScrollbar={true} />,
                );

                expect(getByTestId(dataTestId)).not.toHaveClass('filled');
            });

            it('should unset `filled` class if value becomes empty', async () => {
                const dataTestId = 'test-id';
                const { getByTestId } = render(
                    <Textarea
                        defaultValue='some value'
                        dataTestId={dataTestId}
                        nativeScrollbar={true}
                    />,
                );

                const textarea = getByTestId(dataTestId) as HTMLInputElement;

                await userEvent.type(textarea, '{backspace}', {
                    initialSelectionStart: 0,
                    initialSelectionEnd: textarea.value.length,
                });

                fireEvent.blur(textarea);

                expect(textarea.value).toBe('');
                expect(textarea).not.toHaveClass('filled');
            });
        });

        it('should set `hasInnerLabel` class', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Textarea label='label' dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toHaveClass('hasInnerLabel');
        });

        it('should set `resizeVertical` class', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Textarea resize='vertical' dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toHaveClass('resizeVertical');
        });

        it('should set `disabled` attribute', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Textarea disabled={true} dataTestId={dataTestId} />);

            expect(getByTestId(dataTestId)).toHaveAttribute('disabled');
        });

        it('should set `maxHeight` style with autosize on', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Textarea
                    nativeScrollbar={true}
                    autosize={true}
                    maxHeight={100}
                    dataTestId={dataTestId}
                />,
            );

            expect(getByTestId(dataTestId)).toHaveStyle('max-height: 100px');
        });

        it('should set `maxHeight` style with autosize off', () => {
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Textarea
                    nativeScrollbar={true}
                    autosize={false}
                    maxHeight={100}
                    dataTestId={dataTestId}
                />,
            );

            expect(getByTestId(dataTestId)).toHaveStyle('max-height: 100px');
        });
    });

    describe('Callbacks tests', () => {
        it('should call `onChange` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const value = '123';
            const { getByTestId } = render(<Textarea onChange={cb} dataTestId={dataTestId} />);

            const textarea = getByTestId(dataTestId) as HTMLTextAreaElement;

            fireEvent.change(textarea, { target: { value } });

            expect(cb).toBeCalledTimes(1);
            expect(textarea.value).toBe(value);
        });

        it('should call `onFocus` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Textarea onFocus={cb} dataTestId={dataTestId} />);

            fireEvent.focus(getByTestId(dataTestId));

            expect(cb).toBeCalledTimes(1);
        });

        it('should call `onBlur` prop', () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(<Textarea onBlur={cb} dataTestId={dataTestId} />);

            fireEvent.blur(getByTestId(dataTestId));

            expect(cb).toBeCalledTimes(1);
        });

        it('should not call `onChange` prop if disabled', async () => {
            const cb = jest.fn();
            const dataTestId = 'test-id';
            const { getByTestId } = render(
                <Textarea onChange={cb} dataTestId={dataTestId} disabled={true} />,
            );

            const textarea = getByTestId(dataTestId) as HTMLTextAreaElement;

            await userEvent.type(textarea, '123');

            expect(cb).not.toBeCalled();
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Textarea value='value' onChange={jest.fn()} />);

        expect(unmount).not.toThrowError();
    });
});
