import { cn } from "../_lib/utils";
import React, { ReactNode } from "react";


interface HeaderProps {
    children: React.ReactNode;
    className?: string;
};

interface HeaderTitleProps {
    children: ReactNode;
};

interface HeaderSubtitleProps {
    children: ReactNode;
};

interface HeaderLeftProps {
    children: ReactNode;
};

interface HeaderRightProps {
    children: ReactNode;
};

export const HeaderTitle = (props: HeaderTitleProps) => {
    const { children } = props;

    return (
        <h2 className="text-xl font-semibold">
            {children}
        </h2>
    );
};

export const HeaderSubtitle = (props: HeaderSubtitleProps) => {
    const { children } = props;

    return (
        <span className="text-xs font-semibold text-slate-500">
            {children}
        </span>
    );
};

export const HeaderLeft = (props: HeaderLeftProps) => {
    const { children } = props;

    return (
        <div className="space-y-1">
            {children}
        </div>
    );
};

export const HeaderRight = (props: HeaderRightProps) => {
    const { children } = props;

    return (
        <div>
            {children}
        </div>
    );
};

const Header = (props: HeaderProps) => {
    const { children, className } = props;

    return (
        <div className={cn("flex w-full items-center justify-between", className)}>
            {children}
        </div>
    );
};

export default Header;