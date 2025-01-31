import React, { forwardRef } from 'react';
import cn from 'classnames';

import { BaseModal, BaseModalProps } from '@alfalab/core-components-base-modal';

import { Closer } from './components/closer/Component';
import { ContentMobile } from './components/content/Component.mobile';
import { FooterMobile } from './components/footer/Component.mobile';
import { HeaderMobile } from './components/header/Component.mobile';

import styles from './mobile.module.css';
import transitions from './transitions.module.css';

export type ModalMobileProps = BaseModalProps & {
    /**
     * Управление наличием закрывающего крестика
     * @default false
     */
    hasCloser?: boolean;
};

const ModalMobileComponent = forwardRef<HTMLDivElement, ModalMobileProps>(
    ({ children, className, ...restProps }, ref) => (
            <BaseModal
                {...restProps}
                ref={ref}
                transitionProps={{
                    classNames: transitions,
                    ...restProps.transitionProps,
                }}
                className={cn(className, styles.component)}
            >
                {children}
            </BaseModal>
        ),
);

export const ModalMobile = Object.assign(ModalMobileComponent, {
    Content: ContentMobile,
    Header: HeaderMobile,
    Footer: FooterMobile,
    Closer,
});
