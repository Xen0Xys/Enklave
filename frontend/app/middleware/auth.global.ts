import {useUserStore} from "~/stores/user.store";

const allowedPaths = [
    "/auth/login",
    "/auth/register",
    "/callbacks/verify-email",
];

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();
    if (userStore.user === undefined) await userStore.fetchCurrentUser();

    const isLoggedIn: boolean = !!userStore.user;
    const isAllowedPage: boolean = allowedPaths.includes(to.path);

    if (!isLoggedIn && !isAllowedPage) return navigateTo("/auth/login");
    if (isLoggedIn && isAllowedPage) return navigateTo("/");
});
