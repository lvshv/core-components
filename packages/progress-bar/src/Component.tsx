import React from 'react';
import cn from 'classnames';

import styles from './index.module.css';

export type ProgressBarProps = {
    /**
     * Значение заполненной части 0-100
     */
    value: number;

    /**
     * Css-класс для стилизации
     */
    className?: string;

    /**
     * Цвет заполнения
     */
    view?:
        | 'positive'
        | 'negative'
        | 'attention'
        | 'link'
        | 'tertiary'
        | 'secondary'
        | 'primary'
        | 'accent';

    /**
     * Размер компонента
     */
    size?: 's' | 'm';

    /**
     * Id компонента для тестов
     */
    dataTestId?: string;
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
    ({ className, value, view = 'positive', size = 'm', dataTestId }, ref) => {
        const translateX = Math.max(-100, Math.min(0, value - 100));

        return (
            <div
                role='progressbar'
                aria-valuenow={Math.round(value)}
                aria-valuemin={0}
                aria-valuemax={100}
                className={cn(styles.container, styles[size], className)}
                data-test-id={dataTestId}
                ref={ref}
            >
                <div
                    className={cn(styles.filled, styles[view])}
                    style={{ transform: `translateX(${translateX}%)` }}
                />
            </div>
        );
    },
);
