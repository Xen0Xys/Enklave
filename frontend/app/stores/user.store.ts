import {defineStore} from "pinia";
import useEnklaveApi from "~/composables/useEnklaveApi";
import {toast} from "vue-sonner";

export const useUserStore = defineStore("user", {
    state: (): {user?: any} => ({
        user: undefined,
    }),
    actions: {
        async login(email: string, password: string) {
            try {
                const response = await useEnklaveApi("/auth/login", "POST", {
                    body: {
                        email,
                        password,
                    },
                });
                const tokenCookie = useCookie("token");
                tokenCookie.value = response.token;
                this.user = response.user;
                toast.success("Login successful!", {
                    description: "Welcome back!",
                });
                await useRouter().push("/");
            } catch (e: any) {
                toast.error("Login failed. Please check your credentials.", {
                    description:
                        e.data?.message ||
                        e.message ||
                        "An error occurred during login.",
                });
            }
        },
        async fetchCurrentUser() {
            const tokenCookie = useCookie("token");
            if (!tokenCookie.value) {
                this.user = undefined;
                return;
            }
            try {
                this.user = await useEnklaveApi("/users/me", "GET", {
                    headers: {
                        Authorization: `Bearer ${tokenCookie.value}`,
                    },
                });
                // oxlint-disable-next-line no-unused-vars
            } catch (_: any) {
                this.user = undefined;
                toast.error("Failed to fetch user data. Please log in again.", {
                    description: "Your session may have expired.",
                });
            }
        },
        async register(username: string, email: string, password: string) {
            try {
                const response = await useEnklaveApi("auth/register", "POST", {
                    body: {
                        username,
                        email,
                        password,
                    },
                });
                const tokenCookie = useCookie("token");
                tokenCookie.value = response.token;
                this.user = response.user;
                toast.success("Registration successful!", {
                    description: "Welcome! Your account has been created.",
                });
                await useRouter().push("/");
            } catch (e: any) {
                toast.error("Registration failed.", {
                    description:
                        e.data?.message ||
                        e.message ||
                        "An error occurred during registration.",
                });
            }
        },
        async logout() {
            const tokenCookie = useCookie("token");
            tokenCookie.value = undefined;
            this.user = undefined;
            toast.success("Logout successful!", {
                description: "You have been logged out.",
            });
            await useRouter().push("/auth/login");
        },
    },
});
