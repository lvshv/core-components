import { useMemo } from 'react';

import { TabListProps } from '../typings';

import { useCollapsibleElements } from './use-collapsible-elements';
import { useTabs } from './use-tabs';

export const useTablistTitles = ({
    titles = [],
    selectedId,
    collapsible,
    onChange,
}: Pick<TabListProps, 'titles' | 'selectedId' | 'collapsible' | 'onChange'>) => {
    const { containerRef, addonRef, idsCollapsedElements } = useCollapsibleElements<
        HTMLDivElement,
        HTMLInputElement
    >('[role=tab]');

    const tablistTitles = useMemo(() => {
        const visibleTitles = titles.filter(({ id }) => !idsCollapsedElements.includes(String(id)));
        const lastVisibleTitle = visibleTitles[visibleTitles.length - 1];

        const idsCollapsedTitles = idsCollapsedElements.reduce<string[]>(
            (acc, id) =>
                selectedId === id && lastVisibleTitle
                    ? [...acc, String(lastVisibleTitle.id)]
                    : [...acc, id],
            [],
        );

        return titles.map((title) => ({
            ...title,
            collapsed: collapsible && idsCollapsedTitles.includes(String(title.id)),
            selected: title.id === selectedId,
        }));
    }, [titles, collapsible, selectedId, idsCollapsedElements]);

    const { selectedTab, focusedTab, getTabListItemProps } = useTabs({
        titles: tablistTitles,
        selectedId,
        onChange,
    });

    return {
        containerRef,
        addonRef,
        tablistTitles,
        selectedTab,
        focusedTab,
        getTabListItemProps,
    };
};
