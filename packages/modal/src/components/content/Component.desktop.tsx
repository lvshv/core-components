import React, { FC } from 'react';
import cn from 'classnames';

import { ModalDesktopProps } from '../../Component.desktop';

import { Content, ContentProps } from './Component';

import styles from './desktop.module.css';

export type ContentDesktopProps = ContentProps & {
    /**
     * Размер
     */
    size?: ModalDesktopProps['size'];
};

export const ContentDesktop: FC<ContentDesktopProps> = ({ size, className, ...restProps }) => (
    <Content className={cn(className, size && styles[size])} {...restProps} />
);
