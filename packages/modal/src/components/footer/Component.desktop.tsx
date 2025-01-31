import React, { FC } from 'react';
import cn from 'classnames';

import { ModalDesktopProps } from '../../Component.desktop';

import { Footer, FooterProps } from './Component';

import styles from './desktop.module.css';

export type FooterDesktopProps = FooterProps & {
    /**
     * Размер
     */
    size?: ModalDesktopProps['size'];
};

export const FooterDesktop: FC<FooterDesktopProps> = ({
    size,
    className,
    sticky,
    ...restProps
}) => (
    <Footer
        className={cn(className, styles.footer, size && styles[size], {
            [styles.sticky]: sticky,
        })}
        sticky={sticky}
        {...restProps}
    />
);
