import {useUserStore} from "~/stores/user.store";

export default defineNuxtRouteMiddleware(async (to) => {
    const userStore = useUserStore();
    if (userStore.user === undefined) {
        await userStore.fetchCurrentUser();
    }

    const isLoggedIn = !!userStore.user;
    const isLoginPage =
        to.path === "/auth/login" || to.path === "/auth/register";

    if (!isLoggedIn && !isLoginPage) {
        return navigateTo("/auth/login");
    }
    if (isLoggedIn && isLoginPage) {
        return navigateTo("/");
    }
});
