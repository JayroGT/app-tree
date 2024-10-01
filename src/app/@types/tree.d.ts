export interface Order {
    login: string;
    id: number;
    repos_url: string;
}

export interface TreeContextType {
    data: any[] ;
    userInput: string;
    setUserInput: (input: string) => void;
    organizations: Order[];
    // fetchOrganizations: (username: string) => Promise<void>;
    processInfo: () => void;
}