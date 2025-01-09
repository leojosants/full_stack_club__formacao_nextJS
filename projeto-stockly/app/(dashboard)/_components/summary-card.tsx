import { ReactNode } from "react";


interface SummaryCardProps {
    children: ReactNode;
};

interface SummaryCardIconProps {
    children: ReactNode;
};

interface SummaryCardTitleProps {
    children: ReactNode;
};

interface SummaryCardValueProps {
    children: ReactNode;
};

export const SummaryCardIcon = (props: SummaryCardIconProps) => {
    const { children } = props;

    return (
        <div className="h-9 w-9 flex items-center justify-center rounded-md bg-slate-500 bg-opacity-10 text-sbg-slate-500 mb-2">
            {children}
        </div>
    );
};

export const SummaryCardTitle = (props: SummaryCardTitleProps) => {
    const { children } = props;

    return (
        <p className="text-sm font-medium text-slate-500">
            {children}
        </p>
    );
};

export const SummaryCardValue = (props: SummaryCardValueProps) => {
    const { children } = props;

    return (
        <p className="text-2xl font-semibold text-slate-900">
            {children}
        </p>
    );
};

export const SummaryCard = (props: SummaryCardProps) => {
    const { children } = props;

    return (
        <div className="rounded-xl bg-white p-6">
            {children}
        </div>
    );
};

export const SummaryCardSkeleton = () => {
    return (
        <div className="rounded-xl bg-white p-6">
            <div className="space-y-2">
                <div className="h-9 w-9 rounded-md bg-gray-200" />
                <div className="h-5 w-[86.26px] rounded-md bg-gray-200" />
                <div className="h-8 w-48 rounded-md bg-gray-200" />
            </div>
        </div>
    );
};