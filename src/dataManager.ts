export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  active: boolean;
}

export interface SummaryConfig {
  includeEmail: boolean;
  prefix?: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'admin', active: true },
  { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'user', active: false },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'user', active: true },
];

export function getUserById(id: number): User | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getActiveUsers(): User[] {
  return mockUsers.filter(user => user.active);
}

export function getUsersByRole(role: 'admin' | 'user' | 'guest'): User[] {
  return mockUsers.filter(user => user.role === role);
}

export function formatUsersSummary(users: User[], config: SummaryConfig): string {
  return users.map(u => {
    const emailPart = config.includeEmail ? ` <${u.email}>` : '';
    return `${config.prefix || ''}${u.name}${emailPart}`;
  }).join(', ');
}
