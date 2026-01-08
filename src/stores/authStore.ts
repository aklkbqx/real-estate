// import { create } from 'zustand';

// const isJwtExpired = (token: string): boolean => {
//   try {
//     const part = token.split('.')?.[1];
//     if (!part) return false;
//     const payloadStr = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
//     const payload = JSON.parse(payloadStr);
//     const exp = Number(payload?.exp);
//     if (!Number.isFinite(exp)) return false;
//     return Date.now() >= exp * 1000;
//   } catch {
//     return false;
//   }
// };

// const getJwtPayload = (token: string): any | null => {
//   try {
//     const part = token.split('.')?.[1];
//     if (!part) return null;
//     const payloadStr = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
//     return JSON.parse(payloadStr);
//   } catch {
//     return null;
//   }
// };

// const getAdminFromJwt = (token: string): Admin | null => {
//   const payload = getJwtPayload(token);
//   if (!payload || typeof payload !== 'object') return null;

//   const username =
//     (payload as any).username ??
//     (payload as any).user?.username ??
//     (payload as any).admin?.username ??
//     (payload as any).data?.username;

//   const permissions =
//     (payload as any).permissions ??
//     (payload as any).user?.permissions ??
//     (payload as any).admin?.permissions ??
//     (payload as any).data?.permissions;

//   const roles = (payload as any).roles ?? (payload as any).user?.roles ?? (payload as any).admin?.roles ?? (payload as any).data?.roles;

//   const _id =
//     (payload as any)._id ??
//     (payload as any).id ??
//     (payload as any).user?._id ??
//     (payload as any).user?.id ??
//     (payload as any).admin?._id ??
//     (payload as any).admin?.id ??
//     (payload as any).data?._id ??
//     (payload as any).data?.id ??
//     (payload as any).sub;

//   if (!username && !permissions && !roles) return null;

//   return {
//     _id: String(_id || ''),
//     username: String(username || ''),
//     permissions,
//     roles,
//   } as Admin;
// };

// interface AuthState {
//   admin: Admin | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   user: User | null;
//   userToken: string | null;
//   isUserAuthenticated: boolean;
//   userInitialized: boolean;
//   setAuth: (token: string, admin?: Admin, remember?: boolean) => void;
//   logout: () => void;
//   initAuth: () => void;
//   setUserAuth: (token: string, user: User) => void;
//   logoutUser: () => void;
//   initUserAuth: () => void;
//   updateAdmin: (admin: Admin) => void;
//   updateUser: (user: User) => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   admin: null,
//   token: null,
//   isAuthenticated: false,
//   user: null,
//   userToken: null,
//   isUserAuthenticated: false,
//   userInitialized: false,

//   setAuth: (token: string, admin?: Admin, remember: boolean = true) => {
//     if (remember) {
//       localStorage.setItem('admin_token', token);
//       sessionStorage.removeItem('admin_token');
//     } else {
//       sessionStorage.setItem('admin_token', token);
//       localStorage.removeItem('admin_token');
//     }

//     const adminFromJwt = getAdminFromJwt(token);
//     // Merge provided admin data with JWT data to ensure _id and other claims are present
//     // admin object takes precedence for matching keys, but JWT fills in missing ones (like _id)
//     const finalAdmin = admin ? { ...adminFromJwt, ...admin } : adminFromJwt;

//     if (finalAdmin) {
//       localStorage.setItem('admin_data', JSON.stringify(finalAdmin));
//     } else {
//       localStorage.removeItem('admin_data');
//     }
//     set({ token, admin: finalAdmin ?? null, isAuthenticated: true });
//   },

//   logout: () => {
//     localStorage.removeItem('admin_token');
//     sessionStorage.removeItem('admin_token');
//     localStorage.removeItem('admin_data');
//     set({ token: null, admin: null, isAuthenticated: false });
//   },

//   initAuth: () => {
//     const token = localStorage.getItem('admin_token') ?? sessionStorage.getItem('admin_token');
//     const adminData = localStorage.getItem('admin_data');

//     if (!token) return;

//     if (isJwtExpired(token)) {
//       localStorage.removeItem('admin_token');
//       sessionStorage.removeItem('admin_token');
//       localStorage.removeItem('admin_data');
//       set({ token: null, admin: null, isAuthenticated: false });
//       return;
//     }

//     if (adminData) {
//       try {
//         const admin = JSON.parse(adminData);
//         set({ token, admin, isAuthenticated: true });
//         return;
//       } catch {
//         localStorage.removeItem('admin_data');
//       }
//     }

//     const adminFromJwt = getAdminFromJwt(token);
//     if (adminFromJwt) {
//       localStorage.setItem('admin_data', JSON.stringify(adminFromJwt));
//     }
//     set({ token, admin: adminFromJwt, isAuthenticated: true });
//   },

//   setUserAuth: (userToken: string, user: User) => {
//     localStorage.setItem('user_token', userToken);
//     localStorage.setItem('user_data', JSON.stringify(user));
//     set({ userToken, user, isUserAuthenticated: true, userInitialized: true });
//   },

//   logoutUser: () => {
//     localStorage.removeItem('user_token');
//     localStorage.removeItem('user_data');
//     set({ userToken: null, user: null, isUserAuthenticated: false, userInitialized: true });
//   },

//   initUserAuth: () => {
//     const userToken = localStorage.getItem('user_token');
//     const userData = localStorage.getItem('user_data');

//     if (userToken && isJwtExpired(userToken)) {
//       localStorage.removeItem('user_token');
//       localStorage.removeItem('user_data');
//       set({ userToken: null, user: null, isUserAuthenticated: false, userInitialized: true });
//       return;
//     }

//     if (userToken && userData) {
//       try {
//         const user = JSON.parse(userData);
//         set({ userToken, user, isUserAuthenticated: true, userInitialized: true });
//       } catch {
//         localStorage.removeItem('user_token');
//         localStorage.removeItem('user_data');
//         set({ userToken: null, user: null, isUserAuthenticated: false, userInitialized: true });
//       }
//     } else {
//       set({ userToken: null, user: null, isUserAuthenticated: false, userInitialized: true });
//     }
//   },

//   updateAdmin: (admin: Admin) => {
//     localStorage.setItem('admin_data', JSON.stringify(admin));
//     set({ admin });
//   },

//   updateUser: (user: User) => {
//     localStorage.setItem('user_data', JSON.stringify(user));
//     set({ user });
//   },
// }));