interface SidebarSheetEndpoints {
    barbershopsSearch: string;
    bookings: string;
    home: string;
};

export const sidedarSheetEndpoints: SidebarSheetEndpoints = {
    barbershopsSearch: "/barbershops?service",
    bookings: "/bookings",
    home: "/",
};