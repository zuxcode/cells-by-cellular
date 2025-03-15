import { create } from "zustand";

interface Service {
  id: string;
  name: string;
}

interface Tenant {
  id: string;
  staffId: string;
  roleId: string;
  services: Record<string, Service>; // Normalized services
}

interface AddTenantProps extends Omit<Tenant, "services"> {
  service: Service;
}

interface TenantStore {
  tenants: Record<string, Tenant>; // Normalized tenants
  selectedTenantId: string | null;
  selectedServiceId: string | null;

  actions: {
    addTenant: (tenant: AddTenantProps) => void;
    addServiceToTenant: (tenantId: string, service: Service) => void;
    selectTenant: (tenantId: string | null, serviceId?: string | null) => void;
    selectService: (serviceId: string | null) => void;
    getService: (tenantId: string, serviceId: string) => Service | undefined;
    getTenants: () => Tenant[];
  };
}

const useTenant = create<TenantStore>((set, get) => ({
  tenants: {},
  selectedTenantId: null,
  selectedServiceId: null,

  actions: {
    addTenant: (tenant) =>
      set((state) => ({
        tenants: {
          ...state.tenants,
          [tenant.id]: {
            ...tenant,
            services: {
              [tenant.service.id]: tenant.service,
            },
          },
        },
      })),

    addServiceToTenant: (tenantId, service) =>
      set((state) => {
        const tenant = state.tenants[tenantId];
        if (!tenant) return state;

        return {
          tenants: {
            ...state.tenants,
            [tenantId]: {
              ...tenant,
              services: {
                ...tenant.services,
                [service.id]: service,
              },
            },
          },
        };
      }),

    selectTenant: (tenantId, serviceId = null) =>
      set({
        selectedTenantId: tenantId,
        selectedServiceId: serviceId,
      }),

    selectService: (serviceId) => set({ selectedServiceId: serviceId }),

    getService: (tenantId, serviceId) => {
      const state = get();
      return state.tenants[tenantId]?.services[serviceId];
    },

    getTenants: () => {
      const state = get();
      return Object.values(state.tenants);
    },
  },
}));

// Derived selectors for better reactivity
export const useCurrentTenant = () =>
  useTenant((state) =>
    state.selectedTenantId ? state.tenants[state.selectedTenantId] : null
  );

export const useCurrentService = () =>
  useTenant((state) =>
    state.selectedServiceId && state.selectedTenantId
      ? state.tenants[state.selectedTenantId]?.services[state.selectedServiceId]
      : null
  );

export const useTenantsList = () =>
  useTenant((state) => Object.values(state.tenants));

export const useServices = (tenantId: string) =>
  useTenant((state) => state.tenants[tenantId]?.services || {});

export const useService = (tenantId: string, serviceId: string) =>
  useTenant((state) => state.tenants[tenantId]?.services[serviceId]);

export const useTenantActions = () => useTenant((state) => state.actions);
