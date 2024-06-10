

export interface Domain {
    id?: number;
    domain_name: string;
    nginx_configured?: boolean;
    created_at?: string;
    school?: number;
}

export interface updateDomain {
    id: number;
    domain_name: string;
    nginx_configured?: boolean;
    created_at?: string;
    school?: number;
}
