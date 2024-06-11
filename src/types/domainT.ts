

export interface Domain {
    id?: number;
    domain_name: string;
    nginx_configured?: boolean;
    created_at?: string;
}

export interface updateDomain {
    id: number;
    domain_name: string;
    nginx_configured?: boolean;
    created_at?: string;
}
